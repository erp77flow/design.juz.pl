# Status projektu DesignSystem

Data zapisu: 2026-05-25

Ten plik jest punktem startowym do dalszych prac po przerwie. Ma przechowywać aktualny stan projektu, decyzje i instrukcje operacyjne, żeby nie trzeba było odtwarzać ustaleń z rozmowy.

## Cel projektu

`DesignSystem` to docelowy design system juz.pl oparty o Storybook, shadcn/Radix, Tailwind i tokeny marki juz.pl. Ma być używany jako baza dla nowych aplikacji: najpierw wybieramy gotowe Atoms, Molecules, Patterns, Layouts i Screens, a dopiero gdy czegoś brakuje, dodajemy element do najniższej sensownej warstwy DS.

Właściciel rozwiązania i marki:

- Alfabet sp. z o.o.
- https://www.alfabet.lu

Autor design systemu:

- Rafał Mazur, Weronika Mazur

## Stan na teraz

Projekt jest domknięty funkcjonalnie jako lokalna wersja Storybooka. Usunięto duplikaty atomów i zostawiono jedno źródło prawdy dla komponentów.

Zrobione i zweryfikowane:

- `Atoms`, `Molecules`, `Patterns`, `Layouts` i `Screens` są dostępne w Storybooku.
- Brakujące prymitywy używane przez ekrany zostały wyniesione do atomów, m.in. metryki, kafle, timeline, stepper, mini kalendarz, ikony akcji, warianty tabel, selecty, wykresy, karty, panele filtrów i elementy rekordów.
- Atom `CalendarEvent` ma poprawiony model propsów (`eventId`) i dokumentację.
- Atom `Collapsible` ma pełną dokumentację i działające warianty.
- Duplikaty `Atoms/Button/Examples` i `Atoms/Badge/Status Matrix` zostały usunięte. Zostają tylko właściwe atomy `Atoms/Button` i `Atoms/Badge`.
- Wszystkie atomy, poza katalogiem `AtomsCatalog`, używają wspólnego szablonu dokumentacji `StorySpec`.
- Storybook nie powinien zawierać żadnych zewnętrznych marek ani przykładów branżowych spoza juz.pl. Używamy uniwersalnych placeholderów ("Firma testowa", "Imię Nazwisko", "Klient testowy").
- Przykłady biznesowe mają iść w stronę neutralnej firmy produkcyjnej: długopisy, markery, flamastry, papier, magazyn, produkcja, PZ, zamówienia.

## Ostatnia weryfikacja

Uruchomione komendy:

```bash
npm run build
npm run build-storybook
npm run test:storybook:ci
```

Wyniki:

- `npm run build` przeszedł.
- `npm run build-storybook` przeszedł.
- `npm run test:storybook:ci` przeszedł: `131 passed`, `145 tests`.

Uwagi:

- Podczas `test:storybook:ci` port `6006` był już zajęty przez działający Storybook, więc test-runner użył istniejącej instancji. To nie jest błąd kodu.
- Ostrzeżenia Storybook/Vite o `eval` w runtime Storybooka i dużych chunkach są typowe dla dokumentacji z wieloma story oraz addonami. Nie blokują pracy ani publikacji. Można je optymalizować później przez code splitting/manual chunks, ale nie jest to krytyczne.

## Zasady dalszych prac

1. Nie dodawać komponentu bez sprawdzenia, czy istnieje już atom/molecule/pattern.
2. Każdy nowy element UI zaczynać od najniższej warstwy:
   - primitive: `Atoms`,
   - złożenie kilku atomów: `Molecules`,
   - powtarzalny układ pracy: `Patterns`,
   - rama ekranu: `Layouts`,
   - pełny widok biznesowy: `Screens`.
3. Jeżeli w `Screens`, `Layouts`, `Patterns` lub `Molecules` pojawia się element UI nieopisany w `Atoms`, dodać go do atomów i udokumentować.
4. Każdy atom powinien mieć dokumentację w stylu BriteFlow:
   - opis komponentu,
   - features,
   - usage snippet,
   - warianty,
   - tabela API/props,
   - przykład interaktywny lub wizualny w Storybooku.
5. Interaktywne rzeczy mają być prawdziwe: Radix/shadcn wrappers, stan, focus, klawiatura. Nie robić statycznych makiet zachowania.
6. Kolory, radius, spacing i cienie tylko przez tokeny. Nie wpisywać lokalnych hexów w ekranach.
7. Każda istotna zmiana musi trafić do `CHANGELOG.md`.
8. Decyzje projektowe zapisywać w plikach (`PROJECT_STATUS.md`, `AI.md`, `DESIGN_SYSTEM_GUIDELINES.md`, `CHANGELOG.md`), nie zostawiać ich tylko w rozmowie.

## Jak kontynuować po kilku dniach

1. Wejść do katalogu projektu (po sklonowaniu repo z GitHuba).

2. Uruchomić Storybook:

```bash
npm run storybook
```

Adres lokalny:

```txt
http://127.0.0.1:6006
```

3. Przed zmianami przeczytać:

- `README.md`
- `AI.md`
- `DESIGN_SYSTEM_GUIDELINES.md`
- `CHANGELOG.md`
- ten plik: `PROJECT_STATUS.md`

4. Po zmianach uruchomić:

```bash
npm run build
npm run build-storybook
npm run test:storybook:ci
```

5. Wykonać skany porządkowe:

```bash
rg -niE "ezg|esg77|cereclab|cerec|suus|markerpro|marker.?pro|kowalska|kamińska|kaminska|brzeziński|brzezinski|wójcik|wojcik|linek|dentyst|lekar|MARKERPRO" src README.md LICENSE.md CHANGELOG.md package.json
rg -n "Wartosc|wartosc|zamow|Zamow|naglow|Glown|Domysln|niedostep|Przeslij|Wiecej|zelowy|Podglad|rozł|filtrówanie" src README.md CHANGELOG.md
for f in src/stories/Atoms*.stories.tsx; do if ! rg -q "StorySpec" "$f"; then echo "$f"; fi; done
```

Oczekiwane:

- brak jakichkolwiek zewnętrznych marek/nazwisk/branży (tylko uniwersalne placeholdery),
- brak typowych literówek bez polskich znaków,
- w ostatnim skanie może pojawić się tylko `src/stories/AtomsCatalog.stories.tsx`, bo to katalog, nie dokumentacja pojedynczego atomu.

## Najważniejsze pliki

- `src/stories/story-parts.tsx` - centralny katalog przykładów, atom docs, wspólne makiety i elementy dokumentacji.
- `src/components/ui/*` - atomy zgodne z shadcn/Radix.
- `src/components/ds/*` - komponenty design systemu wyższego poziomu.
- `src/styles/globals.css` - tokeny kolorów, radiusów, focusów i theme.
- `src/docs/ThemePalette.mdx` - opis zmiany palety.
- `src/docs/AIUsage.mdx` - instrukcja użycia DS z AI.
- `src/docs/ComponentMap.mdx` - mapa warstw i komponentów.
- `CHANGELOG.md` - historia zmian.

## Co robić, gdy pojawi się nowy ekran

1. Najpierw sprawdzić, czy ekran da się złożyć z istniejących `Screens`, `Layouts`, `Patterns`, `Molecules` i `Atoms`.
2. Jeżeli ekran ma nowy element, nie wklejać go tylko do screena. Dodać atom/molecule/pattern i dopiero potem użyć go w screenie.
3. Dla komponentu interaktywnego dodać story z `play`, jeżeli zachowanie da się przetestować kliknięciem.
4. Sprawdzić responsywność i WCAG AA: focus, keyboard, kontrast, aria labels.
5. Dopisać wpis do `CHANGELOG.md`.

## Aktualna definicja “skończone”

Na dziś projekt jest skończony jako lokalna, testowana baza design systemu. Kolejne prace powinny być traktowane jako rozwój wersji, a nie naprawianie fundamentu.

Przed publikacją pod `DesignSystem` pozostaje decyzja operacyjna dotycząca hostingu i domeny, ale katalog `storybook-static/` buduje się poprawnie i jest gotowy jako artefakt publikacyjny.
