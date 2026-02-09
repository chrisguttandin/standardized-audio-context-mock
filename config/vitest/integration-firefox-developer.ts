import { env } from 'node:process';
import { webdriverio } from '@vitest/browser-webdriverio';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        bail: 1,
        browser: {
            enabled: true,
            instances: env.CI
                ? []
                : [
                      {
                          browser: 'firefox',
                          headless: true,
                          name: 'Firefox Developer',
                          provider: webdriverio({
                              capabilities: {
                                  'moz:firefoxOptions': { binary: '/Applications/Firefox\ Developer\ Edition.app/Contents/MacOS/firefox' }
                              }
                          })
                      }
                  ]
        },
        dir: 'test/integration/',
        include: ['**/*.js'],
        watch: false
    }
});
