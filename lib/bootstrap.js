var RatingService = require('./biz/RatingService'),
    TrackingService = require('./biz/TrackingService');

var DefaultController = require('./mvc/controllers/DefaultController'),
    RatesController = require('./mvc/controllers/RatesController'),
    TrackingController = require('./mvc/controllers/TrackingController');

module.exports = function(app) {

	// init services
	app.services = {
		ratingService : new RatingService(app),
		trackingService : new TrackingService(app)
	};

	// init controllers
	app.controllers = {
		defaultController : new DefaultController(app),
		ratesController : new RatesController(app),
		trackingController : new TrackingController(app)
	};

	app.get('/', app.controllers.ratesController.getForm);
	app.get('/index.html', app.controllers.ratesController.getForm);
	app.get('/rates', app.controllers.ratesController.getShippingRates);

	app.get('/shipmentTracking.html', app.controllers.trackingController.getShipmentTracking);

	app.get('*', app.controllers.defaultController.notFound);
};