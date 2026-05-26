---
"@juz/design-system": patch
---

Darken four light-mode color tokens so foreground text on every surface they paint on meets WCAG 2.1 AA contrast (≥4.5:1 for normal text). Dark-mode tokens are unchanged.

Before → after (HSL L%, hex, worst-case contrast ratio):

- `--muted-foreground` 54% `#78839b` (3.44:1 on bg-muted) → 44% `#5f6a81` (4.76:1 on bg-destructive-soft).
- `--destructive` 55% `#da3e5d` (3.78:1 on bg-destructive-soft, 4.35:1 white-on-bg) → 48% `#cd2748` (4.62:1 on soft, 5.28:1 white-on-bg).
- `--success` 41% `#3b9781` (3.22:1 on bg-success-soft, 3.58:1 on white) → 33% `#2f7967` (4.72:1 on soft, 5.18:1 on white).
- `--warning` 47% `#c69428` (2.53:1 on bg-warning-soft, 2.74:1 on white) → 33% `#8b681c` (4.80:1 on soft, 5.13:1 on white).

Removes 1,814 of the 1,840 axe `color-contrast` violations from `pnpm test:storybook:ci`. The 26 residual violations live in component-level opacity rules (calendar day-outside `text-foreground opacity-50`, primary button `opacity-80` overlays) and are out of scope for a token-only fix.
