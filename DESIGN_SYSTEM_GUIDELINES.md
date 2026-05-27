# Design system guidelines

design.juz.pl jest systemem opartym o architekture shadcn/Radix, ale wyglad, tokeny i wzorce sa wlasne dla juz.pl.

## Warstwy

- `Atoms`: pojedyncze komponenty UI.
- `Molecules`: male zlozenia atomow.
- `Patterns`: powtarzalne procesy i uklady pracy.
- `Layouts`: ramy ekranow i struktury aplikacji.
- `Screens`: kompletne przyklady ekranow biznesowych.

## Tokeny

Uzywaj tokenow z `src/styles/globals.css`.

Kolory semantyczne:

- `primary` - akcje glowne, aktywne zakladki, linki strategiczne.
- `success` - stan pozytywny, aktywne, zatwierdzone.
- `warning` - oczekuje, wymaga uwagi.
- `destructive` - blad, usuniecie, anulowanie.
- `muted` - tlo pomocnicze.
- `border` - linie i separatory.
- `ring` - focus.

## Layout

- Listy sa pelnej szerokosci obszaru roboczego.
- Podglady rekordow sa wyrownane do lewej.
- Sekcje w rekordzie moga miec boczna nawigacje, ale srodkowy kontent nie powinien miec wlasnego scrolla, chyba ze jest to celowy pattern typu tabela/terminal.
- Dodatkowe panele moga byc sticky, ale nie moga zabierac szerokosci kluczowym listom.

## Tabele

- Glowne tabele uzywaja atomu `Table` albo patternu `DataList`.
- Tabele zagniezdzone w rekordach uzywaja lzejszego wariantu bez osobnej zaokraglonej ramki naglowka.
- Kolumna `Akcje` jest ostatnia.
- Sortowanie, filtry i ukrywanie kolumn powinny byc prawdziwymi interakcjami.

## Formularze

- Inputy, selecty, checkboxy, radio, toggles i textarea uzywaja komponentow DS.
- Walidacje maja widoczny opis bledu.
- Selecty i dropdowny musza miec wycentrowane ikony i zgodny focus ring.

## Dostepnosc

- Minimum WCAG AA.
- Kazdy interaktywny element ma focus visible.
- Modal, dialog, dropdown, select i tabs musza dzialac z klawiatury.
- Ikonowe przyciski wymagaja `aria-label`.

## Testy

Minimum przed zakonczeniem pracy:

```bash
npm run build
npm run test:storybook
```

Przed publikacja:

```bash
npm run qa
```

## Dokumentowanie zmian

Po zmianach aktualizuj:

- story komponentu,
- odpowiednia strone docs, jezeli zmienia sie zasada,
- `CHANGELOG.md`, jezeli zmiana jest istotna.
