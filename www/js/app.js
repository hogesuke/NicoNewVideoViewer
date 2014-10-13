'use strict';

var videosApp = angular.module('videosApp', [
	'ngRoute',
	'stockVideosControllers'
]);

videosApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: '../../templates/index.html',
				controller: 'VideoListController'
			}).
			otherwise({
				redirectTo: '/videos/list'
			});
	}
]);