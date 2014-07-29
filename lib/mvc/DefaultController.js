function DefaultController(app) {

	this.fire = function(req, res) {
		res.send('App is running!');
	}
	
}

module.exports = DefaultController;