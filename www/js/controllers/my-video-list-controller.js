var stockVideosControllers = angular.module('stockVideosControllers');

stockVideosControllers.controller('MyVideoListController', ['$scope', 'VideoService', 'AlertService', 'AuthorizeService', 'TabService',
  function($scope, VideoService, AlertService, AuthorizeService, TabService) {
    $scope.totalItems = 0;
    $scope.itemsPerPage = 20;
    $scope.currentPage = 1;
    $scope.isLoading = true;
    $scope.unwatchOnly = VideoService.getUnwatchOnly('my');
    $scope.isUnAuthorized = false;
    $scope.alerts = [];

    var reqVideoList = function() {
      $scope.currentPage = 1;
      $scope.isLoading = true;
      $scope.videos = [];
      AuthorizeService.reqAuthorizeStatus().then(function () {
        // NOP
      }, function () {
        $scope.isUnAuthorized = true;
        return $.Deferred().reject().promise();
      }).then(function() {
        return VideoService.reqMyVideosCount($scope.unwatchOnly);
      }).then(function (count) {
        $scope.totalItems = count;
        if (count <= 0) {
          return $.Deferred().reject().promise();
        }
      }).then(function () {
        return VideoService.reqMyList(1, $scope.itemsPerPage, $scope.unwatchOnly);
      }).then(function (videos) {
        $scope.videos = videos;
        $scope.isLoading = false;
      }, function () {
        $scope.isLoading = false;
        if ($scope.isUnAuthorized) {
          AlertService.addAlert($scope.alerts, 'ログインするとマイビデオリストをご利用になれます。', 'info');
        } else if ($scope.totalItems <= 0) {
          AlertService.addAlert($scope.alerts, 'お気に入りユーザーの新着動画はありませんでした。', 'info');
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
      VideoService.setUnwatchOnly($scope.unwatchOnly, 'my');
      reqVideoList();
    };

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      $scope.videos = [];
      $scope.isLoading = true;

      VideoService.reqMyList($scope.currentPage, $scope.itemsPerPage, $scope.unwatchOnly).then(function(videos) {
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
