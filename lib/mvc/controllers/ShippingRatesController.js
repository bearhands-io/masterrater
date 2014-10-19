function ShippingRatesController(app) {


	this.getForm = function(req, res) {
		console.log('got getForm request');
		res.render('shippingRates', null);
	}

	this.quoteShippingPrices = function(req, res) {
		console.log('got quoteShippingPrices request');
		res.render('shippingRatesResults', null);
	}
}

module.exports = ShippingRatesController;