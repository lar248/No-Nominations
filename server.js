// SET UP
var express  = require('express');
var app      = express();
var mongoose = require('mongoose'); 
var port  	 = process.env.PORT || 8080;
var database = require('./config/database'); //Need to update the database later
var morgan   = require('morgan'); //for logging requests to console
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// CONFIGURATION
mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io OR WHATEVER I DECIDE TO USE
app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

app.listen(port);
console.log("App listening on port " + port);

