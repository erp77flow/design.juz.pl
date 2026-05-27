const rows = [
  ["Display", "48 / 800", "Pulpit handlowca", "text-5xl font-extrabold leading-tight"],
  ["H1", "36 / 800", "Wysyłki i dostawy", "text-4xl font-extrabold leading-tight"],
  ["H2", "30 / 800", "Plan publikacji", "text-3xl font-extrabold leading-tight"],
  ["H3", "24 / 700", "Firma testowa Produkcja", "text-2xl font-bold leading-snug"],
  ["Body", "16 / 400", "Rozmawialiśmy o nowym systemie publikacji postów.", "text-base font-normal leading-7"],
  ["Small", "14 / 400", "Operator linii: Tomasz Zieliński", "text-sm font-normal leading-6"],
  ["Caption", "12 / 600", "24.05.2026 · ostatni kontakt > 30 dni", "text-xs font-semibold leading-5 text-muted-foreground"],
  ["Mono", "13 / 500", "ZS/00045/05/2026 - 5 230,00 PLN", "font-mono text-sm font-medium"]
];

export function TypographyScale() {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-3xl font-extrabold">Typografia</h2>
        <p className="mt-2 text-muted-foreground">
          Inter jako font UI, JetBrains Mono dla kodu, ID, kwot i danych tabelarycznych.
        </p>
      </div>
      <div className="overflow-hidden rounded-lg border bg-card shadow-juz-sm">
        {rows.map(([name, meta, sample, className]) => (
          <div className="grid gap-4 border-b p-5 last:border-b-0 md:grid-cols-[220px_minmax(0,1fr)]" key={name}>
            <div>
              <strong>{name}</strong>
              <p className="font-mono text-sm text-muted-foreground">{meta}</p>
            </div>
            <p className={className}>{sample}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
