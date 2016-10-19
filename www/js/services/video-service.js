angular.module('videosApp').factory('VideoService', [ '$http', '$q', function ($http, $q) {
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
      var postedDatetime = moment(unformatDatetime, "YYYYMMDDHHmm");
      var suffix = '';

      if (moment().diff(postedDatetime, 'days') <= 0) {
        suffix = postedDatetime.fromNow();
      }

      var ret = moment(unformatDatetime, "YYYYMMDDHHmm").format('YYYY/MM/DD HH:mm');
      return suffix ? ret + ' (' + suffix + ')' : ret;
    }
  };
}]);
