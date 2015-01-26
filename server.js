// SET UP
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var port  	 = process.env.PORT || 8080;
var database = require('./config/database'); //Need to update the database later
var morgan   = require('morgan'); //for logging requests to console
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)




// DATABASE CONFIGURATION
// connect to mongoDB database on modulus.io OR WHATEVER I DECIDE TO USE
mongoose.connect(database.url, function(error) {
	if (error) {
		console.log(error);
	}
}); 	

/*
var UserSchema = new Schema({
    first_name: String,
    email: String
});

// Mongoose Model definition
var User = mongoose.model('users', UserSchema);
app.get('/', function (req, res) {
    res.send("<a href='/users'>Show Users</a>");
});

app.get('/users', function (req, res) {
    User.find({}, function (err, docs) {
        res.json(docs);
    });
});
*/


// CONFIGURATION
app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

// ROUTES
require('./app/routes.js')(app);

app.get('/hi', function(req, res) {
	//res.send('hello world yo');
	res.end('at the end i guess');
});

app.listen(port);
console.log("App listening on port " + port);

