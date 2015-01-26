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
	//get all ballots

	//creat ballot and send back all ballots after creation
	app.post('/api/ballots', function(res, req) {

		//create a ballot, information comes from AJAX request from Angular
		Ballot.create({
			picks: //NOT SURE WHAT TO PUT HERE
		}, function(err, ballot) {
			if (err) {
				res.send(err);
			}
			//get and return all ballots after you create another
			getBallots(res);
		});

	});
};