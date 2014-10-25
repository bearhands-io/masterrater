function ShippingRatesController(app) {
	var fromZips = [30071, 72114, 70814, 33619];
	var ratingService = app.services.ratingService;

	this.getForm = function(req, res) {
		console.log('got getForm request');
		res.render('shippingRates', null);
	}

	this.getShippingRates = function(req, res) {
		console.log('got getShippingRates request' );

		var toZip = req.query.toZip;
		var weight = req.query.weight;
		var orderprice = req.query.orderprice;
		
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

		if(!orderprice) {
			console.log('Invalid orderprice received: ' + orderprice);
			res.send('invalid orderprice received');
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
			pageData.orderprice = orderprice;

			res.render('shippingRatesResults', pageData);
		}

		ratingService.getRatesMulti(fromZips, toZip, weight, serviceCallback);
	}
}

module.exports = ShippingRatesController;