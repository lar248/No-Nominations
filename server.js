// SET UP
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var port  	 = process.env.PORT || 8080;
var database = require('./config/database'); //Need to update the database later
var morgan   = require('morgan'); //for logging requests to console
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var passport = require('passport');
var flash    = require('connect-flash');
var session      = require('express-session');
var cookieParser = require('cookie-parser');


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

require('./config/passport')(passport); // pass passport for configuration

// CONFIGURATION
// required for express

app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs'); //set up ejs for templating

// required for passport
app.use(cookieParser());
app.use(session({ 
    secret: 'oneflewoverthecuckoosnest',
    resave: false 
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// ROUTES
require('./app/routes.js')(app, passport);

app.listen(port);
console.log("App listening on port " + port);

