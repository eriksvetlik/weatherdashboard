var apiKEY = "c0955b95b1b4f37d644a512418fc63bc";
// var apiKEY = "fba9ebceabe00d55b72dc111e8106b60";
var city = "london";
var requestUrl;

function getCityWeather(city) {
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
      });
  }
}

getCityWeather(city);
