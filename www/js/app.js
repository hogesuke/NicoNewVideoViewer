'use strict';

var videosApp = angular.module('videosApp', [
	'ngRoute',
	'stockVideosControllers'
]);

videosApp.config(['$routeProvider', '$httpProvider',
	function($routeProvider, $httpProvider) {
		$routeProvider.
			when('/top', {
				templateUrl: '../templates/top.tmpl.html'
			}).
			when('/videos/:videoId', {
				templateUrl: '../templates/video.tmpl.html',
				controller: 'VideoDetailController'
			}).
			otherwise({
				redirectTo: '/top'
			});

		// IEにてajaxリクエストをキャッシュしてしまう問題の対処
		if (!$httpProvider.defaults.headers.get) {
			$httpProvider.defaults.headers.get = {};
		}
		$httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
	}
]);
