var MasterRater = require('../');

var mr = new MasterRater({
	keys: {
		cts: "902",
		google: "AIzaSyBk9GG-yHzflfNE0a8pp1qHd0U017QUCTg",
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

mr.getRates({
	fromZip: 30303,
	toZip: 30024,
	weight: 200
}, function(rates) {
	console.log(JSON.stringify(rates, undefined, 2));
});