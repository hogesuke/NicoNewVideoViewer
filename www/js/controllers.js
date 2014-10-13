var stockVideosControllers = angular.module('stockVideosControllers', []);

stockVideosControllers.controller('VideoListController', ['$scope', '$http',
	function($scope, $http) {
		$http({
			method : 'get',
			url    : '/api/videos/list/?page=1'
		}).success(function(data) {
			$scope.videos = data;
		}).error(function(data, status) {
			// TODO
		})
	}
]);
