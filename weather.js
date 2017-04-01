//APIKey goes here locally
//var apiKey = 
function getWeather(country, city) {
	var queryURL = "http://api.wunderground.com/api/"+apiKey+"/forecast/q/"+country+"/"+city+".json"
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){ //need to add css classes/ids for formatting
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

$(".btn").on("click", function(event){
	event.preventDefault();
	// var city = $("#city").val().trim().replace(" ","_");			uncomment these with correct id names
	// var country = $("#country").val().trim().replace(" ","_");
	// if(country==="United_States"){
	// 	country = $("#state").val().trim();
	// }
	getWeather("CA","San_Francisco");	
	// getWeather(country,city);
});