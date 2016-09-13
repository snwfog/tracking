var expect  = require('chai').expect;
var assert  = require('chai').assert;
var cookie  = require('cookie');
var url     = require('url');
var http    = require('http');
var fs      = require('fs');
var config  = require('config');
var request = require('request').defaults({ jar: true });
var jsface  = require('jsface');
var faker   = require('faker');
var _       = require('lodash');

require('dotenv').config();

var INSTANCE           = process.env.INSTANCE;
var ROOT_DOMAIN        = config.get(`${INSTANCE}.root_domain`);
var SITE_ID            = config.get(`${INSTANCE}.site_id`);
var FIRST_PARTY_DOMAIN = config.get(`${INSTANCE}.first_party_domain`);

var HttpStatus         = require('http-status-codes');
var TrackingType       = require(process.cwd() + '/lib/tracking_type');
var Clickstream        = require(process.cwd() + '/lib/clickstream');
var TrackPageViewMixin = require(process.cwd() + '/lib/track/track_page_view_mixin');

/**
 * Test for Clickstream library
 */
describe('Clickstream', function () {
  var cs;

  beforeEach(function () {
    cs = new Clickstream(SITE_ID, ROOT_DOMAIN);
  });
//
//   context('Properties', function () {
//
//     it('should produce valid root domain', function validRootDomain() {
//       expect(cs.elqRootDomain).to.be.equal('s3.t.dev.eloquacorp.com');
//     });
//
//     it('should produce valid query parameters hash', function validQueryStrings() {
//       expect(cs.qs()).to.be.deep.equal({
//         pps:    TrackingType.ClickstreamFromImage,
//         siteId: SITE_ID,
//       });
//     });
//
//     it('should produce a valid page view track url', function validRequestEndpoint() {
//       expect(cs.requestEndpoint()).to
//         .equal('http://s3.t.dev.eloquacorp.com/visitor/v200/svrGP');
//     });
//   });

  context('#exec', function clickstreamExec() {
//     it('should return a promise', function execShouldReturnPromise() {
//       expect(cs.exec()).to.respondTo('then');
//     });

//     it('should issue a request and contains a redirection with set cookies', function shouldExecuteRequest() {
//       return cs
//         .exec(function redirectCb(response) {
//           expect(response.statusCode).to.equal(HttpStatus.MOVED_TEMPORARILY);
//           var cookies = _.map(response.headers[ 'set-cookie' ], (strCookie) => cookie.parse(strCookie));
//           expect(cookies).to.have.lengthOf(2);
//
//           var eloquaAndEloquaStatus = _.reduce(cookies, (ac, c) => _.xor(_.keys(c), ac), []);
//           expect(eloquaAndEloquaStatus).to.include.members([ 'ELOQUA', 'ELQSTATUS' ]);
//           expect(response.headers[ 'location' ]).to.contains('elqCookie=1');
//         });
//     });

    // TODO: This test is doing too much, need refactor
    it('should issue request and should follow redirect with elqCookie set to 1', function shouldFollowRedirect() {
      var expectedRedirectCounts = 1;
      var redirectCounts         = 0;
      return cs
        .execWithRedirectCallback(
          { headers: { 'x-forwarded-for': faker.internet.ip(), } },
          function redirectCb(resp) {
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
