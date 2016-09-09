var rsvp    = require('rsvp');
var expect  = require('chai').expect;
var config  = require('config');
var http    = require('http');
var fs      = require('fs');
var request = require('request');

var cs = require(process.cwd() + '/lib/clickstream');

describe('Clickstream tracking', function () {
  context('First party cookie', function () {
    it('should track page', function shouldTrackPage() {
      expect(1).to.be.eql(1, 'Unit test with mocha');
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