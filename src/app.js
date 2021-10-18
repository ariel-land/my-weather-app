// reflect current date

let now = new Date();
let currentTime = document.querySelector("#current-date");
let nowDate = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[now.getMonth()];
currentTime.innerHTML = `${month} ${nowDate}, ${day} ${hours}:${minutes}`;

// Have the city searched by user plug into the geo and weather API

// Get weather

function showTemperature(response) {
  let currentTemp = document.querySelector(".tempNow");
  currentTemp.innerHTML = Math.round(response.data.main.temp);

  let country = document.querySelector("#current-country");
  country.innerHTML = `${response.data.sys.country}`;

  let currentWeatherDescription = document.querySelector(
    ".currentWeatherDescription"
  );
  currentWeatherDescription.innerHTML = `${response.data.weather[0].main}`;

  let currentHighTemperature = document.querySelector(".currentHigh");
  currentHighTemperature.innerHTML = `${Math.round(
    response.data.main.temp_max
  )}`;

  let currentLowTemperature = document.querySelector(".currentLow");
  currentLowTemperature.innerHTML = `${Math.round(
    response.data.main.temp_min
  )}`;
}

// Search city to plug into temp

function searchCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-text-input");
  let cityNew = document.querySelector("#current-city");
  cityNew.innerHTML = `${searchInput.value}`;

  let units = "metric";
  let apiKey = "1b8c2d52c29dd3447556ac28355ce164";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let submitCity = document.querySelector("#search-form");
//let city = cityInput.value.trim();
submitCity.addEventListener("submit", searchCity);

// Display the city and its info

function displayCurrentLocation(response) {
  let currentLocationTemperature = document.querySelector(".tempNow");
  currentLocationTemperature.innerHTML = `${Math.round(
    response.data.main.temp
  )}`;

  let currentLocationCity = document.querySelector("#current-city");
  currentLocationCity.innerHTML = `${response.data.name}`;

  let country = document.querySelector("#current-country");
  country.innerHTML = `${response.data.sys.country}`;

  let currentWeatherDescription = document.querySelector(
    ".currentWeatherDescription"
  );
  currentWeatherDescription.innerHTML = `${response.data.weather[0].main}`;

  let currentHighTemperature = document.querySelector(".currentHigh");
  currentHighTemperature.innerHTML = `${Math.round(
    response.data.main.temp_max
  )}`;

  let currentLowTemperature = document.querySelector(".currentLow");
  currentLowTemperature.innerHTML = `${Math.round(
    response.data.main.temp_min
  )}`;
}

// Get the position based on city searched

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "1b8c2d52c29dd3447556ac28355ce164";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrentLocation);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentPosition = document.querySelector(".current-button");
currentPosition.addEventListener("click", getCurrentLocation);

// Click to change C to F

function farenheit(event) {
  event.preventDefault();
  let toFarenheit = document.querySelector(".tempNow");
  toFarenheit.innerHTML = "66";
}

let changetoF = document.querySelector("#fahrenheit-link");
changetoF.addEventListener("click", farenheit);

function celsius(event) {
  event.preventDefault();
  let toCelsius = document.querySelector(".tempNow");
  toCelsius.innerHTML = "19";
}

let changetoC = document.querySelector("#celsius-link");
changetoC.addEventListener("click", celsius);
