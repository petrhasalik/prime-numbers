'use strict'

describe 'Controller: MainCtrl', ->

	# load the controller's module
	beforeEach module 'sampleAppApp' 

	MainCtrl = undefined
	scope = undefined
	$httpBackend = undefined

	# primeNumbers mock entry prime numbers
	primeNumersMock = 
		"first":
			"items": [
							{"prime_number": "2", "_self": "/api/prime_numbers/2"}
							{"prime_number": "3", "_self": "/api/prime_numbers/3"}
							{"prime_number": "5", "_self": "/api/prime_numbers/5"}
							{"prime_number": "7", "_self": "/api/prime_numbers/7"}
			]
			"_self": "/api/prime_numbers?max=1000&_offset=0&_limit=4&max_type=n_primes"
			"_next": "/api/prime_numbers?max=1000&_offset=4&_limit=8&max_type=n_primes"
		"next":
			"items": [
							{"prime_number": "11", "_self": "/api/prime_numbers/11"}
							{"prime_number": "13", "_self": "/api/prime_numbers/13"}
							{"prime_number": "17", "_self": "/api/prime_numbers/17"}
							{"prime_number": "19", "_self": "/api/prime_numbers/19"}
			]
			"_self": "/api/prime_numbers?max=1000&_offset=4&_limit=8&max_type=n_primes"
			"_next": "/api/prime_numbers?max=1000&_offset=8&_limit=12&max_type=n_primes"

	# Initialize the controller and a mock scope
	beforeEach inject (_$httpBackend_, $controller, $rootScope) ->
		$httpBackend = _$httpBackend_
		# Mock api resource
		$httpBackend.expectGET(primeNumersMock.first._next).respond primeNumersMock.next
		# Create scope
		scope = $rootScope.$new()
		# instantiate controller and mock dependencies
		MainCtrl = $controller 'MainCtrl',
			$scope: scope
			primeNumbers: primeNumersMock.first

	it 'should attach a list of prime numbers to the scope', ->
		expect(scope.primeNumbers.items.length).toBe 4




	it 'should merge a list of next items and current items on prime numbers object', ->
		#test after promise resoved
		scope.nextPage()
		.then () ->
			# are the items merged?
			expect(scope.primeNumbers.items.length).toBe 8
			# is the _next link refreshed?
			expect(scope.primeNumbers._next).toBe primeNumersMock.next._next
		.finally () ->
			expect(scope.busy).toEqual false
		# resolve promise
		do $httpBackend.flush















