var DefaultController = require('./mvc/controllers/DefaultController');

module.exports = function(app) {

	// init controllers
	var controllers = {
		defaultController: new DefaultController(app)
	}

	// init routes
	app.get('/', controllers.defaultController.fire);
	app.get('/index.html', controllers.defaultController.fire);
};