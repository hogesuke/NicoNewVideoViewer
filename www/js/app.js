'use strict';

var videosApp = angular.module('videosApp', [
	'ngRoute',
	'stockVideosControllers'
]);

videosApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/top', {
				templateUrl: '../templates/top.tmpl.html',
				controller: 'VideoListController'
			}).
			when('/videos/:videoId', {
				templateUrl: '../templates/video.tmpl.html',
				controller: 'VideoDetailController'
			}).
			otherwise({
				redirectTo: '/top'
			});
	}
]);