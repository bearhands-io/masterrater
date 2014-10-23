function Rate(fromZip, toZip, weight, distanceMiles, cost, carrier) {
	this.fromZip = fromZip;
	this.toZip = toZip;
	this.distanceMiles = distanceMiles;
	this.weight = weight;
	this.cost = cost;
	this.carrier = carrier;

	this.isApproved = function(orderPrice) {
		if(this.cost !== undefined && orderPrice !== undefined && (this.cost / orderPrice) < .03) {
			return true;
		}

		return false;
	}
}

module.exports = Rate;