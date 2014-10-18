function ShippingRatesController(app) {
	this.getForm = function(req, res) {

		res.render('shippingRates', null);
	}

	this.quoteShippingPrices = function(req, res) {
		console.log('got quote request');
		res.render('shippingRatesResults', null);
	}
}

module.exports = ShippingRatesController;