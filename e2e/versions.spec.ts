import { test, expect } from "@playwright/test";
import { spawn, execSync, ChildProcess } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const SCREENSHOT_DIR = path.resolve(process.cwd(), "screenshots");
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

interface TestTarget {
  name: string;
  cwd: string;
  devCommand: string[];
  buildCommand: string;
  previewCommand: string[];
  port: number;
}

const TARGETS: TestTarget[] = [
  {
    name: "test-solid-1.7",
    cwd: "apps/test-solid-1.7",
    devCommand: ["./node_modules/.bin/vite", "--port", "5177", "--strictPort"],
    buildCommand: "./node_modules/.bin/vite build",
    previewCommand: ["./node_modules/.bin/vite", "preview", "--port", "5177", "--strictPort"],
    port: 5177,
  },
  {
    name: "test-solid-1.8",
    cwd: "apps/test-solid-1.8",
    devCommand: ["./node_modules/.bin/vite", "--port", "5178", "--strictPort"],
    buildCommand: "./node_modules/.bin/vite build",
    previewCommand: ["./node_modules/.bin/vite", "preview", "--port", "5178", "--strictPort"],
    port: 5178,
  },
  {
    name: "test-solid-1.9",
    cwd: "apps/test-solid-1.9",
    devCommand: ["./node_modules/.bin/vite", "--port", "5179", "--strictPort"],
    buildCommand: "./node_modules/.bin/vite build",
    previewCommand: ["./node_modules/.bin/vite", "preview", "--port", "5179", "--strictPort"],
    port: 5179,
  },
  {
    name: "test-solid-2.0",
    cwd: "apps/test-solid-2.0",
    devCommand: ["./node_modules/.bin/vite", "--port", "5180", "--strictPort"],
    buildCommand: "./node_modules/.bin/vite build",
    previewCommand: ["./node_modules/.bin/vite", "preview", "--port", "5180", "--strictPort"],
    port: 5180,
  },
  {
    name: "astro-test",
    cwd: "apps/astro-test",
    devCommand: ["./node_modules/.bin/astro", "dev", "--port", "5181"],
    buildCommand: "./node_modules/.bin/astro build",
    previewCommand: ["./node_modules/.bin/astro", "preview", "--port", "5181"],
    port: 5181,
  },
];

async function waitForServer(url: string, timeoutMs = 30000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 404 || res.status === 200) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`Timeout waiting for server at ${url}`);
}

async function stopProcess(proc: ChildProcess | null): Promise<void> {
  if (!proc || proc.killed) return;
  return new Promise((resolve) => {
    try {
      proc.kill("SIGTERM");
    } catch {}
    setTimeout(() => {
      try {
        proc.kill("SIGKILL");
      } catch {}
      resolve();
    }, 1000);
  });
}

for (const target of TARGETS) {
  test.describe(`${target.name}`, () => {
    test.describe.configure({ mode: "serial" });

    test("dev mode: renders icon and verifies reactivity", async ({ page }) => {
      let server: ChildProcess | null = null;
      try {
        server = spawn(target.devCommand[0], target.devCommand.slice(1), {
          cwd: target.cwd,
          stdio: "ignore",
          env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1" },
        });

        const url = `http://localhost:${target.port}`;
        await waitForServer(url);
        await page.goto(url, { waitUntil: "networkidle" });

        const svg = page.locator("svg").first();
        await expect(svg).toBeVisible({ timeout: 10000 });

        // Initial state
        await expect(svg).toHaveCSS("color", "rgb(44, 79, 124)");
        const initialShot = path.join(SCREENSHOT_DIR, `${target.name}-dev-initial.png`);
        await page.screenshot({ path: initialShot });

        // Click toggle button to test reactivity
        const toggleBtn = page.getByRole("button", { name: /toggle/i });
        await toggleBtn.click();

        // Reactive state (waits for transition to complete to rgb(230, 57, 70))
        await expect(svg).toHaveCSS("color", "rgb(230, 57, 70)");
        const toggledShot = path.join(SCREENSHOT_DIR, `${target.name}-dev-toggled.png`);
        await page.screenshot({ path: toggledShot });
      } finally {
        await stopProcess(server);
      }
    });

    test("build mode: dist output renders and verifies reactivity", async ({ page }) => {
      // 1. Build
      execSync(target.buildCommand, {
        cwd: target.cwd,
        stdio: "ignore",
        env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1" },
      });

      let preview: ChildProcess | null = null;
      try {
        preview = spawn(target.previewCommand[0], target.previewCommand.slice(1), {
          cwd: target.cwd,
          stdio: "ignore",
          env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1" },
        });

        const url = `http://localhost:${target.port}`;
        await waitForServer(url);
        await page.goto(url, { waitUntil: "networkidle" });

        const svg = page.locator("svg").first();
        await expect(svg).toBeVisible({ timeout: 10000 });

        // Initial state in production
        await expect(svg).toHaveCSS("color", "rgb(44, 79, 124)");
        const initialShot = path.join(SCREENSHOT_DIR, `${target.name}-build-initial.png`);
        await page.screenshot({ path: initialShot });

        // Click toggle button
        const toggleBtn = page.getByRole("button", { name: /toggle/i });
        await toggleBtn.click();

        // Reactive state in production
        await expect(svg).toHaveCSS("color", "rgb(230, 57, 70)");
        const toggledShot = path.join(SCREENSHOT_DIR, `${target.name}-build-toggled.png`);
        await page.screenshot({ path: toggledShot });
      } finally {
        await stopProcess(preview);
      }
    });
  });
}
