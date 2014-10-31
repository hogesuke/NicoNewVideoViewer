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
			return VideoService.reqList(1, $scope.itemsPerPage);
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
			$scope.videos = [];
			$scope.isLoading = true;

			VideoService.reqList($scope.currentPage, $scope.itemsPerPage).then(function(videos) {
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
			return VideoService.reqMyList(1, $scope.itemsPerPage);
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
			$scope.videos = [];
			$scope.isLoading = true;

			VideoService.reqMyList($scope.currentPage, $scope.itemsPerPage).then(function(videos) {
				$scope.videos = videos;
				$scope.isLoading = false;
			});
		};

		$scope.formatPostDatetime = VideoService.formatPostDatetime;
	}
]);

stockVideosControllers.controller('MyContributorController', ['$scope', 'ContributorService', 'TabService',
	function($scope, ContributorService, TabService) {
		$scope.totalItems = 0;
		$scope.itemsPerPage = 20;
		$scope.currentPage = 1;
		$scope.maxSize = 3;
		$scope.isLoading = true;

		ContributorService.reqCount().then(function(count) {
			$scope.totalItems = count;
		}).then(function() {
			return ContributorService.reqMyList(1, $scope.itemsPerPage);
		}).then(function(contributors) {
			$scope.isLoading = false;
			$scope.contributors = contributors;
		});

		$scope.pageChanged = function() {
			$scope.contributors = [];
			$scope.isLoading = true;

			ContributorService.reqMyList($scope.currentPage, $scope.itemsPerPage).then(function(contributors) {
				$scope.contributors = contributors;
				$scope.isLoading = false;
			});
		};

		$scope.delete = ContributorService.delete;

		$scope.addTab = function(id, name, partial, contributorId) {
			TabService.addTab(id, name, partial, contributorId);
		};

		$scope.submit = function() {
			var deferred = ContributorService.submit($scope.contributor.id);
			deferred.then(function(contributors) {
				$scope.contributors = contributors;
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
			return VideoService.reqContributorList(1, $scope.itemsPerPage, contributorId);
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
			$scope.isLoading = true;

			VideoService.reqContributorList($scope.currentPage, $scope.itemsPerPage, contributorId).then(function(videos) {
				$scope.videos = videos;
				$scope.isLoading = false;
			});
		};

		$scope.formatPostDatetime = VideoService.formatPostDatetime;
	}
]);
