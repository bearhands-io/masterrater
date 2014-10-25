var RatingService = require('./biz/RatingService'),
    TrackingService = require('./biz/TrackingService');

var DefaultController = require('./mvc/controllers/DefaultController'),
    ShippingRatesController = require('./mvc/controllers/ShippingRatesController'),
    ShipmentTrackingController = require('./mvc/controllers/ShipmentTrackingController');

module.exports = function(app) {

	// init services
	app.services = {
		ratingService : new RatingService(app),
		trackingService : new TrackingService(app)
	};

	// init controllers
	app.controllers = {
		defaultController : new DefaultController(app),
		shippingRatesController : new ShippingRatesController(app),
		shipmentTrackingController : new ShipmentTrackingController(app)
	};

	// pages routes
	app.get('/', app.controllers.shippingRatesController.getForm);
	app.get('/index.html', app.controllers.shippingRatesController.getForm);
	app.get('/shipmentTracking.html', app.controllers.shipmentTrackingController.getShipmentInfo);

	// restful calls
	app.get('/rates', app.controllers.shippingRatesController.getShippingRates);

	app.get('*', app.controllers.defaultController.notFound);
};