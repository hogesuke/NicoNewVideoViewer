var stockVideosControllers = angular.module('stockVideosControllers', ['ui.bootstrap']);

stockVideosControllers.controller('VideoListTabsController', ['$scope', 'TabService',
  function($scope, TabService) {
    $scope.tabs = TabService.getTabs();
  }
]);
