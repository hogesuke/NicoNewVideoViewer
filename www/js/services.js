angular.module('videosApp').
	factory('VideoService', [ '$http', '$q', function ($http, $q) {
		return {
			reqList: function(pageNo, perpage, unwatchOnly) {
				var deferred = $q.defer();
				$http({
					method : 'get',
					url    : '/api/videos/list/?page=' + pageNo + '&perpage=' + perpage + '&unwatch_only=' + unwatchOnly
				}).success(function(res) {
					deferred.resolve(res)
				}).error(function() {
					deferred.reject();
				});
				return deferred.promise;
			},
			reqDetail: function(videoId) {
				var deferred = $q.defer();
				$http({
					method: 'get',
					url: '/api/videos/' + videoId
				}).success(function (res) {
					deferred.resolve(res);
				}).error(function () {
					deferred.reject({});
				});
				return deferred.promise;
			},
			reqMyList: function(pageNo, perpage, unwatchOnly) {
				var deferred = $q.defer();
				$http({
					method : 'get',
					url    : '/api/my/videos/list/?page=' + pageNo + '&perpage=' + perpage + '&unwatch_only=' + unwatchOnly
				}).success(function(res) {
					deferred.resolve(res);
				}).error(function() {
					deferred.reject();
				});
				return deferred.promise;
			},
			reqContributorList: function(pageNo, perpage, contributorId, unwatchOnly) {
				var deferred = $q.defer();
				$http({
					method : 'get',
					url    : '/api/contributors/' + contributorId + '/videos/list/?page=' + pageNo + '&perpage=' + perpage + '&unwatch_only=' + unwatchOnly
				}).success(function(res) {
					deferred.resolve(res);
				}).error(function() {
					deferred.reject();
				});
				return deferred.promise;
			},
			reqVideosCount: function(unwatchOnly) {
				var deferred = $q.defer();
				$http({
					method : 'get',
					url    : '/api/videos/count/' + '?unwatch_only=' + unwatchOnly
				}).success(function(res) {
					deferred.resolve(res.count);
				}).error(function() {
					deferred.reject();
				});
				return deferred.promise;
			},
			reqMyVideosCount: function(unwatchOnly) {
				var deferred = $q.defer();
				$http({
					method : 'get',
					url    : '/api/my/videos/count/' + '?unwatch_only=' + unwatchOnly
				}).success(function(res) {
					deferred.resolve(res.count);
				}).error(function() {
					deferred.reject();
				});
				return deferred.promise;
			},
			reqContributorVideosCount: function(contributorId, unwatchOnly) {
				var deferred = $q.defer();
				$http({
					method : 'get',
					url    : '/api/contributors/' + contributorId + '/videos/count/' + '?unwatch_only=' + unwatchOnly
				}).success(function(res) {
					deferred.resolve(res.count);
				}).error(function() {
					deferred.reject();
				});
				return deferred.promise;
			},
			watched: function(videoId) {
				var deferred = $q.defer();
				$http({
					method : 'post',
					url    : '/api/videos/' + videoId + '/completion/'
				}).success(function(result) {
					deferred.resolve(result.isWatched);
				}).error(function() {
					deferred.reject();
				});
				return deferred.promise;
			},
			getUnwatchOnly: function(tab) {
				var unwatchOnly = localStorage.getItem(tab + '_unwatch_only');
				return unwatchOnly === null ? false : JSON.parse(unwatchOnly);
			},
			setUnwatchOnly: function(unwatchOnly, tab) {
				localStorage.setItem(tab + '_unwatch_only', unwatchOnly);
			},
			formatPostDatetime: function(unformatDatetime) {
				moment.lang('ja');
				return moment(unformatDatetime, "YYYYMMDDHHmm").format('YYYY/MM/DD HH:mm');
			}
		};
	}]).
	factory('ContributorService', [ '$http', '$q', function ($http, $q) {
		return {
			reqMyList: function(pageNo, perpage) {
				var deferred = $q.defer();
				$http({
					method : 'get',
					url    : '/api/my/contributors/?page=' + pageNo + '&perpage=' + perpage
				}).success(function(res) {
					deferred.resolve(res);
				}).error(function() {
					deferred.reject();
				});
				return deferred.promise;
			},
			reqCount: function() {
				var deferred = $q.defer();
				$http({
					method : 'get',
					url    : '/api/my/contributors/count/'
				}).success(function(res) {
					deferred.resolve(res.count);
				}).error(function() {
					deferred.reject();
				});
				return deferred.promise;
			},
			submit: function(contributor_id) {
				var deferred = $q.defer();
				$http({
					method : 'post',
					url    : '/api/my/contributors/',
					data   : {id: contributor_id}
				}).success(function(res) {
					deferred.resolve(res);
				}).error(function(err) {
					deferred.reject(err.err_msg);
				});
				return deferred.promise;
			},
			delete: function(contributor_id, itemsPerPage, currentPage) {
				var deferred = $q.defer();
				$http({
					method : 'delete',
					url    : '/api/my/contributors/',
					data   : {id: contributor_id, items_per_page: itemsPerPage, current_page: currentPage}
				}).success(function(res) {
					deferred.resolve(res);
				}).error(function() {
					deferred.reject();
				});
				return deferred.promise;
			}
		}
	}]).
	factory('TabService', [function() {
		return {
			tabs: [
				{ id: 'my', name: 'マイ新着動画', partial: './partials/myVideoList.part.html', contributor_id: '' },
				{ id: 'all', name: 'すべての新着動画', partial: './partials/newVideoList.part.html', contributor_id: '' }
			],
			getTabs: function () {
				return this.tabs;
			},
			addTab: function (id, name, partial, contributorId) {
				if (this.tabs[this.tabs.length - 1].contributor_id) {
					this.tabs.pop();
				}
				this.tabs.push({ id: id, name: name, partial: partial, contributor_id: contributorId, active: true });
			},
			getContributorId: function () {
				return this.tabs[this.tabs.length - 1].contributor_id;
			}
		};
	}]).
	factory('AlertService', [function() {
		return {
			addAlert: function (alerts, msg, type) {
				alerts.push({msg: msg, type: type});
			},
			closeAlert: function (alerts, index) {
				alerts.splice(index, 1);
			}
		}
	}]).
	factory('AuthorizeService', [ '$http', '$q', function ($http, $q) {
		return {
			reqAuthorizeStatus: function () {
				var deferred = $q.defer();
				$http({
					method : 'get',
					url    : '/api/authorize/status/'
				}).success(function() {
					deferred.resolve()
				}).error(function() {
					deferred.reject();
				});
				return deferred.promise;
			},
			reqAuthorizeUrl: function () {
				var deferred = $q.defer();
				$http({
					method : 'post',
					url    : '/api/authorize/'
				}).success(function(res) {
					deferred.resolve(res.authorize_url)
				}).error(function() {
					deferred.reject();
				});
				return deferred.promise;
			},
			login: function() {
				var deferred = $q.defer();
				this.reqAuthorizeUrl().then(function(authorize_url) {
					window.location = authorize_url;
				}, function() {
					deferred.reject();
				});
				return deferred.promise;
			},
			logout: function() {
				var deferred = $q.defer();
				$http({
					method : 'post',
					url    : '/api/logout/'
				}).success(function() {
					deferred.resolve();
				}).error(function() {
					deferred.reject();
				});
				return deferred.promise;
			}
		}
	}]).
	factory('UserService', [ '$http', '$q', function ($http, $q) {
		return {
			reqUser: function () {
				var deferred = $q.defer();
				$http({
					method: 'get',
					url: '/api/user/'
				}).success(function (res) {
					deferred.resolve(res)
				}).error(function () {
					deferred.reject();
				});
				return deferred.promise;
			}
		};
	}]);
