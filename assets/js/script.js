let currDay = moment.now();
var currCard = $('.curr-weather');
var cardContainer = $('.card-container');
var citiesDisplay = JSON.parse(localStorage.getItem("searches")) || [];

function appendElements(date, temp, wind, hum) {
  var parentEl = $("<card class=weather-card>");
  var cardsDate = $("<h3>").text(moment(date).format("L") + " ");
  var cardsTemp = $("<p>").text("Temp: " + temp + "\u00B0F ");
  var cardsWind = $("<p>").text("Wind: " + wind + " ");
  var cardsHum = $("<p>").text("Humidity: " + hum + " ");
  parentEl.append(cardsDate, cardsTemp, cardsWind, cardsHum);
  $('.card-container').append(parentEl);
}

function getAPI(city) {
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=b6d9290b58c34b6ad6a2f5f35449e3ec')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (var i = 3; i < data.list.length; i+=8) {
      var date = data.list[i].dt_txt
      var temperature = data.list[i].main.temp
      var wind = data.list[i].wind.speed
      var humidity = data.list[i].main.humidity
      appendElements(date, temperature, wind, humidity);
    }
  });
}

function getCurrentWeather(city) {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=b6d9290b58c34b6ad6a2f5f35449e3ec')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var date = moment().format("L")
    var temperature = data.main.temp
    var wind = data.wind.speed
    var humidity = data.main.humidity
    appendElements(date, temperature, wind, humidity);
  });
}

function saveSearch() {
  var citiesEntered = $('#city-input').val();
  if (!citiesDisplay.includes(citiesEntered)) {
    citiesDisplay.push(citiesEntered);
  }
  localStorage.setItem("searches", JSON.stringify(citiesDisplay));
  createCityButton();
}

function createCityButton() {
  for (var i = 0; i < citiesDisplay.length; i++) {
    var parentEl = $('.input-container');
    var cityBtn = $('<button class="button2">').text(citiesDisplay[i])
    parentEl.append(cityBtn);
  }
}

$('#submitBtn').on('click', function(event) {
  event.preventDefault()
  $('.input-container').empty();
  var searchInput = $('#city-input').val();
  $('.card-container').empty();
  getAPI(searchInput);
  getCurrentWeather(searchInput);
  saveSearch();
});

$('.input-container').on('click', ".button2", function(event) {
  event.preventDefault();
  var searchInput = $(this).text();
  $('.card-container').empty();
  getAPI(searchInput);
  getCurrentWeather(searchInput);
});