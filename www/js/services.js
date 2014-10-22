angular.module('videosApp').
	factory('VideoService', [ '$http', '$q', function ($http, $q) {
		return {
			reqList: function() {
				var deferred = $q.defer();
				$http({
					method : 'get',
					url    : '/api/videos/list/?page=1'
				}).success(function(data) {
					var videos = [];
					$.each(data, function(i, video) {
						$http({
							method : 'get',
							url    : '/api/videos/' + video.id
						}).success(function(data) {
							console.debug(data);
							data.serial_no = video.serial_no;
							videos.push(data);
							deferred.resolve(videos)
						}).error(function() {
							// TODO
							deferred.reject();
						})
					})
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
			reqMyList: function() {
				var deferred = $q.defer();
				$http({
					method : 'get',
					url    : '/api/my/videos/'
				}).success(function(data) {
					deferred.resolve(data);
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
				}).success(function() {
					deferred.resolve();
				}).error(function() {
					// TODO
					deferred.reject({});
				});
				return deferred.promise;
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
			}
		}
	}]);
