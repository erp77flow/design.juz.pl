# design.juz.pl

**juz.pl Design System** — Storybook + shadcn/ui-compatible components + tokeny marki juz.pl.

- Live demo (Storybook): https://erp77flow.github.io/design.juz.pl

Ten projekt jest docelową bazą dla nowych aplikacji juz.pl i publicznej dokumentacji design systemu.

Właścicielem rozwiązania i marki juz.pl jest Alfabet sp. z o.o. (`www.alfabet.lu`).
Autorem design systemu jest Rafał Mazur.
Kontakt projektowy i firmowy prowadzimy przez Alfabet sp. z o.o.: `https://www.alfabet.lu`.

Publiczne użycie komponentów, tokenów lub dokumentacji powinno zachować atrybucję:

```txt
UI based on design.juz.pl
Author: Rafał Mazur
Owner: Alfabet sp. z o.o. - www.alfabet.lu
```

## Uruchomienie

```bash
npm install
npm run storybook
```

Lokalny adres Storybook:

```txt
http://127.0.0.1:6006
```

Preview aplikacji dokumentacyjnej:

```bash
npm run dev
```

```txt
http://127.0.0.1:5174
```

## Zasada

Komponenty bazuja na konwencjach shadcn/Radix/Tailwind, ale wizualny theme, tokeny, kolory, spacing, radiusy, stany i układy są własnością juz.pl.

Warstwy systemu:

- `Atoms`: pojedyncze komponenty UI, np. Button, Input, Select, Dialog.
- `Molecules`: gotowe zestawy atomów, np. toolbar tabeli, date picker, menu profilu.
- `Patterns`: wzorce produktówe, np. DataList, calendar, detail record.
- `Layouts`: ramy ekranów, nawigacja i układy.
- `Screens`: pełne przykłady ekranów biznesowych.

## Tokeny i theme

Główne zmienne są w `src/styles/globals.css`.
Pelny opis zmiany palety jest w Storybooku: `Foundations / Theme palette`.

```css
--primary: 258 89% 59%;
--success: 166 44% 41%;
--warning: 41 66% 47%;
--destructive: 348 68% 55%;
--radius: 14px;
```

Zmiana motywu ma zaczynac sie od tokenów, nie od edycji pojedynczych komponentów. Jezeli `primary` zmieni sie z fioletowego na niebieski, komponenty powinny przejac ten kolor przez klasy `bg-primary`, `text-primary`, `ring-ring`, `bg-primary-soft`.

## Zgodnosc z shadcn

Wrappery w `src/components/ui/*` trzymają API zblizone do shadcn:

- `button`
- `dialog`
- `alert-dialog`
- `dropdown-menu`
- `label`
- `select`
- `tabs`
- `tooltip`

Molecules, patterns, layouts i screens powinny skladac sie z tych atomów. Static mockup jest dopuszczalny tylko dla elementu czysto wizualnego; zachowania interaktywne mają być prawdziwym komponentem.

## Testy

```bash
npm run build
npm run build-storybook
```

Interakcje komponentów są opisane w `play` stories dla kluczowych elementów: dialog, alert dialog, select, switch, dropdown, filters i data list. W Storybooku addon interactions pokazuje przebieg kliknięć i asercji.

## AI usage

Do budowania nowych aplikacji z AI używaj:

- `AI.md` jako źródła zasad dla AI,
- `DESIGN_SYSTEM_GUIDELINES.md` jako zasad architektury DS,
- `PROJECT_STATUS.md` jako aktualnego zapisu stanu projektu i instrukcji kontynuacji po przerwie,
- `AI Usage / Prompt Guide` w Storybooku jako wersji czytelnej w dokumentacji.

Najwazniejsza komenda dla AI:

```txt
Buduj aplikację na podstawie design.juz.pl. Używaj atomów, molecules i patterns z design systemu. Nie twórz lokalnych zamienników kolorów, buttonów, tabel, formularzy ani layoutów.
```

## Changelog

Zmiany utrzymujemy w `CHANGELOG.md`. Kazda istotna zmiana komponentu, tokenu, wzorca ekranu albo zasady AI powinna dostac wpis w sekcji `[Unreleased]`.

## Publikacja

Publiczny build Storybooka:

```bash
npm run build-storybook
```

Katalog `storybook-static/` jest gotowy do wystawienia pod `https://design.juz.pl`. Szczegóły są w `Implementation / Publishing design.juz.pl`.
