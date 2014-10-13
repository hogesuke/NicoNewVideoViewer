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

stockVideosControllers.controller('VideoDetailController', ['$scope', '$http', '$routeParams',
	function($scope, $http, $routeParams) {
		$http({
			method : 'get',
			url    : '/api/videos/' + $routeParams.videoId
		}).success(function(data) {
			$scope.video = data.nicovideo_thumb_response.thumb;
		}).error(function(data, status) {
			// TODO
			$scope.video = {text: 'error'};
		})
	}
]);
