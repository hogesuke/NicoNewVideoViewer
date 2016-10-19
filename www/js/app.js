'use strict';

var videosApp = angular.module('videosApp', [
  'ngRoute',
  'stockVideosControllers'
]);

videosApp.config(['$routeProvider', '$httpProvider', '$locationProvider',
  function($routeProvider, $httpProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
    when('/', {
      templateUrl: '../templates/top.tmpl.html'
    }).
    when('/videos/:videoId', {
      templateUrl: '../templates/video.tmpl.html',
      controller: 'VideoDetailController'
    }).
    when('/agreement', {
      templateUrl: '../templates/agreement.tmpl.html'
    }).
    when('/privacy-policy', {
      templateUrl: '../templates/privacy_policy.tmpl.html'
    }).
    otherwise({
      redirectTo: '/'
    });

    // IEにてajaxリクエストをキャッシュしてしまう問題の対処
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
  }
]);
