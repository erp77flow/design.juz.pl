import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";
import { Bell, Check, Info, TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Hsl = { h: number; s: number; l: number };

const DEFAULTS: Record<TokenKey, Hsl> = {
  primary: { h: 258, s: 89, l: 59 },
  success: { h: 166, s: 44, l: 41 },
  warning: { h: 41, s: 66, l: 47 },
  destructive: { h: 348, s: 68, l: 55 }
};
const DEFAULT_RADIUS = 14;

type TokenKey = "primary" | "success" | "warning" | "destructive";

type Preset = {
  name: string;
  description: string;
  tokens: Record<TokenKey, Hsl>;
  radius: number;
};

const PRESETS: Preset[] = [
  {
    name: "juz.pl (default)",
    description: "Aktualna paleta design.juz.pl.",
    tokens: DEFAULTS,
    radius: 14
  },
  {
    name: "Ocean blue",
    description: "Niebieska marka, mniej zaokrąglona.",
    tokens: {
      primary: { h: 217, s: 91, l: 56 },
      success: { h: 159, s: 50, l: 42 },
      warning: { h: 32, s: 95, l: 50 },
      destructive: { h: 0, s: 72, l: 55 }
    },
    radius: 8
  },
  {
    name: "Forest green",
    description: "Stonowana zieleń z większymi promieniami.",
    tokens: {
      primary: { h: 142, s: 55, l: 38 },
      success: { h: 158, s: 64, l: 35 },
      warning: { h: 36, s: 88, l: 48 },
      destructive: { h: 4, s: 70, l: 50 }
    },
    radius: 18
  },
  {
    name: "Sunset orange",
    description: "Ciepła paleta produktowa, ostrzejsze rogi.",
    tokens: {
      primary: { h: 18, s: 88, l: 55 },
      success: { h: 145, s: 50, l: 40 },
      warning: { h: 45, s: 92, l: 52 },
      destructive: { h: 350, s: 75, l: 55 }
    },
    radius: 6
  },
  {
    name: "Mono slate",
    description: "Neutralny ciemny szary jako primary.",
    tokens: {
      primary: { h: 222, s: 18, l: 35 },
      success: { h: 165, s: 40, l: 40 },
      warning: { h: 38, s: 70, l: 50 },
      destructive: { h: 350, s: 65, l: 52 }
    },
    radius: 4
  }
];

function hslToHex({ h, s, l }: Hsl): string {
  const sN = s / 100;
  const lN = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sN * Math.min(lN, 1 - lN);
  const f = (n: number) => {
    const c = lN - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return Math.round(255 * c)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHsl(hex: string): Hsl {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0));
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }
  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

function toCssVar({ h, s, l }: Hsl): string {
  return `${h} ${s}% ${l}%`;
}

function softFromHsl({ h, s }: Hsl): Hsl {
  return { h, s: Math.min(100, s + 11), l: 96 };
}

const meta: Meta = {
  title: "Foundations/Theme playground",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Interaktywny playground tokenów design.juz.pl. Zmień kolory i radius — wszystkie komponenty po prawej odświeżają się natychmiast. Wartości publikowane jako CSS variables (HSL) tylko w obrębie tego playgroundu, nie wpływają na inne stories."
      }
    }
  }
};

export default meta;

function Playground() {
  const [tokens, setTokens] = useState<Record<TokenKey, Hsl>>(DEFAULTS);
  const [radius, setRadius] = useState<number>(DEFAULT_RADIUS);

  const cssVars = useMemo(() => {
    const vars: Record<string, string> = {
      "--primary": toCssVar(tokens.primary),
      "--primary-soft": toCssVar(softFromHsl(tokens.primary)),
      "--ring": toCssVar(tokens.primary),
      "--success": toCssVar(tokens.success),
      "--success-soft": toCssVar(softFromHsl(tokens.success)),
      "--warning": toCssVar(tokens.warning),
      "--warning-soft": toCssVar(softFromHsl(tokens.warning)),
      "--destructive": toCssVar(tokens.destructive),
      "--destructive-soft": toCssVar(softFromHsl(tokens.destructive)),
      "--radius": `${radius}px`
    };
    return vars as React.CSSProperties;
  }, [tokens, radius]);

  function updateToken(key: TokenKey, hex: string) {
    setTokens((prev) => ({ ...prev, [key]: hexToHsl(hex) }));
  }

  function applyPreset(preset: Preset) {
    setTokens(preset.tokens);
    setRadius(preset.radius);
  }

  const cssSnippet = useMemo(() => {
    return [
      `:root {`,
      `  --primary: ${toCssVar(tokens.primary)};`,
      `  --success: ${toCssVar(tokens.success)};`,
      `  --warning: ${toCssVar(tokens.warning)};`,
      `  --destructive: ${toCssVar(tokens.destructive)};`,
      `  --radius: ${radius}px;`,
      `}`
    ].join("\n");
  }, [tokens, radius]);

  return (
    <div style={cssVars} className="min-h-screen bg-background p-6 text-foreground">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-6 rounded-lg border bg-card p-5">
          <div>
            <h2 className="text-lg font-semibold">Tokeny</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Color picker zmienia HSL. Wszystkie komponenty po prawej reagują natychmiast.
            </p>
          </div>

          <div className="space-y-4">
            {(Object.keys(DEFAULTS) as TokenKey[]).map((key) => {
              const hsl = tokens[key];
              const hex = hslToHex(hsl);
              return (
                <div key={key} className="space-y-1.5">
                  <Label htmlFor={`token-${key}`} className="flex items-center justify-between">
                    <span className="capitalize">{key}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {hsl.h} {hsl.s}% {hsl.l}%
                    </span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <input
                      id={`token-${key}`}
                      type="color"
                      value={hex}
                      onChange={(e) => updateToken(key, e.target.value)}
                      className="h-9 w-12 cursor-pointer rounded border bg-transparent p-0"
                      aria-label={`Kolor tokenu ${key}`}
                    />
                    <Input
                      value={hex.toUpperCase()}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (/^#[0-9a-fA-F]{6}$/.test(v)) updateToken(key, v);
                      }}
                      className="font-mono uppercase"
                    />
                  </div>
                </div>
              );
            })}

            <div className="space-y-1.5">
              <Label htmlFor="token-radius" className="flex items-center justify-between">
                <span>Radius</span>
                <span className="font-mono text-xs text-muted-foreground">{radius}px</span>
              </Label>
              <input
                id="token-radius"
                type="range"
                min={0}
                max={32}
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full accent-[hsl(var(--primary))]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Presety</Label>
            <div className="grid gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className="flex items-center justify-between gap-3 rounded-md border bg-background p-2 text-left transition hover:border-primary"
                >
                  <span>
                    <span className="block text-sm font-medium">{preset.name}</span>
                    <span className="block text-xs text-muted-foreground">{preset.description}</span>
                  </span>
                  <span className="flex shrink-0 gap-1">
                    {(Object.keys(preset.tokens) as TokenKey[]).map((k) => (
                      <span
                        key={k}
                        aria-hidden
                        className="h-4 w-4 rounded-full ring-1 ring-border"
                        style={{ background: hslToHex(preset.tokens[k]) }}
                      />
                    ))}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setTokens(DEFAULTS);
              setRadius(DEFAULT_RADIUS);
            }}
          >
            Reset do juz.pl
          </Button>
        </aside>

        <section className="space-y-6">
          <header>
            <h1 className="text-2xl font-bold">Theme Playground</h1>
            <p className="mt-1 text-muted-foreground">
              Zobacz jak design.juz.pl wygląda w Twoich kolorach. Skopiuj CSS na dole i wklej do
              <code className="mx-1 rounded bg-muted px-1.5 py-0.5 font-mono text-xs">src/styles/globals.css</code>
              w swoim projekcie.
            </p>
          </header>

          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>Warianty bazowe — primary, secondary, outline, ghost, destructive.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badges &amp; statusy</CardTitle>
              <CardDescription>Tokeny statusów: success, warning, destructive.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge>Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2.5 py-0.5 text-xs font-semibold text-[hsl(var(--success))]">
                <Check className="h-3 w-3" /> Success
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-warning-soft px-2.5 py-0.5 text-xs font-semibold text-[hsl(var(--warning))]">
                <TriangleAlert className="h-3 w-3" /> Warning
              </span>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Form</CardTitle>
                <CardDescription>Input, label, ring focus.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="demo-email">Email</Label>
                  <Input id="demo-email" placeholder="ty@firma.pl" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="demo-pass">Hasło</Label>
                  <Input id="demo-pass" type="password" placeholder="••••••••" />
                </div>
                <Button className="w-full">Zaloguj się</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alerty &amp; tony</CardTitle>
                <CardDescription>Soft warianty kolorów statusu.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 rounded-md bg-primary-soft p-3 text-sm">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--primary))]" />
                  <div>
                    <p className="font-medium text-[hsl(var(--primary))]">Informacja</p>
                    <p className="text-muted-foreground">Tokeny zmieniają się od razu.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-md bg-success-soft p-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--success))]" />
                  <div>
                    <p className="font-medium text-[hsl(var(--success))]">Sukces</p>
                    <p className="text-muted-foreground">Operacja zakończona.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-md bg-warning-soft p-3 text-sm">
                  <Bell className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--warning))]" />
                  <div>
                    <p className="font-medium text-[hsl(var(--warning))]">Ostrzeżenie</p>
                    <p className="text-muted-foreground">Sprawdź ustawienia.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-md bg-destructive-soft p-3 text-sm">
                  <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--destructive))]" />
                  <div>
                    <p className="font-medium text-[hsl(var(--destructive))]">Błąd</p>
                    <p className="text-muted-foreground">Nie udało się zapisać.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>CSS do skopiowania</CardTitle>
              <CardDescription>
                Wklej do <code className="font-mono">src/styles/globals.css</code> w swoim projekcie.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto rounded-md bg-muted p-4 font-mono text-xs leading-relaxed">
                {cssSnippet}
              </pre>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

export const Playground_: StoryObj = {
  name: "Playground",
  render: () => <Playground />
};
