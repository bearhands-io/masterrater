var CompanyDao = require('./dao/CompanyDao');

var CompanyService = require('./biz/CompanyService'),
    RatingService = require('./biz/RatingService'),
	TrackingService = require('./biz/TrackingService');

var CompanySaveController = require('./mvc/controllers/CompanySaveController'),
    DefaultController = require('./mvc/controllers/DefaultController'),
    RatesController = require('./mvc/controllers/RatesController'),
    TrackingController = require('./mvc/controllers/TrackingController');
    ClaimList = require('./mvc/controllers/ClaimList');

module.exports = function(app, passport) {
	app.daos = {
		companyDao : new CompanyDao(app)
	}

	// init services
	app.services = {
		companyService : new CompanyService(app),
		ratingService : new RatingService(app),
		trackingService : new TrackingService(app)
	};

	// init controllers
	app.controllers = {
		companySaveController : new CompanySaveController(app),
		defaultController : new DefaultController(app),
		ratesController : new RatesController(app),
		trackingController : new TrackingController(app),
        claimList : new ClaimList(app)
	};

    //no idea where else to put this, thought this was the same as the thing initialized above
    var claimList = new ClaimList('mongodb://seantest:seantest@ds049130.mongolab.com:49130/bearhandsio');

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    //app.get('/', function(req, res) {
    //    res.render('index.ejs'); // load the index.ejs file
    //}); 

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================
    // CLAIMS STARTS HERE
    // =====================
    app.get('/claims.html', isLoggedIn, app.controllers.claimList.showClaims.bind(claimList));
    app.post('/addclaim', isLoggedIn, app.controllers.claimList.addClaim.bind(claimList));
    app.post('/completeclaim', isLoggedIn, app.controllers.claimList.completeClaim.bind(claimList));

	// =====================
	// RATES STARTS HERE
	// =====================

	app.get('/index.html', isLoggedIn, app.controllers.ratesController.getForm);
	app.get('/rates.html', isLoggedIn, app.controllers.ratesController.getForm);

	app.get('/company/save.html', isLoggedIn, app.controllers.companySaveController.getForm);
	app.post('/company/save.html', isLoggedIn, app.controllers.companySaveController.submitForm);
	
	app.get('/rates/', errorOut, app.controllers.ratesController.getShippingRates);

	app.get('/shipmentTracking.html', isLoggedIn, app.controllers.trackingController.getShipmentTracking);

    // =====================
    // HOMEPAGE/ELSE STARTS HERE
    // =====================

    app.get('/', function(req, res) {
        res.render('carousel.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

	app.get('*', app.controllers.defaultController.notFound);

};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}

function errorOut(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	} else {
		res.status(401).send("Must login!");
	}
}