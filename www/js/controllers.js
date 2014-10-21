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

stockVideosControllers.controller('MyContributorController', ['$scope', 'ContributorService',
	function($scope, ContributorService) {
		var deferred = ContributorService.reqMyList();
		deferred.then(function(data) {
			$scope.contributors = data;
		});
	}
]);

stockVideosControllers.controller('AddMyContributorController', ['$scope', 'ContributorService',
	function($scope, ContributorService) {
		$scope.submit = function() {
			console.debug(ContributorService);
			var deferred = ContributorService.submit($scope.contributor.id);
			deferred.then(function() {
				// TODO
				console.debug('complete');
			});
		};
	}
]);
