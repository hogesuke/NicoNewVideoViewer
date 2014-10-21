var stockVideosControllers = angular.module('stockVideosControllers', []);

stockVideosControllers.controller('VideoListController', ['$scope', 'VideoService',
	function($scope, VideoService) {
		var deferred = VideoService.reqList();
		deferred.then(function(videos) {
			$scope.videos = videos;
		})
	}
]);

stockVideosControllers.controller('VideoDetailController', ['$scope', '$routeParams', 'VideoService',
	function($scope, $routeParams, VideoService) {
		var deferred = VideoService.reqDetail($routeParams.videoId);
		deferred.then(function(data) {
			$scope.video = data;
		});
	}
]);

stockVideosControllers.controller('MyVideoListController', ['$scope', 'VideoService',
	function($scope, VideoService) {
		var deferred = VideoService.reqMyList();
		deferred.then(function(data) {
			$scope.videos = data;
		})
	}
]);

stockVideosControllers.controller('MyContributorController', ['$scope', '$http',
	function($scope, $http) {
		$http({
			method : 'get',
			url    : '/api/my/contributors/'
		}).success(function(data) {
			// TODO
			console.debug('sccess');
			$scope.contributors = data;
		}).error(function(data, status) {
			// TODO
			console.debug('error');
		});
	}
]);

stockVideosControllers.controller('AddMyContributorController', ['$scope', '$http',
	function($scope, $http) {
		$scope.submit = function(contributor) {
			$http({
				method : 'post',
				url    : '/api/my/contributors/',
				data   : {id: $scope.contributor.id}
			}).success(function(data) {
				// TODO
				console.debug('sccess');
			}).error(function(data, status) {
				// TODO
				console.debug('error');
			});
		};
	}
]);
