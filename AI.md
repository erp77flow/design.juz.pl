# AI instructions for DesignSystem

Ten plik jest źródłem reguł dla AI budujących aplikacje na bazie DesignSystem. Powinien być aktualizowany razem z kodem.

Przed startem sesji przeczytaj też:

- `DESIGN_SYSTEM_GUIDELINES.md` — zasady architektury DS.
- `PROJECT_STATUS.md` — aktualny stan projektu i ostatnia weryfikacja.
- W Storybooku: `AI Usage / Prompt Guide` — czytelna wersja tych reguł.

---

## Prompt bazowy

```txt
Buduj aplikację na podstawie DesignSystem
(https://github.com/juzpl/DesignSystem).

Używaj atomów, molecules i patterns z design systemu. Nie twórz lokalnych
zamienników kolorów, buttonów, tabel, formularzy ani layoutów.

Kolory bierz tylko z tokenów: --primary, --success, --warning,
--destructive, --muted, --border, --ring. Radius i spacing też przez tokeny.

Komponenty interaktywne muszą używać prawdziwych Radix/shadcn wrapperów
(Dialog, Select, DropdownMenu, Tabs), nie statycznych makiet.

Każdy nowy element UI ma być responsywny i dostępny klawiaturą (WCAG AA).

W stopce wdrażanej aplikacji wstaw widoczną atrybucję:
  UI based on DesignSystem (https://github.com/juzpl/DesignSystem)
```

---

## ✅ DO — co AI **może** i **powinno** robić

### Komponenty
- ✅ **Składać ekrany z istniejących Atoms / Molecules / Patterns / Layouts / Screens.** Najpierw sprawdź Storybook i `src/components/`, dopiero potem rozważ nowe rzeczy.
- ✅ **Dodawać nowy atom**, gdy w istniejących screenach pojawia się element nieopisany w `Atoms` — wynieś go do `src/components/ui/`, dodaj story w `src/stories/Atoms.<Nazwa>.stories.tsx` z `StorySpec`.
- ✅ **Wzbogacać molecules/patterns** w `src/components/ds/` o nowe wzorce, gdy używasz tego samego układu w więcej niż dwóch screenach.
- ✅ **Używać Radix/shadcn wrapperów** dla wszystkich interakcji: `Dialog`, `AlertDialog`, `DropdownMenu`, `Select`, `Tabs`, `Tooltip`, `Collapsible`.
- ✅ **Stosować lucide-react** dla ikon — chyba że projekt ma dedykowany komponent ikon.

### Theme i tokeny
- ✅ **Zmieniać motyw przez tokeny** w `src/styles/globals.css`: `--primary`, `--primary-soft`, `--success`, `--success-soft`, `--warning`, `--warning-soft`, `--destructive`, `--destructive-soft`, `--ring`, `--radius`.
- ✅ **Sprawdzić motyw na żywo** w Storybooku: `Foundations / Theme playground` — color pickery + suwak radius + presety.
- ✅ **Pilnować tonalności** — statusy mają być rozróżnialne od `primary`, ale spójne z całym motywem.

### Stories i dokumentacja
- ✅ **Dodawać story z `play`** dla interaktywnych komponentów (Dialog, Select, DropdownMenu, filters, data list) — opisz przebieg kliknięć i asercji.
- ✅ **Używać `StorySpec`** w atomach do spójnej dokumentacji (opis, features, usage, warianty, API).
- ✅ **Aktualizować `CHANGELOG.md`** — każda istotna zmiana komponentu, tokenu, wzorca albo zasady AI dostaje wpis w `[Unreleased]`.

### Architektura
- ✅ **Najniższa sensowna warstwa** — primitive → Atom, złożenie → Molecule, powtarzalny wzorzec → Pattern, rama ekranu → Layout, pełny widok → Screen.
- ✅ **Responsywność i WCAG AA** — focus, keyboard, kontrast, aria labels w każdym nowym ekranie.

### Atrybucja
- ✅ **Wstaw widoczną stopkę** w aplikacjach pochodnych:
  ```html
  <footer>
    UI based on
    <a href="https://github.com/juzpl/DesignSystem">DesignSystem</a>
  </footer>
  ```

---

## ❌ DON'T — czego AI **nie wolno** robić

### Kolory i style
- ❌ **Nie wpisuj lokalnych hexów** (`#3B82F6`, `#fff`, `rgb(...)`, `rgba(...)`) w komponentach biznesowych. Wszystko przez tokeny.
- ❌ **Nie używaj klas Tailwinda na surowych kolorach** (`bg-blue-500`, `text-red-600`, `border-gray-300`). Używaj semantycznych klas opartych o tokeny (`bg-primary`, `text-destructive`, `border`).
- ❌ **Nie ustawiaj radius/spacing/cieni jako wartości twardych** — używaj tokenów (`rounded-lg`, `rounded-md`).

### Komponenty
- ❌ **Nie twórz własnych wariantów Buttona**, jeśli istniejące pokrywają potrzebę. Dostępne: `primary` (default), `secondary`, `outline`, `ghost`, `success`, `warning`, `destructive`.
- ❌ **Nie rób statycznych makiet zachowania** dropdownów, dialogów, selectów — to mają być prawdziwe komponenty Radix z realnym stanem, focusem i klawiaturą.
- ❌ **Nie duplikuj atomów** — nie twórz „local Button" / „custom Card" / „my Badge" obok istniejących.
- ❌ **Nie kopiuj kodu komponentu UI do screena** — importuj atom z `@/components/ui/...`.

### Architektura
- ❌ **Nie pomijaj warstw DS** — nie wklejaj nowego primitive UI bezpośrednio do screena bez wcześniejszego wyniesienia go do `Atoms`.
- ❌ **Nie używaj branż ani marek spoza juz.pl** w przykładach biznesowych. Używaj uniwersalnych placeholderów: "Firma testowa sp. z o.o.", "Imię Nazwisko", "Klient testowy" itp. Domyślny kontekst biznesowy: firma produkcyjna (długopisy, markery, papier, magazyn, produkcja, PZ, zamówienia).
- ❌ **Nie zostawiaj literówek bez polskich znaków** w dokumentacji i story (np. „wartosc", „zamow", „naglow", „glown", „domysln" — używaj poprawnych form z polskimi znakami).

### Licencja
- ❌ **Nie usuwaj `LICENSE.md`** ani informacji o autorze (Rafał Mazur) i właścicielu (Alfabet sp. z o.o.).
- ❌ **Nie pomijaj atrybucji w stopce** wdrażanej aplikacji. Brak atrybucji = naruszenie licencji.
- ❌ **Nie ukrywaj atrybucji** przez `display:none`, `opacity:0`, `color:transparent`. Atrybucja musi być widoczna dla użytkownika.

### Decyzje i dokumenty
- ❌ **Nie zostawiaj decyzji projektowych tylko w rozmowie z AI.** Decyzja ma trafić do pliku: `PROJECT_STATUS.md`, `AI.md`, `DESIGN_SYSTEM_GUIDELINES.md` lub `CHANGELOG.md`.

---

## Jak dodawać nowy element

| Typ elementu | Gdzie | Story |
|--------------|-------|-------|
| Nowy primitive UI | `src/components/ui/<nazwa>.tsx` | `src/stories/Atoms.<Nazwa>.stories.tsx` z `StorySpec` |
| Złożenie atomów | `src/components/ds/<nazwa>.tsx` | `src/stories/Molecules.<Nazwa>.stories.tsx` |
| Wzorzec pracy | `src/components/ds/<nazwa>.tsx` | `src/stories/Patterns.<Nazwa>.stories.tsx` |
| Rama ekranu | `src/components/ds/<nazwa>.tsx` | `src/stories/Layouts.<Nazwa>.stories.tsx` |
| Pełny widok | `src/components/ds/<nazwa>.tsx` | `src/stories/Screens.<Folder>.<Nazwa>.stories.tsx` |

Po dodaniu: wpis do `CHANGELOG.md` i `npm run qa`.

---

## Theme — gdzie zmieniać

Główna paleta jest w **jednym pliku**: `src/styles/globals.css`.

```css
:root {
  --primary: 258 89% 59%;
  --primary-soft: 261 100% 97%;
  --success: 166 44% 41%;
  --warning: 41 66% 47%;
  --destructive: 348 68% 55%;
  --ring: 258 89% 59%;
  --radius: 14px;
}
```

Wartości są HSL bez `hsl(...)`, bo Tailwind i shadcn opakowują je przez `hsl(var(--primary))`. **Nie ruszaj pojedynczych komponentów, gdy problem jest semantyczny — popraw token i niech komponenty same się dostosują.**

---

## Quick checks przed merge

```bash
npm run qa            # build + build-storybook + testy interakcji
```

Po zmianie:

1. Czy nowe komponenty mają story z `StorySpec`?
2. Czy CHANGELOG ma wpis?
3. Czy nie ma lokalnych hexów w komponentach biznesowych?
4. Czy interaktywne elementy używają Radix, a nie makiet?
5. Czy WCAG AA: focus, keyboard, kontrast, aria labels?
