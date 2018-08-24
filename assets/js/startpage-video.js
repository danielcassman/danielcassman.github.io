/* Global Variables */
var STOCKS = ['INX','DJI','IXIC'];
var STOCKSIEX = ["DIA","QQQ","SPY",'IWD','IWF','IEFA'];
var DEFAULT_LOCATION = {
	coords: {
      latitude: 38.8942345,
      longitude: -77.0295696
    }
}
WEATHER_UPDATE = 600000;
STOCKS_UPDATE = 60000;
NEWS_UPDATE = 600000;
OPM_UPDATE = 600000;

var URLS = {
	weather: 'https://www.wunderground.com/',
	stocks: 'https://finance.yahoo.com/portfolio/pf_1/view/v1?bypass=true'
}

var VIDEOS = {
	day: {
		partlycloudy: [
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b3-2.mov', //New York
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/comp_C007_C011_08244D_001_v01_6M_HB_tag0.mov', //China
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/comp_HK_H004_C010_4k_v01_6Mbps.mov', //Hong Kong
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b1-1.mov', //Hawaii
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b1-3.mov', //New York
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b2-2.mov' //Hawaii
		],
		mostlycloudy: [
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/comp_GL_G004_C010_v03_6Mbps.mov', //Greenland
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/comp_HK_H004_C008_v10_6Mbps.mov', //Hong Kong
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b1-2.mov', //London
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b2-4.mov', //San Francisco
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b6-1.mov', //China
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b9-3.mov' //San Francisco
		],
		cloudy: [
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b4-1.mov', //Hawaii
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b7-1.mov' //Hawaii
		],
		clear: [
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/plate_G002_C002_BG_t9_6M_HB_tag0.mov', //Greenland
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/comp_DB_D001_C001_v03_6Mbps.mov', //Dubai (down)
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/comp_LA_A008_C004_ALT_v33_6Mbps.mov', //Los Angeles (Beach)
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/comp_C007_C004_0824AJ_001_v01_6M_HB_tag0.mov', //China
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/comp_DB_D001_C005_t9_6M_HB_tag0.mov', //Dubai
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/comp_HK_H004_C013_t9_6M_HB_tag0.mov', //Hong Kong
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b3-3.mov', //San Francisco
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b6-3.mov', //London
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b8-2.mov', //San Francisco
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b8-3.mov' //San Francisco
		],
		haze: [
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/comp_DB_D002_C003_t9_6M_HB_tag0.mov', //Dubai
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b2-1.mov', //China
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b5-1.mov', //China
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b7-3.mov' //San Francisco
		],
		fog: [
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b4-3.mov', //San Francisco (clear)
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b10-3.mov' //San Francisco
		]
	},
	night: {
		partlycloudy: [
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b1-4.mov', //San Francisco
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b3-1.mov', //London
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/comp_GL_G010_C006_v08_6Mbps.mov', //Greenland
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b3-1.mov', //London
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b6-2.mov' //Hawaii
		],
		mostlycloudy: [
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b5-1.mov' //San Francisco
		],
		clear: [
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/comp_DB_D011_D009_SIGNCMP_v15_6Mbps.mov', //Dubai
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b2-3.mov', //New York (down)
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b4-2.mov', //New York
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/b6-4.mov' //San Francisco
		],
		cloudy: [
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/comp_HK_B005_C011_t9_6M_tag0.mov', //Hong Kong
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/comp_DB_D011_C010_v10_6Mbps.mov' //Dubai
		],
		haze: [
			'http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/comp_LA_A009_C009_t9_6M_tag0.mov' //Los Angeles
		]
	}
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
		console.log("Default location selected, using that.");
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
	url = 'https://api.wunderground.com/api/1efe8d448f60837d/conditions/forecast/astronomy/q/' +
	 + position.coords.latitude + ',' + position.coords.longitude + '.json';
	request.open('GET', url, true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
		var data = JSON.parse(request.responseText);
		applyWeatherWunderground(data);
		// logUpdate("Weather updated from Wunderground.");
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
	
	var video = getBackgroundVideoWunderground(data.current_observation.icon, data.sun_phase);
	if(video) {
		var v = document.getElementById('background-video');
		if(v)
			document.getElementById('background-video').parentElement.removeChild(document.getElementById('background-video'));
		v = document.createElement('video');
		v.setAttribute('id', 'background-video');
		v.setAttribute('loop', 'true');
		v.setAttribute('muted', 'true');
		v.setAttribute('autoplay', 'true');
		v.setAttribute('loop', 'true');
		var img = 'url(assets/images/s2048/' + getBackgroundImageWunderground(data.current_observation.icon, data.sun_phase) + ')';
		v.setAttribute('poster', img);
		v.setAttribute('class', 'fullscreen-bg__video');
		var s = document.createElement('source');
		s.setAttribute('id', 'background-video-source');
		s.setAttribute('type', 'video/mp4')
		s.setAttribute('src', video);
		v.appendChild(s);
		document.getElementById('video-bg').appendChild(v);
		document.getElementById('main-wrap').style.background = 'transparent none';
	} else {
	
		document.getElementById('main-wrap').style.backgroundImage = 'url(assets/images/s2048/' + getBackgroundImageWunderground(data.current_observation.icon, data.sun_phase) + ')';
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

/* Function: getBackgroundVideoWunderground
 * ----------------------------------------
 * Sets the page background image based on the current weather
 * conditions.
 *
 * @param condition: The Weather Underground condition ID. For more,
 * see: https://openweathermap.org/weather-conditions
 */
function getBackgroundVideoWunderground(condition, sys) {
	var video_id = 'clear';

	if(condition == 'tstorms' || condition == 'chancetstorms') // Thunderstorms
		video_id = 'cloudy';
	if(condition == 'chancerain' || condition == 'chancesleat') // Drizzle
		video_id = 'cloudy';
	if(condition == 'rain' || condition == 'sleat') // Rain
		video_id = 'cloudy';
	if(condition == 'snow') // Snow
		video_id = 'cloudy';
	if(condition == 'chancesnow' || condition == 'flurries') // Light snow
		video_id = 'cloudy';
	if(condition == 'hazy') // Fog
		video_id = 'haze';
	if(condition == 'mostlysunny') // Few clouds
		video_id = 'partlycloudy';
	if(condition == 'partlysunny' || condition == 'partlycloudy') // Some clouds
		video_id = 'partlycloudy';
	if(condition == 'mostlycloudy')
		video_id = 'mostlycloudy';
	if(condition == 'cloudy')
		video_id = 'cloudy';
	console.log(video_id);

	// Figure out whether it's day or night
	var d = new Date();
	var hours = d.getHours();
	var minutes = d.getMinutes();
	var dn = 'night';
	if((hours > sys.sunrise.hour || (hours == sys.sunrise.hour && minutes > sys.sunrise.hour)) &&
	   (hours < sys.sunset.hour || (hours == sys.sunset.hour && minutes <= sys.sunset.hour)))
	   dn = 'day';

	var videos = VIDEOS[dn][video_id];
	console.log(videos);
	
	// Get a random number between 0 and video_index.length - 1
	var video_index = Math.floor((Math.random() * videos.length));
	console.log(video_index);

	return videos[video_index];
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
		photo_id = 'lightrain';
	if(condition == 'rain' || condition == 'sleat') // Rain
		photo_id = 'rain';
	if(condition == 'snow') // Snow
		photo_id = 'snow';
	if(condition == 'chancesnow' || condition == 'flurries') // Light snow
		photo_id = 'lightsnow';
	if(condition == 'hazy') // Fog
		photo_id = 'foggy';
	if(condition == 'mostlysunny') // Few clouds
		photo_id = 'fewclouds';
	if(condition == 'partlysunny' || condition == 'partlycloudy') // Some clouds
		photo_id = 'partlycloudy';
	if(condition == 'mostlycloudy')
		photo_id = 'mostlycloudy';
	if(condition == 'cloudy')
		photo_id = 'cloudy';

	// Figure out whether it's day or night
	var d = new Date();
	var hours = d.getHours();
	var minutes = d.getMinutes();
	var dn = 'night';
	if((hours > sys.sunrise.hour || (hours == sys.sunrise.hour && minutes > sys.sunrise.hour)) &&
	   (hours < sys.sunset.hour || (hours == sys.sunset.hour && minutes <= sys.sunset.hour)))
	   dn = 'day';

	// Get a random number between 1 and 3
	var image_index = Math.floor((Math.random() * 3) + 1);

	return (dn + '-' + photo_id + '-0' + image_index + '.jpg');
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

	loadStocksIEX(STOCKSIEX, 'stocks', STOCKS_UPDATE);
}

/* Function: loadStocksIEX
 * -----------------------
 * Loads the stock market data and creates DOM elements
 * in the stocks pane.
 *
 * @param symbols: An array of stock symbols to load.
 * @param wrapper: The DOM element to place the stock
 * information in.
 */
function loadStocksIEX(stocks, wrapper, update) {
	stocks = (typeof stocks !== 'undefined') ?  stocks : STOCKSIEX;
	wrapper = (typeof update !== 'undefined') ?  wrapper : 'stocks';
	update = (typeof update !== 'undefined') ?  update : false;
	
	var xhr = [], i;

	var url = 'https://api.iextrading.com/1.0/stock/';
	var url_postfix = '/quote';

	for( i = 0; i < stocks.length; i++) {
		(function(i) {
			xhr[i] = new XMLHttpRequest();
			xhr[i].open('GET', url + stocks[i] + url_postfix, true);

			xhr[i].onload = function() {
			  if (xhr[i].status >= 200 && xhr[i].status < 400) {
				
				var data = JSON.parse(xhr[i].responseText);

				var current_stock = document.getElementById('stock-' + data.symbol);
				if(!current_stock) {
					current_stock = document.createElement('div');
					current_stock.setAttribute('class', 'stock');
					current_stock.setAttribute('id', 'stock-' + data.symbol);
					document.getElementById(wrapper).appendChild(current_stock);
				}
				updateStockItemIEX(data, current_stock);
				
				// logUpdate("Stocks updated from Yahoo.");
			  } else {
				logUpdate("Unable to reach IEX API. " + responseText);
			  }
			};

			xhr[i].onerror = function() {
			  logUpdate("There was an error reaching the IEX API.");
			};

			xhr[i].send();
		})(i);
	}

	if(update) {
		setTimeout(function() {
			loadStocksIEX(stocks, wrapper, update);
		}, update);
	}
}

/* Function: updateStockItemIEX
 * ----------------------------
 * Updates a stock item in the DOM.
 *
 * @param stock: The stock data to display.
 * @param wrapper: The DOM element in which to place the data.
 */
function updateStockItemIEX(stock, wrapper) {
	while (wrapper.firstChild) {
		wrapper.removeChild(wrapper.firstChild);
	}

	// Symbol
	var sym = document.createElement('span');
	sym.setAttribute('class', 'stock-symbol');
	sym.textContent = stock.symbol;

	// Price
	var price = document.createElement('span');
	price.setAttribute('class', 'stock-price');
	price.textContent = decimalPlaces(stock.latestPrice, 2);

	// Change
	var change = document.createElement('span');
	var c = decimalPlaces(stock.changePercent * 100, 2);
	change.setAttribute('class', 'stock-change ' + (c < 0 ? 'negative' : 'positive'));
	change.textContent = '(' + (c < 0 ? '' : '+') + c + '%)';

	wrapper.appendChild(sym);
	wrapper.appendChild(price);
	wrapper.appendChild(change);
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

			// logUpdate("News updated from the New York Times.");
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
 
 /* Function: setUpOPM
 * -------------------
 * Sets up the OPM wrapper, click action, and loads the status.
 */
function setUpOPM() {
	document.getElementById('opmstatus').style.opacity = 0;
	document.getElementById('opmstatus').addEventListener('click', function() {
		window.open(URLS.opm);
		return false;
	});
	document.getElementById('opm-button').addEventListener('click', function() {
		fadeToggle(document.getElementById('opmstatus'));
		return false;
	});
	updateOPMStatus(OPM_UPDATE);
}

function updateOPMStatus(interval) {
	max_stories = (typeof max_stories !== 'undefined') ?  max_stories : 10;
	update = (typeof update !== 'undefined') ?  update : false;

	var url = "https://www.opm.gov/json/operatingstatus.json";

	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.onload = function() {
		if(request.status >= 200 && request.status < 400) {
			var data = JSON.parse(request.responseText);
			
			// Remove current status
			document.getElementById('opm-wrapper').innerHTML = '';
			
			// Add new status the DOM
			var opm_status_date = document.createElement('span');
			opm_status_date.setAttribute('class', 'opm-status-date');
			opm_status_date.textContent = data.AppliesTo;
			
			var current_status = document.createElement('span');
			current_status.setAttribute('class', 'opm-current-status');
			current_status.textContent = data.StatusSummary;
			if(data.StatusSummary == "Open") {
				current_status.setAttribute('class', 'opm-current-status open');
			} else if (data.StatusSummary.indexOf('Closed') != -1) {
				current_status.setAttribute('class', 'opm-current-status closed');
			} else if (data.StatusSummary.indexOf('Delayed') != -1) {
				current_status.setAttribute('class', 'opm-current-status delayed');
			}
			
			var status_summary = document.createElement('span');
			status_summary.setAttribute('class', 'opm-status-summary');
			status_summary.textContent = data.ShortStatusMessage;
			
			document.getElementById('opm-wrapper').appendChild(opm_status_date);
			document.getElementById('opm-wrapper').appendChild(current_status);
			document.getElementById('opm-wrapper').appendChild(status_summary)
			
			URLS.opm = data.Url;
			
			//logUpdate("OPM data successfully updated.");
		} else {
			logUpdate("The OPM tool returned an error. OPM status not updated.");
		}
	};

	request.onerror = function() {
		logUpdate("Unable to reach the New York Times website.");
	}

	request.send();

	if(interval) {
		setTimeout(function() {
			updateOPMStatus(interval);
		}, interval);
	}
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
	setUpOPM();
}

ready(setUp); // Run setUp when the DOM is ready
