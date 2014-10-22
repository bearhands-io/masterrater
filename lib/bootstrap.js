var RatingService = require('./biz/RatingService');

var DefaultController = require('./mvc/controllers/DefaultController'),
    ShippingRatesController = require('./mvc/controllers/ShippingRatesController');

module.exports = function(app) {

	// init services
	app.services = {
		ratingService : new RatingService(app)
	};

	// init controllers
	app.controllers = {
		defaultController : new DefaultController(app),
		shippingRatesController : new ShippingRatesController(app)
	};	

	// init routes
	app.get('/', app.controllers.shippingRatesController.getForm);
	app.get('/index.html', app.controllers.shippingRatesController.getForm);

	app.post('/rates', app.controllers.shippingRatesController.quoteShippingPrices);

	app.get('*', app.controllers.defaultController.notFound);
};