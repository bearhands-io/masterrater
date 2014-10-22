var parseString = require('xml2js').parseString;
var http = require('http');

function RatingService(app) {
	var ratingMethods = [cts, southeastern];

	this.getRatesMulti = function(fromZips, toZip, weight, renderCallback) {
		var rates = [];
		var callbackCount = 0;

		var callback = function(ratesForZip) {
			callbackCount++;
			if(ratesForZip.length) {
				console.log('Got ' + ratesForZip.length + ' rates for zip ' + ratesForZip[0].fromZip);
			}
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
				callback(rates);
			}
		}

		for(var i = 0, len = ratingMethods.length; i< len; i++) {
			var ratingMethod = ratingMethods[i];
			ratingMethod(fromZip, toZip, weight, ratingMethodCallback);
		}

		return rates;
	}

	function cts(fromZip, toZip, weight, callback) {
		var now = new Date();
		var query = {
		    method  : 'GET',
		    host    : 'www.shipwithcts.com',
		    path    : '/cts/shiprite/rater.cfm?' + 
					  'action=xml&' + 
					  'UID=902&' +
					  'class1=77&' +
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
					var rates = [];

					var carriers = result.Rates.Carriers[0].Carrier;
					for(var i = 0, len = carriers.length; i < len; i++) {
						var carrier = carriers[i];
						rates.push(newRate(fromZip, toZip, weight, -1, carrier.finalcharge, carrier.name));
					}

					callback(rates);
				});
			});
		}

		http.request(query, httpCallback).end();
	}

	function southeastern(fromZip, toZip, weight, callback) {
		var distanceMiles = Math.floor((Math.random() * 250) + 1); // random between 1 and 1000
		// TODO: replace distance lookup w/ google calculation

		if(fromZip == 30071 && distanceMiles <= 150) {
			var defaultRate = newRate(fromZip, toZip, weight, distanceMiles, 125, 'South Eastern');
			callback([defaultRate]);
		} else {
			// console.log('invalid southeastern req: ' + distanceMiles + ', fromZip: ' + fromZip);
			callback([]);
		}
	}

	function newRate(fromZip, toZip, weight, distanceMiles, cost, carrier) {
		var newRate = {};

		newRate.fromZip = fromZip;
		newRate.toZip = toZip;
		newRate.distanceMiles = distanceMiles;
		newRate.weight = weight;
		newRate.cost = cost;
		newRate.carrier = carrier;

		return newRate;
	}
}

module.exports = RatingService;