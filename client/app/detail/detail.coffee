'use strict'

angular.module 'sampleAppApp'
.config ($stateProvider) ->
  # child state of main
  $stateProvider.state 'main.detail',
    url: ':number'
    templateUrl: 'app/detail/detail.html'
    # Other possible way is define controller with "as clausule", but like this I could not use $scope in the controller
    # controller: 'DetailCtrl as detail'
    controller: 'DetailCtrl'
    resolve: 
    	# resolve prime number detail from the server
    	# https://docs.angularjs.org/tutorial/step_05 using bracket notitation
    	detail: ['$stateParams', 'primeNumbers', '$q', '$http', 'config', ($stateParams, primeNumbers, $q, $http, config) ->
    		# if not defined state param broadcast error 
    		return $q.reject 'No detail parameter' unless $stateParams.number 
    		# can't use _self because the number could be out of the start limit, this is inconsistency problem #TODO:problem:petrhasalik
    		$http.get(config.apiEntryPoint + "/#{$stateParams.number}").then (res) -> res.data
	    ]