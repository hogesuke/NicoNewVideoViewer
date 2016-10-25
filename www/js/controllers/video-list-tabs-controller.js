var stockVideosControllers = angular.module('stockVideosControllers');

stockVideosControllers.controller('VideoListTabsController', ['$scope', 'TabService',
  function($scope, TabService) {
    $scope.tabs = TabService.getTabs();
  }
]);
