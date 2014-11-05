var loki = require('lokijs');
var domain = require('domain');
var fs = require('fs');

function LokiCollection(app, collectionName, type) {
	var collection;
	var collectionName = collectionName;
	var dbDirectory = 'db/';
	var dbFile = dbDirectory + collectionName + '.json';

	console.log('initializing db: ' + dbFile);
	var db = new loki(dbFile);
	load();

	function load() {
		// create db folder
		fs.mkdir(dbDirectory, function(err) { 
			if(err) {
				if (err.code == 'EEXIST') return;

				console.log(err); 
			}
		});

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

		// if(callback) {
			callback(obj);
		// } else {
		// 	return obj;
		// }
	}
}

module.exports = LokiCollection;