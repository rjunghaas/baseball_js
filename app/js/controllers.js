// Register controller
var baseballApp = angular.module('baseballAppCntl',[]).
controller('baseballController', function($scope, $http) {
	
	// Initializing Data
	$scope.formData = {};
	$scope.formData.message = "VORP for Player from mm/dd/yyyy to mm/dd/yyyy.";
	
	// Use $http service to POST for player search
	$scope.search = function() {
		$http({
			method: 'POST',
			url: '/players/search',
			data: $scope.formData,
			headers: { 'Content-Type': 'application/json' }
		})
		.success(function(res) {
			$scope.formData.name = res.data.name;
		});
	}

	// Use $http service to POST for web site scraping and VORP calculation
	$scope.processForm = function() {
		$http({
			method: 'POST',
			url: '/players/scrape',
			data: $scope.formData,
			headers: { 'Content-Type': 'application/json' }
		})
		.success(function(res) {
			$scope.formData.vorp = res.data.VORP;
			$scope.formData.message = "VORP for " + $scope.formData.name + " from " + $scope.formData.start_date + " to " + $scope.formData.end_date + " is " + $scope.formData.vorp + ".";
		});
	}
});