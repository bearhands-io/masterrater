var parseString = require('xml2js').parseString;
var http = require('http');
var https = require('https');
var Rate = require('./Rate');

function RatingService(app) {
	var ratingMethods = [cts, southeastern];

	var config = app.get('config');
	var GOOGLE_API_KEY = config.webservices.google.api_key;
	var CTS_UID = config.webservices.cts.uid;

	if(!CTS_UID) {
		console.warn('no CTS UID provided!');
	}

	if(!GOOGLE_API_KEY) {
		console.warn('no google api key provided!');
	}

	this.getRatesMulti = function(fromZips, toZip, weight, renderCallback) {
		var rates = [];
		var callbackCount = 0;

		var callback = function(ratesForZip, fromZip) {
			callbackCount++;

			console.log('Got ' + ratesForZip.length + ' rates for zip ' + fromZip);
			rates = rates.concat(ratesForZip);	

			// if all zips have been processed, then render the results
			if(callbackCount == fromZips.length) {
				console.log('Rate calculation finished!');
				renderCallback(rates.sort(function(a, b){return a.cost - b.cost}));
			}
		}

		console.log('Calculating rates...');
		for(var i = 0, len = fromZips.length; i < len; i++) {
			getRates(fromZips[i], toZip, weight, callback);
		}
	}

	/**
	* Returns list of rates sorted from cheapest to most expensive
	*/
	function getRates(fromZip, toZip, weight, callback) {
		console.log('Getting shipping rate from ' + fromZip + ' to ' + toZip + ' for weight (lbs) ' + weight);

		var rates = [];
		var callbackCount = 0;

		var ratingMethodCallback = function(ratesFromMethod) {
			callbackCount++;
			rates = rates.concat(ratesFromMethod);

			if(callbackCount === ratingMethods.length) {
				callback(rates, fromZip);
			}
		}

		for(var i = 0, len = ratingMethods.length; i< len; i++) {
			var ratingMethod = ratingMethods[i];
			ratingMethod(fromZip, toZip, weight, ratingMethodCallback);
		}

		return rates;
	}

	function cts(fromZip, toZip, weight, callback) {
		if(!CTS_UID) {
			console.warn('No CTS UID');
			callback([]);
			return;
		}

		var now = new Date();
		var query = {
		    method  : 'GET',
		    host    : 'www.shipwithcts.com',
		    path    : '/cts/shiprite/rater.cfm?' + 
					  'action=xml&' + 
					  'class1=77&' +
					  'UID=' + CTS_UID + '&' +
					  'shipdate=' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '&' +
					  'weight1=' + weight + '&' +
					  'fromzip=' + fromZip + '&' +
					  'tozip=' + toZip 
		}

		var httpCallback = function(response) {
			var str = '';

			//another chunk of data has been recieved, so append it to `str`
			response.on('data', function (chunk) {
				str += chunk;
			});

			//the whole response has been recieved, so now we can process it
			response.on('end', function () {
				parseString(str, function (err, result) {
					if(err) {
						console.log(err);
					}

					var rates = [];

					if(result && result.Rates && result.Rates.Carriers && result.Rates.Carriers.length) {
						var carriers = result.Rates.Carriers[0].Carrier;
						for(var i = 0, len = carriers.length; i < len; i++) {
							var carrier = carriers[i];
							rates.push(new Rate(fromZip, toZip, weight, -1, carrier.finalcharge, carrier.name));
						}
					} else if(result && result.Rates && result.Rates.Error && result.Rates.Error.length) {
						console.warn('CTS completed with potential error: ' + JSON.stringify(result.Rates.Error[0]));
					}

					callback(rates);
				});
			});
		}

		http.request(query, httpCallback).end();
	}

	function southeastern(fromZip, toZip, weight, callback) {
		var successCallback = function(distanceMiles) {
			var rates = [];

			if(fromZip == '30071' && weight <= 50000 && distanceMiles <= 150) {
				rates.push(new Rate(fromZip, toZip, weight, distanceMiles, 125.00, 'South Eastern'));
			}

			callback(rates);
		}

		var errorCallback = function(err) {
			console.warn('Google seems to have encountered an exception determining distance from ' 
				+ fromZip + ' to ' + toZip + ': ' + JSON.stringify(err, undefined, 2));
			callback([]);
		}
		
		determineDistanceGoogle(fromZip, toZip, successCallback, errorCallback);
	}

	function determineDistanceGoogle(fromZip, toZip, successCallback, errorCallback) {
		if(!GOOGLE_API_KEY) {
			errorCallback('No Google key');
			return;
		}

		var query = {
		    method  : 'GET',
		    host    : 'maps.googleapis.com',
		    path    : '/maps/api/distancematrix/xml?' + 
					  'origins=' + fromZip + '&' +
					  'destinations=' + toZip + '&' + 
		    		  'mode=car&' + 
		    		  'units=imperial&' + 
					  'key=' + GOOGLE_API_KEY
		}

		var parseResponseCallback = function(err, resp) {
			if (resp) {
				if(resp.DistanceMatrixResponse && resp.DistanceMatrixResponse.status && resp.DistanceMatrixResponse.status[0] && resp.DistanceMatrixResponse.status[0] === 'OK' && resp.DistanceMatrixResponse.row && resp.DistanceMatrixResponse.row[0]
						&& resp.DistanceMatrixResponse.row[0].element && resp.DistanceMatrixResponse.row[0].element[0]) {
					var distance = resp.DistanceMatrixResponse.row[0].element[0].distance[0].text[0];
					var distanceMiles = distance.substring(0, distance.indexOf(' mi'));
					successCallback(distanceMiles);
				} else if (resp.DistanceMatrixResponse && resp.DistanceMatrixResponse.status && resp.DistanceMatrixResponse.status[0]) {
					errorCallback('Google says - ' + resp.DistanceMatrixResponse.status[0] + ': ' + resp.DistanceMatrixResponse.error_message[0]);
				} else {
					errorCallback('Not enough information returned in response: ' + JSON.stringify(resp));
				}
			} else if (err) {
				errorCallback(err);
			} else {
				errorCallback('Empty response received')
			}
		}

		httpsRequest(query, parseResponseCallback);
	}

	function httpsRequest(query, responseCallback) {
		var httpsCallback = function(response) {
			var str = '';

			//another chunk of data has been recieved, so append it to `str`
			response.on('data', function (chunk) {
				str += chunk;
			});

			//the whole response has been recieved, so now we can process it
			response.on('end', function () {
				parseString(str, responseCallback);
			});
		}

		https.request(query, httpsCallback).end();
	}
}

module.exports = RatingService;