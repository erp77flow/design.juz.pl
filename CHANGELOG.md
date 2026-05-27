# Changelog

## 1.5.0

### Minor Changes

- [#28](https://github.com/erp77flow/design.juz.pl/pull/28) [`367393d`](https://github.com/erp77flow/design.juz.pl/commit/367393dfdba1f357e5a85e1cbe128c90a69db7cf) Thanks [@erp77flow](https://github.com/erp77flow)! - Extract record-page shell sub-components from `NewClientPattern` / `ClientDetailPattern` so other apps can build create/detail screens without copying the monolith:

  - `InfoSection` — Card section with icon, title, optional `wymagane` badge and toolbar
  - `SectionNav` + `SectionNavEntry` — left sticky nav with scroll-to-anchor highlight
  - `RecordPageLayout` — 3-column shell (260px / 1fr / 340px), `columns="2"` skips the right rail
  - `FieldGrid` + `Field` — `<dl>` grid for label/value pairs, with `mono` flag and `—` fallback for empty values
  - `SummaryPanel` + `SummaryRow` — right-rail validation/summary card

  Also exports `NewClientPattern` and `ClientDetailPattern` from the package root as reference patterns.

## 1.4.0

### Minor Changes

- [#26](https://github.com/erp77flow/design.juz.pl/pull/26) [`6b6a982`](https://github.com/erp77flow/design.juz.pl/commit/6b6a9828276c53e9ef954bc142e5585d92a94f33) Thanks [@erp77flow](https://github.com/erp77flow)! - `Navbar`: add `nav` prop — a slot rendered between the logo/breadcrumb section and the central search field, intended for the app's main top-level navigation (e.g. dropdown menus). Hidden below `md` so it doesn't compete with mobile layout; search keeps its `flex-1` and shrinks as needed.

## 1.3.0

### Minor Changes

- [#24](https://github.com/erp77flow/design.juz.pl/pull/24) [`4f7cf2a`](https://github.com/erp77flow/design.juz.pl/commit/4f7cf2aa57416ec0b9c2ab8f22ec23b5563bff6d) Thanks [@erp77flow](https://github.com/erp77flow)! - Add `NewClientPattern` screen under `Screens / Records / NewClient` — pattern for creating a company record with header (Szkic + save dropdown), section nav, view/edit Dane firmy section, shipping addresses list + editor, commercial section, GUS/VIES registry data, KSeF, role/type checkboxes and right rail with map + validation summary.

## 1.2.2

### Patch Changes

- [#22](https://github.com/erp77flow/design.juz.pl/pull/22) [`b4bfaa5`](https://github.com/erp77flow/design.juz.pl/commit/b4bfaa5dfc0fa6df70ac85ad4518fbd06f095de0) Thanks [@erp77flow](https://github.com/erp77flow)! - Add `prepare` script so the package is installable from GitHub URL (`npm install erp77flow/design.juz.pl#v1.2.x`). Consumers no longer need to clone+build manually — `dist/` is generated automatically on install via `vite build:lib`.

## 1.2.1

### Patch Changes

- [#16](https://github.com/erp77flow/design.juz.pl/pull/16) [`f59386a`](https://github.com/erp77flow/design.juz.pl/commit/f59386ae86d0f0ad039e98c8ecc8d3bfd4ba15f6) Thanks [@erp77flow](https://github.com/erp77flow)! - Darken four light-mode color tokens so foreground text on every surface they paint on meets WCAG 2.1 AA contrast (≥4.5:1 for normal text). Dark-mode tokens are unchanged.

  Before → after (HSL L%, hex, worst-case contrast ratio):

  - `--muted-foreground` 54% `#78839b` (3.44:1 on bg-muted) → 44% `#5f6a81` (4.76:1 on bg-destructive-soft).
  - `--destructive` 55% `#da3e5d` (3.78:1 on bg-destructive-soft, 4.35:1 white-on-bg) → 48% `#cd2748` (4.62:1 on soft, 5.28:1 white-on-bg).
  - `--success` 41% `#3b9781` (3.22:1 on bg-success-soft, 3.58:1 on white) → 33% `#2f7967` (4.72:1 on soft, 5.18:1 on white).
  - `--warning` 47% `#c69428` (2.53:1 on bg-warning-soft, 2.74:1 on white) → 33% `#8b681c` (4.80:1 on soft, 5.13:1 on white).

  Removes 1,814 of the 1,840 axe `color-contrast` violations from `pnpm test:storybook:ci`. The 26 residual violations live in component-level opacity rules (calendar day-outside `text-foreground opacity-50`, primary button `opacity-80` overlays) and are out of scope for a token-only fix.

- [#17](https://github.com/erp77flow/design.juz.pl/pull/17) [`037dfc6`](https://github.com/erp77flow/design.juz.pl/commit/037dfc6481453b9d00a4ed576c1bba0495c35984) Thanks [@erp77flow](https://github.com/erp77flow)! - Resolve non-color-contrast a11y violations surfaced by the axe-core
  Storybook test runner.

  Rules fixed (52 unique violations across 17 stories, ~104 with the
  per-theme double-render):

  - **aria-valid-attr-value (24)** — `Tabs` primitive now slugifies the
    `value` prop before passing it to Radix so the generated
    `aria-controls` IDs are valid HTML id tokens. `RecordTabs` and
    `SegmentedTabs` additionally force-mount empty placeholder
    `TabsContent` panels so each trigger's `aria-controls` resolves to a
    real element in the DOM.
  - **landmark-unique (18)** — `EnterpriseShell`, `SideModuleShell`,
    `MobileNav` and `MobileProductionNav` now carry `aria-label`s; the
    three mobile phone-frame stories pass a per-frame label so duplicate
    `<nav>` landmarks are distinguishable.
  - **scrollable-region-focusable (12)** — `Table` and `TablePrimitive`
    wrappers, the order-table viewport in `ProductionOrdersListPattern`,
    the calendar grids in `ProductionCalendarScreen` and
    `WeekWorkstations` story, and the `ProcessStepper` row are now
    `tabIndex={0}` so keyboard-only users can scroll them.
  - **landmark-complementary-is-top-level (8)** — the `NoteRail` sidebar
    in `OrderDetailScreen` is now a `role="group"` `<div>` instead of an
    `<aside>` nested in `<main>`.
  - **label (4)** — `ThemePlayground` hex `<Input>`s and the Upload
    dropzone `<input>` now carry `aria-label`s.
  - **dlitem (2)** — `<PreviewField>` rows in the orders preview are
    wrapped in a `<dl>` parent.
  - **nested-interactive (2)** — `DateFilter`'s clear affordance moved
    from a child `role="button"` to a sibling `<button>` next to the
    date trigger.
  - **button-name (2)** — `Combobox` and `Autocomplete` triggers now
    expose `aria-label` (selected label or placeholder) for axe's
    combobox accessible-name check.
  - **heading-order (2)** — h3s under the sr-only h1 in
    `MobileOperatorShowcase` are now h2.

  Components touched:
  `Tabs`, `Table`, `TablePrimitive`, `RecordTabs`, `SegmentedTabs`,
  `Autocomplete`, `Combobox`, `DateFilter`, `Upload`, `EnterpriseShell`,
  `SideModuleShell`, `ProcessStepper`, `NoteRail`, `MobileNav`,
  `MobileProductionNav`, `MobileOperatorShowcase`,
  `ProductionCalendarScreen`, `ProductionOrdersListPattern`,
  `ThemePlayground` story, `WeekWorkstations` story.

- [#19](https://github.com/erp77flow/design.juz.pl/pull/19) [`bfa1fb4`](https://github.com/erp77flow/design.juz.pl/commit/bfa1fb4ce4f52150bc4dc914b1abdb36141c7dc3) Thanks [@erp77flow](https://github.com/erp77flow)! - Resolve the 26 residual axe-core `color-contrast` violations that survived the token darkening in the previous a11y patch. All 26 lived in component-level `opacity-*` utilities that washed the rendered foreground below WCAG 2.1 AA (≥4.5:1).

  Three call sites touched, opacity replaced with explicit full-alpha colors:

  - `src/components/ui/calendar.tsx` — outside-month days dropped `opacity-50` (which blended `--muted-foreground` to ~`#878a92` on a white card, 3.39:1 FAIL). Now styled with plain `text-muted-foreground` (5.43:1 on `#fdfdff`); visual de-emphasis comes from the existing `bg-primary-soft/40` parent and the muted-vs-foreground contrast. The `aria-selected:opacity-30` rule on outside days was removed for the same reason. `disabled` days keep `opacity-50` because react-day-picker sets the native `disabled` attribute, which axe-core's color-contrast rule already skips. Accounts for 16 of the 26 violations.
  - `src/components/ds/auth-screens.tsx` — the AuthShell hero paragraph dropped `text-primary-foreground/80` (white at 80% alpha over `bg-primary` blends to `#e3d7fd`, 4.3:1 FAIL) for full-opacity `text-primary-foreground`. Accounts for 8 violations (one per Auth story × 4 stories × 2 light/dark themes).
  - `src/stories/story-parts.tsx` PhoneFrame — "Dziś" hero label dropped `opacity-80` on inherited `text-primary-foreground`. Accounts for the remaining 2 violations (one per Catalog story × 2 themes).

  After this PR, `pnpm test:storybook:ci` reports 0 axe `color-contrast` violations. Remaining axe failures are non-contrast (aria-valid-attr-value, label, button-name, landmark-\*, scrollable-region-focusable, nested-interactive) and are addressed separately in [#17](https://github.com/erp77flow/design.juz.pl/issues/17).

- [#20](https://github.com/erp77flow/design.juz.pl/pull/20) [`a9d7a3b`](https://github.com/erp77flow/design.juz.pl/commit/a9d7a3b2d0201b6a05630052e061b7d456c1cf5b) Thanks [@erp77flow](https://github.com/erp77flow)! - Add two onboarding-focused documentation deliverables. `CONTRIBUTING.md` (root, Polish) covers setup with Playwright, branch and commit conventions, how to add a new component (atom/molecule/layout), the cva pattern, local test commands, the visual regression rebaseline flow (pull CI `visual-diff` artifact instead of recomputing PNGs locally), changesets policy (patch/minor/major), dark-mode token rules and a11y scoping. New Storybook page `Introduction / Components map` (at `src/stories/Components.Map.mdx`) renders a flat table of every shipped component with category, source path and link to its `?path=/docs/...` route — generated from `src/index.ts` and re-runnable via `node scripts/regen-component-map.mjs`.

- [#14](https://github.com/erp77flow/design.juz.pl/pull/14) [`f90c3c6`](https://github.com/erp77flow/design.juz.pl/commit/f90c3c6ace318deab6bc55335d1983d667905e04) Thanks [@erp77flow](https://github.com/erp77flow)! - Add Polish-language component descriptions to every Storybook docs page.

- [#18](https://github.com/erp77flow/design.juz.pl/pull/18) [`2cd346f`](https://github.com/erp77flow/design.juz.pl/commit/2cd346f8079cd651f08f5ec7aa4e8ebe33b5aeda) Thanks [@erp77flow](https://github.com/erp77flow)! - Add Storybook Introduction page and Foundations/Colors story (Polish-language). Introduction covers install, import, conventions, dark mode opt-in and versioning. Foundations/Colors renders every semantic color token (background, foreground, card, popover, primary/-soft, success/-soft, warning/-soft, destructive/-soft, info/-soft, muted, border, input, ring) as a swatch grid that reads live CSS variables, so the same story renders correctly in both light and dark modes via the theme toolbar.

## 1.2.0

### Minor Changes

- [#10](https://github.com/erp77flow/design.juz.pl/pull/10) [`4e2afad`](https://github.com/erp77flow/design.juz.pl/commit/4e2afad71cec658f1b59d7c31e7cbbabee030099) Thanks [@erp77flow](https://github.com/erp77flow)! - Add a dark theme for every design token.

  What ships:

  - `globals.css` declares a `:root.dark { … }` block that overrides every semantic token (`--background`, `--foreground`, `--card`, `--popover`, `--primary`, `--primary-soft`, `--success{,-soft}`, `--warning{,-soft}`, `--destructive{,-soft}`, `--info{,-soft}`, `--muted{,-foreground}`, `--border`, `--input`, `--ring`) plus the `--shadow-juz*` triplet (which uses higher-opacity black on dark backgrounds so elevation reads).
  - `color-scheme: dark` flips browser-supplied chrome (form widgets, scrollbars) so they stop sitting white-on-dark.
  - The Storybook UI gains a theme toggle in the toolbar (`@storybook/addon-themes` + `withThemeByClassName` decorator on `<html>`) so every story can be inspected in either mode.
  - Internal: the visual regression suite captures `<story>.light.png` and `<story>.dark.png` on every run, doubling baseline coverage to catch dark-only regressions.

  Consumers opt in by adding the `dark` class to their `<html>` element (typically via `next-themes` or an equivalent). No existing consumer-facing API changes.

## 1.1.0

### Minor Changes

- [#7](https://github.com/erp77flow/design.juz.pl/pull/7) [`1b94116`](https://github.com/erp77flow/design.juz.pl/commit/1b94116bb32f126129d837297a057bc841c83953) Thanks [@erp77flow](https://github.com/erp77flow)! - Add `Button` loading state and two new variants, `Badge` `info` variant, and harden Menubar hover styling.

  - **Button**
    - New `isLoading` prop. When true, renders a `Spinner` before the children, sets `disabled`, and toggles `aria-busy`.
    - New variants: `subtle` (`bg-muted text-muted-foreground` — passive emphasis) and `link` (text + underline-on-hover, no shadow).
  - **Badge**
    - New `info` variant (`bg-info-soft text-info`).
    - New theme tokens: `--info` / `--info-foreground` / `--info-soft` (blue 214° in light mode), exposed in `@theme` as `--color-info{,-foreground,-soft}`.
  - **Menubar**
    - Triggers and items now also paint `bg-muted` on `:hover` (in addition to `data-[highlighted]` and `:focus`) — defensive against tooling pipelines that don't always reliably generate the data-attribute selector on mouse hover.
    - `cursor-default` → `cursor-pointer` on triggers and items for an interactive feel.

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
