var stockVideosControllers = angular.module('stockVideosControllers', ['ui.bootstrap']);

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
        $scope.isLoading = false;
        AlertService.addAlert($scope.alerts, 'ログインに失敗しました。', 'danger');
      });
    };

    $scope.logout = function() {
      $scope.isUnAuthorized = true;
      AuthorizeService.logout().then(function() {
        document.cookie='max-age=0;expires=' + new Date(0).toGMTString();
        window.location.reload(true);
      });
    };

    $scope.closeAlert = AlertService.closeAlert;
  }
]);
