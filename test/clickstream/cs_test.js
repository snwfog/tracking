var expect  = require('chai').expect;
var assert  = require('chai').assert;
var cookie  = require('cookie');
var url     = require('url');
var config  = require('config');
var http    = require('http');
var fs      = require('fs');
var request = require('request').defaults({ jar: true });
var jsface  = require('jsface');
var faker   = require('faker');
var _       = require('lodash');
var dotenv  = require('dotenv').config();

var HttpStatus         = require('http-status-codes');
var TrackingType       = require(process.cwd() + '/lib/tracking_type');
var Clickstream        = require(process.cwd() + '/lib/clickstream');
var TrackPageViewMixin = require(process.cwd() + '/lib/track/track_page_view_mixin');

/**
 * Test for Clickstream library
 */
describe('Clickstream', function () {
  var siteId     = 3;
  var rootDomain = config.get(`${process.env.INSTANCE || 'dev'}.root_domain`);
  var cs;

  beforeEach(function () {
    cs = new Clickstream(siteId, rootDomain);
  });

  context('Properties', function () {

    it('Should produce valid root domain', function validRootDomain() {
      expect(cs.elqRootDomain).to.be.equal('s3.t.dev.eloquacorp.com');
    });

    it('Should produce valid query parameters hash', function validQueryStrings() {
      expect(cs.qs()).to.be.deep.equal({
        pps:    TrackingType.ClickstreamFromImage,
        siteId: 3,
      });
    });

    it('Should produce a valid page view track url', function validRequestEndpoint() {
      expect(cs.requestEndpoint()).to
        .equal('http://s3.t.dev.eloquacorp.com/visitor/v200/svrGP');
    });
  });

  context('#exec', function clickstreamExec() {
    it('#exec should return a promise', function execShouldReturnPromise() {
      expect(cs.exec()).to.respondTo('then');
    });

    it('#exec should issue a request and contains a redirection with set cookies', function shouldExecuteRequest() {
      return cs
        .exec(function redirectCb(response) {
          expect(response.statusCode).to.equal(HttpStatus.MOVED_TEMPORARILY);
          var cookies = _.map(response.headers[ 'set-cookie' ], (strCookie) => cookie.parse(strCookie));
          expect(cookies).to.have.lengthOf(2);

          var eloquaAndEloquaStatus = _.reduce(cookies, (ac, c) => _.xor(_.keys(c), ac), []);
          expect(eloquaAndEloquaStatus).to.include.members([ 'ELOQUA', 'ELQSTATUS' ]);
          expect(response.headers[ 'location' ]).to.contains('elqCookie=1');
        });
    });

    // TODO: This test is doing too much, need refactor
    it('Should exec a request and should follow redirect with elqCookie set to 1', function shouldFollowRedirect() {
      this.timeout(5000);
      var expectedRedirectCounts = 1;
      var redirectCounts         = 0;
      return cs
        .execWithRedirectCallback(function redirectCb(resp) {
          redirectCounts++;
          expect(redirectCounts).to.be.at.most(expectedRedirectCounts);
          return !resp.request.uri.href.endsWith('elqCookie=1');
        })
        .then(function (resp) {
          expect(resp.headers[ 'content-type' ]).to.be.equal('image/gif');
          expect(redirectCounts).to.be.equal(expectedRedirectCounts);
        });
    });
  });
});
