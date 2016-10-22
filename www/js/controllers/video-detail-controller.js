var stockVideosControllers = angular.module('stockVideosControllers', ['ui.bootstrap']);

stockVideosControllers.controller('VideoDetailController', ['$scope', '$routeParams', 'VideoService',
  function($scope, $routeParams, VideoService) {
    var deferred = VideoService.reqDetail($routeParams.videoId);
    deferred.then(function(data) {
      $scope.video = data;
    });
  }
]);
