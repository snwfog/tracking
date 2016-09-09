var Class = require('jsface').Class;
var http  = require('http');
var url   = require('url');
var debug = require('debug')('clickstream:page-view');

var TrackingType = require('../tracking_type');

/**
 * Track page view mixin
 * @constructor
 *
 */
var TrackPageView = Class({
  requestEndpoint: function () {
    debug(`Track page view mixin constructor ${this.requestEndpoint}`);
    return 'some url in trackpageview';
  },

  exec: function () {
    debug(`Tracking [${TrackingType.ClickstreamFromImage}]`);
  }
});

module.exports = TrackPageView;
