var rsvp     = require('rsvp');
var mocha    = require('mocha');
var describe = mocha.describe,
    context  = mocha.context,
    before   = mocha.before;

var expect  = require('chai').expect;
var config  = require('config');
var http    = require('http');
var fs      = require('fs');
var request = require('request');
var _elqQ;

describe('Clickstream', function () {
  context('E10', function () {
    before(function (done) {
      // Fills for window and document global
      global[ 'window' ]   = {};
      global[ 'document' ] = { location: { protocol: 'http' } };
      saveToTmp(`http://${config.get('qa01p03.base_path')}/i/elqCfg.min.js`, 'elqCfg.min.js', done)
        .then(function (filename) {
          require('./tmp/elqCfg.js');
          _elqQ = window._elqQ;
        });
    });

    it('should track page', function shouldTrackPage(done) {
      var siteId               = 1862342680;
      var rootDomain           = 'elqqa01.com';
      var trackingScriptDomain = 'tracking.eloqua.com';
      _elqQ.push([ 'elqSetSiteId', siteId ]);
      _elqQ.push([ 'elqSetRootDomain', rootDomain ]);

      expect(1).to.eq(1);
//       return new rsvp.Promise(function(resolve, reject) {
//         _elqQ.push(['elqTrackPageView']);
//       });
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
