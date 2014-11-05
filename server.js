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
var app = express();

app.set('port', port);
app.set('view engine', 'ejs'); // to load .ejs files
app.set('views', __dirname + viewsDirectory); // where .ejs files are located
app.set('config', require('./lib/companyConfig.json'));

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + staticResourcesDir));

require('./lib/bootstrap.js')(app); // wires the app together

////////////////////////////////////////////
// fire it up, eh
////////////////////////////////////////////
console.log('Listening on port ' + port);
app.listen(port);
// otherwise, 
// http.createServer(app).listen(app.get('port', onServerStart))