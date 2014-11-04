var loki = require('lokijs');
var LokiCollection = require('./db/LokiCollection');

function CompanyDao(app) {
	var data = new LokiCollection(app, 'companies', 'Company');

	this.create = function(company, callback) {
		data.create(company, callback);
	}

	this.update = function(company, callback) {
		data.update(company, callback);
	}

	this.get = function(id, callback) {
		data.get(id, callback);
	}
}

module.exports = CompanyDao;