var loki = require('lokijs');
var domain = require('domain');

function LokiCollection(app, collectionName, type) {
	var collection;
	var collectionName = collectionName;
	var dbFile = 'db/' + collectionName + '.json';

	console.log('initializing db: ' + dbFile);
	var db = new loki(dbFile);
	load();

	function load() {
		var onLoadSuccess = function() {
			console.log(collectionName + ' db loaded');
			collection = db.getCollection(collectionName, type);
		}

		var onLoadError = function(err) {
			console.error('error while loading db: ' + err);

			console.log('Creating new database: ' + dbFile);
			collection = db.addCollection(collectionName, type);
			db.save();
		}

		var doLoad = function() {
			console.log('opening connection to db');
			db.loadDatabase(onLoadSuccess);
		}

		var d = domain.create();
		d.on('error', onLoadError);
		d.run(doLoad);
	}

	this.create = function(object, callback) {
		var onSaveCallback = function() {
			if(callback) {
				callback(object);
			}
		};

		collection.insert(object);
		db.save(onSaveCallback);
	}

	this.update = function(object, callback) {
		var onSaveCallback = function() {
			if(callback) {
				callback(object);
			}
		};

		collection.update(object);
		db.save(onSaveCallback);
	}

	this.get = function(id, callback) {
		var obj = collection.get(id);

		if(callback) {
			callback(obj);
		} else {
			return obj;
		}
	}
}

module.exports = LokiCollection;