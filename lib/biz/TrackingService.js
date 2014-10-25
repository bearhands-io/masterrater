var ShipmentTrack = require('./ShipmentTrack');

function TrackingService(app) {
	this.trackShipment = function(shipmentId, carrier, callback) {

		var callback = function(results) {
			var track = new ShipmentTrack();
			callback(track);
		}
	}
}

module.exports = TrackingService;