var CompanyDao = require('./dao/CompanyDao');

var CompanyService = require('./biz/CompanyService'),
    RatingService = require('./biz/RatingService'),
	TrackingService = require('./biz/TrackingService');

var CompanySaveController = require('./mvc/controllers/CompanySaveController'),
    DefaultController = require('./mvc/controllers/DefaultController'),
    RatesController = require('./mvc/controllers/RatesController'),
    TrackingController = require('./mvc/controllers/TrackingController');

module.exports = function(app) {
	app.daos = {
		companyDao : new CompanyDao(app)
	}

	// init services
	app.services = {
		companyService : new CompanyService(app),
		ratingService : new RatingService(app),
		trackingService : new TrackingService(app)
	};

	// init controllers
	app.controllers = {
		companySaveController : new CompanySaveController(app),
		defaultController : new DefaultController(app),
		ratesController : new RatesController(app),
		trackingController : new TrackingController(app)
	};

	app.get('/', app.controllers.ratesController.getForm);
	app.get('/index.html', app.controllers.ratesController.getForm);

	app.get('/company/save.html', app.controllers.companySaveController.getForm);
	app.post('/company/save.html', app.controllers.companySaveController.submitForm);
	
	app.get('/rates/', app.controllers.ratesController.getShippingRates);

	app.get('/shipmentTracking.html', app.controllers.trackingController.getShipmentTracking);

	app.get('*', app.controllers.defaultController.notFound);
};