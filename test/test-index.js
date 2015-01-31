var MasterRater = require('../');
var assert = require('assert');

describe('Master Rater', function(){
	function assertValidInitialization(masterRater) {
		assert.notEqual(masterRater, undefined, 'Master Rater is undefined');
		assert.notEqual(masterRater.getKeys(), undefined, 'Keys is undefined');
		assert.notEqual(masterRater.getCustomRates(), undefined, 'Custom Rates is undefined');
	}

	function getConfiguredInstance() {
		return new MasterRater({
			keys: {
				cts: "902",
				google: undefined,
				ups: ""
			},
			customRates: [
				{
					carrierName: "Brad's magical hard-coded carrier",
					originatingZip: 30303,
					maxRadiusMiles: 50,
					minRadiusMiles: 0,
					maxWeight: 3000,
					minWeight: 0,
					price: 50
				},
				{
					carrierName: "Super Secret hard-coded carrier",
					originatingZip: 30303,
					maxRadiusMiles: 500,
					minRadiusMiles: 100,
					maxWeight: 50000,
					minWeight: 0,
					price: 500
				}
			]
		});
	}

	it('should initialize without configs', function(){
		var mr = new MasterRater();
		assertValidInitialization(mr);
	});

	it('should initialize with empty configs', function(){
		var mr = new MasterRater({});
		assertValidInitialization(mr);
	});

	it('should initialize with full configs', function() {
		assertValidInitialization(getConfiguredInstance());
	});

	it('should catch invalid queries', function() {
		getConfiguredInstance().getRates({}, function(err, results) {
			assert.notEqual(err, undefined, 'No err response returned');
		});
	});

	// test actual rates w/ some integration tests
});  