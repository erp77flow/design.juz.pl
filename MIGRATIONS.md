# Migracje między wersjami @juz/design-system

Ten plik dokumentuje breaking changes i sposób migracji.

## 0.1.0 → 0.2.0

### Co się zmieniło

Pierwsze wydanie z prawdziwymi komponentami. Wcześniej (0.1.0) większość atomów istniała tylko jako wizualne preview w Storybooku (`src/stories/story-parts.tsx`), bez plików komponentów do importowania.

### Co musisz zrobić w swojej apce

**Jeśli importowałeś z `@juz/design-system` przed 0.2.0:**
Najprawdopodobniej **nic nie działało** (paczka nie miała `main`/`exports`). Po 0.2.0 zaczyna działać. Patrz README sekcja "Użycie w innym projekcie".

**Jeśli pisałeś własne komponenty wzorując się na Storybooku DesignSystem:**
Możesz teraz importować je bezpośrednio zamiast utrzymywać kopie. Np. zamiast lokalnego `Switch` → `import { Switch } from "@juz/design-system"`.

### Mapowanie komponentów

Wszystkie atomy ze Storybooka mają teraz odpowiadające pliki komponentów. Lista pełna w README + `src/index.ts`.

### Wycofania (deprecations)

Brak w tej wersji — wszystko jest nowe.

---

## Format migracji (dla przyszłych wersji)

### X.Y.0 → X.Z.0 (data)

#### Breaking changes

- `Component.propA` → `Component.propB` (przyczyna: spójność z resztą biblioteki)

#### Codemod (jeśli dotyczy)

```bash
npx @juz/design-codemod migrate --version 0.3.0
```

#### Mapowanie ręczne

```diff
- <Button variant="primary" />
+ <Button variant="default" />
```
