'use strict';

var videosApp = angular.module('videosApp', [
	'ngRoute',
	'stockVideosControllers'
]);

videosApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: '../partials/videoList.html',
				controller: 'VideoListController'
			}).
			otherwise({
				redirectTo: '/'
			});
	}
]);