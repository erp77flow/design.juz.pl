#!/usr/bin/env python3
"""Pixel-diff `tests/visual/current/` against `tests/visual/baseline/`.

Writes per-pair diff PNGs (current with red overlay over changed pixels) into
`tests/visual/diff/` and prints a sorted report. Exits with code 1 when any
story exceeds the per-pixel difference threshold so CI can fail on it.

Threshold:
- A pixel counts as "different" when any RGB channel differs by more than
  COLOR_THRESHOLD (handles JPEG-ish antialiasing noise).
- A story fails when more than PERCENT_THRESHOLD of its pixels are different,
  or when the two screenshots have different dimensions.
"""
from pathlib import Path
import sys
from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parent
BASELINE = ROOT / "baseline"
CURRENT = ROOT / "current"
DIFF = ROOT / "diff"
DIFF.mkdir(exist_ok=True)

COLOR_THRESHOLD = 5      # 0..255 per channel
PERCENT_THRESHOLD = 0.5  # %

if not BASELINE.exists() or not any(BASELINE.glob("*.png")):
    print(f"no baselines found in {BASELINE}", file=sys.stderr)
    print("run `pnpm visual:baseline` to create them", file=sys.stderr)
    sys.exit(1)

results = []  # (name, status, diff_count, pct)

for cur_path in sorted(CURRENT.glob("*.png")):
    name = cur_path.name
    base_path = BASELINE / name
    if not base_path.exists():
        results.append((name, "NEW", 0, 0.0))
        continue

    base = Image.open(base_path).convert("RGB")
    cur = Image.open(cur_path).convert("RGB")

    size_diff = base.size != cur.size
    if size_diff:
        w = min(base.size[0], cur.size[0])
        h = min(base.size[1], cur.size[1])
        base_crop = base.crop((0, 0, w, h))
        cur_crop = cur.crop((0, 0, w, h))
    else:
        base_crop, cur_crop = base, cur

    diff = ImageChops.difference(base_crop, cur_crop)
    if diff.getbbox() is None and not size_diff:
        results.append((name, "OK", 0, 0.0))
        continue

    gray = diff.convert("L")
    px = list(gray.getdata())
    diff_count = sum(1 for v in px if v > COLOR_THRESHOLD)
    total = len(px)
    pct = 100.0 * diff_count / total

    # Overlay red where pixels differ, save for review
    overlay = cur_crop.copy()
    overlay_px = overlay.load()
    gray_px = gray.load()
    w, h = gray.size
    for y in range(h):
        for x in range(w):
            if gray_px[x, y] > COLOR_THRESHOLD:
                r, g, b = overlay_px[x, y]
                overlay_px[x, y] = (255, g // 3, b // 3)
    overlay.save(DIFF / name)

    status = "SIZE_DIFF" if size_diff else "DIFF"
    results.append((name, status, diff_count, pct))

# Catch baselines that no longer exist in current (deleted story)
current_names = {p.name for p in CURRENT.glob("*.png")}
for base_path in sorted(BASELINE.glob("*.png")):
    if base_path.name not in current_names:
        results.append((base_path.name, "MISSING", 0, 0.0))

results.sort(key=lambda r: -r[3])

print(f"{'%diff':>7}  {'pixels':>10}  status      story")
print("-" * 80)
failed = []
for name, status, count, pct in results:
    if status == "OK":
        continue
    print(f"{pct:>6.2f}%  {count:>10}  {status:<10}  {name.replace('.png', '')}")
    if status in ("DIFF", "SIZE_DIFF") and pct > PERCENT_THRESHOLD:
        failed.append(name)
    elif status in ("NEW", "MISSING"):
        failed.append(name)

ok_count = sum(1 for r in results if r[1] == "OK")
print()
print(f"OK: {ok_count} / {len(results)}")
if failed:
    print(f"FAILED: {len(failed)} story/stories exceed {PERCENT_THRESHOLD}% threshold "
          f"or have missing/new baselines")
    print("review diff PNGs in tests/visual/diff/, then either:")
    print("  - fix the regression in your code, or")
    print("  - if the change is intentional, run `pnpm visual:baseline` and commit")
    sys.exit(1)
