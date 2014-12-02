var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

////////////////////////////////////////////
// configs
////////////////////////////////////////////
var config = require('./lib/appConfig');
var port = config.port || 8080;
var staticResourcesDir = config.staticResourcesDirectory || '/public'; // css, js for page logic, images, etc...
var viewsDirectory = config.viewsDirectory || '/views'; // .ejs files

////////////////////////////////////////////
// create server
////////////////////////////////////////////

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./lib/config/database.js');

var app = express();

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

mongoose.connect(configDB.url); // connect to our database

require('./lib/config/passport')(passport); // pass passport for configuration

app.set('port', port);
app.set('view engine', 'ejs'); // to load .ejs files
app.set('views', __dirname + viewsDirectory); // where .ejs files are located
app.set('config', require('./lib/companyConfig.json'));

// app.use(bodyParser.json());
//shit starts here
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + staticResourcesDir));

require('./lib/bootstrap.js')(app, passport); // wires the app together

// routes ======================================================================
//require('./lib/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


////////////////////////////////////////////
// fire it up, eh
////////////////////////////////////////////
console.log('Listening on port ' + port);
app.listen(port);
// otherwise, 
// http.createServer(app).listen(app.get('port', onServerStart))