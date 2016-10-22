var stockVideosControllers = angular.module('stockVideosControllers', ['ui.bootstrap']);

stockVideosControllers.controller('ContributorVideoListController', ['$scope', 'VideoService', 'TabService', 'AlertService', 'AuthorizeService',
  function($scope, VideoService, TabService, AlertService, AuthorizeService) {
    $scope.totalItems = 0;
    $scope.itemsPerPage = 20;
    $scope.currentPage = 1;
    $scope.isLoading = true;
    $scope.unwatchOnly = VideoService.getUnwatchOnly('contributor');
    $scope.alerts = [];
    var contributorId = TabService.getContributorId();

    AuthorizeService.reqAuthorizeStatus().then(function () {
      $scope.isUnAuthorized = false;
    }, function () {
      $scope.isUnAuthorized = true;
    });

    var reqVideoList = function() {
      $scope.currentPage = 1;
      $scope.isLoading = true;
      $scope.videos = [];
      VideoService.reqContributorVideosCount(contributorId, $scope.unwatchOnly).then(function (count) {
        $scope.totalItems = count;
        if (count <= 0) {
          return $.Deferred().reject().promise();
        }
      }).then(function () {
        return VideoService.reqContributorList(1, $scope.itemsPerPage, contributorId, $scope.unwatchOnly);
      }).then(function (videos) {
        $scope.videos = videos;
        $scope.isLoading = false;
      }, function () {
        $scope.isLoading = false;
        if ($scope.totalItems <= 0) {
          AlertService.addAlert($scope.alerts, '新着動画はありませんでした。', 'info');
        } else {
          AlertService.addAlert($scope.alerts, 'ビデオリストを取得できませんでした。しばらくしてからリロードしてください。', 'danger');
        }
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
      VideoService.setUnwatchOnly($scope.unwatchOnly, 'contributor');
      reqVideoList();
    };

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      $scope.videos = [];
      $scope.isLoading = true;

      VideoService.reqContributorList($scope.currentPage, $scope.itemsPerPage, contributorId, $scope.unwatchOnly).then(function(videos) {
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
