var Class = require('jsface').Class;
var http  = require('http');
var url   = require('url');
var _     = require('lodash');
var debug = require('debug')('clickstream:page-view');

var TrackingType     = require('../tracking_type');
var TrackingScenario = require('../tracking_scenario');

var FirstPartyCookieMixin = Class({
  firstPartyDomain: null,
  $static:          {
    _initialize(cs) {
      if (cs.scenario.and(TrackingScenario.FirstPartyCookie())
          .equals(TrackingScenario.FirstPartyCookie())) {
        debug(`cs ${cs} is already a first party cookie, nothing is done.`);
        return;
      }

      debug(`decorating cs ${cs} to a first party cookie`);
      // TODO: Update cs tracking scenario
    },
  },

  setFirstPartyDomain(domain) {
    domain                = /\/\//.test(domain) ? domain : `//${domain}`;
    var hostname          = url.parse(domain, true, true).hostname;
    this.firstPartyDomain = hostname;
    this.updateQueryString({
      firstPartyCookieDomain: hostname,
    });
  },
});


module.exports = FirstPartyCookieMixin;
