var STOCKS = ['IWD', 'IWF'];
var DEFAULT_LOCATION = {
		coords: {
        latitude: 38.8942345,
        longitude: -77.0295696
      }
	}

var API_KEYS = {
	openweathermap: 'b2f350cd6c8d249908dd100bba6c6e7c'
};

function ready(fn) {
	if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

function getLocationAndUpdateWeather() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(loadLocalWeather, noLocationAvailable);
  } else {
    loadLocalWeather({
      coords: {
        latitude: 38.8942345,
        longitude: -77.0295696
      }
    });
  }
}

function loadLocalWeather(position)	{
	var request = new XMLHttpRequest();
	request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=' + API_KEYS.openweathermap, true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
		var data = JSON.parse(request.responseText);
		applyWeather(data);
	  } else {
		console.log(request.responseText);

	  }
	};

	request.onerror = function() {
	  // There was a connection error of some sort
	};

	request.send();
}

function loadStocks(symbols) {
	var request = new XMLHttpRequest();

	var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22' + symbols.join(',') + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='

	request.open('GET', url, true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
		var data = JSON.parse(request.responseText);
		var stocks = data.query.results.quote;
		if(Array.isArray(stocks)) {
			for(var i = 0; i < stocks.length; i++) {
				createStockItem(stocks[i], 'stocks');
			}
		}
	  } else {
		console.log(request.responseText);

	  }
	};

	request.onerror = function() {
	  // There was a connection error of some sort
	};

	request.send();
}

function setUpStocks() {
	document.getElementById('stocks').style.display = 'none';
	document.getElementById('stocks-button').addEventListener('click', function() {
		if(document.getElementById('stocks').style.display == 'none') {
			document.getElementById('stocks').style.display = 'block';
		} else {
			document.getElementById('stocks').style.display = 'none';
		}
	});
}

function createStockItem(stock, id) {
	var div = document.createElement('div');
	div.setAttribute('class', 'stock');

	// Symbol
	var sym = document.createElement('span');
	sym.setAttribute('class', 'stock-symbol');
	sym.textContent = stock.symbol;
	
	// Price
	var price = document.createElement('span');
	price.setAttribute('class', 'stock-price');
	price.textContent = stock.LastTradePriceOnly;
	
	// Change
	var change = document.createElement('span');
	change.setAttribute('class', 'stock-change ' + (stock.Change < 0 ? 'negative' : 'positive'));
	change.textContent = '(' + (stock.Change < 0 ? stock.Change : '+' + stock.Change) + ')';
	
	div.appendChild(sym);
	div.appendChild(price);
	div.appendChild(change);
	document.getElementById(id).appendChild(div);
}

function noLocationAvailable(error) {
	console.log(error);
	loadLocalWeather(DEFAULT_LOCATION);
}
	
function applyWeather(data) {
	
	document.getElementById('condition').textContent = data.weather[0].description;
	document.getElementById('temperature').innerHTML = Math.round((data.main.temp * 9 / 5) - 459.67, 0) + "&deg;";
	document.getElementById('icon').setAttribute('class', 'wi wi-owm-' + data.weather[0].id);
	document.getElementById('location').textContent = data.name;
	
	var image = getBackgroundImage(data.weather[0].id);
	document.getElementById('main-wrap').style.backgroundImage = 'url(assets/images/s2048/' + image + ')';
}

function getBackgroundImage(condition) {
	var photo_id = 'clear';
	
	/* See https://openweathermap.org/weather-conditions
	 * for the guide to Open Weather Map's conditions. */
	
	if(condition >= 200 && condition < 300) // Thunderstorms
		photo_id = 'lightning';
	if(condition >= 300 && condition < 400) // Drizzle
		photo_id = 'rain';
	if(condition >= 500 && condition < 600) // Rain
		photo_id = 'rain';
	if((condition > 501 && condition < 520) || (condition > 521 && condition < 531) || (condition >= 958 && condition <= 961)) // Heavy rain
		photo_id = 'heavyrain';
	if(condition >= 600 && condition < 700) // Snow
		photo_id = 'snow';
	if(condition == 600 || condition == 615 || condition == 620) // Light snow
		photo_id = 'flurries';
	if(condition == 711 || condition == 721 || condition == 731) // Smoke, haze, or sand
		photo_id = 'haze';
	if(condition == 701 || condition == 741) // Fog
		photo_id = 'foggy';
	if(condition == 801 || condition == 802) // Few clouds
		photo_id = 'fewclouds';
	if(condition == 803) // Some clouds
		photo_id = 'partlycloudy';
	if(condition == 804)
		photo_id = 'cloudy';
	
	return 'day-' + photo_id + '-01.jpg';
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function vertHoriz() {
	var ratio = window.innerWidth / window.innerHeight;
	console.log(ratio);
}

function setUp() {
	getLocationAndUpdateWeather();
	setUpStocks();
	loadStocks(STOCKS);
}

ready(setUp);
