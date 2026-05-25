# Changelog

Wszystkie istotne zmiany w design.juz.pl zapisujemy w tym pliku. Nie trzymamy historii decyzji tylko w rozmowie z AI.

Format bazuje na prostym modelu:

- `Added` - nowe komponenty, ekrany, dokumenty i wzorce.
- `Changed` - zmiany wygladu, API, tokenów albo zachowania.
- `Fixed` - poprawki wizualne, dostepnosciowe i interakcyjne.
- `Removed` - usuniete komponenty, warianty albo nazwy.

## [Unreleased]

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
