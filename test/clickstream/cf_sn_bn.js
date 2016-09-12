var rsvp    = require('rsvp');
var expect  = require('chai').expect;
var config  = require('config');
var http    = require('http');
var fs      = require('fs');
var request = require('request');

var Clickstream           = require(process.cwd() + '/lib/clickstream');
var FirstPartyCookieMixin = require(process.cwd() + '/lib/clickstream/track/first_party_cookie_mixin');

describe('Clickstream tracking', function () {
  context('[cf_sn_bn] First party cookie with strict mode off and bluekai off', function () {
    it('Should create a first party cookie tracking object', function shouldTrackPage() {
      var siteId     = 3;
      var rootDomain = config.get(`${process.env.INSTANCE || 'dev'}.root_domain`);
      var cs         = new Clickstream(siteId, rootDomain);
      cs.mix(FirstPartyCookieMixin);
    });
  });
});

function select(instance) {
  console.log(`Selecting instance ${instance}`);
}

function buildURL(instance) {
}

function saveToTmp(url, filename, done) {
  return new rsvp.Promise(function (resolve, reject) {
    console.log('Saving ' + url + ' to ' + 'tmp/' + filename);
    var tmpFile = fs.createWriteStream('./test/tmp/' + filename);
    tmpFile.write('/* ' + (new Date()) + ' */ ');
    request.get(url)
      .on('response', function () {
        done();
        resolve(filename);
      })
      .on('error', reject)
      .pipe(tmpFile);
  });
}