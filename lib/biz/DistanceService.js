function DistanceService(app) {
	this.getDistanceMiles = function(fromZip, toZip) {
		// TODO: hit google services
		return Math.floor((Math.random() * 1000) + 1); // random between 1 - 1000
	}
}

module.exports = DistanceService;