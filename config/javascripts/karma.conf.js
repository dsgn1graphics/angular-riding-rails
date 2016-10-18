module.exports = function(config) {
  var testWebpackConfig = require('./webpack.test.js');
  var configuration = {
    basePath: '',
    frameworks: ['jasmine'],
    exclude: [ ],
    files: [ { pattern: './config/javascripts/karma-test-shim.js', watched: false } ],
    preprocessors: { './config/javascripts/karma-test-shim.js': ['coverage', 'webpack', 'sourcemap'] },
    webpack: testWebpackConfig,
    coverageReporter: {
      type: 'in-memory'
    },
    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage/html'
    },
    webpackMiddleware: { stats: 'errors-only'},
    reporters: [ 'progress' ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: [
      'PhantomJS'
    ],
    customLaunchers: {
      ChromeTravisCi: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    singleRun: true
  };

  if (process.argv.indexOf('--debug') > -1) {
    configuration.preprocessors['./config/javascripts/karma-test-shim.js'] = ['webpack', 'sourcemap'];
    configuration.browsers = ['Chrome'];
    configuration.singleRun = false;
  };

  config.set(configuration);
};