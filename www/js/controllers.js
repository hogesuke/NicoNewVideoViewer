var stockVideosControllers = angular.module('stockVideosControllers', ['ui.bootstrap']);

stockVideosControllers.controller('VideoListController', ['$scope', 'VideoService',
	function($scope, VideoService) {
		$scope.totalItems = 0;
		$scope.itemsPerPage = 20;
		$scope.currentPage = 1;
		$scope.isLoading = true;

		VideoService.reqVideosCount().then(function(count) {
			$scope.totalItems = count;
		}).then(function() {
			return VideoService.reqList(1);
		}).then(function(videos) {
			$scope.videos = videos;
			$scope.isLoading = false;
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
			$scope.videos = [];
			$scope.isLoading = true;

			deferred.then(function(videos) {
				$scope.videos = videos;
				$scope.isLoading = false;
			});
		};

		$scope.formatPostDatetime = VideoService.formatPostDatetime;
	}
]);

stockVideosControllers.controller('VideoListTabsController', ['$scope', 'TabService',
	function($scope, TabService) {
		$scope.tabs = TabService.getTabs();
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
		$scope.isLoading = true;

		VideoService.reqMyVideosCount().then(function(count) {
			$scope.totalItems = count;
		}).then(function() {
			return VideoService.reqMyList(1);
		}).then(function(videos) {
			$scope.videos = videos;
			$scope.isLoading = false;
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
			$scope.videos = [];
			$scope.isLoading = true;

			deferred.then(function(videos) {
				$scope.videos = videos;
				$scope.isLoading = false;
			});
		};

		$scope.formatPostDatetime = VideoService.formatPostDatetime;
	}
]);

stockVideosControllers.controller('MyContributorController', ['$scope', 'ContributorService', 'TabService',
	function($scope, ContributorService, TabService) {
		var deferred = ContributorService.reqMyList();
		deferred.then(function(data) {
			$scope.contributors = data;
		});

		$scope.delete = ContributorService.delete;

		$scope.addTab = function(id, name, partial, contributorId) {
			TabService.addTab(id, name, partial, contributorId);
		};
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

stockVideosControllers.controller('ContributorVideoListController', ['$scope', 'VideoService', 'TabService',
	function($scope, VideoService, TabService) {
		$scope.totalItems = 0;
		$scope.itemsPerPage = 20;
		$scope.currentPage = 1;
		$scope.isLoading = true;
		var contributorId = TabService.getContributorId();

		VideoService.reqContributorVideosCount(contributorId).then(function(count) {
			$scope.totalItems = count;
		}).then(function() {
			return VideoService.reqContributorList(1, contributorId);
		}).then(function(videos) {
			$scope.videos = videos;
			$scope.isLoading = false;
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
			var deferred = VideoService.reqContributorList($scope.currentPage);
			$scope.isLoading = true;

			deferred.then(function(videos) {
				$scope.videos = videos;
				$scope.isLoading = false;
			});
		};

		$scope.formatPostDatetime = VideoService.formatPostDatetime;
	}
]);
