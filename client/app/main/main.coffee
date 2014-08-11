'use strict'
# this is ui-router definition file, all ui sections have this router config files
angular.module 'sampleAppApp'
.config ($stateProvider) ->
  $stateProvider
  # main state
  .state 'main',
  	# handles this part of the URL
    url: '/'
    templateUrl: 'app/main/main.html'
    controller: 'MainCtrl',
    resolve: 
    	# resolve prime numbers from the server, if response crashes then catch rejection of promisse and return null, this state must be resolved
    	primeNumbers: ['$http', 'config', ($http, config) -> $http.get(config.apiEntryPoint).then((res) -> res.data).catch((res) -> null) ]
