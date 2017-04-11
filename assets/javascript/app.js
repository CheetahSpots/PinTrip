var locales = JSON.parse(localStorage.getItem("buttons"));
var searchBox = new google.maps.places.SearchBox(document.getElementById('cityName'));

if (!Array.isArray(locales)) {
    locales = [];
}

function getPhoto(str,b){
    var api = 'AIzaSyBvIQ8yyx93va9LZdlfgdOnI7Ce9_gYbvM';
    var getID = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + str +"&key=" + api;
    var q = encodeURIComponent('select * from html where url="'+getID+'"');
    var yql = 'https://query.yahooapis.com/v1/public/yql?q='+q+'&format=json';
    $.ajax({
            url: yql,
            contentType: 'text/plain',
            method: "GET"
        }).done(function(ID) {
            console.log(ID);
            var obj = JSON.parse(ID.query.results.body);
            var photoRef = obj.results[0].photos[0].photo_reference;
            var photo = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+photoRef+"&key="+api;
            console.log(photo);
            b.addClass("col-md-4");
            b.addClass("cities");
            var image = $('<img>');
            image.addClass("photos");
            image.attr('src', photo);
            b.append(image);
            var checkIt = $("<h2>");
            var link = $("<a>");
            link.addClass("btn btn-default");
            link.text(str);
            checkIt.append(link);
            b.append(checkIt);
        });
}


function makeButtons() {
   
   $("#btnDiv").empty();

    var insideLocales = JSON.parse(localStorage.getItem("buttons"));

    if (!Array.isArray(insideLocales)) {
        insideLocales = [];
    }



    for (var i = 0; i < locales.length; i++) { 
        var str = locales[i];
        var newButton = $("<div>");
        var deferredButton = $.Deferred();
        var coordinates = {
            'lat': 0,
            'lon': 0
        };                   
        deferredButton.done(
            getPhoto(str,newButton),
            getCoordinates(str,coordinates)
        ).done(
            getAirport(coordinates.lat,coordinates.lon,newButton),
            getWeather(coordinates.lat,coordinates.lon,newButton)
        ).done(function(){
            $("#btnDiv").append(newButton);
        });
    }
}

$(document).on("load",function(){
    makeButtons();
});

$(document).on("click", "button.delete", function() {
    var buttonsList = JSON.parse(localStorage.getItem("buttons"));
    var currentIndex = $(this).attr("data-index");

    buttonsList.splice(currentIndex, 1);

    locales = buttonsList;

    localStorage.setItem("buttons", JSON.stringify(locales));

    makeButtons();

});

$("#searchBtn").on("click", function(event){
    event.preventDefault();

    var city = $("#cityName").val().trim();
    var replaced = city.replace(/\s/g, '+');
    locales.push(replaced);

    localStorage.setItem("buttons", JSON.stringify(locales));
    
    makeButtons();

});

$(function () {

    $('#content-slider').slidesjs({
    width: 1920,
    height: 520,
    effect: {
        slide:{ speed: 800}
    },
    navigation: {
        active: false
    },
    pagination: {
        active: false
    },
    play:{
        interval: 5000,
        auto: true
    }
    });
});







