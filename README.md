# Master Rater
### Master of all the raters
================

Use UPS (work in progress), CTS, or custom ratings to aggregate and compare shipping rates between zip codes

================
##### Usage

Installing
```
npm install masterrater
```

Configuring
```
var MasterRater = require('masterrater');

var rater = new MasterRater({
	keys: {
		cts: "<CTS UID goes here>", // CTS aggregation 
		google: "<Google Maps API key goes here>", // used to determine distance for custom rates
		ups: "<UPS API key goes here>" // UPS api key
	},
	customRates: [ // have custom flat rates? we can accomodate - requires Google Maps API key, however
		{
			carrierName: "Some magical hard-coded carrier",
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
```

Getting rates
```
var ratesQuery = {
	fromZip: 30303,
	toZip: 30024,
	weight: 200
}

rater.getRates(ratesQuery, function(calculatedRates) {
	// do something with your rates here!
});
```

================
##### Misc Notes
Still in the process of adding UPS APIs