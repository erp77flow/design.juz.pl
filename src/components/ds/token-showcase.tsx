import { Card } from "@/components/ui/card";

const colorTokens = [
  ["primary", "258 89% 59%", "Akcje główne, linki, focus"],
  ["success", "166 44% 41%", "Aktywny, gotowe, wzrost"],
  ["warning", "41 66% 47%", "Pauza, uwaga, w przygotowaniu"],
  ["destructive", "348 68% 55%", "Usuń, błąd, krytyczne"],
  ["muted", "250 43% 97%", "Tla, separatory, pola pomocnicze"],
  ["border", "222 26% 89%", "Linie, tabele, obramowania"]
];

const radiusTokens = [
  ["sm", "10px"],
  ["md", "12px"],
  ["lg", "14px"],
  ["xl", "18px"],
  ["full", "999px"]
];

export function TokenShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-3xl font-extrabold">Kolory</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">
          Tokeny są zgodne z Tailwind/shadcn CSS variables, ale dobrane pod paletę juz.pl.
          Zmieniamy je centralnie w <code className="juz-code">src/styles/globals.css</code>.
        </p>
        <div className="mt-5 rounded-lg border bg-muted/45 p-4">
          <p className="text-sm font-semibold text-foreground">Zasada theme</p>
          <p className="mt-1 max-w-4xl text-sm text-muted-foreground">
            Zmiana fioletowego, zielonego, zoltego albo czerwonego zaczyna się od tokenów
            <code className="mx-1 rounded-sm bg-card px-1 font-mono text-primary">--primary</code>
            <code className="mx-1 rounded-sm bg-card px-1 font-mono text-success">--success</code>
            <code className="mx-1 rounded-sm bg-card px-1 font-mono text-warning">--warning</code>
            <code className="mx-1 rounded-sm bg-card px-1 font-mono text-destructive">--destructive</code>,
            a nie od edycji pojedynczych atomów.
          </p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {colorTokens.map(([name, hsl, usage]) => (
            <Card className="overflow-hidden" key={name}>
              <div className="grid h-20 grid-cols-[1fr_80px]">
                <div style={{ background: `hsl(var(--${name}))` }} />
                <div style={{ background: `hsl(var(--${name}-soft, var(--${name})))` }} />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-lg">{name}</strong>
                  <code className="juz-code">--{name}</code>
                </div>
                <p className="mt-1 font-mono text-xs text-muted-foreground">{hsl}</p>
                <p className="mt-2 text-sm text-muted-foreground">{usage}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-extrabold">Radius i cienie</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {radiusTokens.map(([name, radius]) => (
            <Card className="p-5" key={name}>
              <div className="h-24 border bg-primary-soft" style={{ borderRadius: radius }} />
              <strong className="mt-4 block">radius {name}</strong>
              <code className="text-sm text-muted-foreground">{radius}</code>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
