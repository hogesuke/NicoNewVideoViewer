var stockVideosControllers = angular.module('stockVideosControllers');

stockVideosControllers.controller('AdController', ['$scope', 'AdService',
  function($scope, AdService) {
    $scope.headAd = AdService.pick();
    $scope.footAd = AdService.pick();
  }
]);
