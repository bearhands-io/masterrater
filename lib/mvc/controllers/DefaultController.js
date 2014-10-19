function DefaultController(app) {

	this.notFound = function(req, res) {
		res.send('404, derp');
	}
}

module.exports = DefaultController;