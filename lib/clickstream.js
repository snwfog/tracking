var rsvp    = require('rsvp');
var url     = require('url');
var request = require('request');
var extend  = require('jsface').extend;
var qs      = require('querystring');
var faker   = require('faker');
var debug   = require('debug')('clickstream');
var _       = require('lodash');
var Class   = require('jsface').Class;

var TrackingType     = require('./tracking_type');
var TrackingScenario = require('./tracking_scenario');
/**
 * Clickstream
 *
 * @param siteId - The site Id.
 * @param domain - Tracking domain, the root domain will
 *                 automatically be the last parts.
 * @param opts   - Options about clickstream
 * @constructor
 */
var Clickstream      = Class({
  constructor: function(siteId, rootDomain, opts) {
    // Request default options
    this.defaultRequestOpts = {
      // JAR is global... need to create jar for different request
      // jar: true,
    };

    if (_.isObject(opts)) {
      if (opts.isolated) {
        _.merge(this.defaultRequestOpts, { headers: { 'x-forwarded-for': faker.internet.ip(), } });
      }
    }

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
    if (!_.isArray(csMixins)) csMixins = [csMixins];
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
      var mergedOpts = _.merge({
        uri: this.requestEndpoint(),
        qs:  this.qs(),
      }, opts);
      request.defaults(this.defaultRequestOpts)(mergedOpts)
        .on('response', resolve)
        .on('error', reject);
    });
  },

  execWithRedirectCallback(fn, opts) {
    var headers = _.merge({ followRedirect: fn, }, opts);
    return this.exec(headers);
  }
});

module.exports = Clickstream;
