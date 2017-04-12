var locales = JSON.parse(localStorage.getItem("buttons"));
var searchBox = new google.maps.places.Autocomplete(document.getElementById('cityName'));

if (!Array.isArray(locales)) {
    locales = [];
}

function getPhoto(str,b){
    var api = 'AIzaSyCXTtBaHKkdoistY7XeHDwYVQ3-JURBRk8';
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
            var photo = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference="+photoRef+"&key="+api;
            var checkIt = $("<div id='textbar' class='col-md-12'>");
            console.log(photo);
            $(b).addClass("col-md-4");
            $(b).addClass("cities");
            checkIt.html(str.replace(/\+/g, ' '));
            $(b).append(checkIt);
            var fader = $('<div id="fader">').css('background-color', 'rgba(0, 0, 0, 0.45)');
            $(b).append(fader);
            var image = $('<img>');
            image.addClass("photos");
            image.attr('src', photo);
            checkIt.append(image);
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
        var newButton = $("<div id='circlePin'>");
        newButton.addClass("cities");
        var deferredButton = $.Deferred();
        var coordinates = {
            'lat': 37.8,
            'lon': -122.4 //Test values while maps is broken
        };
        deferredButton.resolve();
        deferredButton.done( //do what we can with just the text search
            // getPhoto(str,newButton),
            // function(){ 
                // var gotCoordinates = getCoordinates(str);
                // coordinates.lat = gotCoordinates.lat;
                // coordinates.lon = gotCoordinates.lon;
        // }).done( //after getting coordinates back, get airport and weather info
            /*getAirport(coordinates.lat,coordinates.lon,newButton),*/
            getWeather(coordinates.lat,coordinates.lon,newButton)
        ).done(function(){
            $("btnDiv").append(newButton);
        });
    }
}



makeButtons();

// $(document).on("click", "button.delete", function() {
//     var buttonsList = JSON.parse(localStorage.getItem("buttons"));
//     var currentIndex = $(this).attr("data-index");

//     buttonsList.splice(currentIndex, 1);

//     locales = buttonsList;

//     localStorage.setItem("buttons", JSON.stringify(locales));

//     makeButtons();

// });

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
    height: 480,
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







