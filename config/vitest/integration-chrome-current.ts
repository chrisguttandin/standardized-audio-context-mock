import { webdriverio } from '@vitest/browser-webdriverio';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        bail: 1,
        browser: { enabled: true, instances: [{ browser: 'chrome', headless: true, name: 'Chrome', provider: webdriverio() }] },
        dir: 'test/integration/',
        include: ['**/*.js'],
        watch: false
    }
});
