var stockVideosControllers = angular.module('stockVideosControllers');

stockVideosControllers.controller('MyContributorController', ['$scope', 'ContributorService', 'TabService', 'AlertService', 'AuthorizeService',
  function($scope, ContributorService, TabService, AlertService, AuthorizeService) {
    $scope.totalItems = 0;
    $scope.itemsPerPage = 20;
    $scope.currentPage = 1;
    $scope.isLoading = true;
    $scope.isAdding = false;
    $scope.isUnAuthorized = false;
    $scope.alerts = [];
    $scope.formAlerts = [];

    AuthorizeService.reqAuthorizeStatus().then(function() {
      TabService.setActiveTab('my');
    }, function() {
      $scope.isUnAuthorized = true;
      TabService.setActiveTab('all');
      return $.Deferred().reject().promise();
    }).then(ContributorService.reqCount).then(function(count) {
      $scope.totalItems = count;
    }).then(function() {
      return ContributorService.reqMyList(1, $scope.itemsPerPage);
    }).then(function(contributors) {
      $scope.isLoading = false;
      $scope.contributors = contributors;
    }, function() {
      $scope.isLoading = false;
      if (!$scope.isUnAuthorized) {
        AlertService.addAlert($scope.alerts, 'お気に入りユーザーを取得できませんでした。', 'danger');
      }
    });

    $scope.pageChanged = function() {
      $scope.alerts = [];
      $scope.contributors = [];
      $scope.isLoading = true;

      ContributorService.reqMyList($scope.currentPage, $scope.itemsPerPage).then(function(contributors) {
        $scope.contributors = contributors;
        $scope.isLoading = false;
      }, function() {
        $scope.isLoading = false;
        if (!$scope.isUnAuthorized) {
          AlertService.addAlert($scope.alerts, 'お気に入りユーザーを取得できませんでした。', 'danger');
        }
      });
    };

    $scope.delete = function(contributorId) {
      ContributorService.delete(contributorId, $scope.itemsPerPage, $scope.currentPage).then(function(contributors) {
        $scope.contributors = contributors;
      }, function() {
        AlertService.addAlert($scope.alerts, 'ユーザーの削除に失敗しました。', 'danger');
      });
    };

    $scope.addTab = function(id, name, partial, contributorId) {
      TabService.addTab(id, name, partial, contributorId);
    };

    $scope.submit = function() {
      $scope.isAdding = true;
      $scope.formAlerts = [];
      ContributorService.submit($scope.contributor.id).then(function(contributors) {
        $scope.isAdding = false;
        $scope.contributors = contributors;
      }, function(errMsg) {
        var errorMessage = errMsg ? errMsg : 'ユーザーの登録に失敗しました。';
        $scope.isAdding = false;
        AlertService.addAlert($scope.formAlerts, errorMessage, 'danger');
      });
    };

    $scope.closeAlert = AlertService.closeAlert;
  }
]);
