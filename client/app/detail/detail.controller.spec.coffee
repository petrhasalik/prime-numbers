'use strict'

describe 'Controller: DetailCtrl', ->

  # load the controller's module
  beforeEach module 'sampleAppApp'
  DetailCtrl = undefined
  scope = undefined

  # Initialize the controller and mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    DetailCtrl = $controller 'DetailCtrl',
      $scope: scope

  it 'should ...', ->
    expect(1).toEqual 1