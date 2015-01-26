angular.module('NominationsService', [])
	//each function returns a promise object
	.factory('Ballots', ['$http', function($http) {
		return {
			get: function() {
				return $http.get('/api/ballots');
			},
			create: function(nominationData) {
				return $http.post('/api/ballots', nominationData);
			}
		}
	}]);