/**
 * __Not auto-generated__
 * Do not touch.
 * RequireJs configuration file.
 */
requirejs.config({
  baseUrl: '/bower_components',
  paths:   {

    lib:  '/lib',
    test: '/test',

    elqQ:           '/javascripts/elqCfg',
    rsvp:           'rsvp.js/rsvp',
    yaml:           'js-yaml/dist/js-yaml',
    jasmine:        'jasmine-core/lib/jasmine-core/jasmine',
    'jasmine-html': 'jasmine-core/lib/jasmine-core/jasmine-html',
    boot:           'jasmine-core/lib/jasmine-core/boot',
  },

  shim: {
    elqQ:           {
      exports: 'window._elqQ'
    },
    jasmine:        {
      exports: 'window.jasmineRequire'
    },
    'jasmine-html': {
      deps:    [ 'jasmine' ],
      exports: 'window.jasmineRequire'
    },
    boot:           {
      deps:    [ 'jasmine', 'jasmine-html' ],
      exports: 'window.jasmineRequire'
    }
  }
});

require([ 'elqQ', 'boot' ], function () {
  console.info('Eloqua Asynchronous Tracking Script loaded.');
  console.info('\n████████╗██████╗  █████╗  ██████╗██╗  ██╗██╗███╗   ██╗ ██████╗     ██████╗\n╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██║████╗  ██║██╔════╝     ╚════██╗\n   ██║   ██████╔╝███████║██║     █████╔╝ ██║██╔██╗ ██║██║  ███╗     █████╔╝\n   ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ ██║██║╚██╗██║██║   ██║    ██╔═══╝\n   ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗██║██║ ╚████║╚██████╔╝    ███████╗\n   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝     ╚══════╝\n ');
  var specs = [
    'test/clickstream/fpc_test',
  ];
  require(specs, window.onload);
});
