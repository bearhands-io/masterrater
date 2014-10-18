function DefaultController(app) {

	this.fire = function(req, res) {
		res.send('404, derp');
	}
}

module.exports = DefaultController;