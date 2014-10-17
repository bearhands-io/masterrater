Shipping
================
Hackathoning, here. Good stuff

------------------------------------------------
Presentation Layer
------------------------------------------------

view
	- html/js/css

model
	- from zips (hardcoded warehouse locations)
	- to zip
	- weight
	- order amount
	- shipping rates (sorted cheapest to most expensive)
		- distance
		- duration
		- cost
		- service name

controller
	- validate
	- compile rates to multiple destinations
		- get distances
		- get rates for distances
		- populate and sort rates in model (cheapest at top)

------------------------------------------------
Business Layer (services)
------------------------------------------------

Distance Service
- getDistance(fromZip, toZip)
	- get from cache?
		- return from results cache
	- else
		- google services
		- commit to cache
		- return results
- cacheDistance(fromZip, toZip, distance, duration)

Rate service
- getRates(from zip, to zip, distance)
	- CTS ratings
	- SouthEastern ratings (custom)

------------------------------------------------
Data Access Layer 
------------------------------------------------

DistanceDao
- saveDistance(fromZip, toZip, distance, duration)
- getDistance(fromZip, toZip)

RatesDao
- saveRate(distanceRid, cost)
- getRate(distanceRid)

------------------------------------------------
Domain Objects (data structures)
------------------------------------------------

Trip/Distance
	- id
	- from zip
	- to zip
	- distance
	- duration

ShippingRate
	- DistanceId
	- scac (carrier code)
	- fuel surcharge

Carrier
	- id
	- scac (carrier code)
