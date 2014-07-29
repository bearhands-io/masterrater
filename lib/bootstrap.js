var DefaultController = require('./mvc/DefaultController');

module.exports = function(app) {

	// init controllers
	var controllers = {
		defaultController: new DefaultController(app)
	}


	// init routes
	app.get('*', controllers.defaultController.fire);
};