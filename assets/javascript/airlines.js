var weatherAPIKey = "aedfac0b150f3c79";
var qpxAPIKey = "AIzaSyBCZ_Nx9Hdm4n-VOeVZvfltwPy76PXCp-8";
var placesAPIKey = "AIzaSyAGAmaVfOaIUJD8InL1xVYy1hSahuGED-U";
var airportcodes = getAirportList();
var oLat;
var oLon;
var currentLocation = navigator.geolocation.getCurrentPosition(getPosition);


function getWeather(lat, lon) {
	var queryURL = "https://api.wunderground.com/api/"+weatherAPIKey+"/forecast/q/"+lat+","+lon+".json"
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){
			console.log(response);
			var currentDay = response.forecast.simpleforecast.forecastday[0];
			var weatherImage = $("<img src="+currentDay.icon_url+">");			
			var lowTemp = currentDay.low.fahrenheit;
			var highTemp = currentDay.high.fahrenheit;
			var newDiv = $("<div>");
			newDiv.addClass("weatherDiv");
			newDiv.append(weatherImage);
			newDiv.append("<h2>Low: "+lowTemp+"\xB0F</h2>");
			newDiv.append("<h2>High: "+highTemp+"\xB0F</h2>");
			b.append(newDiv);
		});
}
//Only getting current date for now, should probably let users choose date or use a date range
function getCurrentDate(){
	var currentDate = new Date();
	var year = currentDate.getFullYear();
	var month = currentDate.getMonth()+1;
		if (month < 10){
			month = "0"+month;
		}
	var day = currentDate.getDate();
		if (day < 10){
			day = "0"+day;
		}
	return year+"-"+month+"-"+day;
}

function getAirlinePricing(startCode, endCode){
	var currentDate = getCurrentDate();
	var flight = {
	  "request": {
	    "slice": [
	      	{"origin": startCode,
	        "destination": endCode,
	        "date": currentDate}],
	    "passengers": 
	    	{"adultCount": 1,
	     	"infantInLapCount": 0,
	     	"infantInSeatCount": 0,
	     	"childCount": 0,
	     	"seniorCount": 0},
	    "solutions": 1,			//limit results to 1 for testing
	    "refundable": false
	  }
	};
		$.ajax({
			url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key="+qpxAPIKey,
			method: "POST",
			contentType: "application/json", 
			dataType: "json",
			data: JSON.stringify(flight)
		}).done(function(response){
			console.log(response);
			var price = "No direct flights found."
				if(response.trips.tripOption !== undefined){
					console.log(response.trips.tripOption[0].saleTotal);
					price = response.trips.tripOption[0].saleTotal;
					var planeDiv = $("<div>");
					planeDiv.addClass("planeDiv");
					planeDiv.html(price);
				}
			$("#btnDiv").append(planeDiv);
		});
}


function getPosition(position){
	oLat = position.coords.latitude;
	oLon = position.coords.longitude;
	console.log(oLat+":"+oLon);
}

function getAirport(city, country) {
var queryURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?";
	queryURL += $.param({
		'query': city+", "+country,
		'type': "airport",
		'key': placesAPIKey,
	});
var yqlURL = "https://query.yahooapis.com/v1/public/yql";
	$.ajax({
		url: yqlURL,
		type: "GET",
		dataType: "jsonp",
		cache: false,
		data: {
		    'q': 'SELECT * FROM json WHERE url="'+queryURL+'"',
		    'format': 'json',
		    'jsonCompat': 'new',
		},
	success: function(response){
		var data = response.query.results.json.results[0];
		var dLat = data.geometry.location.lat;
		var dLon = data.geometry.location.lng;
		getWeather(dLat,dLon);
		var destination = getAirportCode(dLon, dLat, 0.01);
		console.log(destination);
			if(destination===false){
				$("#btnDiv").append("No direct flights found.")
			}
			else{
				var origin = getAirportCode(oLon,oLat,0.01);
				console.log(origin+" "+destination);
				getAirlinePricing(origin,destination);
			}
	}			
	});
}

function getAirportCode(lon, lat, range){
	console.log(range);
		if(range < 3){
			for (var i = 0; i < airportcodes.length; i++){
				var current = airportcodes[i];
				if (current.type==="airport"){
					var cLat = parseInt(current.lat);
					var cLon = parseInt(current.lon);
					if (lon - range < cLon && lon + range > cLon && lat - range < cLat && lat + range > cLat) {
						console.log(current.iata);
						return current.iata;
					}
				}
			}
			console.log("Increasing search range.");
			return getAirportCode(lon,lat,range*2);
		}
		else{
			return false;
		}
}

// $(".search").on("click",function(event){
// 	event.preventDefault();
// 	var city = $("#cityName").val().trim();
// 	getAirport(city);
// });