function CompanySaveController(app) {
	var companyService = app.services.companyService;

	this.getForm = function(req, res) {
		console.log('processing getForm');

		var serviceCallback = function(company) {
			res.render('edit-company.ejs', company);
		}

		companyService.getCompany(1, serviceCallback);
	}

	this.submitForm = function(req, res) {
		console.log('processing submitForm');

		var serviceCallback = function() {
			res.redirect('/');
		}

		// TODO: build company from request body
		var company = {};
		company.name = req.body.name;
		company.ctsUID = req.body.ctsUID;
		company.googleApiKey = req.body.googleApiKey;
		company.fromZips = [];

		var fromZips = req.body.fromZips.split(',');
		for(var i = 0, len = fromZips.length; i < len; i++) {
			var zip = fromZips[i].trim();
			if(zip) {
				company.fromZips.push(zip);
			}
		}

		console.log(JSON.stringify(company, undefined, 2));

		companyService.saveCompany(company, serviceCallback);
	}
}

module.exports = CompanySaveController;