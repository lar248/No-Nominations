angular.module('NominationsController', [])
	//inject Ballot service factory into our controller
	.controller('MainController', ['$scope', '$http', 'Ballots', function($scope, $http, Ballots) {
		$scope.formData = [];
		$scope.loading = true;
		$http.get('../../data/oscars_2015.json').
			success(function(data) {
				$scope.nominations = data;
			}).
			error(function(data) {
				console.log("error yooo")
			});

		Ballots.get()
			.success(function(data) {
				$scope.ballots = data;
				$scope.loading = false;
			})

		$scope.addNomToForm = function(short, nomination) {
			this.category = {};
			this.category.nomination = nomination;
			this.category.short = short;
			var index = -1;
			for (var i=0; i<$scope.formData.length; i++) {
				if (angular.equals($scope.formData[i].short, short)) {
					index = i;
				}
			}
			if (index!=-1) {
				$scope.formData.splice(index, 1, this.category)
			} else {
				$scope.formData.push(this.category);
			}
		};

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
			if ($scope.formData != undefined) {
				$scope.loading = true;
				console.log("$scope.formData: ", $scope.formData)

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