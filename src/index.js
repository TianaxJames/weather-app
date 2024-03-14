function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let description = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity-value");
  let humidity = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind-value");
  let wind = response.data.wind.speed;
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  temperatureElement.innerHTML = Math.round(temperature);
  windElement.innerHTML = Math.round(wind);
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = ` <img
              class="weather-app-icon"
              src="${response.data.condition.icon_url}"
            />`;
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
}

function searchCity(city) {
  let apiKey = "4e8o5847ea5bt28f13d011c45acd0fe9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
function displayForecast() {}

let days = ["Tues", "Wed", "Thur", "Fri", "Sat"];
let forecastHtml = "";

days.forEach(function (day) {
  forecastHtml =
    forecastHtml +
    `
    <div class="weather-forecast-day"> 
    <div class="weather-forecast-date">${day}</div>
    <img
    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
    alt=""
    width="60px"
    /> 
    <div class="weather-forecast-temps">
    <span class="weather-forecast-temp-max"><strong>18°</strong></span> <span class="weather-forecast-temp-min"><strong>13°</strong></span>
    </div>
    </div>
    `;
});

let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Montreal");
displayForecast();
