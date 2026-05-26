# Changelog

## 1.0.0

### Major Changes

- [#2](https://github.com/erp77flow/design.juz.pl/pull/2) [`842d690`](https://github.com/erp77flow/design.juz.pl/commit/842d6908de4cf7ebff64abb5e53cc9b353761495) Thanks [@erp77flow](https://github.com/erp77flow)! - Migrate to Tailwind CSS v4 (breaking).

  **Breaking changes for consumers**

  - Tailwind CSS peer is now **v4.x** (was v3.x). Consumer apps must upgrade
    in lockstep — Tailwind v3 will no longer pick up the design system's
    source styles, and the precompiled `dist/styles.css` is emitted by v4.
  - The package no longer exports `./tailwind.config` (the file is gone).
    Theme tokens (`--color-primary`, `--color-background`, `--radius-*`, …)
    now live as `@theme` in `dist/styles.css`. If you were extending the
    shared config, switch to importing the stylesheet and overriding tokens
    via `@theme { … }` in your own CSS.
  - Underlying utility renames bundled by the v4 codemod:
    `outline-none` → `outline-hidden`, `shadow-sm` → `shadow-xs`, etc.
    Consumers who copied source classes onto wrapper elements may need
    the same renames — run `npx @tailwindcss/upgrade` on your app.

  **Non-breaking improvements**

  - `Calendar`: the selected day now fills the button with the primary
    color and white text instead of just an outline ring (fixes a v3
    styling bug where the selected modifier landed on the `<td>` and was
    visually masked by the inner ghost button).
  - `--background` token fixed: was authored as invalid HSL `252 252 255`
    which different browsers parsed differently (yellow in headless,
    near-white in real Chrome). Now `240 100% 99%` — the near-white the
    author intended — so behaviour is consistent everywhere.
  - v3 semantics for `space-y-*` / `space-x-*` restored via a small CSS
    shim, because v4 moved the margin to the _first_ child where it is
    silently ignored on inline elements (`<b>`, `<span>`), shrinking form
    layouts that pair an inline label with a block input.
  - Explicit `leading-*` paired with every arbitrary `text-[Npx]`, since
    v4 no longer inherits the parent line-height for arbitrary font sizes.
  - New `CardFooter` primitive.

### Minor Changes

- [#4](https://github.com/erp77flow/design.juz.pl/pull/4) [`c39dea8`](https://github.com/erp77flow/design.juz.pl/commit/c39dea856a3b025a7fefe164e0f53caeaac082e6) Thanks [@erp77flow](https://github.com/erp77flow)! - Add `AppSidebar` suite — a composable app-shell sidebar with pin/hover/collapse state and per-group collapsing.

  New exports:

  - `SidebarProvider`, `useSidebar` (from `@juz/design-system`) — context with
    pinned / hovered / mobile-open state, derived `isExpanded`, and per-group
    collapsed state. Persists `isPinned` and `collapsedGroups` to
    `localStorage`; storage namespace is configurable via the
    `storagePrefix` prop (default `"juz-sidebar"`).
  - `AppSidebar` — fixed left rail with logo slot, scroll body, mobile
    drawer pattern, and a pin/collapse toggle at the bottom.
  - `AppSidebarGroup` — collapsible nav section with a header (icon + label
    - chevron). Degrades to a single tooltipped icon when the sidebar is
      in icon-only mode.
  - `AppSidebarItem` — nav row that supports `asChild` + Radix `Slot` so
    the host app composes its own routing primitive (Next.js `<Link>`,
    React Router `<Link>`, plain anchor, …) without the DS taking a hard
    dependency on a router. Plus `isActive` / `isStandalone` modifiers.

  The suite is intended to compose with the existing `Navbar` for the
  top-bar — the demo story under `Organisms / AppSidebar` shows the
  intended layout. No new top-bar component is added; the sidebar-aware
  margin is one line of consumer-side composition shown in the story.

### Patch Changes

- [#3](https://github.com/erp77flow/design.juz.pl/pull/3) [`b592c56`](https://github.com/erp77flow/design.juz.pl/commit/b592c564462bf7f88890f5145be82c74503d7e7a) Thanks [@erp77flow](https://github.com/erp77flow)! - Small post-v1.0.0 polish across menus, charts and InputGroup.

  - **Menubar**: items now paint the `bg-muted` background on keyboard
    navigation as well as on hover (Radix tracks the highlighted item via
    `data-highlighted`, not `:focus`).
  - **Popover background**: `--popover` / `--popover-foreground` tokens are
    now declared, so Radix popovers (Menubar dropdown, HoverCard, Popover,
    Command) no longer render transparent under Tailwind v4.
  - **BarChart / LineChart**: dropped the `aspect-video` constraint inherited
    from `ChartContainer` so the chart fills the parent width when an
    explicit `h-*` is set. Their Storybook preview wrappers also lost the
    fixed `w-[540px]`.
  - **InputGroup**: cleaner slot styling — leading slot keeps a soft
    `bg-muted/40` wash, trailing slot is transparent with a `border-l`
    separator, and any button inside the trailing slot gets its rounding,
    border and shadow stripped so it sits flush inside the group.

## 0.2.0

### Minor Changes

- [`f3aa679`](https://github.com/erp77flow/design.juz.pl/commit/f3aa679873580a4d50007c529c29ec5ec56fbc56) Thanks [@erp77flow](https://github.com/erp77flow)! - Major rebuild: 88 nowych komponentów (58 atomów, 19 molekuł, 11 organizmów), konwersja makiet HTML w Storybook na prawdziwe komponenty React. Dodane entry points (main/module/types/exports) — paczka gotowa do importowania w innych projektach. Patrz CHANGELOG.md po pełną listę.

Wszystkie istotne zmiany w design.juz.pl zapisujemy w tym pliku. Nie trzymamy historii decyzji tylko w rozmowie z AI.

Format bazuje na prostym modelu:

- `Added` - nowe komponenty, ekrany, dokumenty i wzorce.
- `Changed` - zmiany wygladu, API, tokenów albo zachowania.
- `Fixed` - poprawki wizualne, dostepnosciowe i interakcyjne.
- `Removed` - usuniete komponenty, warianty albo nazwy.

## [Unreleased]

## [0.2.0] - 2026-05-25

### Added

- Atomy w `src/components/ui/` (58 nowych plików): `accordion`, `address-card`, `alert`, `aspect-ratio`, `avatar`, `bar-chart`, `breadcrumb`, `button-group`, `calendar`, `carousel`, `chart`, `checkbox`, `column-visibility-switch`, `command`, `context-menu`, `date-filter`, `date-range-input`, `decimal-input`, `donut-chart`, `drawer`, `empty`, `empty-state`, `field-display`, `filter-select`, `hover-card`, `icon-action-button`, `icon-tile`, `input-group`, `input-otp`, `kbd`, `line-chart`, `menubar`, `meta-tile`, `metric-card`, `mini-month`, `multi-select`, `native-select`, `page-size-control`, `phone-frame`, `popover`, `progress`, `radio-group`, `scroll-area`, `searchable-select`, `section-nav-item`, `separator`, `sheet`, `skeleton`, `slider`, `spinner`, `summary-tile`, `switch`, `table-primitive`, `toast`, `toggle`, `toggle-group`, `typography`, `upload`. Każdy to prawdziwy komponent (Radix-owy wrapper lub własna implementacja), nie mockup.
- Molekuły w `src/components/ds/` (19 nowych plików): `action-buttons`, `advanced-filters-panel`, `autocomplete`, `basic-menu-item`, `calendar-event-section`, `collapsible-menu-item`, `combobox`, `date-picker`, `file-actions`, `form-field`, `header`, `mode-toggle`, `pagination`, `prefix-input`, `profile-menu`, `text-editor`, `time-input`, `time-picker`, `week-workstations`.
- Organizmy w `src/components/layout/` (11 nowych plików, kategoria wcześniej pusta): `app-layout`, `data-table` (oparte o `@tanstack/react-table`), `document-line-items`, `document-parties`, `document-preview`, `document-section`, `document-totals`, `navbar`, `schedule`, `sidebar`, `top-bar`.
- Entry point biblioteki: `src/index.ts` (126 linii) z 115 re-eksportami — 72 atomy + 32 molekuły + 11 organizmów. Pominięte 9 plików "showcase" w `ds/` (auth-screens, chart-showcase, client-detail, enterprise-screens, form-showcase, production-orders-list, production-screens, token-showcase, typography-scale — to demo Storybooka, nie reużywalne komponenty).
- `package.json`: pola `main`, `module`, `types`, `exports` (z subpath-ami `./atoms/*`, `./molecules/*`, `./layout/*`, `./lib/utils`, `./styles.css`, `./tailwind.config`), `peerDependencies` (`react ^18 || ^19`, `react-dom ^18 || ^19`), `sideEffects: ["**/*.css"]`, `files: ["src", "tailwind.config.ts", "components.json"]`.
- Nowe zależności runtime (Radix): `@radix-ui/react-accordion`, `react-aspect-ratio`, `react-avatar`, `react-checkbox`, `react-context-menu`, `react-hover-card`, `react-menubar`, `react-popover`, `react-progress`, `react-radio-group`, `react-scroll-area`, `react-separator`, `react-slider`, `react-switch`, `react-toggle`, `react-toggle-group`.
- Nowe zależności runtime (inne): `@tanstack/react-table`, `recharts`, `react-day-picker` v10, `date-fns`, `cmdk`, `vaul`, `input-otp`, `sonner`, `react-dropzone`, `embla-carousel-react`, `next-themes`, `bwip-js`.

### Changed

- `src/stories/story-parts.tsx`: ~43 funkcje `XxxDemo` przepisane — zamiast inline'owych HTML mockupów (`<div role="switch">`, `<div class="rounded border">` itd.) używają teraz prawdziwych komponentów z biblioteki (`<Switch />`, `<Card />`, `<DataTable />` itd.). To znaczy: Storybook od 0.2.0 prezentuje faktyczną implementację, nie wizualną atrapę.
- `src/components/ui/calendar.tsx`, `mini-month.tsx`, `date-filter.tsx`, `date-range-input.tsx`: dostosowane do API `react-day-picker` v10 — `caption` → `month_caption`, `IconLeft`/`IconRight` → komponent `Chevron`, `head_cell` → `weekday`, `day` → `day_button` itd.
- `src/components/ui/card.tsx`: subkomponenty `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` przerobione na `React.forwardRef` — wcześniej zwykłe komponenty funkcyjne, teraz można forwardować ref do węzła DOM.
- Importy `lucide-react`: ikony `Calendar` i `Clock` aliasowane jako `CalendarIcon` / `ClockIcon` w miejscach kolidujących z naszymi komponentami `Calendar` / `DatePicker` (story-parts i wybrane molekuły).

### Removed

- HTML mockupy w funkcjach `Demo` w `src/stories/story-parts.tsx` — ~43 instancje ad-hoc HTML udającego komponenty (np. `<div role="switch">` zamiast `<Switch />`, `<table>` zamiast `<DataTable />`). Zastąpione importami z biblioteki.

## [0.1.0] - 2026-05-24

### Added

- Prawdziwy znak graficzny juz.pl jako SVG (`public/logo.svg` + komponent `JuzLogoMark`). Logo zostało wstawione jako `brandImage` w sidebarze Storybooka — w lewym górnym rogu widać teraz markę juz.pl, klikalną do GitHub repo.
- Nowa wersja `LICENSE.md` (Attribution License v1.0): jasne pozwolenie na użycie komercyjne z wymogiem widocznej atrybucji w stopce produktu (`UI based on design.juz.pl` + link do repo). Sekcje: przyznane prawa, warunek atrybucji, ograniczenia, brak gwarancji, wygasanie licencji.
- Rozszerzony `README.md` z sekcjami: Quick install (opcja shadcn-style copy lub `npm install github:` z repo), Architektura warstw, Tokeny, AI usage (DO/DON'T), Local run, License TL;DR, Contributing.
- Rozszerzony `AI.md` w formacie DO/DON'T: jasne `✅ Co AI może` (komponenty, theme, stories, architektura, atrybucja) i `❌ Czego AI nie wolno` (lokalne hexy, własne warianty, statyczne makiety, usuwanie licencji, ukrywanie atrybucji).
- Interaktywna strona `Foundations/Theme playground` — color pickery dla `primary`, `success`, `warning`, `destructive` i suwak `radius`, na żywo aktualizujące CSS variables w obrębie playgroundu. Presety (juz.pl, Ocean blue, Forest green, Sunset orange, Mono slate) + generowany snippet CSS gotowy do wklejenia w `src/styles/globals.css` własnego projektu. W Theme playground zakładki `Atomy / Zamówienie: dane / wysyłka / rozliczenie` z pełnym ekranem `OrderDetailScreen` jako podgląd zmian.
- Strona `Foundations/Theme palette` z opisem centralnej zmiany kolorów przez `src/styles/globals.css`.
- Storybook jako docelowa dokumentacja `design.juz.pl`.
- Warstwy dokumentacji: Introduction, AI Usage, Implementation, Publishing, Component map, Accessibility.
- Atoms zgodne z architekturą shadcn/Radix oraz rozszerzenia juz.pl: FilterSelect, SearchableSelect, MultiSelect, DateFilter, CalendarEvent, ProductionCards.
- Molecules dla tabel, filtrów, menu, uploadu, daty, czasu, akcji plikow i tygodniowego widoku stanowisk.
- Patterns: DataList, SocialCalendar, Charts, Timeline, Stepper, ProgressLineCard.
- Layout `DetailHeader` z wariantami dla rekordu i dokumentu.
- Screens dla auth, rekordów, zamówień, magazynu, produkcji, mobile, CRM, admina i contentu.
- Dokumentacja implementacyjna dla tokenów, shadcn, publikacji i pracy z AI.
- Pliki utrzymaniowe: `AI.md`, `DESIGN_SYSTEM_GUIDELINES.md`, `CHANGELOG.md`.
- Opis dla AI, gdzie zmieniac `primary`, `success`, `warning`, `destructive` i ich warianty `soft`.
- Informacje właścicielskie: rozwiązanie i marka juz.pl należą do Alfabet sp. z o.o., `www.alfabet.lu`.
- Informacje autorskie: autorem design systemu jest Rafał Mazur, a kontakt projektowy i firmowy prowadzi Alfabet sp. z o.o. przez `www.alfabet.lu`.

### Changed

- Ujednolicono theme juz.pl: primary, success, warning i destructive są sterowane tokenami w `src/styles/globals.css`.
- Ekrany list i rekordów są wyrównane do lewej i skalują się do szerokości roboczej, zamiast być wąskimi makietami na środku.
- `DetailHeader` dostal propsy dla tytulu, statusu, akcji i wiersza metadanych.
- `PZDocument` korzysta z nagłówka dokumentu bez drugiego wiersza metadanych.
- Ekrany mobilne produkcji zostaly opisane jako wersja mobilna zarzadzania produkcja, nie jako osobna tablica operatora.
- Przykłady biznesowe są oparte o firmę produkcyjną, a nie o stare nazwy projektów źródłowych.
- Oczyszczono dane pokazowe z obcych marek źródłowych oraz scenariuszy spoza produkcji; wzorcowym kontekstem biznesowym jest produkcja długopisów, markerów i flamastrów.

### Fixed

- Usuńięto niechciany cień z `DetailHeader`.
- Usuńięto wewnętrzny scroll ze środkowej kolumny w `ClientDetail`.
- Poprawiono tabele zagniezdzone w `PZDocument`, aby nie mialy zaokraglonego header-row jak główne tabele.
- Poprawiono podpis sekcji `Pozycje` w PZ, bez licznika w tytule.
- Uporzadkowano shell `EmailTemplate`: top menu juz.pl oraz lewy panel bez obcego brandingu.
- Dodano prawdziwe interakcje i testy Storybooka dla kluczowych atomów i molecules.

## Zasada aktualizacji

Każda zmiana w komponentach, tokenach, wzorcach ekranów albo zasadach AI musi dopisać wpis w `[Unreleased]`.

Przed publikacją wersji:

1. Zmien `[Unreleased]` na numer wersji i date, np. `## [0.2.0] - 2026-05-25`.
2. Dodaj nowy pusty blok `[Unreleased]` na gorze.
3. Uruchom `npm run qa`.
4. Zbuduj Storybook przez `npm run build-storybook`.
