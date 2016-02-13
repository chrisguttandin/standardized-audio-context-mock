'use strict';

module.exports = function (config) {

    config.set({

        basePath: '../../',

        browsers: [
            'Chrome',
            'ChromeCanary',
            'Firefox',
            'FirefoxDeveloper',
            'Opera',
            'Safari'
        ],

        files: [
            'test/unit/**/*.js'
        ],

        frameworks: [
            'browserify',
            'mocha',
            'sinon-chai' // implicitly uses chai too
        ],

        preprocessors: {
            'test/unit/**/*.js': 'browserify'
        }

    });

};
