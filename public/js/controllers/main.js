angular.module('NominationsController', [])
	//inject Ballot service factory into our controller
	.controller('MainController', ['$scope', '$http', 'Ballots', function($scope, $http, Ballots) {
		$scope.formData = [];
		$scope.loading = true;
		$http.get('../data/oscars_2015.json').
			success(function(data) {
				$scope.nominations = data;
				console.log("noms:", $scope.nominations)
			}).
			error(function(data) {
				console.log("error yooo")
			});

		// GET ========
		// When landing on the page, get all ballots and show them
		// Use the service to get all ballots
		Ballots.get()
			.success(function(data) {
				$
			})
	}]);