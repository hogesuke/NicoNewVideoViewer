var stockVideosControllers = angular.module('stockVideosControllers', ['ui.bootstrap']);

stockVideosControllers.controller('VideoListController', ['$scope', 'VideoService', 'AlertService', 'AuthorizeService', 'TabService',
  function($scope, VideoService, AlertService, AuthorizeService, TabService) {
    $scope.totalItems = 0;
    $scope.itemsPerPage = 20;
    $scope.currentPage = 1;
    $scope.isLoading = true;
    $scope.unwatchOnly = VideoService.getUnwatchOnly('all');
    $scope.alerts = [];

    AuthorizeService.reqAuthorizeStatus().then(function () {
      $scope.isUnAuthorized = false;
    }, function () {
      $scope.isUnAuthorized = true;
    });

    var reqVideoList = function() {
      $scope.currentPage = 1;
      $scope.isLoading = true;
      $scope.videos = [];
      VideoService.reqVideosCount($scope.unwatchOnly).then(function (count) {
        $scope.totalItems = count;
      }).then(function () {
        return VideoService.reqList(1, $scope.itemsPerPage, $scope.unwatchOnly);
      }).then(function (videos) {
        $scope.videos = videos;
        $scope.isLoading = false;
      }, function () {
        $scope.isLoading = false;
        AlertService.addAlert($scope.alerts, 'ビデオリストを取得できませんでした。しばらくしてからリロードしてください。', 'danger');
      });
    };

    reqVideoList();

    $scope.watched = function(videoIndex) {
      VideoService.watched($scope.videos[videoIndex].id).then(function(result) {
        $scope.videos[videoIndex].watched = result;
      });
    };

    $scope.toggleUnwatchOnly = function() {
      $scope.unwatchOnly = $scope.unwatchOnly ? false : true;
      VideoService.setUnwatchOnly($scope.unwatchOnly, 'all');
      reqVideoList();
    };

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      $scope.videos = [];
      $scope.isLoading = true;

      VideoService.reqList($scope.currentPage, $scope.itemsPerPage, $scope.unwatchOnly).then(function(videos) {
        $scope.videos = videos;
        $scope.isLoading = false;
      }, function() {
        $scope.isLoading = false;
        $scope.alerts = [];
        AlertService.addAlert($scope.alerts, 'ビデオリストを取得できませんでした。しばらくしてからリロードしてください。', 'danger');
      });
    };

    $scope.addTab = function(id, name, partial, contributorId) {
      TabService.addTab(id, name, partial, contributorId);
    };

    $scope.formatPostDatetime = VideoService.formatPostDatetime;

    $scope.closeAlert = AlertService.closeAlert;
  }
]);
