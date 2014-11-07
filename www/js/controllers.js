var stockVideosControllers = angular.module('stockVideosControllers', ['ui.bootstrap']);

stockVideosControllers.controller('VideoListController', ['$scope', 'VideoService', 'AlertService',
	function($scope, VideoService, AlertService) {
		$scope.totalItems = 0;
		$scope.itemsPerPage = 20;
		$scope.currentPage = 1;
		$scope.isLoading = true;
		$scope.alerts = [];

		VideoService.reqVideosCount().then(function (count) {
			$scope.totalItems = count;
		}).then(function() {
			return VideoService.reqList(1, $scope.itemsPerPage);
		}).then(function(videos) {
			$scope.videos = videos;
			$scope.isLoading = false;
		}, function() {
			$scope.isLoading = false;
			AlertService.addAlert($scope.alerts, 'ビデオリストを取得できませんでした。しばらくしてからリロードしてください。', 'danger');
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

		$scope.closeAlert = AlertService.closeAlert;
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

stockVideosControllers.controller('MyVideoListController', ['$scope', 'VideoService', 'AlertService', 'AuthorizeService',
	function($scope, VideoService, AlertService, AuthorizeService) {
		$scope.totalItems = 0;
		$scope.itemsPerPage = 20;
		$scope.currentPage = 1;
		$scope.isLoading = true;
		$scope.isUnAuthorized = false;
		$scope.alerts = [];

		AuthorizeService.reqAuthorizeStatus().then(function() {
			// NOP
		}, function() {
			$scope.isUnAuthorized = true;
			return $.Deferred().reject().promise();
		}).then(VideoService.reqMyVideosCount).then(function(count) {
			$scope.totalItems = count;
		}).then(function() {
			return VideoService.reqMyList(1, $scope.itemsPerPage);
		}).then(function(videos) {
			$scope.videos = videos;
			$scope.isLoading = false;
		}, function() {
			$scope.isLoading = false;
			if ($scope.isUnAuthorized) {
				AlertService.addAlert($scope.alerts, 'ログインするとマイビデオリストをご利用になれます。', 'info');
			} else {
				AlertService.addAlert($scope.alerts, 'ビデオリストを取得できませんでした。しばらくしてからリロードしてください。', 'danger');
			}
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

		$scope.closeAlert = AlertService.closeAlert;
	}
]);

stockVideosControllers.controller('MyContributorController', ['$scope', 'ContributorService', 'TabService', 'AlertService', 'AuthorizeService',
	function($scope, ContributorService, TabService, AlertService, AuthorizeService) {
		$scope.totalItems = 0;
		$scope.itemsPerPage = 2;
		$scope.currentPage = 1;
		$scope.isLoading = true;
		$scope.isUnAuthorized = false;
		$scope.alerts = [];

		AuthorizeService.reqAuthorizeStatus().then(function() {
			// NOP
		}, function() {
			$scope.isUnAuthorized = true;
			return $.Deferred().reject().promise();
		}).then(ContributorService.reqCount).then(function(count) {
			$scope.totalItems = count;
		}).then(function() {
			return ContributorService.reqMyList(1, $scope.itemsPerPage);
		}).then(function(contributors) {
			$scope.isLoading = false;
			$scope.contributors = contributors;
		}, function() {
			$scope.isLoading = false;
			if (!$scope.isUnAuthorized) {
				AlertService.addAlert($scope.alerts, 'お気に入りユーザーを取得できませんでした。', 'danger');
			}
		});

		$scope.pageChanged = function() {
			$scope.contributors = [];
			$scope.isLoading = true;

			ContributorService.reqMyList($scope.currentPage, $scope.itemsPerPage).then(function(contributors) {
				$scope.contributors = contributors;
				$scope.isLoading = false;
			});
		};

		$scope.delete = function(contributorId) {
			ContributorService.delete(contributorId, $scope.itemsPerPage, $scope.currentPage).then(function(contributors) {
				console.debug(contributors);
				$scope.contributors = contributors;
			}, function() {
				AlertService.addAlert($scope.alerts, 'ユーザーの削除に失敗しました。', 'danger');
			});
		}

		$scope.addTab = function(id, name, partial, contributorId) {
			TabService.addTab(id, name, partial, contributorId);
		};

		$scope.submit = function() {
			var deferred = ContributorService.submit($scope.contributor.id);
			deferred.then(function(contributors) {
				$scope.contributors = contributors;
			});
		};

		$scope.closeAlert = AlertService.closeAlert;

		$scope.login = function() {
			AuthorizeService.login().then(function() {
				// NOP
			}, function() {
				$scope.addAlert($scope.alerts, 'ログインに失敗しました。', 'danger');
			});
		}
	}
]);

stockVideosControllers.controller('ContributorVideoListController', ['$scope', 'VideoService', 'TabService', 'AlertService',
	function($scope, VideoService, TabService, AlertService) {
		$scope.totalItems = 0;
		$scope.itemsPerPage = 20;
		$scope.currentPage = 1;
		$scope.isLoading = true;
		$scope.alerts = [];
		var contributorId = TabService.getContributorId();

		VideoService.reqContributorVideosCount(contributorId).then(function(count) {
			$scope.totalItems = count;
		}, function() {
			$scope.isLoading = false;
			AlertService.addAlert($scope.alerts, 'ビデオリストを取得できませんでした。しばらくしてからリロードしてください。', 'danger');
			return $.Deferred().reject().promise();
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

		$scope.closeAlert = AlertService.closeAlert;
	}
]);
