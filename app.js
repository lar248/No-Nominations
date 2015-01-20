(function() {
	var app = angular.module('nominations', []);
	app.controller('NominationsController', function($scope, $http) {
		$http.get('oscars_2015.json').
			success(function(data) {
				$scope.nominations = data;
				$scope.formData = [];
				console.log("noms:", $scope.nominations)
			}).
			error(function(data) {
				console.log("error yooo")
			});
		//var formData = [];
		$scope.addNomToForm = function(short, nomination) {
			var category = {};
			category.nomination = nomination;
			category.short = short;
			var index = -1;
			for (var i=0; i<$scope.formData.length; i++) {
				if (angular.equals($scope.formData[i].short, short)) {
					index = i;
				}
			}
			if (index!=-1) {
				$scope.formData.splice(index, 1, category)
			} else {
				$scope.formData.push(category);
			}
			console.log($scope.formData)
		};
	});
})();