/* Global Variables */
var STOCKS = ['IWD', 'IWF', '^IXIC', '^GSPC', 'ES=F'];
var DEFAULT_LOCATION = {
		coords: {
        latitude: 38.8942345,
        longitude: -77.0295696
      }
	}

var API_KEYS = {
	openweathermap: 'b2f350cd6c8d249908dd100bba6c6e7c'
};

/* Function: ready
 * ---------------
 * Launches function when the web page has loaded, so
 * that the function has access to the entire DOM.
 * See: http://youmightnotneedjquery.com/
 *
 * @param fn: The function to executed on page load.
 */
function ready(fn) {
	if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

function getLocationAndUpdateWeather() {
	document.getElementById('weather-button').addEventListener('click', function() {
		fadeToggle(document.getElementById('weather-info'));
		return false;
	});
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(loadLocalWeather, noLocationAvailable);
  } else {
    loadLocalWeather(DEFAULT_LOCATION);
  }
}

function loadLocalWeather(position)	{
	var request = new XMLHttpRequest();
	request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=' + API_KEYS.openweathermap, true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
		var data = JSON.parse(request.responseText);
		applyWeather(data);
		logUpdate("Weather updated from OpenWeatherMap.");
	  } else {
		logUpdate("Unable to reach OpenWeatherMap API. " + responseText);
	  }
	};

	request.onerror = function() {
	  logUpdate("Unable to reach OpenWeatherMap API. " + responseText);
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
		logUpdate("Stocks updated from Yahoo.");
	  } else {
		logUpdate("Unable to reach Yahoo Stocks API. " + responseText);
	  }
	};

	request.onerror = function() {
	  logUpdate("There was an error reaching the Yahoo Stocks API.");
	};

	request.send();
	
	
}

function setUpStocks() {
	document.getElementById('stocks').style.opacity = 0;
	document.getElementById('stocks-button').addEventListener('click', function() {
		fadeToggle(document.getElementById('stocks'));
		return false;
	});
	loadStocks(STOCKS);
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
	price.textContent = decimalPlaces(stock.LastTradePriceOnly, 2);
	
	// Change
	var change = document.createElement('span');
	var c = stock.Change;
	if(stock.Change == null)
		c = (stock.LastTradePriceOnly - stock.PreviousClose);
	c = decimalPlaces(c, 2);
	change.setAttribute('class', 'stock-change ' + (c < 0 ? 'negative' : 'positive'));
	change.textContent = '(' + (c < 0 ? '' : '+') + c + ')';
	
	div.appendChild(sym);
	div.appendChild(price);
	div.appendChild(change);
	document.getElementById(id).appendChild(div);
}

function decimalPlaces(n, places) {
	n = +n;
	
	n = Math.round(n * Math.pow(10, places)) / Math.pow(10, places);
	
	n = 'a' + n;
	if(n.indexOf('.') == -1) {
		n = n + '.';
	}
	
	n = n.split('.');
	
	var diff = places - n[1].length;
	
	for(var i = 0; i < diff; i++) {
		n[1] += '0';
	}
	
	n[0] = n[0].substring(1);
	n = n.join('.');
	
	return n;
}

function noLocationAvailable(error) {
	logUpdate('Location issue: ' + error.message);
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

/* Function: setUpNews
 * -------------------
 *
 */
function setUpNews() {
	document.getElementById('news').style.opacity = 0;
	document.getElementById('news-button').addEventListener('click', function() {
		fadeToggle(document.getElementById('news'));
		return false;
	});
	//updateGuardianHeadlines('us-news', '#us');
	//updateGuardianHeadlines('world', '#world');
	updateNYTHeadlines('#news');
}

function fadeToggle(el) {
	if(el.style.opacity == 0 && el.style.opacity != "") {
		fadeIn(el);
	} else {
		fadeOut(el);
	}
	return false;
}

function fadeIn(el) {
  el.style.opacity = 0;
  el.style.display = 'block';

  var tick = function() {
    el.style.opacity = +el.style.opacity + 0.02;

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 10)
    }
  };

  tick();
}

function fadeOut(el) {
  el.style.opacity = 1;

  var tick = function() {
    el.style.opacity = +el.style.opacity - 0.02;

    if (+el.style.opacity > 0) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 10)
    } else {
		el.style.display = 'none';
	}
  };

  tick();
}

/* Function: updateNYTHeadlines
 * ----------------------------
 * Updates news from the New York Times.
 *
 * @param wrapper: The DOM element in which to place the
 * articles from this section.
 */
function updateNYTHeadlines(wrapper, max_stories = 10) {
	var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
	url += '?api-key=a300a0adf8fa418f903e7cbd2355a805';
	
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.onload = function() {
		if(request.status >= 200 && request.status < 400) {
			var data = JSON.parse(request.responseText);
			var headlines = data.results;

			// Remove current articles from the DOM
			var current_articles = document.querySelector(wrapper).querySelectorAll("a.article");
			for(var i = 0; i < current_articles.length; i++) {
				current_articles[i].parentNode.removeChild(current_articles[i]);
			}

			// Add new articles to the DOM
			var added = 0;
			for(var i = 0; (i < headlines.length && added < max_stories); i++) {
				var article = headlines[i];
				var link = document.createElement('a');
				link.setAttribute('class', 'article');
				link.innerHTML = article.title;
				link.setAttribute('href', article.url);
				link.setAttribute('target', '_blank');
				document.querySelector(wrapper).appendChild(link);
				added++;
			}
			
			logUpdate("News updated from the New York Times.");
		} else {
			logUpdate("The New York Times API returned an error. News not updated.");
		}
	};

	request.onerror = function() {
		logUpdate("Unable to reach the New York Times website.");
	}

	request.send();
	return true;
}

/* Function: updateGuardianHeadlines
 * ---------------------------------
 * Updates news from the Guardian.
 *
 * @param section: The Guardian section to get
 * news from. Options are:
 *  - us-news
 *  - world
 *  - football
 *  - sports
 *  - politics
 *  - commentisfree
 *  - culture
 *  - lifeandstyle
 *  - fashion
 *  - business
 *  - travel
 *  - environment
 * @param wrapper: The DOM element in which to place the
 * articles from this section.
 */
 function updateGuardianHeadlines(section, wrapper, max_headlines = 5) {
   var request = new XMLHttpRequest();
   request.open('GET', "https://content.guardianapis.com/search?section=" + section + "&api-key=5d33b608-c47b-4f64-99c3-59c8deb3c857", true);
   request.onload = function() {
     if(request.status >= 200 && request.status < 400) {
       var data = JSON.parse(request.responseText);
       var headlines = data.response.results;

       // Remove current articles from the DOM
       var current_articles = document.querySelector(wrapper).querySelectorAll("a.article");
       for(var i = 0; i < current_articles.length; i++) {
         current_articles[i].parentNode.removeChild(current_articles[i]);
       }

       // Add new articles to the DOM
       var added = 0;
       for(var i = 0; (i < headlines.length && added < max_headlines); i++) {
         var article = headlines[i];
         if(article.type == 'article') {
           var link = document.createElement('a');
           link.setAttribute('class', 'article');
           link.innerHTML = article.webTitle;
           link.setAttribute('href', article.webUrl);
           link.setAttribute('target', '_blank');
           document.querySelector(wrapper).appendChild(link);
           added++;
         }
       }
       logUpdate("News updated from The Guardian.");
     } else {
       logUpdate("The Guardian API returned an error. News not updated.");
     }
   };

   request.onerror = function() {
     logUpdate("Unable to reach The Guardian website.");
   }

   request.send();
   return true;
 }
 
 /* Function: logUpdate
 * -------------------
 * Passes an update message to the log. Currently uses console.log, but could
 * easily be modified to pass the message anywhere. Adds a timestamp.
 *
 * @param msg: The message to send to the log
 */
function logUpdate(msg) {
  d = new Date();
  console.log(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " "
    + d.getHours() + ":" + (d.getMinutes() < 10 ? "0"
    + d.getMinutes() : d.getMinutes()) + ": " + msg);
}

function setUp() {
	getLocationAndUpdateWeather();
	setUpStocks();
	setUpNews();
}

ready(setUp);
