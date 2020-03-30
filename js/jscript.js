
$(function () {

  varCitySearch = "san leandro";
  var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + varCitySearch + '&appid=630f6b0a5dd5632e93ad38bae7f3f14b';
  let lat = "";
  let lon = "";
  var cityName;
  var queryURLuV = "";
  var queryURLHourly = "";

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
    $("#uv").attr("class", "bg-danger");
  }

  function showForcastData(apiResponseForcast) {
    console.log("--------- forcast data");
    console.log(apiResponseForcast.city.name);
    console.log(apiResponseForcast);
    // stuff the dailyW variable full of the daily forcast data
    var dailyW = apiResponseForcast.list;
    var dateStart;
    $("#tiles").empty();
    $("#date").text(dailyW[0].dt_txt);
    for (let i = 1; i <= 25; i++) {
      dateStart = dailyW[i].dt_txt;
      // console.log(dateStart + " ....");
      dateStart = toString(dateStart);
      if (dateStart.search("00:00:00")) {
        // console.log(dateStart);
        $("#tiles").append(
          '<div class="col-2-xs m-2 text-left p-2 rounded bg-primary"><p>' + dailyW[i].dt_txt + '</p><p><img src="./images/' + dailyW[i].weather[0].icon + '@2x.png"></p><p>temp: ' + dailyW[i].main.temp +  '</p><p>humidity: ' + dailyW[i].main.humidity + '</p></div>'
        );
      }
    }
  }

  init(queryURL);

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
      apiResponse = await API();
      init(queryURL);
    }
    initI(queryURL);
  })

  console.log(lat + " ..");
  console.log(lon + " ..");

}); 