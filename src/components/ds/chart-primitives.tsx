import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type TokenTone = "primary" | "success" | "warning" | "destructive" | "muted";

type ChartPoint = {
  label: string;
  value: number;
};

type DonutSegment = ChartPoint & {
  tone: TokenTone;
};

const toneVar: Record<TokenTone, string> = {
  primary: "hsl(var(--primary))",
  success: "hsl(var(--success))",
  warning: "hsl(var(--warning))",
  destructive: "hsl(var(--destructive))",
  muted: "hsl(var(--muted))"
};

const toneClass: Record<TokenTone, string> = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
  muted: "bg-muted"
};

function ChartShell({
  title,
  description,
  badge,
  className,
  children
}: {
  title: string;
  description: string;
  badge?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className={["p-5", className].filter(Boolean).join(" ")}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-extrabold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {badge ? <Badge variant="neutral">{badge}</Badge> : null}
      </div>
      {children}
    </Card>
  );
}

export function TokenBarChart({
  title = "Zlecenia wedlug dnia",
  description = "Os X: dni tygodnia, os Y: liczba złeceń.",
  data,
  className
}: {
  title?: string;
  description?: string;
  data: ChartPoint[];
  className?: string;
}) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <ChartShell title={title} description={description} badge="Bar" className={className}>
      <div className="grid h-56 grid-cols-[44px_minmax(0,1fr)] gap-3">
        <div className="grid content-between text-right text-xs font-semibold text-muted-foreground">
          <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
        </div>
        <div className="relative grid grid-cols-7 items-end gap-3 border-b border-l px-3 pb-7">
          <div className="absolute inset-x-0 bottom-7 border-t border-dashed border-border" />
          <div className="absolute inset-x-0 bottom-[88px] border-t border-dashed border-border" />
          <div className="absolute inset-x-0 bottom-[149px] border-t border-dashed border-border" />
          {data.map((item) => (
            <div className="relative z-10 flex h-full flex-col justify-end gap-2" key={item.label}>
              <span className="text-center text-xs font-bold">{item.value}</span>
              <div className="rounded-t-md bg-primary" style={{ height: `${(item.value / max) * 150}px` }} />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </ChartShell>
  );
}

export function TokenLineChart({
  title = "Wydajność linii",
  description = "Linia z punktami i wartościami.",
  data,
  className
}: {
  title?: string;
  description?: string;
  data: ChartPoint[];
  className?: string;
}) {
  const width = 500;
  const height = 240;
  const plot = { left: 40, right: 470, top: 28, bottom: 200 };
  const max = Math.max(...data.map((item) => item.value), 1);
  const min = Math.min(...data.map((item) => item.value), 0);
  const range = Math.max(max - min, 1);
  const step = (plot.right - plot.left) / Math.max(data.length - 1, 1);
  const points = data.map((item, index) => ({
    ...item,
    x: plot.left + index * step,
    y: plot.bottom - ((item.value - min) / range) * (plot.bottom - plot.top)
  }));

  return (
    <ChartShell title={title} description={description} badge="Line" className={className}>
      <svg className="h-56 w-full overflow-visible" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={title}>
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={plot.left} x2={plot.right} y1={plot.top + i * 45} y2={plot.top + i * 45} stroke="hsl(var(--border))" strokeDasharray="5 5" />
        ))}
        <line x1={plot.left} x2={plot.left} y1={plot.top} y2={plot.bottom} stroke="hsl(var(--border))" />
        <line x1={plot.left} x2={plot.right} y1={plot.bottom} y2={plot.bottom} stroke="hsl(var(--border))" />
        <polyline points={points.map((point) => `${point.x},${point.y}`).join(" ")} fill="none" stroke="hsl(var(--primary))" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point) => (
          <g key={point.label}>
            <circle cx={point.x} cy={point.y} r="6" fill="hsl(var(--primary))" />
            <text x={point.x} y={point.y - 14} textAnchor="middle" className="fill-foreground text-[13px] font-bold">{point.value}</text>
          </g>
        ))}
        {points.map((point) => (
          <text key={point.label} x={point.x} y="224" textAnchor="middle" className="fill-muted-foreground text-[13px]">{point.label}</text>
        ))}
        {[max, Math.round(max * 0.75), Math.round(max * 0.5), Math.round(max * 0.25), 0].map((value, i) => (
          <text key={`${value}-${i}`} x="4" y={plot.top + i * 43} className="fill-muted-foreground text-[13px]">{value}</text>
        ))}
      </svg>
    </ChartShell>
  );
}

export function TokenDonutChart({
  title = "Udzial statusow produkcji",
  description = "Wykres kolowy z legenda i danymi.",
  data,
  centerLabel = "100%",
  centerCaption = "kanaly",
  className
}: {
  title?: string;
  description?: string;
  data: DonutSegment[];
  centerLabel?: string;
  centerCaption?: string;
  className?: string;
}) {
  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  let current = 0;
  const gradient = data
    .map((item) => {
      const start = current;
      current += (item.value / total) * 100;
      return `${toneVar[item.tone]} ${start}% ${current}%`;
    })
    .join(", ");

  return (
    <ChartShell title={title} description={description} badge="Pie" className={className}>
      <div className="grid items-center gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
        <div className="relative size-52 rounded-full" style={{ background: `conic-gradient(${gradient})` }}>
          <div className="absolute inset-12 grid place-items-center rounded-full bg-card text-center shadow-juz-sm">
            <b>{centerLabel}</b>
            <span className="text-xs text-muted-foreground">{centerCaption}</span>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {data.map((item) => (
            <div className="flex items-center justify-between rounded-lg border bg-background p-3" key={item.label}>
              <span className="flex items-center gap-2 font-semibold"><span className={`size-3 rounded-full ${toneClass[item.tone]}`} />{item.label}</span>
              <b>{Math.round((item.value / total) * 100)}%</b>
            </div>
          ))}
        </div>
      </div>
    </ChartShell>
  );
}
