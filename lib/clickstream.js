var rsvp    = require('rsvp');
var url     = require('url');
var request = require('request');
var qs      = require('querystring');
var debug   = require('debug')('clickstream');
var _       = require('lodash');
var Class   = require('jsface').Class;

var TrackingType     = require('./tracking_type');
var TrackingScenario = require('./tracking_scenario');
/**
 * Clickstream
 * @param siteId - The site Id.
 * @param domain - Tracking domain, the root domain will
 *                 automatically be the last parts.
 * @constructor
 */
var Clickstream      = Class({
  constructor: function (siteId, rootDomain) {
    // Request default options
    this.defaultRequestOpts = {};

    this.elqSiteId     = siteId;
    this.elqRootDomain = `s${siteId}.t.${rootDomain}`;
    this.endpointBase  = 'visitor/v200/svrGP'; // Relative path

    this.pageUrl  = '';
    this.referrer = '';
    this.tzo      = '';

    this.scenario = TrackingScenario.None();

    // this.optIn = '';

    // this.trackingDomain = domain;
    // this.rootDomain     = url.parse(domain).hostname;
    // this.isFirstPartyCookie = ''
    // this.visitorGuid    = '';

    // this.bkSwaptime = ''
    debug(`cs siteId=${this.elqSiteId} trackingDomain=${this.elqRootDomain}`);
  },

  properties() {
    return {
      pps:    TrackingType.ClickstreamFromImage,
      siteId: this.elqSiteId,
    };
  },

  mix(csMixin) {
//     if (!!csMixin.decorate && typeof(csMixin.decorate) == 'function')
    csMixin.decorate(this);
  },

  requestEndpoint() {
    return `http://${this.elqRootDomain}/${this.endpointBase}`;
  },

  requestQuerystrings() {
    return qs.stringify(this.properties());
  },

  exec(opts) {
    return new rsvp.Promise((resolve, reject) => {
      request(_.merge({
        uri:     `${this.requestEndpoint()}`,
        headers: (opts.headers || {}), // Merge headers
        qs:      this.properties(),
      }, _.merge(this.defaultRequestOpts, opts)))
        .on('response', resolve)
        .on('error', reject);
    });
  }
});

module.exports = Clickstream;
