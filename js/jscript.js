
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
    $("#date").text(dailyW[0].dt_txt);
    for (let i = 0; i <= dailyW.length - 8; i = i + 8) {
      dateStart = dailyW[i].dt_txt;
      dateStart = toString(dateStart);
      if (dateStart.search("00:00:00")) {
        $("#tiles").append(
          '<div class="col-2-xs m-2 text-left p-2 rounded bg-primary"><p>' + dailyW[i].dt_txt + '</p><p><img src="./images/' + dailyW[i].weather[0].icon + '@2x.png"></p><p>temp: ' + dailyW[i].main.temp + '</p><p>humidity: ' + dailyW[i].main.humidity + '</p></div>'
        );
      }
    }
  }

  // data section
  // function storeData() {
  //   if (JSON.parse(localStorage.getItem("city-list"))) {
  //     cityArray = JSON.parse(localStorage.getItem("city-list"));
  //     cityArray.push(varCitySearch);
  //     localStorage.setItem("city-list", JSON.stringify(cityArray));
  //   } else
  //     console.log(cityArray + " ...cityArray|storeData");
  //   drawCities();
  // }

  function drawCities() {
    console.log(cityArray + " --before");
    if (localStorage.length > 0) {
      console.log("draw cities - if");
      cityArray = JSON.parse(localStorage.getItem("city-list"));
      cityArray.push(varCitySearch);
      localStorage.setItem("city-list", JSON.stringify(cityArray));
      var newP = $("<p></p>");
      for (let i = 0; i < cityArray.length; i++) {
        newP.text(cityArray[i]);
        newP.attr("class", "p-2 m-1 bg-white");
        $("#list-cities").append(newP);
      }
    } else {
      console.log("draw cities - else");
      cityArray.push(varCitySearch);
      localStorage.setItem("city-list", JSON.stringify(cityArray));
      var newP = $("<p></p>");
      for (let i = 0; i < cityArray.length; i++) {
        newP.text(cityArray[i]);
        console.log(cityArray[i]);
        $("#list-cities").append(newP);
      }
    }
    console.log(cityArray + " --after");
  }
  // function getStorage() {
  // if (JSON.parse(localStorage.getItem("city-list"))) {
  // cityArray = JSON.parse(localStorage.getItem("city-list"))
  // cityArray.push(varCitySearch);
  // localStorage.setItem("city-list", JSON.stringify(cityArray));
  // console.log(cityArray);
  // }
  // console.log(cityArray + " ... getStorage - 124");
  // }

  function checkStorage() {
    if (localStorage.length === 0) {
      return false;
    } else {
      cityArray = JSON.parse(localStorage.getItem("city-list"));
      var newP = $("<p></p>");
      for (let i = 0; i < cityArray.length; i++) {
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