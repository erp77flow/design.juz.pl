# Contributing

Dziękujemy za zainteresowanie! `@juz/design-system` to repozytorium designu juz.pl
— tutaj żyją tokeny, komponenty i wzorce, na bazie których budujemy aplikacje.
Ten dokument ma jeden cel: pokazać nowemu kontrybutorowi, jak w 5 minut dorzucić
zmianę, która przejdzie CI i nie zepsuje aplikacji konsumenckich.

Jeżeli pojawi się konflikt między tym plikiem a starszymi notatkami w
`AI.md`, `DESIGN_SYSTEM_GUIDELINES.md` albo `PROJECT_STATUS.md` — wygrywa CONTRIBUTING,
bo opisuje workflow techniczny.

## Setup

Wymagania: **Node 20+**, **pnpm 9+** (paczka zaszywa `packageManager: pnpm@9.15.9`),
Python 3 z `Pillow` jeżeli chcesz lokalnie liczyć visual diff.

```bash
git clone https://github.com/erp77flow/design.juz.pl
cd design.juz.pl
pnpm install
pnpm exec playwright install --with-deps chromium
```

`playwright install` jest osobno, bo nie idzie z `pnpm install` — bez Chromium
nie odpalisz `pnpm visual:check` ani `pnpm test:storybook`. Robisz to raz na
maszynę.

## Workflow

### Branche

Nazewnictwo branchy idzie po **kategorii zmiany / krótki opis**, kebab-case:

- `feat/x` — nowy komponent, nowy wariant, nowy token, nowy entry point.
- `fix/x` — bugfix, poprawka kontrastu, regresja a11y.
- `chore/x` — porządki, bumpy zależności, konfiguracja.
- `docs/x` — zmiany w `README.md`, `CONTRIBUTING.md`, MDX, JSDoc.
- `ci/x` — workflowy, runnery, akcje.

Przykłady z historii repo:
`feat/visual-regression`, `chore/v1.0.1-fixes`, `docs/storybook-intro-and-colors`.

### Commit messages

Konwencjonalny styl, polski albo angielski — patrz `git log --oneline -20` żeby
złapać ton. Format który już używamy:

```
feat: dark mode tokens + Storybook toggle + dual-theme visual regression
fix(a11y): darken muted-foreground to meet WCAG AA contrast
docs(storybook): add component descriptions to every story
ci: bundle-size guard via size-limit
chore(visual): commit CI-rendered baselines
```

- prefiks zgodny z branchem (`feat`, `fix`, `chore`, `docs`, `ci`),
- opcjonalny scope w nawiasie (`a11y`, `storybook`, `visual`),
- krótki imperatyw po dwukropku.

### Pull request

Tytuł PR-a = tytuł najważniejszego commita. W body wpisz:

1. **Co i dlaczego** — 1–3 zdania, „dlaczego" ważniejsze niż „co".
2. **Changeset** — jeżeli zmiana dotyka publicznego API (eksport komponentu,
   prop, token, kontrakt CSS), powiedz wprost który level (patch/minor/major).
3. **Test plan** — checkboxy z poleceniami, które uruchomiłeś lokalnie (`pnpm
   build`, `pnpm test:storybook:ci`, `pnpm visual:check`).
4. **Visual diff** — jeżeli PR zmienia wizualnie cokolwiek (komponent, token,
   theme), zaznacz że trzeba rebaseline'ować i jak (patrz niżej).

CI automatycznie sprawdza: build, build-storybook, size-limit, axe a11y i
visual regression. Wszystko musi być zielone przed merge.

## Jak dodać nowy komponent

Najpierw sprawdź **Introduction / Components map** w Storybooku — jeżeli
komponent (lub bardzo podobny) już istnieje, użyj go zamiast tworzyć duplikat.

Jeżeli faktycznie brakuje, zdecyduj o warstwie:

| Warstwa | Folder | Kiedy |
|---------|--------|-------|
| **Atom** | `src/components/ui/` | Pojedynczy primitive UI: button, input, badge, dialog. |
| **Molecule** | `src/components/ds/` | Złożenie atomów z domeną biznesową: date picker, combobox, toolbar tabeli. |
| **Layout** | `src/components/layout/` | Rama ekranu lub aplikacji: app layout, sidebar, navbar, top bar. |

(Patterns i Screens nie mają osobnego folderu komponentów — patterns siedzą w
`ds/` razem z molecules, a screens to tylko story w `src/stories/Screen.*.stories.tsx`.)

### Konwencje nazewnictwa

- Plik komponentu: **kebab-case**, np. `data-table.tsx`, `mode-toggle.tsx`.
- Eksport komponentu: **PascalCase**, np. `DataTable`, `ModeToggle`.
- Story: `Atoms.<Nazwa>.stories.tsx`, `Molecules.<Nazwa>.stories.tsx` itd.,
  z title `Atoms/<Nazwa>` / `Molecules/<Nazwa>` (patrz istniejące story).

### Wzorzec implementacji (cva + shadcn)

Atomy używają wzorca shadcn z `class-variance-authority` — warianty są deklaratywne,
a komponent dostaje `className` opcjonalnie:

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const myVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        ghost: "bg-transparent hover:bg-accent",
      },
      size: { sm: "h-8 px-3 text-sm", md: "h-10 px-4" },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

type MyProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof myVariants>;

export function My({ className, variant, size, ...rest }: MyProps) {
  return <div className={cn(myVariants({ variant, size }), className)} {...rest} />;
}
```

### Wymagane pliki

Każdy nowy komponent dodaje **trzy** rzeczy:

1. **Komponent** w odpowiednim folderze (`ui/`, `ds/` lub `layout/`).
2. **Story** w `src/stories/<Warstwa>.<Nazwa>.stories.tsx`. Dla atomów: użyj
   `StorySpec` (`src/stories/story-parts.tsx`) — to wspólny szablon
   dokumentacji (opis, features, usage snippet, warianty, props table).
3. **Re-export** w `src/index.ts` (sekcja warstwy). Dzięki temu komponent
   trafia do `@juz/design-system` po build.

Po dodaniu — odśwież tabelę „Components map":

```bash
node scripts/regen-component-map.mjs
```

## Jak testować lokalnie

```bash
pnpm dev                    # Vite dev server (landing)        http://127.0.0.1:5174
pnpm storybook              # Storybook dev z hot reload       http://127.0.0.1:6006
pnpm build                  # produkcyjny build paczki (tsc + vite)
pnpm build-storybook        # produkcyjny build Storybooka do storybook-static/
pnpm test:storybook:ci      # interakcje + axe na zbudowanym Storybooku
pnpm visual:check           # pixel-diff każdej story vs baseline (dual-theme: light + dark)
```

Quick-loop dla zmiany komponentu: `pnpm storybook` w jednym terminalu, edytujesz
plik, Storybook sam się przeładuje. Przed wypchnięciem: `pnpm build &&
pnpm build-storybook && pnpm test:storybook:ci`. Tłustszy QA (`pnpm visual:check`)
opłaca się odpalić tylko jeżeli zmiana faktycznie dotyka wyglądu.

## Visual regression — co robić gdy CI flaki

CI workflow `Visual regression` (`.github/workflows/visual.yml`) snapshot'uje
każdą story w trybie light i dark, porównuje per piksel z PNG-iem w
`tests/visual/baseline/`. Jeżeli się nie zgadza, CI fails i uploaduje artefakt
`visual-diff` zawierający `tests/visual/current/` i `tests/visual/diff/`.

### Gdy zmiana wizualna jest **świadoma**

Trzeba przeblesować baseline:

```bash
pnpm build-storybook
pnpm serve-storybook &
pnpm visual:baseline       # zapisze nowe PNG-i do tests/visual/baseline/
git add tests/visual/baseline/
git commit -m "chore(visual): rebaseline po <opisie zmiany>"
```

Najczystszy sposób: zamiast lokalnie liczyć nową baseline, ściągnij artefakt
`visual-diff` z CI (jest tam komplet PNG-ów wyrenderowanych headless Chromium
na Linuksie — pixel-identyczne z tym, co CI porównuje przy następnym runie) i
wrzuć je do `tests/visual/baseline/`. Headless Chromium na macOS/Windows liczy
trochę inaczej niż w CI (Linux), więc lokalne PNG-i potrafią dawać szum.

### Gdy zmiana jest **niezamierzona**

Otwórz `tests/visual/diff/<story>.png` z artefaktu, zobacz różnicę i napraw
komponent zamiast rebaseline'ować.

## Changesets

Każda zmiana dotykająca API konsumenta dostaje **jeden plik** w `.changeset/`:

```bash
pnpm changeset
```

Interaktywny prompt zapyta o level zmiany:

- **patch** — bugfix, poprawka kontrastu, drobna korekta w story / docs.
  Nie zmienia API, nie wymaga akcji u konsumenta.
- **minor** — nowy komponent, nowy wariant, nowy prop, nowy token. Wszystko
  jest backward-compatible.
- **major** — zmieniony albo usunięty prop / komponent / token. Konsument
  musi coś podmienić w swoim kodzie. Dodaj wpis do `MIGRATIONS.md`.

Plik changesetu commitujesz razem z PR-em. Po merge CI tworzy lub aktualizuje
PR `Version Packages` (branch `changeset-release/main`), który zbiera kilka
changesetów w jeden release. Merge tego PR-a robi bump wersji, generuje
`CHANGELOG.md` i publikuje GitHub Release.

PR z samej dokumentacji (bez zmian w kodzie) może być **patch** albo całkiem
bez changesetu — dla strony dokumentacyjnej w Storybooku dajemy patch, żeby
release zawierał notkę o nowej stronie.

## Dark mode

Każdy komponent musi działać w obu themach. Reguła jest prosta:

> Używaj **semantycznych** klas Tailwind opartych o tokeny CSS. Nigdy nie
> wpisuj surowych kolorów.

```tsx
// dobrze — token reaguje na .dark na <html>
<div className="bg-card text-card-foreground border-border">
  <p className="text-muted-foreground">opis</p>
</div>

// źle — kolor zafiksowany na light
<div className="bg-white text-gray-900 border-gray-200">
  <p className="text-gray-500">opis</p>
</div>
```

Lista dostępnych tokenów: zobacz `Foundations / Colors` w Storybooku
(podgląd na żywo w obu themach).

W każdym nowym story sprawdź toolbarem „Theme" (ikonka słońca/księżyca) czy
renderuje się poprawnie w trybie ciemnym — kontrast, granice, focus ring.

## Dostępność (a11y)

Storybook ma `@storybook/addon-a11y` (axe) — panel **Accessibility** musi być
zielony przed merge. CI uruchamia ten sam axe w `pnpm test:storybook:ci`.

Jeżeli story **świadomie** narusza regułę (np. demo niskiego kontrastu, demo
focusable element bez aria), zdefiniuj wyłączenie **per story**, nie globalnie:

```tsx
export const LowContrastDemo: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [{ id: "color-contrast", enabled: false }],
      },
    },
  },
  render: () => <div className="bg-muted text-muted/40">demo</div>,
};
```

Domyślnie nic nie wyłączamy — preferujemy naprawienie komponentu, nie
ukrycie violation.

## Pytania, decyzje, długo żyjące notki

- bug / propozycja → [issues](https://github.com/erp77flow/design.juz.pl/issues),
- decyzja architektoniczna → zapisz w jednym z plików: `AI.md`,
  `DESIGN_SYSTEM_GUIDELINES.md`, `PROJECT_STATUS.md` albo `CHANGELOG.md`.
  Decyzja, której nie ma w pliku, nie istnieje.
