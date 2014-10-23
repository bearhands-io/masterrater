function Rate(fromZip, toZip, weight, distanceMiles, cost, carrier) {
	this.fromZip = fromZip;
	this.toZip = toZip;
	this.distanceMiles = distanceMiles;
	this.weight = weight;
	this.cost = cost;
	this.carrier = carrier;
	this.warehouse = getWarehouse();

	this.isApproved = function(orderPrice) {
		if(this.cost !== undefined && orderPrice !== undefined && (this.cost / orderPrice) < .03) {
			return true;
		}

		return false;
	}

	function getWarehouse() {
		if(!this.fromZip) {
			return undefined;
		}

		switch(this.fromZip){
		case 30071:
			return 'Norcross';
		case 70814:
			return 'Baton Rouge';
		case 72114:
			return 'Little Rock';
		case 33619:
			return 'Tampa';
		default: 
			return 'Unknown';
		}
	}
}

module.exports = Rate;