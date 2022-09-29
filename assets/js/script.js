// Global Variables

let currDay = moment.now();
var currCard = $('.curr-weather');
var cardContainer = $('.card-container');
var citiesDisplay = JSON.parse(localStorage.getItem("searches")) || [];

// Function to create elements dynamically with the forecast data and current weather data
function appendElements(date, icon, temp, wind, hum, city, classes) {
  var parentEl = classes;
  var cardsDate = $("<h3 class=card-header>").text(city + " " + moment(date).format("L"));
  var cardsIcon = $("<img width=80 height=80>").attr("src", "http://openweathermap.org/img/w/" + icon + ".png")
  var cardsTemp = $("<p>").text("Temp: " + temp + "\u00B0F");
  var cardsWind = $("<p>").text("Wind: " + wind + " mph");
  var cardsHum = $("<p>").text("Humidity: " + hum + "%");
  parentEl.append(cardsDate, cardsIcon, cardsTemp, cardsWind, cardsHum);
  $('.card-container').append(parentEl);
}

// Function gets forecast data from the API service
function getForecast(city) {
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=b6d9290b58c34b6ad6a2f5f35449e3ec')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (var i = 3; i < data.list.length; i+=8) {
      var date = data.list[i].dt_txt;
      var icon = data.list[i].weather[0].icon;
      var temperature = data.list[i].main.temp;
      var wind = data.list[i].wind.speed;
      var humidity = data.list[i].main.humidity;
      var classes = $("<div class='col-12 col-lg card'>");
      appendElements(date, icon, temperature, wind, humidity, "", classes);
    }
  });
}

// Function gets current weather data from API service
function getCurrentWeather(city) {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=b6d9290b58c34b6ad6a2f5f35449e3ec')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var date = moment().format("L");
    var icon = data.weather[0].icon;
    var temperature = data.main.temp
    var wind = data.wind.speed
    var humidity = data.main.humidity
    var classes = $("<div class='col-12 card'>");
    appendElements(date, icon, temperature, wind, humidity, city, classes);
  });
}

// Saves the searches from the user in the local storage
function saveSearch() {
  var citiesEntered = $('#city-input').val();
  if (!citiesDisplay.includes(citiesEntered)) {
    citiesDisplay.push(citiesEntered);
  }
  localStorage.setItem("searches", JSON.stringify(citiesDisplay));
  createCityButton();
}

// Creates button to allow user ease of searching with prior searches saved to local storage
function createCityButton() {
  for (var i = 0; i < citiesDisplay.length; i++) {
    var parentEl = $('.input-container');
    var cityBtn = $('<button class="button2">').text(citiesDisplay[i])
    parentEl.append(cityBtn);
  }
}

// Displays previously created buttons on page load
createCityButton();


$('#submitBtn').on('click', function(event) {
  event.preventDefault()
  $('.input-container').empty();
  var searchInput = $('#city-input').val();
  $('.card-container').empty();
  getForecast(searchInput);
  getCurrentWeather(searchInput);
  saveSearch();
});

$('.input-container').on('click', ".button2", function(event) {
  event.preventDefault();
  var searchInput = $(this).text();
  $('.card-container').empty();
  getForecast(searchInput);
  getCurrentWeather(searchInput);
});