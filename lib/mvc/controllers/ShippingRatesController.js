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
		var toZip = 77777;
		var weight = 1000;

		pageData.toZip = toZip;
		pageData.weight = weight;
		pageData.ratingResults = [];
		for(var i = 0; i < fromZips.length; i++) {
			var result = {};
			result.fromZip = fromZips[i];
			result.distance = distanceService.getDistanceMiles(toZip, result.fromZip);
			result.rates = ratingService.getRates(); // TODO: determine and insert proper arguments

			// TODO: iterate over rates to determine cheapest

			pageData.ratingResults.push(result);
		}

		pageData.cheapest = {
			cost: 20,
			carrier: 'Some Mega Cheap Carrier'
		};

		res.render('shippingRatesResults', pageData);
	}
}

module.exports = ShippingRatesController;