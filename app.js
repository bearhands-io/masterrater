var express = require('express');
var app = express();

require('./lib/bootstrap.js')(app);

console.log('Listening on port 3000');
app.listen(3000);