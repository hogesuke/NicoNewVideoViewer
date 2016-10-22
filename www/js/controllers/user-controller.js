var stockVideosControllers = angular.module('stockVideosControllers', ['ui.bootstrap']);

stockVideosControllers.controller('UserController', ['$scope', 'UserService',
  function($scope, UserService) {
    UserService.reqUser().then(function(userData) {
      $scope.user = userData;
    });
  }
]);
