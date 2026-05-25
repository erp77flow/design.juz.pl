# AI instructions for design.juz.pl

Ten plik jest przeznaczony dla AI i developerow budujacych nowe aplikacje na bazie design.juz.pl. Ma byc aktualizowany razem z kodem.

Przed rozpoczeciem kolejnej sesji przeczytaj tez `PROJECT_STATUS.md`. To jest zapis aktualnego stanu projektu, ostatniej weryfikacji i instrukcji kontynuacji po przerwie.

## Cel

Buduj aplikacje w oparciu o design.juz.pl: tokeny, atomy, molecules, patterns, layouts i screens. Nie tworz lokalnych zamiennikow, jezeli komponent albo wzorzec juz istnieje.

## Zasady podstawowe

1. Najpierw sprawdz Storybook i `src/components`.
2. Uzywaj atomow z `src/components/ui/*`.
3. Molecules, patterns, layouts i screens skladaj z atomow.
4. Kolory bierz z tokenow: `primary`, `success`, `warning`, `destructive`, `muted`, `border`, `ring`.
5. Nie wpisuj lokalnych kolorow hex w komponentach biznesowych.
6. Ikony bierz z `lucide-react`, chyba ze projekt ma dedykowany komponent ikon.
7. Zachowania interaktywne buduj na Radix/shadcn wrappers, nie jako statyczne makiety.
8. Kazdy nowy ekran musi byc responsywny i dostepny klawiatura.
9. Tabele, filtry, modale, drawery, selecty i tabsy musza miec realne stany.
10. Po zmianie uruchom `npm run build` i testy Storybooka.

## Prompt bazowy

```txt
Buduj aplikacje na podstawie design.juz.pl.
Uzywaj komponentow @juz/design-system opartych o shadcn/Radix.
Nie tworz wlasnych kolorow, spacingu, radiusow, cieni ani buttonow.
Najpierw dobierz istniejace Atoms, Molecules, Patterns, Layouts i Screens.
Jezeli komponentu brakuje, dodaj go do najnizszej sensownej warstwy DS i udokumentuj w Storybooku.
Zachowaj WCAG AA, focus states, obsluge klawiatury i responsywnosc.
```

## Jak dodawac nowy element

- Nowy primitive UI: dodaj do `src/components/ui`, potem story w `src/stories/Atoms.*`.
- Nowe zlozenie: dodaj molecule w `src/components/ds` albo `src/stories/story-parts.tsx`, potem story w `src/stories/Molecules.*`.
- Nowy wzorzec pracy: dodaj pattern i dokumentacje w `Patterns`.
- Nowy ekran: dodaj do `Screens`, ale tylko po zbudowaniu brakujacych atomow/molecules.

## Jak zmieniac theme

Zmieniaj theme przez `src/styles/globals.css`.

Nie poprawiaj pojedynczych komponentow, jezeli problem jest semantyczny:

```css
--primary: ...;
--primary-soft: ...;
--ring: ...;
--success: ...;
--warning: ...;
--destructive: ...;
```

Statusy musza byc tonalnie zgrane z primary, ale nie powinny byc tym samym kolorem.

## Changelog

Po kazdej istotnej zmianie dopisz wpis do `CHANGELOG.md`.

Nie uznajemy rozmowy z AI za dokumentacje decyzji. Decyzja ma zostac w pliku.
