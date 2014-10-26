function ShipmentTrackingController(app) {
	var trackingService = app.services.trackingService;

	this.getShipmentTracking = function(req, res) {
		var shipmentId = req.query.shipmentId;
		var carrier = req.query.carrier;

		res.render('shipmentTracking', null);
	}
}

module.exports = ShipmentTrackingController;