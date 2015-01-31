var http = require('http');
var https = require('https');
var parseString = require('xml2js').parseString;
var async = require('async');

function Rate(carrierName, price) {
	this.carrierName = carrierName;
	this.price = price;
}

module.exports = function(config) {
	/*
		config:
			keys:
				google
				cts
				ups?
			customRates: [
				{
					carrierName
					originatingZip
					maxRadiusMiles
					maxWeight
					minWeight
					price
				},
				...
			]
	*/

	var keys = {};
	var customRates = [];

	if(config) {
		keys = config.keys || {};
		customRates = config.customRates || [];
	}

	this.getKeys = function() {
		return keys;
	}

	this.getCustomRates = function() {
		return customRates;
	}

	this.getRates = function(query, callback) {
		if(query && query.fromZip && query.toZip && query.weight > 0) {
			var result = {};
			result.query = query;
			result.rates = [];

			// execute everything in parallel for magical performance gains... and then return all results once done
			async.parallel({
				cts: function(callback) {
					queryCts(query, function(ctsRates) { callback(null, ctsRates); });
				},
				ups: function(callback) {
					queryUps(query, function(upsRates) { callback(null, upsRates); });
				},
				custom: function(callback) {
					queryCustomRates(query, function(customRates) { callback(null, customRates); });
				}
			}, function(err, allRates) {
				if(!err) {
					console.log(JSON.stringify(allRates, undefined, 2));
					var rates = allRates.cts.concat(allRates.ups.concat(allRates.custom));
					result.rates = rates.sort(function(a, b){return a.price - b.price});
					console.log('Found ' + result.rates.length + ' results');
					callback(result);
				} else {
					console.log('error while running algos');
					callback("Error during rates query: " + err);
				}
			});
		} else {
			 // TODO: user-friendly message on why data is invalid, instead of this BS
			callback("Invalid query received: " + query);
		}
	}

	function isValidQuery(query) {
		return ;
	}

	function queryCts(query, callback) {
		console.log('Running query against CTS');

		if(!keys.cts || !keys.cts) {
			console.warn('No CTS UID provided in configs');
			callback([]);
			return;
		}

		var now = new Date();
		var request = {
		    method  : 'GET',
		    host    : 'www.shipwithcts.com',
		    path    : '/cts/shiprite/rater.cfm?' + 
					  'action=xml&' + 
					  'class1=77&' +
					  'UID=' + keys.cts + '&' +
					  'shipdate=' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + '&' +
					  'weight1=' + query.weight + '&' +
					  'fromzip=' + query.fromZip + '&' +
					  'tozip=' + query.toZip 
		}

		webRequest(http, request, function(err, resp) {
			var results = [];

			if(!err) {
				if(resp && resp.Rates && resp.Rates.Carriers && resp.Rates.Carriers.length) {
					var carriers = resp.Rates.Carriers[0].Carrier;
					for(var i = 0, len = carriers.length; i < len; i++) {
						var carrier = carriers[i];
						results.push(new Rate(carrier.name[0], carrier.finalcharge[0]));
					}
				} else if(resp && resp.Rates && resp.Rates.Error && resp.Rates.Error.length) {
					console.warn('CTS completed with potential error(s): ' + JSON.stringify(resp.Rates.Error, undefined, 2));
				} else {
					console.error('Invalid response received from cts: ' + JSON.stringify(resp, undefined, 2));
				}
			} else {
				console.error('Error while parsing response from cts: ' + err);
			}

			console.log('CTS found ' + results.length + ' results');
			callback(results);
		});
	}

	function queryUps(query, callback) {
		console.log("UPS has not been implemented yet, skipping");
		callback([]);
	}

	function queryCustomRates(query, callback) {
		var results = [];

		var customRatesToUse = [];
		for(var i = 0, len = customRates.length; i < len; i++) {
			var customRate = customRates[i];
			if(customRate.maxWeight >= query.weight && customRate.minWeight <= query.weight && customRate.originatingZip === query.fromZip) {
				customRatesToUse.push(customRate);
			}
		}

		if(customRatesToUse.length) {
			getDistance(query.fromZip, query.toZip, function(err, distanceMiles) {
				if(!err) {
					for(var i = 0, len = customRatesToUse.length; i < len; i++) {
						var customRate = customRatesToUse[i];
						if(customRate.maxRadiusMiles >= distanceMiles && customRate.minRadiusMiles <= distanceMiles) {
							results.push(new Rate(customRate.carrierName, customRate.price));
						}
					}
				} else {
					console.warn("Unable to use custom rates because: " + err);
				}
			});
		} else {
			console.log("No custom rates are avaiable for this fromZip: " + query.fromZip);
		}

		callback(results);
	}

	function getDistance(fromZip, toZip, callback) {
		if(!keys || !keys.google) {
			callback('No Google api key provded in configs');
			return;
		}

		console.log('Using Google Maps api to determine distance (miles) betwen ' + fromZip + ' and ' + toZip);

		var request = {
		    method : 'GET',
		    host   : 'maps.googleapis.com',
		    path   : '/maps/api/distancematrix/xml?' + 
					 'origins=' + fromZip + '&' +
					 'destinations=' + toZip + '&' + 
		    		 'mode=car&' + 
		    		 'units=imperial&' + 
					 'key=' + keys.google
		}

		webRequest(https, request, function(err, resp) {
			var distMiles;
			var errResponse;

			if (resp) {
				if(resp.DistanceMatrixResponse && resp.DistanceMatrixResponse.status && resp.DistanceMatrixResponse.status[0] 
						&& resp.DistanceMatrixResponse.status[0] === 'OK' && resp.DistanceMatrixResponse.row && resp.DistanceMatrixResponse.row[0]
						&& resp.DistanceMatrixResponse.row[0].element && resp.DistanceMatrixResponse.row[0].element[0]) {
					var distance = resp.DistanceMatrixResponse.row[0].element[0].distance[0].text[0];
					distMiles = distance.substring(0, distance.indexOf(' mi'));
				} else if (resp.DistanceMatrixResponse && resp.DistanceMatrixResponse.status && resp.DistanceMatrixResponse.status[0]
						&& resp.DistanceMatrixResponse.error_message && resp.DistanceMatrixResponse.error_message[0]) {
					errResponse = resp.DistanceMatrixResponse.status[0] + ' - ' + resp.DistanceMatrixResponse.error_message[0];
				} else {
					errResponse = 'Unrecognized Google response: ' + JSON.stringify(resp);
				}
			} else if (err) {
				errResponse = 'Error while parsing response from google: ' + err;
			} else {
				errResponse = 'Empty response received from google';
			}

			callback(errResponse, distMiles);
		});
	}

	function webRequest(protocol, request, responseCallback) {
		var requestCallback = function(response) {
			var str = '';

			response.on('data', function (chunk) {
				str += chunk;
			});

			response.on('end', function () {
				parseString(str, responseCallback);
			});
		}

		protocol.request(request, requestCallback).end();
	}
}