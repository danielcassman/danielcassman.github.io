/* Global Variables */
var STOCKS = ['IWD', 'IWF', '^IXIC', '^GSPC', 'ES=F'];
var DEFAULT_LOCATION = {
	coords: {
      latitude: 38.8942345,
      longitude: -77.0295696
    }
}
WEATHER_UPDATE = 90000;
STOCKS_UPDATE = 300000;
NEWS_UPDATE = 600000;

var URLS = {
	weather: 'https://www.wunderground.com/',
	stocks: 'https://finance.yahoo.com/portfolio/pf_1/view/v1?bypass=true'
}

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

/* Function: setUpWeather
 * ----------------------
 * Sets up the click listener for the weather toggle,
 * then gets the current position and weather and adds
 * it to the DOM.
 */
function setUpWeather() {
	document.getElementById('weather-button').addEventListener('click', function() {
		fadeToggle(document.getElementById('weather-info'));
		return false;
	});

	document.getElementById('weather-info').addEventListener('click', function() {
		window.open(URLS.weather);
		return false;
	});

	getLocationAndUpdateWeather();
}

/* Function: getLocationAndUpdateWeather
 * -------------------------------------
 * Gets the current position, then grabs the weather from
 * OpenWeatherMap, then adds it to the DOM.
 */
function getLocationAndUpdateWeather() {
	var query = parse_query_string(window.location.search.substring(1));
	if(query.location == 'default') {
		console.log("Default location selected, using that.")
		loadLocalWeatherWunderground(DEFAULT_LOCATION);
	} else if(query.latitude && query.longitude &&
			(query.latitude >= -90 && query.latitude <= 90) &&
		 	(query.longitude >= -180 && query.longitude <= 180)) {
		loadLocalWeatherWunderground({
			coords: {
				latitude: query.latitude,
				longitude: query.longitude
			}
		});
}	else {
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(loadLocalWeatherWunderground, noLocationAvailable);
		} else {
			loadLocalWeather(DEFAULT_LOCATION);
		}
	}
}

/* Function: loadLocalWeatherWunderground
 * --------------------------------------
 * Gets the current weather from Weather Underground, then
 * adds it to the DOM.
 *
 * @param position: A position object, as defined by
 * navigator.geolocation.
 */
function loadLocalWeatherWunderground(position, update)	{
	position = (typeof position !== 'undefined') ?  position : DEFAULT_LOCATION;
	update = (typeof update !== 'undefined') ?  update : WEATHER_UPDATE;

	var request = new XMLHttpRequest();
	url = 'http://danielcassman.com/start/api-wrappers/wunderground.php?lat='
	 + position.coords.latitude + '&lng=' + position.coords.longitude;
	request.open('GET', url, true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
		var data = JSON.parse(request.responseText);
		applyWeatherWunderground(data);
		logUpdate("Weather updated from Wunderground.");
	  } else {
		logUpdate("Unable to reach Wunderground API. " + responseText);
	  }
	};

	request.onerror = function() {
	  logUpdate("Unable to reach Wunderground API. " + responseText);
	};

	request.send();

	if(update) {
		setTimeout(function() {
			loadLocalWeatherWunderground(position);
		}, update);
	}
}

/* Function: applyWeatherWunderground
 * ----------------------------------
 * Sets up the weather panel with the given conditions.
 *
 * @param data: The data returned by the OpenWeatherMap API.
 */
function applyWeatherWunderground(data) {

	document.getElementById('condition').textContent = data.current_observation.weather;
	document.getElementById('temperature').innerHTML = Math.round(data.current_observation.temp_f) + "&deg;";
	document.getElementById('icon').setAttribute('class', 'wi wi-wu-' + data.current_observation.icon);
	document.getElementById('location').textContent = data.current_observation.display_location.full;

	var image = getBackgroundImageWunderground(data.current_observation.icon, data.sun_phase);
	document.getElementById('main-wrap').style.backgroundImage = 'url(assets/images/s2048/' + image + ')';
}

/* Function: loadLocalWeather
 * --------------------------
 * Gets the current weather from OpenWeatherMap, then
 * adds it to the DOM.
 *
 * @param position: A position object, as defined by
 * navigator.geolocation.
 */
function loadLocalWeather(position, update)	{
	position = (typeof position !== 'undefined') ?  position : DEFAULT_LOCATION;
	update = (typeof update !== 'undefined') ?  update : WEATHER_UPDATE;

	var request = new XMLHttpRequest();
	url = 'https://api.openweathermap.org/data/2.5/weather?lat='
	 + position.coords.latitude + '&lon=' + position.coords.longitude
	 + '&appid=b2f350cd6c8d249908dd100bba6c6e7c';
	request.open('GET', url, true);

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

	if(update) {
		setTimeout(function() {
			loadLocalWeather(position);
		}, update);
	}
}

/* Function: noLocationAvailable
 * -----------------------------
 * Handles an error situation when no location information is
 * available by loading weather information from the default
 * location.
 *
 * @param error: The error message to display.
 */
function noLocationAvailable(error) {
	logUpdate('Location issue: ' + error.message);
	loadLocalWeatherWunderground(DEFAULT_LOCATION);
}

/* Function: applyWeather
 * ----------------------
 * Sets up the weather panel with the given conditions.
 *
 * @param data: The data returned by the OpenWeatherMap API.
 */
function applyWeather(data) {

	document.getElementById('condition').textContent = data.weather[0].description;
	document.getElementById('temperature').innerHTML = Math.round((data.main.temp * 9 / 5) - 459.67, 0) + "&deg;";
	document.getElementById('icon').setAttribute('class', 'wi wi-owm-' + data.weather[0].id);
	document.getElementById('location').textContent = data.name;

	var image = getBackgroundImage(data.weather[0].id, data.sys);
	document.getElementById('main-wrap').style.backgroundImage = 'url(assets/images/s2048/' + image + ')';
}

/* Function: getBackgroundImageWunderground
 * ----------------------------------------
 * Sets the page background image based on the current weather
 * conditions.
 *
 * @param condition: The Weather Underground condition ID. For more,
 * see: https://openweathermap.org/weather-conditions
 */
function getBackgroundImageWunderground(condition, sys) {
	var photo_id = 'clear';

	if(condition == 'tstorms' || condition == 'chancetstorms') // Thunderstorms
		photo_id = 'lightning';
	if(condition == 'chancerain' || condition == 'chancesleat') // Drizzle
		photo_id = 'rain';
	if(condition == 'rain' || condition == 'sleat') // Rain
		photo_id = 'rain';
	if(condition == 'snow') // Snow
		photo_id = 'snow';
	if(condition == 'chancesnow' || condition == 'flurries') // Light snow
		photo_id = 'flurries';
	if(condition == 'hazy') // Fog
		photo_id = 'foggy';
	if(condition == 'partlysunny' || 'mostlysunny') // Few clouds
		photo_id = 'fewclouds';
	if(condition == 'partlycloudy' || 'mostlycoudy') // Some clouds
		photo_id = 'partlycloudy';
	if(condition == 'cloudy')
		photo_id = 'cloudy';

	var d = new Date();
	var hours = d.getHours();
	var minutes = d.getMinutes();
	
	var dn = 'night';
	
	if((hours > sys.sunrise.hour || (hours == sys.sunrise.hour && minutes > sys.sunrise.hour)) &&
	   (hours < sys.sunset.hour || (hours == sys.sunset.hour && minutes <= sys.sunset.hour)))
	   dn = 'day';
	
	return (dn + '-' + photo_id + '-01.jpg');
}

/* Function: getBackgroundImage
 * ----------------------------
 * Sets the page background image based on the current weather
 * conditions.
 *
 * @param condition: The OpenWeatherMap condition ID. For more,
 * see: https://openweathermap.org/weather-conditions
 */
function getBackgroundImage(condition, sys) {
	var photo_id = 'clear';

	if(condition >= 200 && condition < 300) // Thunderstorms
		photo_id = 'lightning';
	if(condition >= 300 && condition < 400) // Drizzle
		photo_id = 'rain';
	if(condition >= 500 && condition < 600) // Rain
		photo_id = 'rain';
	if((condition > 501 && condition < 520) ||
	 (condition > 521 && condition < 531) ||
	 (condition >= 958 && condition <= 961)) // Heavy rain
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

	var d = new Date();
	var UTC_seconds = Math.floor(d.getTime() / 1000);

	return ((UTC_seconds > sys.sunrise && UTC_seconds < sys.sunset) ?
	 'day' : 'night')
	 + '-' + photo_id + '-01.jpg';
}

/* Function: setUpStocks
 * ---------------------
 * Sets up the stocks pane and click listener, then
 * loads the stock information.
 *
 */
function setUpStocks() {
	document.getElementById('stocks').style.opacity = 0;
	document.getElementById('stocks-button').addEventListener('click', function() {
		fadeToggle(document.getElementById('stocks'));
		return false;
	});

	document.getElementById('stocks').addEventListener('click', function() {
		window.open(URLS.stocks);
		return false;
	});

	loadStocks(STOCKS, '#stocks', STOCKS_UPDATE);
}

/* Function: loadStocks
 * --------------------
 * Loads the stock market data and creates DOM elements
 * in the stocks pane.
 *
 * @param symbols: An array of stock symbols to load.
 * @param wrapper: The DOM element to place the stock
 * information in.
 */
function loadStocks(symbols, wrapper, update) {
	stocks = (typeof stocks !== 'undefined') ?  stocks : STOCKS;
	wrapper = (typeof update !== 'undefined') ?  wrapper : '#stocks';
	update = (typeof update !== 'undefined') ?  update : false;

	var request = new XMLHttpRequest();

	var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22'
	 + symbols.join(',') + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback='

	request.open('GET', url, true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
		var data = JSON.parse(request.responseText);
		var stocks = data.query.results.quote;
		if(Array.isArray(stocks)) {
			// Remove current stocks from the DOM
			var current_stocks = document.querySelector(wrapper).querySelectorAll("div.stock");
			for(var i = 0; i < current_stocks.length; i++) {
				current_stocks[i].parentNode.removeChild(current_stocks[i]);
			}

			for(var i = 0; i < stocks.length; i++) {
				createStockItem(stocks[i], wrapper);
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

	if(update) {
		setTimeout(function() {
			loadStocks(symbols, wrapper, update);
		}, update);
	}
}

/* Function: createStockItem
 * -------------------------
 * Handles an error situation when no location information is
 * available by loading weather information from the default
 * location.
 *
 * @param error: The error message to display.
 */
function createStockItem(stock, wrapper) {
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
	document.querySelector(wrapper).appendChild(div);
}

/* Function: setUpNews
 * -------------------
 * Sets up the news wrapper, click action, and loads the news.
 */
function setUpNews(source) {
	update = (typeof source !== 'undefined') ?  source : 'NYT';

	document.getElementById('news').style.opacity = 0;
	document.getElementById('news-button').addEventListener('click', function() {
		fadeToggle(document.getElementById('news'));
		return false;
	});
	if(source == 'Guardian') {
		updateGuardianHeadlines('us-news', '#us');
		updateGuardianHeadlines('world', '#world');
	}
	updateNYTHeadlines('#nyt', 12, NEWS_UPDATE);
}

/* Function: updateNYTHeadlines
 * ----------------------------
 * Updates news from the New York Times.
 *
 * @param wrapper: The DOM element in which to place the
 * articles from this section.
 */
function updateNYTHeadlines(wrapper, max_stories, update) {
	max_stories = (typeof max_stories !== 'undefined') ?  max_stories : 10;
	update = (typeof update !== 'undefined') ?  update : false;

	var url = "http://danielcassman.com/start/api-wrappers/nytimes.php";

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

	if(update) {
		setTimeout(function() {
			updateNYTHeadlines(wrapper, max_stories, update);
		}, update);
	}
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
 function updateGuardianHeadlines(section, wrapper, max_headlines) {
	max_headlines = (typeof max_headlines !== 'undefined') ?  max_headlines : 5;

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
 }

/* Function: fadeToggle
 * --------------------
 * Fades an element in if it is invisible, fades an element out
 * if it's visible.
 *
 * @param el: the DOM element to fade in or out.
 */
function fadeToggle(el) {
	if(el.style.opacity == 0 && el.style.opacity != "") {
		fadeIn(el);
	} else {
		fadeOut(el);
	}
}

/* Function: fadeIn
 * ----------------
 * Fades an element in.
 *
 * @param el: the DOM element to fade in.
 * @param rate: how quickly to iterate the fade (in ms).
 * @param amount: the amount to change the opacity each iteration (0-1)
 */
function fadeIn(el, rate, amount) {
	rate = (typeof rate !== 'undefined') ?  rate : 16;
	amount = (typeof amount !== 'undefined') ?  amount : 0.05;

	el.style.opacity = 0;
	el.style.display = 'block';

	var tick = function() {
		el.style.opacity = +el.style.opacity + amount;

		if (+el.style.opacity < 1) {
			(window.requestAnimationFrame && requestAnimationFrame(tick))
			 || setTimeout(tick, rate)
		}
	};

	tick();
}

/* Function: fadeOut
 * -----------------
 * Fades an element out.
 *
 * @param el: the DOM element to fade out.
 * @param rate: how quickly to iterate the fade (in ms).
 * @param amount: the amount to change the opacity each iteration (0-1)
 */
function fadeOut(el, rate, amount) {
	rate = (typeof rate !== 'undefined') ?  rate : 16;
	amount = (typeof amount !== 'undefined') ?  amount : 0.05;

	el.style.opacity = 1;

	var tick = function() {
		el.style.opacity = +el.style.opacity - amount;

		if (+el.style.opacity > 0) {
			(window.requestAnimationFrame && requestAnimationFrame(tick))
			 || setTimeout(tick, rate)
		} else {
			el.style.display = 'none';
		}
	};

	tick();
}

/* Function: decimalPlaces
 * -----------------------
 * Rounds a number to a certain number of decimal places,
 * always producing that number of decimals by adding zeroes
 * if necessary.
 *
 * @param n: The number to round.
 * @param places: The number of decimal places
 *
 * @return: The number with the specified number of decimal places.
 */
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

/* Function parse_query_string
 * ---------------------------
 * Parses a string of GET queries--key/value pairs denoted by '=' and
 * separated by '&'--into an object of key/value pairs.
 */
function parse_query_string(query) {
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}

/* Function: setUp
 * ---------------
 * Sets up the page by adding weather, stocks, and news.
 */
function setUp() {
	setUpWeather();
	setUpStocks();
	setUpNews();
}

ready(setUp); // Run setUp when the DOM is ready
