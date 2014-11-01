function CustomCarrier(name, flatRate, maxWeightPounds, maxDistanceMiles, fromZips) {
	this.name = name;
	this.flatRate = flatRate;
	this.maxWeightPounds = maxWeightPounds;
	this.maxDistanceMiles = maxDistanceMiles;
	this.fromZips = fromZips; // should be a subset of fromZips for company

	this.getRateCost = function(fromZip, weightPounds, distanceMiles) {
		if(this.fromZips.indexOf(fromZip) > -1 
				&& this.maxWeightPounds >= weightPounds
				&& this.maxDistanceMiles >= distanceMiles) {
			return this.flatRate;
		} else {
			return undefined;
		}
	}
}

module.exports = CustomCarrier;