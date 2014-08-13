'use strict';

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get('/');
    page = require('./main.po');
  });

  it('should include jumbotron with correct data', function() {
    expect(page.h1El.getText()).toBe('Sample app !');
    expect(page.perex.getText()).toBe('Prime numbers viewer');
    expect(page.bitbucketLink.getAttribute('href')).toBe('https://github.com/petrhasalik/prime-numbers');
    expect(page.apiaryLink.getAttribute('href')).toBe('http://docs.primenumbers.apiary.io/');
  });
});
