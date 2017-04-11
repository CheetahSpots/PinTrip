var locales = JSON.parse(localStorage.getItem("buttons"));
var searchBox = new google.maps.places.SearchBox(document.getElementById('cityName'));

if (!Array.isArray(locales)) {
    locales = [];
}

function makeButtons() {
   
   $("#btnDiv").empty();

    var insideLocales = JSON.parse(localStorage.getItem("buttons"));

    if (!Array.isArray(insideLocales)) {
        insideLocales = [];
    }

    for (var i = 0; i < locales.length; i++) { 
        var str = locales[i];
        var api = 'AIzaSyBvIQ8yyx93va9LZdlfgdOnI7Ce9_gYbvM';
        var getID = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + str +"&key=" + api;
        var q = encodeURIComponent('select * from html where url="'+getID+'"');
        var yql = 'https://query.yahooapis.com/v1/public/yql?q='+q+'&format=json';
       
        //console.log(getID);

            $.ajax({
                    url: yql,
                    contentType: 'text/plain',
                    method: "GET"
                }).done(function(ID) {
                    var obj = JSON.parse(ID.query.results.body);
                    var photoRef = obj.results[0].photos[0].photo_reference;
                    var photo = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+photoRef+"&key="+api;
                    console.log(photo);
                    var b = $("<div>");
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
                    $("#btnDiv").append(b);
                });
        
        //getWeather();
    }
}


makeButtons();

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
    var header = $(".masthead");
    var backgrounds = [
        
        "url(assets/images/boston.png)",
        "url(assets/images/brycecanyon.png)",
        "url(assets/images/cinqueterre.png)",
        "url(assets/images/hawaiishore.png)",
        "url(assets/images/istanbul.png)",
        "url(assets/images/japan.png)",
        "url(assets/images/london.png)",
        "url(assets/images/marien.png)",
        "url(assets/images/ocracoke.png)",
        "url(assets/images/rome.png)"];

    var current = 0;

    function nextBackground() {
        header.css(
            "background",
            backgrounds[current = ++current % backgrounds.length]);

        setTimeout(nextBackground, 3000);
    }
    setTimeout(nextBackground, 3000);
    header.css("background", backgrounds[0]);
});







