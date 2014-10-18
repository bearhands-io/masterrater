var DefaultController = require('./mvc/controllers/DefaultController'),
    ShippingRatesController = require('./mvc/controllers/ShippingRatesController');

module.exports = function(app) {

	// init controllers
	var controllers = {
		defaultController: new DefaultController(app),
		shippingRatesController: new ShippingRatesController(app)
	}

	// init routes
	app.get('/', controllers.shippingRatesController.getForm);
	app.get('/index.html', controllers.shippingRatesController.getForm);

	app.post('/rates', controllers.shippingRatesController.quoteShippingPrices);

	app.get('*', controllers.defaultController.fire);
};