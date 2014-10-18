function DefaultController(app) {

	this.fire = function(req, res) {
		res.render('index', null);
	}
	
}

module.exports = DefaultController;