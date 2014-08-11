'use strict';
# global response interceptor, error handling
angular.module 'sampleAppApp'
.factory 'errorInterceptor', ($q, $rootScope) ->
  responseError: (rej) ->
    # brodcast an error to the application, this is catched in the rootController
    $rootScope.$broadcast '#requestError', message: "Server request error! Status #{rej.status}"
    # propagate an error next to the promise system
    $q.reject rej