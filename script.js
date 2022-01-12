var apiKEY = "c0955b95b1b4f37d644a512418fc63bc";
// var apiKEY = "fba9ebceabe00d55b72dc111e8106b60";
var city = "houston";
var current = document.getElementById("current");
var future = document.getElementById("future");
var requestUrl;

function getCityWeather() {
  // e.preventDefault();

  currentAPI();

  function currentAPI() {
    requestUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      apiKEY +
      "&units=imperial";

    fetch(requestUrl)
      .then(function (response) {
        if (response.status === 404) {
          console.log(response.status);
          return;
        }
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        // name
        var name = document.createElement("h3");
        name.textContent = data.name;
        current.append(name);

        // icon
        var icon = data.weather[0].icon;
        var img = document.createElement("img");
        img.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        current.append(img);

        // current day
        var currentDay = document.createElement("h6");
        currentDay.textContent = moment().format("MMMM D, YYYY");
        current.append(currentDay);

        // temperature
        var temperature = document.createElement("h4");
        temperature.textContent = data.main.temp + "\xB0F";
        current.append(temperature);

        // humidity
        var humidity = document.createElement("h5");
        humidity.textContent = "Humidity: " + data.main.humidity;
        current.append(humidity);

        // wind speed
        var windSpeed = document.createElement("h5");
        windSpeed.textContent = "Wind Speed: " + data.wind.speed + "mph";
        current.append(windSpeed);

        // capture lat and lon values for the oneCallAPI function
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        oneCallAPI(lat, lon);
      });
  }

  function oneCallAPI(lat, lon) {
    requestUrl =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=minutely,hourly,alerts&appid=" +
      apiKEY +
      "&units=imperial";

    fetch(requestUrl)
      .then(function (response) {
        if (response.status === 404) {
          console.log(response.status);
          return;
        }
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        // uv index
        var uvIndex = document.createElement("h5");
        uvIndex.textContent = "UV Index: " + data.current.uvi;
        current.append(uvIndex);
      });
  }
}

getCityWeather();
