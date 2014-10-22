Shipping
================
Hackathoning, here. Good stuff

Overview
- express app engine
- ejs for templating
- CTS and Google apis
- static js/css for in-page logic/presentation

------------------------------------------------
Presentation Layer
------------------------------------------------

RateController
- GET
	- get form view
- POST
	- validate
	- get rates for toZip/weight combo, assume presorted with cheapest at op
	- hard-coded fromZip list

------------------------------------------------
Business Layer (services)
------------------------------------------------

RateService
- getRates(fromZips, toZip, weight)
	- calculate and aggregate all the shipping rate combinations
	- sort results from cheapest to most expensive
	- currently using CTS and custom SouthEastern rating algorithms

------------------------------------------------
Domain Objects (data structures)
------------------------------------------------

Rate
- fromZip
- toZip
- weight
- distance
- carrier
- cost