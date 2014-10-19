function RatingService(app) {
	var ratingMethods = [cst, southeastern];

	this.getRates = function(fromZip, toZip, distance, weight) {
		var rates = [];

		for(var i = 0; i < ratingMethods.length; i++) {
			var ratingMethod = ratingMethods[i];
			var ratesArray = ratingMethod();
			if(ratesArray) {
				for(var j = 0; j < ratesArray.length; j++) {
					rates.push(ratesArray[j]);
				}
			}
		}

		return rates;
	}

	function cst() {
		var rates = [];

		var fakeRate = {
			carrier : 'Brad\'s Fake Carrier', 
			cost: Math.floor((Math.random() * 100) + 1) // random between 1 and 100
		}
		rates.push(fakeRate);

		return rates;
	}

	function southeastern() {
		return [ {
			carrier : 'SouthEastern',
			cost : 150
		} ];
	}
}

module.exports = RatingService;