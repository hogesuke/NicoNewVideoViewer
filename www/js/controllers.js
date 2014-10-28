var stockVideosControllers = angular.module('stockVideosControllers', ['ui.bootstrap']);

stockVideosControllers.controller('VideoListController', ['$scope', 'VideoService',
	function($scope, VideoService) {
		$scope.totalItems = 0;
		$scope.itemsPerPage = 20;
		$scope.currentPage = 1;

		VideoService.reqVideosCount().then(function(count) {
			$scope.totalItems = count;
		}).then(function() {
			return VideoService.reqList(1);
		}).then(function(videos) {
			$scope.videos = videos;
		});

		$scope.watched = function(videoIndex) {
			VideoService.watched($scope.videos[videoIndex].id).then(function(result) {
				$scope.videos[videoIndex].watched = result;
			});
		}

		$scope.setPage = function (pageNo) {
			$scope.currentPage = pageNo;
		};

		$scope.pageChanged = function() {
			var deferred = VideoService.reqList($scope.currentPage);
			deferred.then(function(videos) {
				$scope.videos = videos;
			});
		};

		$scope.formatPostDatetime = VideoService.formatPostDatetime;
	}
]);

stockVideosControllers.controller('VideoListTabsController', ['$scope',
	function($scope) {
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
		$scope.totalItems = 0;
		$scope.itemsPerPage = 20;
		$scope.currentPage = 1;

		VideoService.reqMyVideosCount().then(function(count) {
			$scope.totalItems = count;
		}).then(function() {
			return VideoService.reqMyList(1);
		}).then(function(videos) {
			$scope.videos = videos;
		});

		$scope.watched = function(videoIndex) {
			VideoService.watched($scope.videos[videoIndex].id).then(function(result) {
				$scope.videos[videoIndex].watched = result;
			});
		}

		$scope.setPage = function (pageNo) {
			$scope.currentPage = pageNo;
		};

		$scope.pageChanged = function() {
			var deferred = VideoService.reqMyList($scope.currentPage);
			deferred.then(function(videos) {
				$scope.videos = videos;
			});
		};

		$scope.formatPostDatetime = VideoService.formatPostDatetime;
	}
]);

stockVideosControllers.controller('MyContributorController', ['$scope', 'ContributorService',
	function($scope, ContributorService) {
		var deferred = ContributorService.reqMyList();
		deferred.then(function(data) {
			$scope.contributors = data;
		});

		$scope.delete = ContributorService.delete;
	}
]);

stockVideosControllers.controller('AddMyContributorController', ['$scope', 'ContributorService',
	function($scope, ContributorService) {
		$scope.submit = function() {
			var deferred = ContributorService.submit($scope.contributor.id);
			deferred.then(function() {
				// TODO
				console.debug('complete');
			});
		};
	}
]);
