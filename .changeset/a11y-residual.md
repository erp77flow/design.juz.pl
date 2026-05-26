---
"@juz/design-system": patch
---

Resolve the 26 residual axe-core `color-contrast` violations that survived the token darkening in the previous a11y patch. All 26 lived in component-level `opacity-*` utilities that washed the rendered foreground below WCAG 2.1 AA (≥4.5:1).

Three call sites touched, opacity replaced with explicit full-alpha colors:

- `src/components/ui/calendar.tsx` — outside-month days dropped `opacity-50` (which blended `--muted-foreground` to ~`#878a92` on a white card, 3.39:1 FAIL). Now styled with plain `text-muted-foreground` (5.43:1 on `#fdfdff`); visual de-emphasis comes from the existing `bg-primary-soft/40` parent and the muted-vs-foreground contrast. The `aria-selected:opacity-30` rule on outside days was removed for the same reason. `disabled` days keep `opacity-50` because react-day-picker sets the native `disabled` attribute, which axe-core's color-contrast rule already skips. Accounts for 16 of the 26 violations.
- `src/components/ds/auth-screens.tsx` — the AuthShell hero paragraph dropped `text-primary-foreground/80` (white at 80% alpha over `bg-primary` blends to `#e3d7fd`, 4.3:1 FAIL) for full-opacity `text-primary-foreground`. Accounts for 8 violations (one per Auth story × 4 stories × 2 light/dark themes).
- `src/stories/story-parts.tsx` PhoneFrame — "Dziś" hero label dropped `opacity-80` on inherited `text-primary-foreground`. Accounts for the remaining 2 violations (one per Catalog story × 2 themes).

After this PR, `pnpm test:storybook:ci` reports 0 axe `color-contrast` violations. Remaining axe failures are non-contrast (aria-valid-attr-value, label, button-name, landmark-*, scrollable-region-focusable, nested-interactive) and are addressed separately in #17.
