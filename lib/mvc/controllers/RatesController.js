function ShippingRatesController(app) {
	var fromZips = app.get('config').fromZips;
	var companyService = app.services.companyService;
	var ratingService = app.services.ratingService;
	
	this.getForm = function(req, res) {
		console.log('got getForm request');
		res.render('ratingQuotes', {
            user : req.user // get the user out of session and pass to template
        });
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

		var getCompanyCallback = function(company) {

			var getRatesCallback = function(ratingResults, errorMessage) {
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

				res.render('ratingQuoteResults', pageData);
			}

			ratingService.getRatesMulti(company, fromZips, toZip, weight, getRatesCallback);
		}

		companyService.getCompany(1, getCompanyCallback);

	}
}

module.exports = ShippingRatesController;