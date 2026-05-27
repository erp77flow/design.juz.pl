import { TokenDonutChart, TokenLineChart } from "@/components/ds/chart-primitives";

export function ChartShowcase() {
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <TokenLineChart
        className="xl:col-span-2"
        title="Wydajność - ostatnie 7 dni"
        description="Wspólny komponent chart atom, użyty w patternie."
        data={[
          { label: "Pon", value: 52 },
          { label: "Wt", value: 71 },
          { label: "Sr", value: 63 },
          { label: "Czw", value: 82 },
          { label: "Pt", value: 68 },
          { label: "Sob", value: 93 },
          { label: "Nd", value: 104 }
        ]}
      />
      <TokenDonutChart
        title="Statusy"
        description="Te same tokeny primary, success, warning i destructive."
        centerLabel="120"
        centerCaption="serii"
        data={[
          { label: "W produkcji", value: 48, tone: "primary" },
          { label: "Gotowe", value: 24, tone: "success" },
          { label: "Planowane", value: 17, tone: "warning" },
          { label: "Wymaga uwagi", value: 11, tone: "destructive" }
        ]}
      />
    </div>
  );
}
