var Ballot = require('./models/ballot');

function getBallots(res) {
	Ballot.find(function(err, ballots) {
		if (err) {
			res.send(err);
		}

		res.json(ballots); //return all ballots in JSON format
	});
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = function(app) {
	// API ----
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
    // app.post('/signup', do all our passport stuff here);

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



	// get all ballots
	app.get('/api/ballots', function(req, res) {
		//use mongoose to get all ballots in database
		getBallots(res);
	});

	// create ballot and send back all ballots after creation
	app.post('/api/ballots', function(req, res) {
		console.log("req.body: ", req.body)
		//create a ballot, information comes from AJAX request from Angular
		Ballot.create({
			picks: req.body,
			done: false
		}, function(err, ballot) {
			if (err) {
				res.send(err);
			}
			//get and return all ballots after you create another
			//getBallots(res);

		});
		res.redirect('/my.html');

	});

	// APPLICATION -----------
	app.get('/', function(req, res) {
		res.render('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};