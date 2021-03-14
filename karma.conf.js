// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const path = require('path');
const packageJson = require(path.join(process.cwd(), 'package.json'));

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-edge-launcher'),
      require('karma-firefox-launcher'),
      require('karma-ie-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false
    },
    coverageIstanbulReporter: {
      useBrowserName: true,
      dir: path.join(process.cwd(), 'reports', 'UnitTest', 'coverage', '%browser%'),
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true,
    },
    junitReporter: {
      outputDir: path.join(process.cwd(), 'reports', 'UnitTest', 'unit'),
      suite: packageJson.name,
      useBrowserName: true,
      nameFormatter: undefined,
      classNameFormatter: undefined,
      properties: {}
    },
    reporters: ['junit', 'progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    browserNoActivityTimeout: 60000,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 1,
    captureTimeout: 60000,
    singleRun: false
  });
};
