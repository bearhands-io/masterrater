Shipping
================
Hackathoning, here. Good stuff

Overview
- express app engine
- ejs for templating
- CTS and Google apis
- static js/css for in-page logic/presentation
	- jQuery
	- twitter bootstrap

------------------------------------------------
Presentation Layer
------------------------------------------------

RateController
- getForm (GET)
	- render form view page
- getShippingRates (GET)
	- validate inputs
	- assumes hard-coded fromZip list
	- get rates for toZip/fromZip/weight combo, assume results are presorted with cheapest at op

------------------------------------------------
Business Layer
------------------------------------------------

RateService
- getRates(fromZips, toZip, weight)
	- calculate and aggregate all the shipping rate combinations
	- sort results from cheapest to most expensive
	- currently using CTS and custom SouthEastern rating algorithms

TrackingService
- trackShipment(carrier, shipmentId)
	- integrates with multiple carriers for tracking
		- Wilson Trucking
		- AAA Cooper Transport
		- Averitt
		- UPS
		- R&L

------------------------------------------------
Objects
------------------------------------------------

Rate
- fromZip
- toZip
- weight
- distance
- carrier
- cost