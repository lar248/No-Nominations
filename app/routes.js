var Ballot = require('./models/ballot');

function getBallots(res) {
	Ballot.find(function(err, ballots) {
		if (err) {
			res.send(err);
		}

		res.json(ballots); //return all ballots in JSON format
	});
}

module.exports = function(app) {
	// API ----
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
			getBallots(res);
		});

	});

	// APPLICATION -----------
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};