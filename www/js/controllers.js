var stockVideosControllers = angular.module('stockVideosControllers', ['ui.bootstrap']);

stockVideosControllers.controller('VideoListController', ['$scope', 'VideoService',
	function($scope, VideoService) {
		$scope.totalItems = 1000;
		$scope.itemsPerPage = 20;
		$scope.currentPage = 1;

		var deferred = VideoService.reqList(1);
		deferred.then(function(videos) {
			$scope.videos = videos;
		});

		$scope.watched = VideoService.watched;

		$scope.setPage = function (pageNo) {
			$scope.currentPage = pageNo;
		};

		$scope.pageChanged = function() {
			var deferred = VideoService.reqList($scope.currentPage);
			deferred.then(function(videos) {
				$scope.videos = videos;
			});
		};
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
		$scope.totalItems = 1000;
		$scope.itemsPerPage = 20;
		$scope.currentPage = 1;

		var deferred = VideoService.reqMyList();
		deferred.then(function(data) {
			$scope.videos = data;
		})

		$scope.watched = VideoService.watched;

		$scope.setPage = function (pageNo) {
			$scope.currentPage = pageNo;
		};

		$scope.pageChanged = function() {
			console.debug($scope.currentPage);
			var deferred = VideoService.reqMyList($scope.currentPage);
			deferred.then(function(videos) {
				$scope.videos = videos;
			});
		};
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
			console.debug(ContributorService);
			var deferred = ContributorService.submit($scope.contributor.id);
			deferred.then(function() {
				// TODO
				console.debug('complete');
			});
		};
	}
]);
