var stockVideosControllers = angular.module('stockVideosControllers', []);

stockVideosControllers.controller('VideoListController', ['$scope', '$http',
	function($scope, $http) {
		$http({
			method : 'get',
			url    : '/api/videos/list/?page=1'
		}).success(function(videos) {
			$scope.videos = [];
			$.each(videos, function(i, video) {
				$http({
					method : 'get',
					url    : '/api/videos/' + video.id
				}).success(function(data) {
					data.serial_no = video.serial_no;
					$scope.videos.push(data);
				}).error(function(data, status) {
					// TODO
				})
			})
		}).error(function(data, status) {
			// TODO
		});

		$scope.piyo = {aaa: 'bbb'};
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
		});
	}
]);

stockVideosControllers.controller('MyVideoListController', ['$scope', '$http',
	function($scope, $http) {
		$http({
			method : 'get',
			url    : '/api/my/videos/'
		}).success(function(data) {
			// TODO
			console.debug('sccess');
			$scope.videos = data;
		}).error(function(data, status) {
			// TODO
			console.debug('error');
		});
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
