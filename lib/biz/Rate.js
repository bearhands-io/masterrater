function Rate(fromZip, toZip, weight, distanceMiles, cost, carrier) {
	this.fromZip = fromZip;
	this.toZip = toZip;
	this.distanceMiles = distanceMiles;
	this.weight = weight;
	this.cost = cost;
	this.carrier = carrier;
	

	switch(fromZip){
	case 30071:
       warehouse = "Norcross";
       break; 
   case 70814:
       warehouse = "Baton Rouge";
       break; 
   case 72114:
       warehouse = "Little Rock";
       break; 
   default: 
       warehouse = "Tampa"; 
	}

	this.isApproved = function(orderPrice) {
		if(this.cost !== undefined && orderPrice !== undefined && (this.cost / orderPrice) < .03) {
			return true;
		}

		return false;
	}

	this.warehouse = warehouse;
}

module.exports = Rate;