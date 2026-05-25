import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const items = [
  ["Produkcja długopisów", "MarkerPro", "AKTYWNE", "72%", "10:00", "success"],
  ["Seria markerów", "Długopis S.A.", "PLAN", "45%", "15:00", "default"],
  ["Pakiet szkolny", "KolorMix", "WYMAGA KONTROLI", "20%", "19:30", "warning"],
  ["Partia ekspresowa", "InkFactory", "BLAD", "8%", "22:00", "destructive"]
] as const;

export function ProgressLineCards() {
  return (
    <div className="grid gap-4 xl:grid-cols-4">
      {items.map(([title, owner, status, progress, time, variant]) => (
        <Card className="p-5" key={title}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-bold">{title}</h3>
              <p className="text-sm text-muted-foreground">{owner}</p>
            </div>
            <Badge variant={variant as "success" | "default" | "warning" | "destructive"}>{status}</Badge>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary data-[variant=destructive]:bg-destructive data-[variant=success]:bg-success data-[variant=warning]:bg-warning"
              data-variant={variant}
              style={{ width: progress }}
            />
          </div>
          <div className="mt-3 flex justify-between font-mono text-sm">
            <span>{time}</span>
            <strong>{progress}</strong>
          </div>
        </Card>
      ))}
    </div>
  );
}
