var rsvp    = require('rsvp');
var expect  = require('chai').expect;
var assert  = require('chai').assert;
var faker   = require('faker');
var config  = require('config');
var http    = require('http');
var url     = require('url');
var fs      = require('fs');
var request = require('request');

var Clickstream           = require(process.cwd() + '/lib/clickstream');
var FirstPartyCookieMixin = require(process.cwd() + '/lib/track/first_party_cookie_mixin');

describe('Clickstream tracking', function() {
  context('[cf_sn_bn] First party cookie with strict mode off and bluekai off', function() {
    var siteId     = 3;
    var rootDomain = config.get(`${process.env.INSTANCE || 'dev'}.root_domain`);
    var cs;

    beforeEach(function beforeEach() {
      cs = new Clickstream(siteId, rootDomain);
      cs
        .mix(FirstPartyCookieMixin)
        .with(function() {
          this.setFirstPartyDomain('first-party-domain.com');
        });
    });

    it('should create a first party cookie tracking object', function shouldTrackPage() {
      expect(cs.firstPartyDomain).to.equal('first-party-domain.com');
    });

    it('should create proper first party cookie external track request endpoint', function properRequestEndpoint() {
      expect(cs.requestEndpoint()).to.be.equal('http://s3.t.dev.eloquacorp.com/visitor/v200/svrGP');
      expect(cs.qs()).to.deep.equal({
        siteId:                 3,
        pps:                    3,
        firstPartyCookieDomain: 'first-party-domain.com',
      });
    });

    context('#exec', function exec() {
      it('should return a promise', function execShouldReturnPromise() {
        expect(cs.exec()).to.respondTo('then');
      });

//       it('should make a request and contains firstPartyCookieDomain qs', function containFpcQs() {

      it('should make a request and contains firstPartyCookieDomain qs', function containFpcQs() {
        cs.mix(FirstPartyCookieMixin);
        var ln   = faker.image.imageUrl();
        var host = url.parse(ln).hostname;
        cs.setFirstPartyDomain(ln); // Error put full link here
        expect(cs.qs()).to.have.property('firstPartyCookieDomain', host);
      });

      it('should make a request and first response contain a redirect', function firstResponse() {
        var expectedCbCount = 1;
        var CbCount         = 0;

        return cs
          .mix(FirstPartyCookieMixin)
          .execWithRedirectCallback(function redirectCb(response) {
            CbCount++;
            if (CbCount == 1) {
              var locationUrl302 = url.parse(response.headers.location, true, true);
              expect(locationUrl302.query).to.have.ownProperty('elq1pcGUID');
            }
            return true;
          })
          .then(() => {
            expect(CbCount).to.be.equal(expectedCbCount, 'Redirect should be trigger once');
          })
      });
    });
  });
});

function saveToTmp(url, filename, done) {
  return new rsvp.Promise(function(resolve, reject) {
    console.log('Saving ' + url + ' to ' + 'tmp/' + filename);
    var tmpFile = fs.createWriteStream('./test/tmp/' + filename);
    tmpFile.write('/* ' + (new Date()) + ' */ ');
    request.get(url)
      .on('response', function() {
        done();
        resolve(filename);
      })
      .on('error', reject)
      .pipe(tmpFile);
  });
}