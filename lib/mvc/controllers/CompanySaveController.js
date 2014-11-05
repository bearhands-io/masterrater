function CompanySaveController(app) {
	this.getForm = function(req, res) {
		res.render('setupCompany.ejs', {});
	}

	this.submitForm = function(req, res) {
		res.send('form submitted');
	}
}

module.exports = CompanySaveController;