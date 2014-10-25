function ShipmentTracking(shipmentId, carrier, origin, destination, events) {
	this.shipmentId = shipmentId;
	this.carrier = carrier;
	this.origin = origin;
	this.destination = destination;
	this.events = [];
}

module.exports = ShipmentTracking;