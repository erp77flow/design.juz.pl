# Visual regression

Iterates every Storybook story and diffs a fresh screenshot against the committed baseline. CI fails when a story's pixel difference crosses the threshold (default 0.5%).

## Layout

```
tests/visual/
├── snap.mjs          # captures screenshots via Playwright
├── diff.py           # compares current/ vs baseline/, emits diff PNGs
├── baseline/         # blessed PNGs (committed)
├── current/          # latest run (gitignored)
└── diff/             # red-overlay diffs for failing stories (gitignored)
```

## Workflows

**Run the regression check locally** (assumes Storybook is built):

```bash
pnpm serve-storybook &               # serves storybook-static/ on :6006
pnpm visual:snap                     # writes tests/visual/current/
pnpm visual:diff                     # compares current vs baseline, exits 1 on regression
```

**Update baselines** when a visual change is intentional:

```bash
pnpm visual:baseline                 # writes screenshots straight into baseline/
git add tests/visual/baseline/
git commit -m "chore(visual): rebaseline after <reason>"
```

**Inspect a failure**: open `tests/visual/diff/<story>.png` — the failing pixels are tinted red on top of the current rendering.

## Thresholds

Tuneable at the top of `diff.py`:

- `COLOR_THRESHOLD` (5/255): how much per-channel difference still counts as "the same pixel" — eats antialiasing noise.
- `PERCENT_THRESHOLD` (0.5%): fraction of pixels that may differ before CI fails. Drop this lower as the suite stabilises.

## Caveats

- Baselines are captured by **Playwright's bundled Chromium-headless**, which renders some CSS edge cases (invalid HSL, certain font metrics) differently from desktop Chrome. CI uses the same engine, so it's consistent — but a "blessed" baseline does not necessarily match what a user sees in real Chrome. Visual review of new baselines in a real browser still matters.
- Stories that touch `Date.now()`, randomness or external network will not be reproducible. Use Storybook decorators or mock these out.
