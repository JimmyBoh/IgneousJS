// Karma configuration
// Generated on Mon Feb 16 2015 22:26:59 GMT-0500 (Eastern Standard Time)

module.exports = function (config) {

  // Use ENV vars on Travis and sauce.json locally to get credentials
  if (!process.env.SAUCE_USERNAME) {
    throw new Error('Set values for SAUCE_USERNAME and SAUCE_ACCESS_KEY!');
    process.exit(1);
  }

  // Browsers to run on Sauce Labs
  var customLaunchers = {
    'SL_Chrome': {
      base: 'SauceLabs',
      browserName: 'chrome'
    },
    'SL_Safari': {
      base: 'SauceLabs',
      browserName: 'safari'
    },
    'SL_Firefox': {
      base: 'SauceLabs',
      browserName: 'firefox'
    },
    'SL_IE7': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '7'
    },
    'SL_IE8': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '8'
    },
    'SL_IE9': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '9'
    },
    'SL_IE10': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '10'
    },
    'SL_IE11': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '11'
    }
  };

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      '../src/**/*.js',
      '../spec/**/*[sS]pec.js'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'dots', 'saucelabs'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    sauceLabs: {
      testName: 'Igneous Browser Tests'
    },
    captureTimeout: 120000,
    customLaunchers: customLaunchers,
    
    browsers: Object.keys(customLaunchers),

    // CI mode, run once and exit...
    singleRun: true
  });
};
