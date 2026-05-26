---
"@juz/design-system": patch
---

Add `prepare` script so the package is installable from GitHub URL (`npm install erp77flow/design.juz.pl#v1.2.x`). Consumers no longer need to clone+build manually — `dist/` is generated automatically on install via `vite build:lib`.
