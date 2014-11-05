var loki = require('lokijs');
var LokiCollection = require('./db/LokiCollection');

function CompanyDao(app) {
	var data = new LokiCollection(app, 'companies');

	this.create = function(company, callback) {
		data.create(company, callback);
	}

	this.update = function(company, callback) {
		data.update(company, callback);
	}

	this.get = function(id, callback) {
		console.log('getting company with id: ' + id );
		data.get(id, callback);
	}
}

module.exports = CompanyDao;