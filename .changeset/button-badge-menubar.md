---
"@juz/design-system": minor
---

Add `Button` loading state and two new variants, `Badge` `info` variant, and harden Menubar hover styling.

- **Button**
  - New `isLoading` prop. When true, renders a `Spinner` before the children, sets `disabled`, and toggles `aria-busy`.
  - New variants: `subtle` (`bg-muted text-muted-foreground` — passive emphasis) and `link` (text + underline-on-hover, no shadow).
- **Badge**
  - New `info` variant (`bg-info-soft text-info`).
  - New theme tokens: `--info` / `--info-foreground` / `--info-soft` (blue 214° in light mode), exposed in `@theme` as `--color-info{,-foreground,-soft}`.
- **Menubar**
  - Triggers and items now also paint `bg-muted` on `:hover` (in addition to `data-[highlighted]` and `:focus`) — defensive against tooling pipelines that don't always reliably generate the data-attribute selector on mouse hover.
  - `cursor-default` → `cursor-pointer` on triggers and items for an interactive feel.
