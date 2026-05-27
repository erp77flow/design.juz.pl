# DesignSystem

**juz.pl | Design System** — Storybook + shadcn/ui-compatible components + tokeny marki juz.pl.

- Live demo: https://juzpl.github.io/DesignSystem
- Theme playground: https://juzpl.github.io/DesignSystem/?path=/story/foundations-theme-playground--playground
- Repo: https://github.com/juzpl/DesignSystem
- Author: **Rafał Mazur**
- Owner: **Alfabet sp. z o.o.** — https://www.alfabet.lu

Design system zbudowany na React 19 + Tailwind + Radix/shadcn z własnymi tokenami marki. Możesz go używać w projektach komercyjnych — wymagamy tylko widocznej atrybucji w stopce (zobacz [License](#license)).

---

## Live Theme Playground

W Storybooku jest interaktywna strona **Foundations / Theme playground**, gdzie kolorystykę i radius zmieniasz suwakami i color pickerami — wszystkie komponenty reagują na żywo. Przed adopcją sprawdzisz jak twoja marka wygląda w DS i dostaniesz wygenerowany snippet CSS gotowy do skopiowania.

→ https://juzpl.github.io/DesignSystem/?path=/story/foundations-theme-playground--playground

---

## Instalacja

Wymagane peer-dependencies: **React 19**, **Tailwind 3.4+**, **TypeScript 5+**.

### Opcja A — kopiuj komponenty do własnego projektu (rekomendowane)

To podejście w stylu shadcn/ui: bierzesz to czego potrzebujesz, masz pełną kontrolę nad kodem.

```bash
git clone https://github.com/juzpl/DesignSystem
cd DesignSystem

# Skopiuj do swojego projektu:
cp -r src/components/ui     ../moj-projekt/src/components/
cp -r src/components/ds     ../moj-projekt/src/components/
cp    src/styles/globals.css ../moj-projekt/src/styles/
cp    tailwind.config.ts    ../moj-projekt/
cp    components.json        ../moj-projekt/
```

W swoim projekcie zainstaluj zależności runtime:

```bash
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
  @radix-ui/react-label @radix-ui/react-select @radix-ui/react-slot \
  @radix-ui/react-tabs @radix-ui/react-tooltip \
  class-variance-authority clsx tailwind-merge lucide-react
```

I zaimportuj globalne tokeny w `main.tsx`:

```ts
import "./styles/globals.css";
```

### Opcja B — install jako paczka z GitHuba

```bash
npm install github:juzpl/DesignSystem
```

Potem importuj komponenty:

```tsx
import { Button } from "DesignSystem/src/components/ui/button";
import { DataList } from "DesignSystem/src/components/ds/data-list";
```

> Repo nie jest publikowane do npm registry. Install z GitHub działa, ale **opcja A jest preferowana** — masz wtedy lokalny, edytowalny kod i nie zależysz od cudzych releasów.

### Lokalna eksploracja (zanim coś weźmiesz)

```bash
git clone https://github.com/juzpl/DesignSystem
cd DesignSystem
npm install
npm run storybook
# http://127.0.0.1:6006
```

---

## Użycie w innym projekcie

Od wersji **0.2.0** paczka `@juz/design-system` ma prawdziwe komponenty + entry points, więc można ją zainstalować i używać bezpośrednio (zamiast kopiować pliki ręcznie jak w opcji A wyżej).

### 1. Instalacja

Paczka jest oznaczona jako `private: true` (nie publikowana na npm). Importujemy ją przez git URL lub workspace link.

**Opcja A — Git URL (rekomendowane dla projektów spoza monorepo):**

```jsonc
// w package.json konsumenta:
"dependencies": {
  "@juz/design-system": "github:juzpl/DesignSystem#v0.2.0"
}
```

Pinuj po tagu (`#v0.2.0`), nie po branchu (`#main`) — branch idzie z każdym push-em.

**Opcja B — workspace/file: (gdy konsument jest w tym samym katalogu):**

```jsonc
"dependencies": {
  "@juz/design-system": "file:../../../design/design_juz_pl"
}
```

Następnie: `pnpm install`.

### 2. Konfiguracja Tailwind w projekcie konsumenta

Paczka używa Tailwind CSS jako engine + customowych tokenów. W swoim `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

export default {
  presets: [require("@juz/design-system/tailwind.config")],
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@juz/design-system/src/**/*.{ts,tsx}", // ważne: scanuje klasy z paczki
  ],
} satisfies Config;
```

### 3. Import CSS (tokeny + globale)

Raz, w głównym entry point apki (np. `src/main.tsx`):

```ts
import "@juz/design-system/styles.css";
```

To załaduje wszystkie CSS variables (`--primary`, `--shadow-juz`, `--success` itd.). Bez tego komponenty wyrenderują się bezbarwnie.

### 4. Użycie komponentów

```tsx
import { Button, Card, DataTable, Sidebar } from "@juz/design-system";
import { cn } from "@juz/design-system/lib/utils";

function App() {
  return (
    <Card>
      <Button variant="default">Zatwierdź</Button>
    </Card>
  );
}
```

**Subpath-y** (dla lepszego tree-shakingu lub gdy bundler ma problem z barrel exports):

```tsx
import { Button } from "@juz/design-system/atoms/button";
import { DataTable } from "@juz/design-system/layout/data-table";
```

### 5. Custom branding (opcjonalne)

Wszystkie kolory są CSS variables HSL — nadpisz je w swoim CSS po imporcie:

```css
@import "@juz/design-system/styles.css";

:root {
  --primary: 220 89% 59%;     /* niebieski zamiast fioletowego */
  --primary-soft: 220 100% 97%;
  --shadow-juz: 0 10px 30px rgb(45 90 240 / 0.12), 0 1px 2px rgb(16 24 40 / 0.06);
}
```

### 6. Aktualizacje

- **Patch (0.2.0 → 0.2.1):** tylko fixy — bezpiecznie aktualizować.
- **Minor (0.2.x → 0.3.0):** nowe komponenty, kompatybilne.
- **Major (0.x.y → 1.0.0):** zmiany breaking — sprawdź [`MIGRATIONS.md`](MIGRATIONS.md).

Każde wydanie ma GitHub Release z notami: https://github.com/juzpl/DesignSystem/releases

---

## Architektura: pięć warstw

Każdy element UI należy do jednej z warstw — od najprostszego do najwyższego:

| Warstwa | Co tu jest | Przykład |
|---------|-----------|----------|
| **Atoms** | Pojedyncze komponenty UI | Button, Input, Dialog, Badge |
| **Molecules** | Zestaw atomów z logiką | Toolbar tabeli, DatePicker, filter chip |
| **Patterns** | Wzorce pracy z danymi | DataList, Calendar, Stepper, Timeline |
| **Layouts** | Ramy ekranów | Shell aplikacji, DetailHeader, side panel |
| **Screens** | Pełne widoki biznesowe | OrderDetail, ClientList, ProductionDashboard |

**Reguła:** zanim coś dodasz, sprawdź czy nie istnieje już w niższej warstwie. Jeżeli pojawia się nowy element UI używany w screenach — wynieś go do atoma/molecule i udokumentuj.

---

## Tokeny

Jedno źródło prawdy dla kolorów, radiusów i statusów — `src/styles/globals.css`:

```css
:root {
  --primary: 258 89% 59%;
  --success: 166 44% 41%;
  --warning: 41 66% 47%;
  --destructive: 348 68% 55%;
  --radius: 14px;
}
```

Wszystkie komponenty czytają z tokenów (`bg-primary`, `text-primary`, `ring-ring`, `bg-primary-soft`). **Nie wpisuj lokalnych hexów w komponentach** — zmiana motywu zaczyna się od `globals.css`.

---

## Używanie z AI

Projekt jest gotowy do pracy z AI — masz spójne reguły, gotowe atomy i jasne wzorce. Przed pierwszym promptem podaj AI te pliki jako kontekst:

- [`AI.md`](AI.md) — reguły dla modelu (DO/DON'T)
- [`DESIGN_SYSTEM_GUIDELINES.md`](DESIGN_SYSTEM_GUIDELINES.md) — zasady architektury DS
- Storybook → `AI Usage / Prompt Guide` — wersja czytelna w dokumentacji

### Prompt bazowy

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
```

### Co AI MOŻE

✅ Składać ekrany z istniejących Atoms / Molecules / Patterns / Layouts / Screens
✅ Dodawać nowy atom do `src/components/ui/` jeśli czegoś brakuje (z dokumentacją w Storybooku)
✅ Tworzyć nowe ekrany w `src/stories/Screens.*.stories.tsx` używając OrderDetail/ClientDetail jako wzorca
✅ Zmieniać motyw przez `--primary`, `--success`, `--warning`, `--destructive`, `--radius` w `globals.css`

### Co AI **nie** może

❌ Wprowadzać lokalnych kolorów hex (`#3B82F6`, `rgb(...)`) w komponentach
❌ Tworzyć własnych wariantów Buttona zamiast użyć istniejących (`primary`, `secondary`, `outline`, `ghost`, `success`, `warning`, `destructive`)
❌ Robić statycznych makiet zachowania (dropdownów, dialogów) — używaj prawdziwych komponentów Radix
❌ Pomijać atrybucji licencyjnej w stopce wdrażanej aplikacji
❌ Zmieniać `LICENSE.md` ani usuwać informacji o właścicielu i autorze

---

## Lokalne uruchomienie

```bash
npm install
npm run storybook              # http://127.0.0.1:6006
npm run dev                    # http://127.0.0.1:5174  (landing Vite)
npm run build-storybook        # produkcyjny build do storybook-static/
npm run qa                     # build + build-storybook + testy interakcji
```

Jeśli chcesz wystawić Storybooka lokalnie pod własną domeną `design.test`:

```bash
docker compose up -d           # nginx + Traefik labels (wymaga lokalnego Traefika)
# http://design.test
```

---

## License

**TL;DR:** możesz używać DesignSystem w projektach komercyjnych i niekomercyjnych. W stopce produktu wstaw widoczną atrybucję:

```html
<footer>
  UI based on
  <a href="https://github.com/juzpl/DesignSystem">DesignSystem</a>
</footer>
```

Pełna licencja — [LICENSE.md](LICENSE.md). Podstawa:

- ✅ Użycie komercyjne i prywatne
- ✅ Modyfikacje i własne forki
- ✅ Redystrybucja
- ⚠️ **Wymagana atrybucja** w widocznym miejscu wdrażanego produktu (stopka lub odpowiednik): tekst `DesignSystem` + link do https://github.com/juzpl/DesignSystem
- ❌ Nie wolno podszywać się pod markę juz.pl ani usuwać informacji o autorze i właścicielu z `LICENSE.md`

**Właściciel:** Alfabet sp. z o.o. — https://www.alfabet.lu
**Autor design systemu:** Rafał Mazur
**Kontakt projektowy:** Alfabet sp. z o.o.

---

## Changelog

Historia zmian w [`CHANGELOG.md`](CHANGELOG.md). Każda istotna zmiana komponentu, tokenu, wzorca lub zasady AI dostaje wpis w `[Unreleased]`.

---

## Contributing

Pull requesty mile widziane. Przed wysłaniem:

1. Uruchom `npm run qa` lokalnie — build + build-storybook + testy interakcji muszą przejść.
2. Dodaj wpis do `CHANGELOG.md` w sekcji `[Unreleased]`.
3. Jeżeli dodajesz nowy komponent — dodaj też story w odpowiedniej warstwie (Atoms/Molecules/Patterns/Layouts/Screens) używając wzorca `StorySpec`.
4. Wszystkie kolory przez tokeny — żadnych lokalnych hexów.

Zgłoszenia bugów i propozycji: https://github.com/juzpl/DesignSystem/issues
