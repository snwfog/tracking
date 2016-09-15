var expect  = require('chai').expect;
var cookie  = require('cookie');
var url     = require('url');
var http    = require('http');
var fs      = require('fs');
var config  = require('config');
var request = require('request').defaults({ jar: true });
var jsface  = require('jsface');
var faker   = require('faker');
var sinon   = require('sinon');
var _       = require('lodash');

require('dotenv').config();

var cfg         = config.get(process.env.INSTANCE);
var ROOT_DOMAIN = cfg.get('root_domain');
var SITE_ID     = cfg.get('site_id');

var HttpStatus   = require('http-status-codes');
var TrackingType = require(process.cwd() + '/lib/tracking_type');
var Clickstream  = require(process.cwd() + '/lib/clickstream');

/**
 * Test for Clickstream library
 */
describe('Clickstream', function() {
  var cs;

  beforeEach(function() {
    cs = new Clickstream(SITE_ID, ROOT_DOMAIN, { isolated: true });
  });

  context('Properties', function() {
    it('should produce valid root domain', function validRootDomain() {
      expect(cs.elqRootDomain).to.be.equal('s3.t.dev.eloquacorp.com');
    });

    it('should produce a valid page view track url', function validRequestEndpoint() {
      expect(cs.requestEndpoint()).to
        .equal(`http://s${SITE_ID}.t.${ROOT_DOMAIN}/visitor/v200/svrGP`);
    });

    it('should produce valid query parameters hash', function validQueryStrings() {
      expect(cs.qs()).to.be.deep.equal({
        pps:    TrackingType.ClickstreamFromImage,
        siteId: SITE_ID,
      });
    });

    context('opts', function options() {
      context('isolated context x-forwarded-for', function() {
        it('should not have x-forwarded-for-header if not isolated', function shouldNotForwardIp() {
          cs = new Clickstream(SITE_ID, ROOT_DOMAIN);
          expect(cs.defaultRequestOpts.headers).to.be.empty;
        });

        it('should allow isolated and global mode, which would change ip on every request', function supportIsolatedOrGlobal() {
          var cs1 = new Clickstream(SITE_ID, ROOT_DOMAIN, { isolated: true });
          var cs2 = new Clickstream(SITE_ID, ROOT_DOMAIN, { isolated: true });
          expect(cs1.defaultRequestOpts).to.not.deep.equal(cs2.defaultRequestOpts);
        });
      });
    });
  });

  context('cs', function cs() {
    it('should issue a request and contains a redirection with set cookies', function shouldExecuteRequest() {
      return cs
        .execWithRedirectCallback(function redirectCb(response) {
          expect(response.statusCode).to.equal(HttpStatus.MOVED_TEMPORARILY);
          var cookies = _.map(response.headers['set-cookie'], (strCookie) => cookie.parse(strCookie));
          expect(cookies).to.have.lengthOf(2);

          var eloquaAndEloquaStatus = _.reduce(cookies, (ac, c) => _.xor(_.keys(c), ac), []);
          expect(eloquaAndEloquaStatus).to.include.members(['ELOQUA', 'ELQSTATUS']);
          expect(response.headers['location']).to.contains('elqCookie=1');
          return false;
        });
    });

    it('should have at most 1 redirect', function shouldHaveOneRedirect() {
      var expectedRedirectCounts = 1;
      var redirectCounts         = 0;
      return cs
        .execWithRedirectCallback(function redirectCb() {
          redirectCounts++;
          return true;
        })
        .then(function() {
          expect(redirectCounts).to.be.at.most(expectedRedirectCounts);
        });
    });

    it('should issue request with redirect containing elqCookie set to 1', function shouldFollowRedirect() {
      return cs.execWithRedirectCallback(function redirectCb(resp) {
        expect(resp.uri.href).to.match(/elqCookie=1$/);
        return true;
      });
    });

    it('should return an image gif content type', function shouldHaveGif() {
      return cs.exec().then(function(resp) {
        expect(resp.headers).to.have.property('content-type', 'image/gif');
      });
    });
  });

  context('#exec', function clickstreamExec() {
    it('should return a promise', function execShouldReturnPromise() {
      expect(cs.exec()).to.respondsTo('then');
    });
  });

  context('#execWithRedirectCallback', function execWithRedirectCallbackContext() {
    it('should return a promise', function shouldReturnAPromise() {
      var cb = sinon.spy();
      expect(cs.execWithRedirectCallback(cb, {})).to.respondsTo('then');
    });

    it('should call exec once only', function shouldCallExecOnceOnly() {
      sinon.spy(cs, 'exec');
      var cb = sinon.spy();
      cs.execWithRedirectCallback(cb, {});
      expect(cs.exec.calledOnce).to.be.true;
    });

    it('should call exec with merged opts', function shouldCallExecWithMergedArgs() {
      sinon.spy(cs, 'exec');
      var cb = sinon.spy();
      var headers = { headers: { 'hola': 'como esta?' } };
      cs.execWithRedirectCallback(cb, headers);
      expect(cs.exec.calledWithExactly(sinon.match(_.merge({ followRedirect: cb }, headers)))).to.be.true;
    });
  });
});
