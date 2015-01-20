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
			});
		//$scope.formData = [];
		var formData = [];
		console.log("yo")
		$scope.addNomToForm = function(short, nomination) {
			var category = {};
			category.nomination = nomination;
			category.short = short;
			var index = -1;
			for (var i=0; i<formData.length; i++) {
				if (angular.equals(formData[i].short, short)) {
					index = i;
				}
			}
			if (index!=-1) {
				formData.splice(index, 1, category)
			} else {
				formData.push(category);
			}
			console.log(formData)
		};
	});
})();