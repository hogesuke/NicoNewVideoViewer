var stockVideosControllers = angular.module('stockVideosControllers', ['ui.bootstrap']);

stockVideosControllers.controller('VideoListController', ['$scope', 'VideoService', 'AlertService', 'AuthorizeService',
	function($scope, VideoService, AlertService, AuthorizeService) {
		$scope.totalItems = 0;
		$scope.itemsPerPage = 20;
		$scope.currentPage = 1;
		$scope.isLoading = true;
		$scope.unwatchOnly = VideoService.getUnwatchOnly('all');
		$scope.alerts = [];

		AuthorizeService.reqAuthorizeStatus().then(function () {
			$scope.isUnAuthorized = false;
		}, function () {
			$scope.isUnAuthorized = true;
		});

		var reqVideoList = function() {
			$scope.currentPage = 1;
			$scope.isLoading = true;
			$scope.videos = [];
			VideoService.reqVideosCount($scope.unwatchOnly).then(function (count) {
				$scope.totalItems = count;
			}).then(function () {
				return VideoService.reqList(1, $scope.itemsPerPage, $scope.unwatchOnly);
			}).then(function (videos) {
				$scope.videos = videos;
				$scope.isLoading = false;
			}, function () {
				$scope.isLoading = false;
				AlertService.addAlert($scope.alerts, 'ビデオリストを取得できませんでした。しばらくしてからリロードしてください。', 'danger');
			});
		};

		reqVideoList();

		$scope.watched = function(videoIndex) {
			VideoService.watched($scope.videos[videoIndex].id).then(function(result) {
				$scope.videos[videoIndex].watched = result;
			});
		}

		$scope.toggleUnwatchOnly = function() {
			$scope.unwatchOnly = $scope.unwatchOnly ? false : true;
			VideoService.setUnwatchOnly($scope.unwatchOnly, 'all');
			reqVideoList();
		}

		$scope.setPage = function (pageNo) {
			$scope.currentPage = pageNo;
		};

		$scope.pageChanged = function() {
			$scope.videos = [];
			$scope.isLoading = true;

			VideoService.reqList($scope.currentPage, $scope.itemsPerPage, $scope.unwatchOnly).then(function(videos) {
				$scope.videos = videos;
				$scope.isLoading = false;
			}, function() {
				$scope.isLoading = false;
				$scope.alerts = [];
				AlertService.addAlert($scope.alerts, 'ビデオリストを取得できませんでした。しばらくしてからリロードしてください。', 'danger');
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
		$scope.unwatchOnly = VideoService.getUnwatchOnly('my');
		$scope.isUnAuthorized = false;
		$scope.alerts = [];

		var reqVideoList = function() {
			$scope.currentPage = 1;
			$scope.isLoading = true;
			$scope.videos = [];
			AuthorizeService.reqAuthorizeStatus().then(function () {
				// NOP
			}, function () {
				$scope.isUnAuthorized = true;
				return $.Deferred().reject().promise();
			}).then(function() {
				return VideoService.reqMyVideosCount($scope.unwatchOnly);
			}).then(function (count) {
				$scope.totalItems = count;
				if (count <= 0) {
					return $.Deferred().reject().promise();
				}
			}).then(function () {
				return VideoService.reqMyList(1, $scope.itemsPerPage, $scope.unwatchOnly);
			}).then(function (videos) {
				$scope.videos = videos;
				$scope.isLoading = false;
			}, function () {
				$scope.isLoading = false;
				if ($scope.isUnAuthorized) {
					AlertService.addAlert($scope.alerts, 'ログインするとマイビデオリストをご利用になれます。', 'info');
				} else if ($scope.totalItems <= 0) {
					AlertService.addAlert($scope.alerts, 'お気に入りユーザーの新着動画はありませんでした。', 'info');
				} else {
					AlertService.addAlert($scope.alerts, 'ビデオリストを取得できませんでした。しばらくしてからリロードしてください。', 'danger');
				}
			});
		};

		reqVideoList();

		$scope.watched = function(videoIndex) {
			VideoService.watched($scope.videos[videoIndex].id).then(function(result) {
				$scope.videos[videoIndex].watched = result;
			});
		}

		$scope.toggleUnwatchOnly = function() {
			$scope.unwatchOnly = $scope.unwatchOnly ? false : true;
			VideoService.setUnwatchOnly($scope.unwatchOnly, 'my');
			reqVideoList();
		}

		$scope.setPage = function (pageNo) {
			$scope.currentPage = pageNo;
		};

		$scope.pageChanged = function() {
			$scope.videos = [];
			$scope.isLoading = true;

			VideoService.reqMyList($scope.currentPage, $scope.itemsPerPage, $scope.unwatchOnly).then(function(videos) {
				$scope.videos = videos;
				$scope.isLoading = false;
			}, function() {
				$scope.isLoading = false;
				$scope.alerts = [];
				AlertService.addAlert($scope.alerts, 'ビデオリストを取得できませんでした。しばらくしてからリロードしてください。', 'danger');
			});
		};

		$scope.formatPostDatetime = VideoService.formatPostDatetime;

		$scope.closeAlert = AlertService.closeAlert;
	}
]);

stockVideosControllers.controller('MyContributorController', ['$scope', 'ContributorService', 'TabService', 'AlertService', 'AuthorizeService',
	function($scope, ContributorService, TabService, AlertService, AuthorizeService) {
		$scope.totalItems = 0;
		$scope.itemsPerPage = 20;
		$scope.currentPage = 1;
		$scope.isLoading = true;
		$scope.isAdding = false;
		$scope.isUnAuthorized = false;
		$scope.alerts = [];
		$scope.formAlerts = [];

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
			$scope.alerts = [];
			$scope.contributors = [];
			$scope.isLoading = true;

			ContributorService.reqMyList($scope.currentPage, $scope.itemsPerPage).then(function(contributors) {
				$scope.contributors = contributors;
				$scope.isLoading = false;
			}, function() {
				$scope.isLoading = false;
				if (!$scope.isUnAuthorized) {
					AlertService.addAlert($scope.alerts, 'お気に入りユーザーを取得できませんでした。', 'danger');
				}
			});
		};

		$scope.delete = function(contributorId) {
			ContributorService.delete(contributorId, $scope.itemsPerPage, $scope.currentPage).then(function(contributors) {
				$scope.contributors = contributors;
			}, function() {
				AlertService.addAlert($scope.alerts, 'ユーザーの削除に失敗しました。', 'danger');
			});
		}

		$scope.addTab = function(id, name, partial, contributorId) {
			TabService.addTab(id, name, partial, contributorId);
		};

		$scope.submit = function() {
			$scope.isAdding = true;
			$scope.formAlerts = [];
			ContributorService.submit($scope.contributor.id).then(function(contributors) {
				$scope.isAdding = false;
				$scope.contributors = contributors;
			}, function(errMsg) {
				var errorMessage = errMsg ? errMsg : 'ユーザーの登録に失敗しました。';
				$scope.isAdding = false;
				AlertService.addAlert($scope.formAlerts, errorMessage, 'danger');
			});
		};

		$scope.closeAlert = AlertService.closeAlert;
	}
]);

stockVideosControllers.controller('AuthorizeController', ['$scope', 'AlertService', 'AuthorizeService',
	function($scope, AlertService, AuthorizeService) {
		$scope.isLoading = false;
		$scope.alerts = [];

		AuthorizeService.reqAuthorizeStatus().then(function() {
			$scope.isUnAuthorized = false;
		}, function() {
			$scope.isUnAuthorized = true;
		});

		$scope.login = function() {
			$scope.isLoading = true;
			$scope.alerts = [];
			AuthorizeService.login().then(function() {
				// NOP
			}, function() {
				AlertService.addAlert($scope.alerts, 'ログインに失敗しました。', 'danger');
			});
		}

		$scope.logout = function() {
			$scope.isUnAuthorized = true;
			AuthorizeService.logout().then(function() {
				window.location = '/#top';
			});
		}

		$scope.closeAlert = AlertService.closeAlert;
	}]);

stockVideosControllers.controller('UserController', ['$scope', 'UserService',
	function($scope, UserService) {
		UserService.reqUser().then(function(userData) {
			$scope.user = userData;
		});
	}]);

stockVideosControllers.controller('ContributorVideoListController', ['$scope', 'VideoService', 'TabService', 'AlertService', 'AuthorizeService',
	function($scope, VideoService, TabService, AlertService, AuthorizeService) {
		$scope.totalItems = 0;
		$scope.itemsPerPage = 20;
		$scope.currentPage = 1;
		$scope.isLoading = true;
		$scope.unwatchOnly = VideoService.getUnwatchOnly('contributor');
		$scope.alerts = [];
		var contributorId = TabService.getContributorId();

		AuthorizeService.reqAuthorizeStatus().then(function () {
			$scope.isUnAuthorized = false;
		}, function () {
			$scope.isUnAuthorized = true;
		});

		var reqVideoList = function() {
			$scope.currentPage = 1;
			$scope.isLoading = true;
			$scope.videos = [];
			VideoService.reqContributorVideosCount(contributorId, $scope.unwatchOnly).then(function (count) {
				$scope.totalItems = count;
				if (count <= 0) {
					return $.Deferred().reject().promise();
				}
			}).then(function () {
				return VideoService.reqContributorList(1, $scope.itemsPerPage, contributorId, $scope.unwatchOnly);
			}).then(function (videos) {
				$scope.videos = videos;
				$scope.isLoading = false;
			}, function () {
				$scope.isLoading = false;
				if ($scope.totalItems <= 0) {
					AlertService.addAlert($scope.alerts, '新着動画はありませんでした。', 'info');
				} else {
					AlertService.addAlert($scope.alerts, 'ビデオリストを取得できませんでした。しばらくしてからリロードしてください。', 'danger');
				}
			});
		};

		reqVideoList();

		$scope.watched = function(videoIndex) {
			VideoService.watched($scope.videos[videoIndex].id).then(function(result) {
				$scope.videos[videoIndex].watched = result;
			});
		}

		$scope.toggleUnwatchOnly = function() {
			$scope.unwatchOnly = $scope.unwatchOnly ? false : true;
			VideoService.setUnwatchOnly($scope.unwatchOnly, 'contributor');
			reqVideoList();
		}

		$scope.setPage = function (pageNo) {
			$scope.currentPage = pageNo;
		};

		$scope.pageChanged = function() {
			$scope.videos = [];
			$scope.isLoading = true;

			VideoService.reqContributorList($scope.currentPage, $scope.itemsPerPage, contributorId, $scope.unwatchOnly).then(function(videos) {
				$scope.videos = videos;
				$scope.isLoading = false;
			}, function() {
				$scope.isLoading = false;
				$scope.alerts = [];
				AlertService.addAlert($scope.alerts, 'ビデオリストを取得できませんでした。しばらくしてからリロードしてください。', 'danger');
			});
		};

		$scope.formatPostDatetime = VideoService.formatPostDatetime;

		$scope.closeAlert = AlertService.closeAlert;
	}
]);
