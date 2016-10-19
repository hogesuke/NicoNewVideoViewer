angular.module('videosApp').factory('UserService', [ '$http', '$q', function ($http, $q) {
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
