import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

/**
 * Lista wszystkich tokenów kolorów, które `globals.css` ustawia w `:root`
 * (i nadpisuje w `:root.dark`). Każdy token jest renderowany jako wiersz
 * z nazwą zmiennej, hexem wyliczonym na żywo z DOM i swatchem.
 *
 * Foreground sample text wciąga `--<token>-foreground`, jeśli istnieje;
 * dla tokenów bez pary foreground używamy `--foreground` (kontrast czytamy
 * z kontekstu — same swatche żyją w kolorze tokena).
 */
const TOKENS = [
  { name: "background", description: "Tło aplikacji" },
  { name: "foreground", description: "Domyślny kolor tekstu" },
  { name: "card", description: "Tło kart i kontenerów" },
  { name: "popover", description: "Tło popoverów i menu" },
  { name: "primary", description: "Akcje główne, linki, focus" },
  { name: "primary-soft", description: "Tła soft dla primary (alerty, chipy)" },
  { name: "success", description: "Status: aktywne, gotowe, wzrost" },
  { name: "success-soft", description: "Tło soft dla success" },
  { name: "warning", description: "Status: pauza, uwaga" },
  { name: "warning-soft", description: "Tło soft dla warning" },
  { name: "destructive", description: "Status: usuń, błąd, krytyczne" },
  { name: "destructive-soft", description: "Tło soft dla destructive" },
  { name: "info", description: "Status: informacja, neutralny komunikat" },
  { name: "info-soft", description: "Tło soft dla info" },
  { name: "muted", description: "Tła pomocnicze, separatory" },
  { name: "border", description: "Linie, obramowania kart i tabel" },
  { name: "input", description: "Obramowanie inputów (zwykle = border)" },
  { name: "ring", description: "Focus ring (zwykle = primary)" }
] as const;

type TokenName = (typeof TOKENS)[number]["name"];

type ResolvedToken = {
  name: TokenName;
  description: string;
  /** Surowa wartość zmiennej, np. "258 89% 59%". */
  raw: string;
  /** Hex wyliczony z DOM (`rgb(...)` → `#RRGGBB`). */
  hex: string;
  /** Czy token ma parę `--<name>-foreground` w :root. */
  hasForeground: boolean;
};

/**
 * Czyta token w bieżącym themie. Najpierw bierze `--token` (HSL triplet),
 * wstawia do tymczasowego `<span>` jako `color: hsl(var(--token))`, a potem
 * konwertuje `getComputedStyle().color` (zawsze "rgb(r, g, b)") na hex.
 *
 * Robimy to przez DOM zamiast parsowania HSL ręcznie, żeby wartości pasowały
 * dokładnie do tego, co użytkownik widzi w przeglądarce (browser sam liczy HSL).
 */
function readTokenHex(token: TokenName): { raw: string; hex: string } {
  const root = document.documentElement;
  const raw = getComputedStyle(root).getPropertyValue(`--${token}`).trim();

  // Tymczasowy element, żeby browser wyliczył HSL → RGB za nas.
  const probe = document.createElement("span");
  probe.style.color = `hsl(var(--${token}))`;
  probe.style.display = "none";
  root.appendChild(probe);
  const rgb = getComputedStyle(probe).color;
  root.removeChild(probe);

  // "rgb(94, 32, 224)" lub "rgba(94, 32, 224, 1)"
  const match = rgb.match(/\d+/g);
  if (!match || match.length < 3) {
    return { raw, hex: "#000000" };
  }
  const [r, g, b] = match.map(Number);
  const hex = `#${[r, g, b]
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;

  return { raw, hex };
}

function hasForegroundPair(token: TokenName): boolean {
  const fg = getComputedStyle(document.documentElement)
    .getPropertyValue(`--${token}-foreground`)
    .trim();
  return fg.length > 0;
}

/**
 * Obserwuje przełączenie themu (addon-themes dodaje/usuwa klasę `.dark`
 * na `<html>`) i przelicza tokeny, żeby UI nie zostało z hexami z light.
 */
function useThemeTokens(): ResolvedToken[] {
  const [tokens, setTokens] = useState<ResolvedToken[]>([]);

  useEffect(() => {
    const resolve = () =>
      setTokens(
        TOKENS.map((t) => {
          const { raw, hex } = readTokenHex(t.name);
          return {
            ...t,
            raw,
            hex,
            hasForeground: hasForegroundPair(t.name)
          };
        })
      );

    resolve();

    const observer = new MutationObserver(resolve);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"]
    });
    return () => observer.disconnect();
  }, []);

  return tokens;
}

function Swatch({ token }: { token: ResolvedToken }) {
  // Kolor tła swatcha = sam token. Tekst na swatchu używa pary `-foreground`,
  // jeśli istnieje, żeby pokazać że kontrast jest zaprojektowany.
  const bg = `hsl(var(--${token.name}))`;
  const fg = token.hasForeground
    ? `hsl(var(--${token.name}-foreground))`
    : `hsl(var(--foreground))`;

  return (
    <div
      className="flex h-16 w-full items-center justify-center rounded-md border border-border text-sm font-medium"
      style={{ background: bg, color: fg }}
    >
      Aa 123
    </div>
  );
}

function ColorRow({ token }: { token: ResolvedToken }) {
  return (
    <div className="grid grid-cols-[200px_1fr_220px_120px] items-center gap-4 rounded-md border border-border bg-card p-3 text-card-foreground">
      <div className="min-w-0">
        <code className="block truncate font-mono text-sm font-semibold text-foreground">
          --{token.name}
        </code>
        <p className="mt-0.5 text-xs text-muted-foreground">{token.description}</p>
      </div>

      <Swatch token={token} />

      <div className="space-y-0.5 font-mono text-xs text-muted-foreground">
        <div>
          <span className="text-foreground">{token.hex}</span>
        </div>
        <div className="truncate" title={token.raw}>
          hsl({token.raw})
        </div>
      </div>

      <div className="text-right text-xs text-muted-foreground">
        {token.hasForeground ? (
          <span className="rounded-sm bg-muted px-2 py-1 font-medium text-foreground">
            + foreground
          </span>
        ) : (
          <span className="opacity-60">surface only</span>
        )}
      </div>
    </div>
  );
}

function ColorsGrid() {
  const tokens = useThemeTokens();

  if (tokens.length === 0) {
    // Pierwszy render przed efektem — pokaż placeholder, żeby Storybook
    // nie liczył tego jako pustego ekranu.
    return (
      <div className="text-sm text-muted-foreground">Wczytywanie tokenów…</div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8 text-foreground">
      <header className="mx-auto mb-8 max-w-[1100px]">
        <h1 className="text-3xl font-bold">Kolory</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Wszystkie semantyczne tokeny koloru z <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-xs">globals.css</code>.
          Hex jest czytany na żywo z CSS variables — przełącz theme w toolbarze
          (ikonka słońca/księżyca), żeby zobaczyć wartości dla light i dark.
        </p>
      </header>

      <div className="mx-auto grid max-w-[1100px] gap-2">
        {tokens.map((t) => (
          <ColorRow key={t.name} token={t} />
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: "Foundations/Colors",
  component: ColorsGrid,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Pełna paleta tokenów kolorów design.juz.pl — wszystkie semantyczne zmienne CSS z `globals.css` w jednym widoku. Hex jest czytany na żywo z `document.documentElement`, więc po przełączeniu themu w toolbarze (light ↔ dark) widzisz aktualne wartości obu trybów. Używaj tej strony jako referencji przy onboardingu i przy review zmian palety."
      }
    }
  }
} satisfies Meta<typeof ColorsGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTokens: Story = {
  name: "All tokens",
  render: () => <ColorsGrid />
};
