var mongoose = require('mongoose');

module.exports = mongoose.model('Ballot', {
	picks: {type : Array, default: ''}
});