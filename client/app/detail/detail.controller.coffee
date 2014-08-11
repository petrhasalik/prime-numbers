'use strict'

angular.module 'sampleAppApp'
# detail is resolved from ui-route (in detail.coffee)
.controller 'DetailCtrl', ($scope, detail) ->
	#with as syntax, is possible attach detail to this but I don't like it
	$scope.detail = detail
