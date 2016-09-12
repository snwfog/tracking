var rsvp    = require('rsvp');
var url     = require('url');
var request = require('request');
var extend  = require('jsface').extend;
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
    this.defaultRequestOpts = {
      jar: true,
    };

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

    this.queryString = {
      pps:    TrackingType.ClickstreamFromImage,
      siteId: this.elqSiteId,
    };

    debug(`cs siteId=${this.elqSiteId} trackingDomain=${this.elqRootDomain}`);
  },

  qs() {
    return _.cloneDeep(this.queryString);
  },

  mix(csMixins) {
//     if (!!csMixin.decorate && typeof(csMixin.decorate) == 'function')
    if (!_.isArray(csMixins)) csMixins = [ csMixins ];
    csMixins.forEach((mixin) => {
      extend(this, mixin);
      mixin._initialize(this);
    });
    return this;
  },

  with(initFn) {
    initFn.call(this);
  },

  requestEndpoint() {
    return `http://${this.elqRootDomain}/${this.endpointBase}`;
  },

  requestQuerystrings() {
    return qs.stringify(this.properties());
  },

  updateQueryString(props) {
    _.merge(this.queryString, props);
  },

  exec(opts) {
    return new rsvp.Promise((resolve, reject) => {
      request(_.merge(this.defaultRequestOpts, {
        uri:     `${this.requestEndpoint()}`,
        headers: (opts.headers || {}), // Merge headers
        qs:      this.qs(), // Need better handling errors here...
      }, opts))
        .on('response', resolve)
        .on('error', reject);
    });
  },

  execWithRedirectCallback(fn) {
    return this.exec({ followRedirect: fn, });
  }
});

module.exports = Clickstream;
