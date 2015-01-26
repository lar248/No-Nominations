angular.module('NominationsController', [])
	//inject Ballot service factory into our controller
	.controller('MainController', ['$scope', '$http', 'Ballots', function($scope, $http, Ballots) {
		$scope.formData = [];
		$scope.loading = true;
		$http.get('../../data/oscars_2015.json').
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
				$scope.ballots = data;
				$scope.loading = false;
			});

		// CREATE ========
		// When submitting the ballot form, send the ballot to the node API
		$scope.createBallot = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.picks != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Ballots.create($scope.formData)
					//if successful creation, call our get function to get all new ballots
					.success(function(data) {
						$scope.loading = false;
						$scope.ballots = data; //assign our new list of ballots
					});
			}
		};
	}]);