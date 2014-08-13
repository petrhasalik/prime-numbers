/**
 * This file uses the Page Object pattern to define the main page for tests
 */

'use strict';

var MainPage = function() {
  this.heroEl = element(by.css('.hero-unit'));
  this.h1El = this.heroEl.element(by.css('h1'));
  this.perex = this.heroEl.element(by.css('p.lead'));
  this.mainIco = this.heroEl.element(by.css('.fa-stack.fa-5x'));
  this.bitbucketLink = this.heroEl.element(by.css('p>a:nth-child(1)'));
  this.apiaryLink = this.heroEl.element(by.css('p>a:nth-child(2)'));
};

module.exports = new MainPage();

