const { env } = require('process');

module.exports = function (config) {
    config.set({
        basePath: '../../',

        files: ['test/unit/**/*.js'],

        frameworks: ['mocha', 'sinon-chai'],

        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },

        preprocessors: {
            'src/**/*.ts': 'webpack',
            'test/unit/**/*.js': 'webpack'
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
            browsers: [
                // 'ChromeCanarySauceLabs',
                'ChromeSauceLabs',
                // 'FirefoxDeveloperSauceLabs',
                'FirefoxSauceLabs',
                'SafariSauceLabs'
            ],

            captureTimeout: 120000,

            customLaunchers: {
                ChromeCanarySauceLabs: {
                    base: 'SauceLabs',
                    browserName: 'chrome',
                    platform: 'macOS 10.13',
                    version: 'dev'
                },
                ChromeSauceLabs: {
                    base: 'SauceLabs',
                    browserName: 'chrome',
                    platform: 'macOS 10.13'
                },
                FirefoxDeveloperSauceLabs: {
                    base: 'SauceLabs',
                    browserName: 'firefox',
                    platform: 'macOS 10.13',
                    version: 'dev'
                },
                FirefoxSauceLabs: {
                    base: 'SauceLabs',
                    browserName: 'firefox',
                    platform: 'macOS 10.13'
                },
                SafariSauceLabs: {
                    base: 'SauceLabs',
                    browserName: 'safari',
                    platform: 'macOS 10.13'
                }
            },

            tunnelIdentifier: env.TRAVIS_JOB_NUMBER
        });
    } else {
        config.set({
            browsers: ['ChromeHeadless', 'ChromeCanaryHeadless', 'FirefoxHeadless', 'FirefoxDeveloperHeadless', 'Opera', 'Safari'],

            concurrency: 2
        });
    }
};
