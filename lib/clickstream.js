var http = require('http');
var url  = require('url');
var debug = require('debug')('clickstream');

var TrackPageView = require('./track/track_page_view');

/**
 * Clickstream
 * @param siteId - The site Id.
 * @param domain - Tracking domain, the root domain will
 *                 automatically be the last parts.
 * @constructor
 */
function Clickstream(siteId, domain) {
  this.siteId         = siteId;
  this.trackingDomain = domain;
  this.rootDomain     = url.parse(domain).hostname;
  debug(`cs siteId=${this.siteId} trackingDomain=${this.trackingDomain} rootDomain=${this.rootDomain}`);;
}

Clickstream.prototype = {
  trackPageView: new TrackPageView,
};

module.exports = Clickstream;
