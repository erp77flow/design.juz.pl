---
"@juz/design-system": minor
---

Extract record-page shell sub-components from `NewClientPattern` / `ClientDetailPattern` so other apps can build create/detail screens without copying the monolith:

- `InfoSection` — Card section with icon, title, optional `wymagane` badge and toolbar
- `SectionNav` + `SectionNavEntry` — left sticky nav with scroll-to-anchor highlight
- `RecordPageLayout` — 3-column shell (260px / 1fr / 340px), `columns="2"` skips the right rail
- `FieldGrid` + `Field` — `<dl>` grid for label/value pairs, with `mono` flag and `—` fallback for empty values
- `SummaryPanel` + `SummaryRow` — right-rail validation/summary card

Also exports `NewClientPattern` and `ClientDetailPattern` from the package root as reference patterns.
