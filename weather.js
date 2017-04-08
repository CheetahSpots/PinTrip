//APIKey goes here locally
//var apiKey = 
function getWeather(lat, long) {
	var queryURL = "http://api.wunderground.com/api/"+apiKey+"/forecast/q/"+lat+","+long+".json"
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		var currentDay = response.forecast.simpleforecast.forecastday[0];
		var weatherImage = $("<img src="+currentDay.icon_url+">");			
		var lowTemp = currentDay.low.fahrenheit;
		var highTemp = currentDay.high.fahrenheit;
		var newDiv = $("<div>");
		newDiv.append(weatherImage);
		newDiv.append("<h2>Low: "+lowTemp+"\xB0F</h2>");
		newDiv.append("<h2>High: "+highTemp+"\xB0F</h2>");
		// $("#view").html(newDiv);							//rename accordingly
	});
}
