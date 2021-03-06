var apiKEY = "fba9ebceabe00d55b72dc111e8106b60";
var city;
var cityList = document.getElementById("cityList");
var current = document.getElementById("current");
var future = document.getElementById("future");
var requestUrl;
var searchForm = document.getElementById("searchForm");

function getCityWeather() {
  // if the user submits the search form, the city value is captured
  searchForm.addEventListener("submit", function (event) {
    city = document.getElementById("searchInput").value;
    weatherAPIs(event);
  });

  // if the user selects a city button, the city value is captured
  cityList.onclick = function getCityFromButton(event) {
    city = event.target.textContent;
    weatherAPIs(event);
  };

  function weatherAPIs(event) {
    event.preventDefault();

    current.innerHTML = "";
    current.style =
      "border: 1px solid rgba(0, 0, 0, 0.125); border-radius: 0.25rem; padding: 10px;";
    future.innerHTML = "";
    // adds city to local storage
    localStorage.setItem(city, city);

    currentAPI();

    // uses the Current Weather Data API to bring city name, icon, temp,
    // humidity, wind speed, and lat/lon
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
            var name = document.createElement("h4");
            name.textContent = "We couldn't find that city - try another!";
            current.append(name);

            return;
          }
          return response.json();
        })
        .then(function (data) {
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
          windSpeed.textContent = "Wind Speed: " + data.wind.speed;
          current.append(windSpeed);

          // capture lat and lon values for the oneCallAPI function
          var lat = data.coord.lat;
          var lon = data.coord.lon;
          oneCallAPI(lat, lon);
        });
    }

    // uses the One Call API to bring uv index, icon, future date,
    // temp, humidity, and wind speed
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
            var name = document.createElement("h4");
            name.textContent = "We couldn't find that city - try another!";
            current.append(name);

            return;
          }
          return response.json();
        })
        .then(function (data) {
          // uv index for current
          var uvIndex = document.createElement("h5");
          uvIndex.textContent = "UV Index: " + data.current.uvi;
          current.append(uvIndex);
          if (data.current.uvi < 2) {
            uvIndex.style.color = "green";
          } else if (data.current.uvi > 2 && data.current.uvi < 7) {
            uvIndex.style.color = "orange";
          } else {
            uvIndex.style.color = "red";
          }

          for (var i = 0; i < 5; i++) {
            // create a card
            var fcard = document.createElement("card");
            fcard.setAttribute("class", "card");
            future.append(fcard);

            // icon
            var ficon = data.daily[i].weather[0].icon;
            var fimg = document.createElement("img");
            fimg.src = "https://openweathermap.org/img/wn/" + ficon + "@4x.png";
            fcard.append(fimg);

            // future day
            var futureDay = document.createElement("h6");
            futureDay.textContent = moment()
              .add(i + 1, "day")
              .format("MMMM D, YYYY");
            fcard.append(futureDay);

            // temperature
            var ftemperature = document.createElement("h4");
            ftemperature.textContent = data.daily[i].temp.day + "\xB0F";
            fcard.append(ftemperature);

            // humidity
            var fhumidity = document.createElement("h5");
            fhumidity.textContent = "Humidity: " + data.daily[i].humidity;
            fcard.append(fhumidity);

            // wind speed
            var fwindSpeed = document.createElement("h5");
            fwindSpeed.textContent = "Wind Speed: " + data.daily[i].wind_speed;
            fcard.append(fwindSpeed);
          }
        });
    }

    city = "";
    cityList.innerHTML = "";
    createCityList();
  }
}

// retrieves values in local storage and creates buttons for each
function createCityList() {
  for (var i = 0; i < localStorage.length; i++) {
    var cityListButton = document.createElement("button");
    cityListButton.className = "btn btn-outline-dark";
    cityListButton.type = "submit";
    var key = localStorage.key(i);
    cityListButton.textContent = localStorage.getItem(key);

    var cityListItem = document.createElement("li");

    cityList.append(cityListItem);
    cityListItem.append(cityListButton);
  }
}

createCityList();
getCityWeather();
