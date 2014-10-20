var express = require('express'),
    http = require('http');



////////////////////////////////////////////
// configs
////////////////////////////////////////////
var port = 3000;

////////////////////////////////////////////
// create server
////////////////////////////////////////////
var app = express();

app.use(express.static(__dirname + '/public')); // so we can access static resources

app.set('port', port);
app.set('view engine', 'ejs'); // to load .ejs files
app.set('views', __dirname + '/lib/mvc/views'); // where .ejs files are located

require('./lib/bootstrap.js')(app); // wires the app together

////////////////////////////////////////////
// fire it up, eh
////////////////////////////////////////////
console.log('Listening on port ' + port);
app.listen(port);
// otherwise, 
// http.createServer(app).listen(app.get('port', onServerStart))