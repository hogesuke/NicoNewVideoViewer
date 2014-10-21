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
			}
		};
	}]);
