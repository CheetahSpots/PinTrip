var cities = [];

var states = [];

var countries = [];

// $("#stateName").dropdown('toggle');

function showCity() {

	//AJAX requests

	$(".body").empty();
}


function makeButtons() {
	//alert("hi!");
	$("#buttonDiv").empty();

	for (var i = 0; i < cities.length; i++) {
		var b = $("<div>");
		b.addClass("col-md-4");
		b.addClass("cities");
		b.text(cities[i] + ", " + states[i] + ", " + countries[i]);
		var image = $("<img>");
		image.attr("src", "http://placehold.it/250X250");
		b.append(image);
		var checkIt = $("<h2>");
		var link = $("<a>");
		link.addClass("btn btn-default");
		link.text("Check it out!");
		checkIt.append(link);
		b.append(checkIt);
		$("#buttonDiv").append(b);
	}

	$("#cityName").text("");
	$("#stateName").text("");
	$("#countryName").text("");
}

$(".search").on("click", function(event) {
	event.preventDefault();

	var city = $("#cityName").val().trim();
	var state = $("#stateName").val().trim();
	var country = $("#countryName").val().trim();

	cities.push(city);
	console.log(cities);

	states.push(state);
	console.log(states);

	countries.push(country);
	console.log(countries);

	makeButtons();
})

makeButtons();

$(document).on("click", ".city", showCity);


