function ShippingRatesController(app) {
	var fromZips = [30071, 72114, 70814, 33619];
	var ratingService = app.services.ratingService;

	this.getForm = function(req, res) {
		console.log('got getForm request');
		res.render('shippingRates', null);
	}

	this.quoteShippingPrices = function(req, res) {
		console.log('got quoteShippingPrices request' );

		var toZip = req.body.toZip;
		var weight = req.body.weight;

		if(!toZip) {
			console.log('Invalid toZip received: ' + toZip);
			res.send('invalid zip received');
			return;
		} 

		if(!weight) {
			console.log('Invalid weight received: ' + weight);
			res.send('invalid weight received');
			return;
		}

		var serviceCallback = function(ratingResults, errorMessage) {
			if(errorMessage) {
				res.send(errorMessage);
				return;
			}

			var pageData = {};

			pageData.toZip = toZip;
			pageData.weight = weight;
			pageData.ratingResults = ratingResults;
			pageData.errorMessage = errorMessage;

			res.render('shippingRatesResults', pageData);
		}

		ratingService.getRatesMulti(fromZips, toZip, weight, serviceCallback);
	}
}

module.exports = ShippingRatesController;