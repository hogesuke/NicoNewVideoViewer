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
			when('/my/videos', {
				templateUrl: '../templates/myVideos.tmpl.html',
				controller: 'MyVideoListController'
			}).
			when('/my/contributors', {
				templateUrl: '../templates/myContributors.tmpl.html',
				controller: 'AddMyContributorController'
			}).
			otherwise({
				redirectTo: '/top'
			});
	}
]);