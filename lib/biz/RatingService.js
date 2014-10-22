var parseString = require('xml2js').parseString;

function RatingService(app) {
	var ratingMethods = [cts, southeastern];

	this.getRatesMulti = function(fromZips, toZip, weight) {
		var multiRates = [];

		if(!toZip || !weight) {
			console.log('Unable to get rate quotes due to lack of info. Returning nothing...');
			return multiRates;
		}

		for(var i = 0, len = fromZips.length; i < len; i++) {
			var ratesForZip = this.getRates(fromZips[i], toZip, weight);
			multiRates = multiRates.concat(ratesForZip);
		}

		return multiRates.sort(function(a, b){return a.cost - b.cost});
	}

	/**
	* Returns list of rates sorted from cheapest to most expensive
	*/
	this.getRates = function(fromZip, toZip, weight) {
		console.log('Getting shipping rate from ' + fromZip + ' to ' + toZip + ' for weight (lbs) ' + weight);

		var rates = [];

		for(var i = 0, len = ratingMethods.length; i < len; i++) {
			var ratingMethod = ratingMethods[i];
			var ratesForMethod = ratingMethod(fromZip, toZip, weight);
			if(ratesForMethod) {
				for(var j = 0; j < ratesForMethod.length; j++) {
					rates.push(ratesForMethod[j]);
				}
			}
		}

		return rates.sort(function(a, b){return a.cost - b.cost});
	}

	function cts(fromZip, toZip, weight) {
		doRealCtsQuery(fromZip, toZip, weight);

		var rates = [];

		var randomDistanceMiles = Math.floor((Math.random() * 1000) + 1);
		var randomCost = Math.floor((Math.random() * 1000) + 1);

		rates.push(newRate(fromZip, toZip, weight, randomDistanceMiles, randomCost, 'Brad\'s Fake Carrier'));

		return rates;
	}

	function doRealCtsQuery(fromZip, toZip, weight) {
		var now = new Date();

		var http = require('http');
		var options = {
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

		callback = function(response) {
			var str = '';

			//another chunk of data has been recieved, so append it to `str`
			response.on('data', function (chunk) {
				str += chunk;
			});

			//the whole response has been recieved, so we just print it out here
			response.on('end', function () {
				parseString(str, function (err, result) {
					console.log(JSON.stringify(result.Rates.Carriers, undefined, 2));
					// TODO: build results into array
				});
			});
		}

		http.request(options, callback).end();
	}

	function southeastern(fromZip, toZip, weight) {
		var distanceMiles = Math.floor((Math.random() * 250) + 1); // random between 1 and 1000, replace w/ google

		if(fromZip == 33333 && distanceMiles <= 200) {
			var defaultRate = newRate(fromZip, toZip, weight, distanceMiles, 150, 'South Eastern');
			return [defaultRate];
		} else {
			// console.log('invalid southeastern req: ' + distanceMiles + ', fromZip: ' + fromZip);
			return [];
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