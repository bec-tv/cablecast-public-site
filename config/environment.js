'use strict';

module.exports = function (environment) {
  let ENV = {
    'ember-cli-head': {
      suppressBrowserRender: true,
    },
    'ember-metrics': {
      includeAdapters: ['google-analytics', 'console-adapter'],
    },
    routerScroll: {
      scrollWhenIdle: true,
    },
    pageTitle: {
      replace: true,
    },
    fastboot: {
      hostWhitelist: [/.+/],
    },
    CC_LOCAL: process.env.CC_LOCAL === "TRUE",
    environment,
    rootURL: '/',
    modulePrefix: 'cablecast-public-site',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    CCSServer: 'https://screenweave-staging.herokuapp.com',
  };

  if (environment === 'development') {
    ENV.CCSServer = "http://localhost:5000";
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  let proxy = process.argv.join(' ').match(/--proxy[ =](\S+)/);
  if (proxy && proxy.length && proxy.length >= 2) {
    proxy = proxy[1];
  }

  if (proxy) {
    ENV.PROXY = proxy;
  }

  if (ENV.CC_LOCAL && environment === 'production') {
    ENV.rootURL = '/CablecastPublicSite/';
  }

  return ENV;
};
