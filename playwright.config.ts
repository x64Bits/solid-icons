import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  use: {
    ...devices["Desktop Chrome"],
    channel: "chrome",
    viewport: { width: 1280, height: 720 },
    screenshot: "off",
    launchOptions: {
      args: ["--no-sandbox", "--disable-gpu"],
    },
  },
});
