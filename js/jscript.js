
$(function () {

  varCitySearch = "san leandro";
  var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + varCitySearch + '&appid=630f6b0a5dd5632e93ad38bae7f3f14b';
  let lat = "";
  let lon = "";
  var cityName;
  var cityList;
  var queryURLuV = "";
  var queryURLHourly = "";
  var cityArray = [];

  // const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  // console.log(event.toLocaleDateString(undefined, options));
  // expected output: Thursday, December 20, 2012 (varies according to default locale)

  async function init(queryURL) {
    var apiResponse;

    function API() {
      return $.ajax({
        url: queryURL,
        method: "GET"
      })
    }

    apiResponse = await API();
    showCityWeather(apiResponse);
    initUv();
    initForcast();
  }

  async function initUv() {
    queryURLuV = 'https://api.openweathermap.org/data/2.5/uvi?&units-imperial&appid=630f6b0a5dd5632e93ad38bae7f3f14b&lat=' + lat + '&lon=' + lon + '';

    var apiResponseUv;
    function API() {
      return $.ajax({
        url: queryURLuV,
        method: "GET"
      })
    }
    apiResponseUv = await API();
    showUVData(apiResponseUv);
  }

  async function initForcast() {
    queryURLforcast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + varCitySearch + '&units=imperial&appid=630f6b0a5dd5632e93ad38bae7f3f14b';
    var apiResponseForcast;
    function API() {
      return $.ajax({
        url: queryURLforcast,
        method: "GET"
      })
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
    console.log(lat);
    console.log(lon);
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


    // expected output: Thursday, December 20, 2012 (varies according to default locale)

    $("#date").text(dailyW[0].dt_txt);
    for (let i = 0; i <= dailyW.length - 8; i = i + 8) {

      var date = new Date(dailyW[i].dt_txt);
      var varDate = date.toLocaleDateString();

        $("#tiles").append(
          '<div class="col-2-xs m-2 text-left p-2 rounded bg-primary"><p>' + varDate + '</p><p class="p-b-0"><img src="./images/' + dailyW[i].weather[0].icon + '@2x.png"></p><p>temp: ' + dailyW[i].main.temp + '</p><p>humidity: ' + dailyW[i].main.humidity + '</p></div>'
        );
    }
  }

  // draw the cicties list in the search window
  function drawCities() {
    if (localStorage.length > 0) {
      $("#city-input").val("");
      cityArray = JSON.parse(localStorage.getItem("city-list"));
      cityArray.push(varCitySearch);
      localStorage.setItem("city-list", JSON.stringify(cityArray));
      $("#list-cities").empty();
      for (let i = 0; i < cityArray.length; i++) {
        var newP = $("<button></button>");
        newP.text(cityArray[i]);
        newP.attr("class", "btn btn-primary p-2 m-1");
        $("#list-cities").append(newP);
      }
    } else {
      cityArray.push(varCitySearch);
      localStorage.setItem("city-list", JSON.stringify(cityArray));
      $("#list-cities").empty();
      for (let i = 0; i < cityArray.length; i++) {
        var newP = $("<p></p>");
        newP.text(cityArray[i]);
        $("#list-cities").append(newP);
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
        var newP = $("<p></p>");
        newP.text(cityArray[i]);
        newP.attr("class", "p-2 m-1 bg-white");
        $("#list-cities").append(newP);
      }
      return true;
    }
  }

  init(queryURL);
  checkStorage();
  $("#submit").on("click", function (event) {
    varCitySearch = $("#city-input").val();
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + varCitySearch + '&appid=630f6b0a5dd5632e93ad38bae7f3f14b';
    async function initI(queryURL) {
      var apiResponse;
      function API() {
        return $.ajax({
          url: queryURL,
          method: "GET"
        })
      }
      varCitySearch = $("#city-input").val();
      apiResponse = await API();
      init(queryURL);
      drawCities();
    }
    initI(queryURL);
  })
}); 