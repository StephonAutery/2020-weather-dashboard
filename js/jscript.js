$(function () {
  submit;
  let varCitySearch = "Oakland";
  let queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    varCitySearch +
    "&appid=630f6b0a5dd5632e93ad38bae7f3f14b";
  let lat = "";
  let lon = "";
  let queryURLuV = "";
  let cityArray = [];

  async function init(queryURL) {
    var apiResponse;

    function API() {
      return $.ajax({
        url: queryURL,
        method: "GET",
      });
    }
    apiResponse = await API();
    showCityWeather(apiResponse);
    initUv();
    initForcast();
  }

  async function initUv() {
    queryURLuV =
      "https://api.openweathermap.org/data/2.5/uvi?&units-imperial&appid=630f6b0a5dd5632e93ad38bae7f3f14b&lat=" +
      lat +
      "&lon=" +
      lon +
      "";

    var apiResponseUv;
    function API() {
      return $.ajax({
        url: queryURLuV,
        method: "GET",
      });
    }
    apiResponseUv = await API();
    showUVData(apiResponseUv);
  }

  async function initForcast() {
    queryURLforcast =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      varCitySearch +
      "&units=imperial&appid=630f6b0a5dd5632e93ad38bae7f3f14b";
    var apiResponseForcast;
    function API() {
      return $.ajax({
        url: queryURLforcast,
        method: "GET",
      });
    }
    apiResponseForcast = await API();
    showForcastData(apiResponseForcast);
  }

  function showCityWeather(apiResponseHour) {
    $("#city-name").text(apiResponseHour.name);
    $("#humidity").text("humidity: " + apiResponseHour.main.humidity);
    $("#wind-speed").text("wind speed: " + apiResponseHour.wind.speed);
    lat = apiResponseHour.coord.lat;
    lon = apiResponseHour.coord.lon;
    initUv();
  }

  function showUVData(apiResponseUv) {
    $("#uv").text(apiResponseUv.value);
    $("#uv").attr("class", "bg-danger rounded p-1");
  }

  function showForcastData(apiResponseForcast) {
    var dailyW = apiResponseForcast.list;
    var dateStart;
    $("#tiles").empty();
    var date = new Date(dailyW[0].dt_txt);
    var varDate = date.toLocaleDateString();
    $("#date").text(varDate);
    for (let i = 0; i <= dailyW.length - 8; i = i + 8) {
      date = new Date(dailyW[i].dt_txt);
      varDate = date.toLocaleDateString();
      $("#tiles").append(
        '<div class="col-2-xs m-2 text-left p-2 rounded bg-primary"><p>' +
          varDate +
          '</p><p class="p-b-0"><img src="./images/' +
          dailyW[i].weather[0].icon +
          '@2x.png"></p><p>temp: ' +
          dailyW[i].main.temp +
          "</p><p>humidity: " +
          dailyW[i].main.humidity +
          "</p></div>"
      );
    }
  }

  const cityClick = (data) => {
    let cityQuery =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      data +
      "&appid=630f6b0a5dd5632e93ad38bae7f3f14b";
    varCitySearch = data;
    init(cityQuery);
  };

  // draw the cities list in the search window
  function drawCities() {
    if (localStorage.length > 0) {
      $("#city-input").val("");
      cityArray = JSON.parse(localStorage.getItem("city-list"));
      if (!cityArray.includes(varCitySearch.toLowerCase())) {
        cityArray.push(varCitySearch);
        localStorage.setItem("city-list", JSON.stringify(cityArray));
        // return;
      }
      $("#list-cities").empty();
      for (let i = 0; i < cityArray.length; i++) {
        let newP = $("<button></button>");
        let cityId = cityArray[i].replace(/ /g, "_");
        newP.text(cityId);
        newP.attr("class", "btn btn-primary p-2 m-1");
        newP.attr("id", cityId);
        $("#list-cities").append(newP);
        $("#" + cityId).on("click", () => {
          cityClick(cityArray[i]);
        });
      }
    } else {
      $("#city-input").val("");
      cityArray.push(varCitySearch);
      localStorage.setItem("city-list", JSON.stringify(cityArray));
      $("#list-cities").empty();
      for (let i = 0; i < cityArray.length; i++) {
        let newCity = $("<button></button>");
        let cityId = cityArray[i].replace(/ /g, "_");
        newCity.text(cityId);
        newCity.attr("class", "btn btn-primary p-2 m-1");
        newCity.attr("id", cityId);
        $("#list-cities").append(newCity);
        $("#" + cityId).on("click", () => {
          cityClick(cityArray[i]);
        });
      }
    }
  }

  function checkStorage() {
    if (localStorage.length === 0) {
      return false;
    } else {
      cityArray = JSON.parse(localStorage.getItem("city-list"));
      $("#list-cities").empty();
      for (let i = 0; i < cityArray.length; i++) {
        let newP = $("<button></button>");
        let cityId = cityArray[i].replace(/ /g, "_");
        cityChoice = cityArray[i];
        newP.text(cityId);
        newP.attr("class", "btn btn-primary p-2 m-1");
        newP.attr("id", cityId);
        $("#list-cities").append(newP);

        $("#" + cityId).on("click", () => {
          cityClick(cityArray[i]);
        });
      }
      return true;
    }
  }

  init(queryURL);
  checkStorage();

  $("#submit").on("click", function (event) {
    event.preventDefault();
    varCitySearch = $("#city-input").val();
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      varCitySearch +
      "&appid=630f6b0a5dd5632e93ad38bae7f3f14b";

    async function initI(queryURL) {
      var apiResponse;
      function API() {
        return $.ajax({
          url: queryURL,
          method: "GET",
        });
      }

      varCitySearch = $("#city-input").val();
      apiResponse = await API();
      init(queryURL);
      drawCities();
    }

    initI(queryURL);
  });
});
