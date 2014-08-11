'use strict'
# module dependencies
angular.module 'sampleAppApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'infinite-scroll',
  'angular-loading-bar'
]
.config ($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider, $httpProvider) ->
  $urlRouterProvider
  .otherwise '/'
  # set html5mode for route handling
  $locationProvider.html5Mode true
  # By default, the loading bar will be displayed only if the response does not show up for over 100ms. For this reason I wanted to show it everytime.
  cfpLoadingBarProvider.latencyThreshold = 0;

  # register interceptors
  # error interceptor
  $httpProvider.interceptors.push 'errorInterceptor'

.run ($stateParams, $rootScope) ->
	# attach stateParams to rootScope
	$rootScope.$stateParams = $stateParams;
# global configuration 
.value 'config', 
	warningCloseTimeout: 10000, 
	apiEntryPoint: '/api/prime_numbers'