varCitySearch = "san leandro";
var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + varCitySearch + '&appid=630f6b0a5dd5632e93ad38bae7f3f14b';
let lat = "";
let lon = "";
var cityName;
var queryURLuV = "";
var queryURLHourly = "";

async function init() {
  var apiResponse;
  function API() {
    return $.ajax({
      url: queryURL,
      method: "GET"
    })
  }
  apiResponse = await API();
  showData(apiResponse);
}

init()
initHourly()

async function initUv() {
  queryURLuV = 'https://api.openweathermap.org/data/2.5/uvi?appid=630f6b0a5dd5632e93ad38bae7f3f14b&lat=' + lat + '&lon=' + lon + '';
  var apiResponseUv;
  function API() {
    return $.ajax({
      url: queryURLuV,
      method: "GET"
    })
  }
  apiResponseUv = await API();
  showDataUv(apiResponseUv);
}

async function initHourly() {
  queryURLHourly = 'https://api.openweathermap.org/data/2.5/weather?q=' + varCitySearch + '&appid=630f6b0a5dd5632e93ad38bae7f3f14b';
  var apiResponseHour;
  function API() {
    return $.ajax({
      url: queryURLHourly,
      method: "GET"
    })
  }
  apiResponseHour = await API();
  showDataHour(apiResponseHour);
}

function showDataHour(apiResponseHour) {
  console.log("--------- hourly data");
  console.log(apiResponseHour);
  $("#city-name").text(apiResponseHour.name);
  $("#humidity").text("humidity: " + apiResponseHour.main.humidity);
  $("#wind-speed").text("wind speed: " + apiResponseHour.wind.speed);
}

function showData(apiResponse) {
  console.log("--------- forcast data");
  console.log(apiResponse);
  var dailyW = apiResponse.list;

  $("#date").text(dailyW[0].dt_txt);
  for (let i = 1; i <= 25; i++) {
    $("#tiles").append(
      '<div class="col-2-xs text-left p-2"><p>' + dailyW[i].dt_txt + '</p><p>weather: ' + dailyW[i].weather[0].main + '</p><p>temp: ' + dailyW[i].main.temp + '</p><p>humidity: ' + dailyW[i].main.humidity + '</p></div>'
    );
  }
  lat = apiResponse.city.coord.lat;
  lon = apiResponse.city.coord.lon;
  initUv();
}

console.log(lat + " ..");
console.log(lon + " ..");

function showDataUv(apiResponseUv) {
  console.log("---------------------- uv");
  console.log(apiResponseUv);
  $("#uv").text("uv index: " + apiResponseUv.value);
}