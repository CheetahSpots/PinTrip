  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBxlykkSWpKiQdKP_PUOcCNTS8YCab300A",
    authDomain: "pintrip-e6a0b.firebaseapp.com",
    databaseURL: "https://pintrip-e6a0b.firebaseio.com",
    projectId: "pintrip-e6a0b",
    storageBucket: "pintrip-e6a0b.appspot.com",
    messagingSenderId: "656435386797"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

var cities = [];
var states = [];
var countries = [];
// $("#stateName").dropdown('toggle');


$(".btn").on("click", function(event){
    event.preventDefault();
     var city = $("#cityName").val().trim().replace(" ","_");        // uncomment these with correct id names
     var country = $("#countryName").val().trim().replace(" ","_");
    if(country==="United_States"){
      country = $("#stateName").val().trim();
    }
    
    database.ref().push({
        city: city,
        country: country
    });
});

function makeButtons() {
    //alert("hi!");
    $("#btnDiv").empty();
   for (var i = 0; i < cities.length; i++) { 
        var str = cities[i];
        var api = 'AIzaSyBvIQ8yyx93va9LZdlfgdOnI7Ce9_gYbvM';
        var getID = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + str +"&key=" + api;
        var q = encodeURIComponent('select * from html where url="'+getID+'"');
        var yql = 'https://query.yahooapis.com/v1/public/yql?q='+q+'&format=json';
        console.log(getID);

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
        b.text(cities[i] + ", " + states[i] + ", " + countries[i]);
        var image = $('<img>');
        image.attr('src', photo);
        b.append(image);
        var checkIt = $("<h2>");
        var link = $("<a>");
        link.addClass("btn btn-default");
        link.text("Check it out!");
        checkIt.append(link);
        b.append(checkIt);
        $("#btnDiv").append(b);
    })
   
 }
}

$(".search").on("click", function(event) {
    event.preventDefault();
    var city = $("#cityName").val().trim();
    var state = $("#stateName").val().trim();
    var country = $("#countryName").val().trim();
    cities.push(city);
    states.push(state);
    countries.push(country);
    console.log(cities);
    makeButtons();
});

database.ref().on("child_added", function(childSnapshot) {

    var cities = [];
    var states = [];
    var countries = [];

    console.log(childSnapshot.val().city);
    console.log(childSnapshot.val().country);

    makeButtons(childSnapshot.val().city);
    makeButtons(childSnapshot.val().country);

    // cities.push(city);
    // countries.push(country);

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

$(function () {
    var header = $(".masthead");
    var backgrounds = [
        "url(assets/images/atacama.png)",
        "url(assets/images/BostonBackBay.png)",
        "url(assets/images/bryce.png)",
        "url(assets/images/cinque.png)",
        "url(assets/images/fuji.png)",
        "url(assets/images/hawaii.png)",
        "url(assets/images/madagascar.png)",
        "url(assets/images/sanfran.png)",
        "url(assets/images/sydney1600x800.jpg)",
        "url(assets/images/Vancouver1600x800.jpg)"];
    var current = 0;

    function nextBackground() {
        header.css(
            "background",
            backgrounds[current= ++current % backgrounds.length]);

        setTimeout(nextBackground, 3000);
    }
    setTimeout(nextBackground, 3000);
    header.css("background", backgrounds[0]);
})






