#!/usr/bin/env node
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const SCREENSHOT_DIR = path.resolve(process.cwd(), "screenshots");
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

console.log("==================================================");
console.log("  solid-icons: E2E Reactivity & Screenshot Suite  ");
console.log("==================================================");
console.log(`Screenshots output: ${SCREENSHOT_DIR}\n`);

// Run playwright test
const proc = spawn("npx", ["playwright", "test", ...process.argv.slice(2)], {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    ASTRO_TELEMETRY_DISABLED: "1",
  },
});

proc.on("exit", (code) => {
  if (code === 0) {
    console.log("\n--------------------------------------------------");
    console.log("All version & reactivity tests passed successfully!");
    console.log("Screenshots captured in ./screenshots/:");
    try {
      const files = fs.readdirSync(SCREENSHOT_DIR).filter(f => f.endsWith(".png")).sort();
      for (const f of files) {
        const stat = fs.statSync(path.join(SCREENSHOT_DIR, f));
        console.log(`  - ${f} (${(stat.size / 1024).toFixed(1)} KB)`);
      }
    } catch {}
    console.log("--------------------------------------------------\n");
  } else {
    console.error(`\nTests finished with exit code ${code}`);
  }
  process.exit(code || 0);
});
