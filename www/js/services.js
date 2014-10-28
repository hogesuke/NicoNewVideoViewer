angular.module('videosApp').
	factory('VideoService', [ '$http', '$q', function ($http, $q) {
		return {
			reqList: function(pageNo) {
				var deferred = $q.defer();
				$http({
					method : 'get',
					url    : '/api/videos/list/?page=' + pageNo
				}).success(function(data) {
					deferred.resolve(data)
				}).error(function() {
					// TODO
					deferred.reject();
				});
				return deferred.promise;
			},
			reqDetail: function(videoId) {
				var deferred = $q.defer();
				$http({
					method: 'get',
					url: '/api/videos/' + videoId
				}).success(function (data) {
					deferred.resolve(data);
				}).error(function () {
					// TODO
					deferred.reject({});
				});
				return deferred.promise;
			},
			reqMyList: function(pageNo) {
				var deferred = $q.defer();
				$http({
					method : 'get',
					url    : '/api/my/videos/list/?page=' + pageNo
				}).success(function(data) {
					deferred.resolve(data);
				}).error(function() {
					// TODO
					deferred.reject({});
				});
				return deferred.promise;
			},
			reqVideosCount: function() {
				var deferred = $q.defer();
				$http({
					method : 'get',
					url    : '/api/videos/count/'
				}).success(function(data) {
					deferred.resolve(data.count);
				}).error(function() {
					// TODO
					deferred.reject({});
				});
				return deferred.promise;
			},
			reqMyVideosCount: function() {
				var deferred = $q.defer();
				$http({
					method : 'get',
					url    : '/api/my/videos/count/'
				}).success(function(data) {
					deferred.resolve(data.count);
				}).error(function() {
					// TODO
					deferred.reject({});
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
					// TODO
					deferred.reject({});
				});
				return deferred.promise;
			},
			formatPostDatetime: function(unformatDatetime) {
				moment.lang('ja');
				return moment(unformatDatetime, "YYYYMMDDHHmm").format('YYYY/MM/DD HH:mm');
			}
		};
	}]).
	factory('ContributorService', [ '$http', '$q', function ($http, $q) {
		return {
			reqMyList: function() {
				var deferred = $q.defer();
				$http({
					method : 'get',
					url    : '/api/my/contributors/'
				}).success(function(data) {
					deferred.resolve(data);
				}).error(function() {
					// TODO
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
				}).success(function(data) {
					deferred.resolve(data);
				}).error(function() {
					// TODO
					deferred.reject();
				});
				return deferred.promise;
			},
			delete: function(contributor_id) {
				var deferred = $q.defer();
				$http({
					method : 'delete',
					url    : '/api/my/contributors/',
					data   : {id: contributor_id}
				}).success(function(data) {
					deferred.resolve(data);
				}).error(function() {
					// TODO
					deferred.reject();
				});
				return deferred.promise;
			}
		}
	}]);
