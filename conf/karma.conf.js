module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // list of files / patterns to load in the browser
    files: [
      'dist/js/slacker.min.js',
      {pattern: 'spec/lib/jquery.min.js', watched: false, served: true,
        included: true},
      {pattern: 'spec/lib/jasmine-jquery.js', watched: false, served: true,
        included: true},
      {pattern: 'src/*.js', watched: true, served: true, included: false},
      {pattern: 'spec/css/*.css', included: false},
      {pattern: 'spec/**/*.html', included: false},
      'spec/js/fixtures.js',
    ],

    // list of files to exclude
    exclude: [],

    frameworks: ['jasmine'],
    reporters: ['progress'],
    port: 9876,
    runnerPort: 9100,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    // CLI --browsers Chrome,Firefox,Safari
    browsers: ['ChromeCanary'],

    captureTimeout: 50000,
    singleRun: true,
    reportSlowerThan: 500,
    preprocessors: {},

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      'karma-opera-launcher',
      'karma-script-launcher'
    ]
  });
};