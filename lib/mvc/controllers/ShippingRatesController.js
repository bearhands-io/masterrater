function ShippingRatesController(app) {
	var ratingService = app.services.ratingService;
	var distanceService = app.services.distanceService;

	this.getForm = function(req, res) {
		console.log('got getForm request');
		res.render('shippingRates', null);
	}

	this.quoteShippingPrices = function(req, res) {
		console.log('got quoteShippingPrices request');
		var pageData = {};

		var fromZips = [11111, 222222, 333333, 444444, 555555];
		var toZip = req.body.toZip;
		var weight = req.body.weight;

		pageData.toZip = toZip;
		pageData.weight = weight;
		pageData.ratingResults = [];
		var cheapest = undefined;
		for(var i = 0; i < fromZips.length; i++) {
			var result = {};
			result.fromZip = fromZips[i];
			result.distance = distanceService.getDistanceMiles(toZip, result.fromZip);
			result.rates = ratingService.getRates(); // TODO: determine and insert proper arguments

			pageData.ratingResults.push(result);

			// determine cheapest rate from results - could probably do this in separate method, but eff it
			for(var j = 0; j < result.rates.length; j++) {
				var rate = result.rates[j];
				if(!cheapest || cheapest.cost > rate.cost) {
					cheapest = rate;
					cheapest.fromZip = result.fromZip;
				}
			}
		}

		pageData.cheapest = cheapest;

		res.render('shippingRatesResults', pageData);
	}
}

module.exports = ShippingRatesController;