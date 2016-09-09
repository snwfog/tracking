var expect  = require('chai').expect;
var config  = require('config');
var http    = require('http');
var fs      = require('fs');
var request = require('request');
var cs      = require(process.cwd() + '/lib/clickstream');

/**
 * Test for Clickstream library
 */
describe('Clickstream', function () {
  context('Page view', function () {
    it('Should produce a valid page view track url', function () {
      var siteId         = 3;
      var trackingDomain = 'http://mytest.com';
      var clickstream = new cs(siteId, trackingDomain);
      expect(clickstream
        .trackPageView.requestEndpoint)
        .to.equal('some url');
    });
  });
});