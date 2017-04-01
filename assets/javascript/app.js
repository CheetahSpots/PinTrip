var cities = ["London", "New York"];

var states = ["", "New York"];

var countries = ["England", "USA"];

function showCity() {

	//AJAX requests

	$(".body").empty();
}


function makeButtons() {
	//alert("hi!");
	$(".body").empty();

	for (var i = 0; i < cities.length; i++) {
		var b = $("<button>");
		b.addClass("city col-sm-3");
		b.text(cities[i] + ", " + states[i] + ", " + countries[i]);
		$(".body").append(b);
	}

	$("#cityName").text("");
	$("#stateName").text("");
	$("#countryName").text("");
}

$("#search").on("click", function(event) {
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