function ShippingRatesController(app) {
	var fromZips = [29643, 30303, 30042, 30341, 30092]; // TODO: need real zips
	var ratingService = app.services.ratingService;
	var distanceService = app.services.distanceService;

	this.getForm = function(req, res) {
		console.log('got getForm request');
		res.render('shippingRates', null);
	}

	this.quoteShippingPrices = function(req, res) {
		console.log('got quoteShippingPrices request' );

		if(!req.body.toZip || !req.body.weight) {
			console.log('request not properly built!');
			console.log('toZip: ' + req.body.toZip);
			console.log('weight: ' + req.body.weight);
		}

		var pageData = {};
		pageData.toZip = req.body.toZip;
		pageData.weight = req.body.weight;
		pageData.ratingResults = ratingService.getRatesMulti(fromZips, pageData.toZip, pageData.weight);

		res.render('shippingRatesResults', pageData);
	}
}

module.exports = ShippingRatesController;