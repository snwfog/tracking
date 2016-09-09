/**
 * __Not auto-generated__
 * Do not touch.
 * RequireJs configuration file.
 */
requirejs.config({
  baseUrl: '/bower_components',
  paths:   {

    lib:    '/lib',
    spec:   '/spec',
    config: '/config',

    elqQ:           '/javascripts/elqCfg',
    rsvp:           'rsvp.js/rsvp',
    yaml:           'require-yaml/yaml',
    text:           'requirejs-text/text',
    'js-yaml':      'js-yaml/dist/js-yaml',
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
  },
});

require([ 'elqQ', 'boot', 'yaml!config/default.yml' ], function (elqQ, boot, config) {
  console.info('Eloqua Asynchronous Tracking Script loaded.');
  console.info('\n████████╗██████╗  █████╗  ██████╗██╗  ██╗██╗███╗   ██╗ ██████╗     ██████╗\n╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██║████╗  ██║██╔════╝     ╚════██╗\n   ██║   ██████╔╝███████║██║     █████╔╝ ██║██╔██╗ ██║██║  ███╗     █████╔╝\n   ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ ██║██║╚██╗██║██║   ██║    ██╔═══╝\n   ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗██║██║ ╚████║╚██████╔╝    ███████╗\n   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝     ╚══════╝\n ');

  var specs = [
    'spec/clickstream/tpc_spec',
    'spec/clickstream/fpc_spec',
  ];

  require(specs, window.onload);
});
