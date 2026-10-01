import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120_000,
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4322', headless: true },
  webServer: {
    command: 'npm run preview -- --port 4322',
    // Keep Astro in the process Playwright owns, including agent-run sessions.
    env: { ASTRO_PREVIEW_BACKGROUND: '1' },
    url: 'http://127.0.0.1:4322',
    reuseExistingServer: false,
  },
});
