function CompanyService (app) {
	var companyDao = app.daos.companyDao;

	this.getCompany = function (id, renderCallback) {
		var daoCallback = function(company) {
			console.log('in dao callback');

			var companyToRender = {};

			if(!company) {
				console.log('dao returned no company');

				companyToRender.name = '';
				companyToRender.ctsUID = '';
				companyToRender.googleApiKey = '';
				companyToRender.fromZips = [];
			} else {
				companyToRender.name = company.name;
				companyToRender.ctsUID = company.ctsUID;
				companyToRender.googleApiKey = company.googleApiKey;
				companyToRender.fromZips = company.fromZips;
			}

			renderCallback(companyToRender);
		}

		companyDao.get(id, daoCallback);
	}

	this.saveCompany = function(company, renderCallback) {
		var daoCallback = function(toUpdate) {
			if(toUpdate) {
				console.log('update company');
				toUpdate.name = company.name;
				toUpdate.ctsUID = company.ctsUID;
				toUpdate.googleApiKey = company.googleApiKey;
				toUpdate.fromZips = company.fromZips;
				companyDao.update(toUpdate, renderCallback);
			} else {
				console.log('create new company');
				companyDao.create(company, renderCallback);
			}
		}

		companyDao.get(1, daoCallback);
	}
}

module.exports = CompanyService;