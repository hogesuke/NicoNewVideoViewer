angular.module('videosApp').factory('ContributorService', [ '$http', '$q', function ($http, $q) {
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
}]);
