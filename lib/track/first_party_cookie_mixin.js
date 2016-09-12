var Class = require('jsface').Class;
var http  = require('http');
var url   = require('url');
var _     = require('lodash');
var debug = require('debug')('clickstream:page-view');

var TrackingType     = require('../tracking_type');
var TrackingScenario = require('../tracking_scenario');

var FirstPartyCookieMixin = Class({
  decorate(cs) {
    if (!cs.scenario.xor(TrackingScenario.FirstPartyCookie())
        .equals(TrackingScenario.FirstPartyCookie())) {
      debug(`decorating cs ${cs} to a first party cookie`);
    } else {
      debug(`cs ${cs} is already a first party cookie, nothing is done.`)
    }
  },

  setFirstPartyDomain(domain) {
    this.firstPartyDomain   = domain;
    this.defaultRequestOpts = _.merge(this.defaultRequestOpts, {
      'Host': domain,
    });
  }
});


module.exports = FirstPartyCookieMixin;
