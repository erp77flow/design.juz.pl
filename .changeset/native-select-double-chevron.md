---
"@juz/design-system": patch
---

NativeSelect: dodane `bg-none`, żeby wyłączyć globalną regułę `select:not([multiple]) { background-image: ... }` z `globals.css` — komponent renderował dwie strzałki naraz (Lucide `ChevronDown` + SVG z CSS). Teraz pozostaje tylko themowana ikona Lucide.
