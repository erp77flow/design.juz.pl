// Visual regression snapshotter. Iterates every Storybook story declared in
// `${BASE_URL}/index.json` and writes a deterministic PNG per story into
// `${OUT_DIR}`. Used by:
//   - `pnpm visual:baseline` (regenerates the blessed PNGs in tests/visual/baseline/)
//   - `pnpm visual:snap`    (writes current PNGs to tests/visual/current/)
//   - the GitHub Actions workflow (.github/workflows/visual.yml)
//
// Headless Chromium parses some CSS edge cases (e.g. invalid HSL) differently
// from desktop Chrome, so the baselines are intentionally taken from the same
// engine that CI uses — don't compare baselines captured by a different tool.
import { chromium } from "playwright";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = process.env.STORYBOOK_URL || "http://127.0.0.1:6006";
const OUT_DIR = resolve(process.argv[2] || "tests/visual/current");
const VIEWPORT_W = 1440;
const VIEWPORT_H = 900;
const SETTLE_MS = 400;

// Fresh output dir
rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

// Pull the index from the running Storybook server
const indexUrl = `${BASE_URL}/index.json`;
const res = await fetch(indexUrl);
if (!res.ok) {
  console.error(`failed to fetch ${indexUrl}: ${res.status}`);
  process.exit(1);
}
const index = await res.json();
const storyIds = Object.entries(index.entries || {})
  .filter(([, v]) => v.type === "story")
  .map(([k]) => k);

console.log(`snapping ${storyIds.length} stories from ${BASE_URL}`);

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: VIEWPORT_W, height: VIEWPORT_H },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
});

// Kill animations and the blinking caret so screenshots are deterministic.
await ctx.addInitScript(() => {
  const style = document.createElement("style");
  style.textContent = `
    *, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
      caret-color: transparent !important;
    }
  `;
  document.documentElement.appendChild(style);
});

const page = await ctx.newPage();
let snapped = 0;
const failed = [];

for (const id of storyIds) {
  const url = `${BASE_URL}/iframe.html?id=${id}&viewMode=story`;
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    // Wait until the story root has children — Storybook injects them
    // asynchronously after the iframe boots.
    await page
      .waitForFunction(
        () => {
          const el = document.getElementById("storybook-root");
          return el && el.children.length > 0;
        },
        { timeout: 15000 }
      )
      .catch(() => {});
    await page.waitForTimeout(SETTLE_MS);
    await page.screenshot({
      path: resolve(OUT_DIR, `${id}.png`),
      fullPage: true,
    });
    snapped++;
    if (snapped % 10 === 0) console.log(`  [${snapped}/${storyIds.length}]`);
  } catch (e) {
    failed.push({ id, error: e.message });
    console.error(`  FAIL ${id}: ${e.message}`);
  }
}

await browser.close();

console.log(`done: ${snapped}/${storyIds.length} snapped to ${OUT_DIR}`);
if (failed.length) {
  console.error(`${failed.length} failures`);
  process.exit(1);
}
