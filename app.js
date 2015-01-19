(function() {
	var app = angular.module('nominations', []);
	app.controller('NominationsController', function($scope, $http) {
		$http.get('oscars_2015.json').
			success(function(data) {
				$scope.nominations = data;
				console.log("noms:", $scope.nominations)
			}).
			error(function(data) {
				console.log("error yooo")
			})
		
	});
	app.controller('FormController', function($scope) {
		$scope.formData = {};
		
	});
})();