# Zasady projektu design.juz.pl

Ten plik to **single source of truth** dla zasad, których pilnujemy w tym design systemie. Każda nowa zmiana ma się temu podporządkować. Edytuj ten plik jeśli zasada ewoluuje — nie zostawiaj decyzji wyłącznie w rozmowie z AI.

## 1. Co MOŻE być w kodzie i dokumentacji

- ✅ Marka **juz.pl** (właściciel: Alfabet sp. z o.o.).
- ✅ Autor: **Rafał Mazur** (atrybucja w `LICENSE.md`, `package.json` `author`).
- ✅ Generyczny kontekst biznesowy: firma produkcyjna (długopisy, markery, flamastry, papier, magazyn, produkcja, PZ, zamówienia, KSeF, GUS/VIES, kurier/paleta).
- ✅ Komponenty z architektury **shadcn/Radix + Tailwind v4 + cva**.
- ✅ Tokeny z `src/styles/globals.css` (kolory, radius, spacing, cienie).

## 2. Co NIE MOŻE być w kodzie i dokumentacji

Następujące słowa/marki/odniesienia są **zabronione** w plikach źródłowych, dokumentacji, opisach PR-ów, commit messages i story:

### Zewnętrzne firmy i marki
- ❌ `Cerec`, `CEREC`, `cereclab`, `CereClab`, `CL`
- ❌ `Britenet`, `BRITENET`
- ❌ `Suus`, `suus`, `Suus Portal`
- ❌ `ezg77`, `esg77`, `ESG77`, `EZG77`
- ❌ `MarkerPro`, `MARKERPRO`, `markerpro.pl`
- ❌ `Długopis S.A.`, `długopis-sa.pl`
- ❌ Jakakolwiek inna nazwa firmy/aplikacji **poza** Alfabet sp. z o.o. (właściciel) i juz.pl (marka).

### Branże spoza domyślnego kontekstu
- ❌ Medycyna, stomatologia: `dentysta`, `lekarz`, `stomatolog`, `korona`, `ząb`.
- ❌ Inne specyficzne branże, których nie ma w domyślnym kontekście produkcyjnym.

### Imiona i nazwiska osób (mockup data)
- ❌ Konkretne imiona+nazwiska (Anna Kowalska, Monika Kamińska, Kamil Brzeziński, Krzysztof Wójcik, Ewa Linek, itp.).
- ✅ Zamiast nich używamy uniwersalnych placeholderów:
  - `"Imię Nazwisko"` — pojedyncza wartość.
  - `"Opiekun handlowy"`, `"Opiekun 1"`, `"Opiekun 2"` — etykiety stanowisk.
  - `"Kontakt 1"`, `"Kontakt 2"`, `"Kontakt 3"` — pozycje na liście kontaktów.

### Konkretne dane firm w przykładach
- ❌ `"MarkerPro Produkcja sp. z o.o."` jako wartość pola "Pełna nazwa".
- ✅ Zamiast: `"Firma testowa sp. z o.o."` lub po prostu placeholder `"Pełna nazwa firmy"`.

### Tools i AI
- ❌ Nazwy konkretnych AI: `Claude`, `Copilot`, `Cursor`, `GPT`, itp.
- ✅ Mówimy ogólnie `"AI"`.
- ❌ Trailery `Co-Authored-By: Claude` w commit messages — **nigdy**.

### Adresy URL
- ❌ `https://design.juz.pl` jako URL działającego deploymentu (projekt leży tylko na GitHub Pages).
- ✅ Można użyć `design.juz.pl` jako nazwy projektu (identity), bez `https://`.
- ✅ Jeśli musimy podać adres Storybooka: `https://erp77flow.github.io/design.juz.pl/`.

## 3. Komendy weryfikacyjne

Przed każdym commitem do `main` puść te skanery — mają zwrócić zero trafień:

```bash
# Zewnętrzne marki i nazwiska (root projektu):
rg -niE "ezg|esg77|cereclab|cerec|suus|markerpro|marker.?pro|kowalska|kamińska|kaminska|brzeziński|brzezinski|wójcik|wojcik|linek|dentyst|lekar|MARKERPRO|britenet|stomatolog|claude" \
  --type ts --type tsx --type md --type mdx --type json --type yaml --type css

# Wycieki URL https://design.juz.pl:
rg -niE "https?://design\\.juz\\.pl" --type ts --type tsx --type md --type mdx --type json --type yaml
```

Plus standardowe:

```bash
npx tsc -b --force                # TypeScript
pnpm run build-storybook          # Storybook build
pnpm run test:storybook:ci        # axe-core a11y
pnpm run visual:check             # pixel-diff
pnpm run size                     # bundle size budget
```

## 4. Reguła architektoniczna (powtórka z DESIGN_SYSTEM_GUIDELINES.md)

1. Nowy element UI zaczyna w **najniższej** sensownej warstwie:
   - primitive → `Atoms` (`src/components/ui/`)
   - złożenie atomów → `Molecules` (`src/components/ds/`)
   - powtarzalny układ → `Patterns` lub `Layouts`
   - kompletny ekran → `Screens`
2. Jeżeli `Screen`/`Layout`/`Pattern`/`Molecule` potrzebuje nowego primitive, **najpierw** dodaj go do `Atoms`, dopiero potem używaj.
3. Komponenty interaktywne to **prawdziwe** Radix/shadcn wrappers (z fokusem, klawiaturą, ARIA) — nie statyczne makiety HTML.
4. **Kolory, radius, spacing, cienie**: zawsze przez tokeny w `src/styles/globals.css`. Zero lokalnych hexów.
5. **Eksport** każdego nowego komponentu w `src/index.ts` (alfabetycznie, w odpowiedniej sekcji).
6. **Story** dla każdego komponentu z `tags: ["autodocs"]` + opisem w `parameters.docs.description.component`.

## 5. Reguła wydaniowa

1. Każda zmiana konsumencka idzie przez `changeset` (`pnpm changeset`).
2. Bump:
   - **Major** — breaking change w API komponentu, usunięcie eksportu.
   - **Minor** — nowy komponent, nowy wariant, nowy prop, nowy token.
   - **Patch** — bugfix, poprawka kontrastu, korekta opisu.
3. Po mergu feature PR-a bot otwiera `chore: release packages`. Czasem trzeba zrobić `close + reopen`, żeby ruszyła CI (znany bug Changesets action + GitHub `GITHUB_TOKEN`).
4. Po mergu release PR-a workflow `release.yml` tworzy tag + GitHub Release. Czasem pierwsza próba `git push tag` pada na "fatal error in commit_refs" (transient GitHub side) — `gh run rerun --failed` rozwiązuje.

## 6. Reguła commit messages

- Format: `type(scope): subject` — `feat`, `fix`, `chore`, `docs`, `test`, `refactor`, `ci`.
- Body opcjonalne, krótkie, bez referencji do konkretnych konsumentów.
- **Nigdy** trailera `Co-Authored-By:` z AI.
- **Nigdy** wzmianki "ezg77 / Cerec / Suus / itp." — patrz §2.

## 7. Reguła PR descriptions

- Skip "Motivation: ezg77 needs X" — to wycieka prywatne consumer info.
- OK: "Other apps consuming the design system need…" — generyczne sformułowanie.

## 8. Kontekst publikacji

- Repo jest **publiczne**: `https://github.com/erp77flow/design.juz.pl`.
- Storybook hostowany na **GitHub Pages**: `https://erp77flow.github.io/design.juz.pl/`.
- Paczka npm: `@juz/design-system` (na razie `private: true` w package.json — instalacja przez GitHub URL: `npm install github:erp77flow/design.juz.pl#vX.Y.Z`).
- Licencja: Attribution License v1.0 (`LICENSE.md`) — wymagana atrybucja w stopce produktu pochodnego.
