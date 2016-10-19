angular.module('videosApp').factory('AuthorizeService', [ '$http', '$q', function ($http, $q) {
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
}]);
