'use strict'

angular.module 'sampleAppApp'
.controller 'RootCtrl', ($scope, $timeout, config, $log, $q) ->
	# I'm not sure if $timeout.cancel wants promise and for this reason I wrap the timeoutPromise with when
	timeoutPromise = do $q.when
	setWarning = (warning) ->
		# set warning
		$scope.warning = warning;
		# reset previous warning close
		$timeout.cancel timeoutPromise
		# set warning close to 10sec
		timeoutPromise = $timeout (-> $scope.warning = null), config.warningCloseTimeout

	# handle state transition errors
	$scope.$on '$stateChangeError', (event, toState, toParams, fromState, fromParams, error) -> setWarning "Transition error!: #{error}"

	# handle response errors
	$scope.$on '#requestError', (event, data) -> setWarning data.message
