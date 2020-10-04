function formatDate(dayHour) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayHour.getDay()];
  let hour = (dayHour.getHours() < 10 ? "0" : "") + dayHour.getHours();
  let minutes = (dayHour.getMinutes() < 10 ? "0" : "") + dayHour.getMinutes();

  return `${day.toUpperCase()}, ${hour}:${minutes}`;
}

let now = new Date();

let date = document.querySelector("#date");
date.innerHTML = formatDate(now);

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name.toUpperCase();
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function search(city) {
  let apiKey = "f3df4ec0c4d69b39170fad09eae23686";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

function searchLocation(position) {
  let apiKey = "f3df4ec0c4d69b39170fad09eae23686";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let cityForm = document.querySelector("#input");
cityForm.addEventListener("submit", handleSubmit);

let current = document.querySelector("#current");
current.addEventListener("click", getCurrentWeather);

search("Tampere");

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempSelect = document.querySelector("#temp");
  tempSelect.innerHTML = Math.round((tempSelect.innerHTML * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let tempSelect = document.querySelector("#temp");
  tempSelect.innerHTML = Math.round(((tempSelect.innerHTML - 32) * 5) / 9);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);
