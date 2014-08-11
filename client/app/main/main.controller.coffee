'use strict'

angular.module 'sampleAppApp'
# primeNumber is coming from ui-router resolve (see main.coffee file)
.controller 'MainCtrl', ($scope, $http, primeNumbers) ->
	# attach prime numbers to scope
	$scope.primeNumbers = primeNumbers

	$scope.nextPage = ->
		# request pending
		$scope.busy = true;
		# get prime numbers from server url is resolved from server
		$http.get primeNumbers._next
		.then (res) ->
			# if it is all then set isAll to true
			if not res.data.items.length then $scope.isAll = true;
			# merge prime numbers
			$scope.primeNumbers.items = _.union $scope.primeNumbers.items, res.data.items
			# refresh _.next link
			$scope.primeNumbers._next = res.data._next
		.finally -> 
			# free request pending
			$scope.busy = false;
