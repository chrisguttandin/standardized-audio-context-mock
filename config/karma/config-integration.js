const { env } = require('process');

module.exports = (config) => {
    config.set({
        browserNoActivityTimeout: 20000,

        files: ['../../test/integration/**/*.js'],

        frameworks: ['mocha', 'sinon-chai'],

        preprocessors: {
            '../../test/integration/**/*.js': 'webpack'
        },

        webpack: {
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.ts?$/,
                        use: {
                            loader: 'ts-loader'
                        }
                    }
                ]
            },
            resolve: {
                extensions: ['.js', '.ts']
            }
        },

        webpackMiddleware: {
            noInfo: true
        }
    });

    if (env.TRAVIS) {
        config.set({
            browsers: ['ChromeSauceLabs', 'FirefoxSauceLabs'],

            captureTimeout: 120000,

            customLaunchers: {
                ChromeSauceLabs: {
                    base: 'SauceLabs',
                    browserName: 'chrome',
                    platform: 'macOS 10.13'
                },
                FirefoxSauceLabs: {
                    base: 'SauceLabs',
                    browserName: 'firefox',
                    platform: 'macOS 10.13'
                }
            },

            tunnelIdentifier: env.TRAVIS_JOB_NUMBER
        });
    } else {
        config.set({
            browsers: ['ChromeCanaryHeadless', 'ChromeHeadless', 'FirefoxDeveloperHeadless', 'FirefoxHeadless']
        });
    }
};
