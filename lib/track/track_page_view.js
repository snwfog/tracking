var url  = require('url');
var debug = require('debug')('clickstream:page-view');

/**
 * Track page view
 * @constructor
 *
 */
function TrackPageView() {}
TrackPageView.prototype.requestEndpoint = 'some url';

module.exports = TrackPageView;
