import { defineConfig, devices } from "@playwright/test";
import { buildConfig } from "./src/lib/config";
import { UUVListenerHelper } from "@uuv/runner-commons";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: buildConfig(
      ["e2e/*.feature"],
      [
        "src/cucumber/preprocessor/index.ts",
        "src/cucumber/step_definitions/playwright/**/*.{ts,js}"
      ],
      "tests/.features-gen",
      "e2e"
  ),
  testMatch: ["**/*.spec.ts", "**/*.{ts,js}"],
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // FIXME workers: process.env.CI ? 1 : undefined,
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "./src/reporter/uuv-playwright-reporter.ts",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  outputDir: "reports/playwright",
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // eslint-disable-next-line dot-notation
    baseURL: process.env["UUV_BASE_URL"] ? process.env["UUV_BASE_URL"] : "http://localhost:4200",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",

    screenshot: "only-on-failure"
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    //
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    {
      name: "edge",
      use: { ...devices["Desktop Edge"], channel: "msedge" },
    },
    {
      name: "chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ]
});
