import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface DocumentTotalsBreakdownRow {
  vatRate: number;
  net: number;
  vat: number;
}

export interface DocumentTotalsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  net: number;
  vat: number;
  gross: number;
  currency?: string;
  breakdown?: DocumentTotalsBreakdownRow[];
  netLabel?: string;
  vatLabel?: string;
  grossLabel?: string;
}

function formatMoney(value: number, currency: string) {
  const number = new Intl.NumberFormat("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  return `${number} ${currency}`;
}

const DocumentTotals = React.forwardRef<HTMLDivElement, DocumentTotalsProps>(
  (
    {
      className,
      net,
      vat,
      gross,
      currency = "PLN",
      breakdown,
      netLabel = "Razem netto",
      vatLabel = "Razem VAT",
      grossLabel = "Razem brutto",
      ...props
    },
    ref
  ) => {
    return (
      <aside
        className={cn(
          "ml-auto w-full max-w-md rounded-xl border border-border bg-card shadow-juz-sm",
          className
        )}
        ref={ref}
        {...props}
      >
        {breakdown?.length ? (
          <div className="border-b border-border p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
              Rozbicie stawek VAT
            </p>
            <div className="space-y-1.5">
              {breakdown.map((row) => (
                <div
                  className="grid grid-cols-3 items-center gap-2 text-sm"
                  key={row.vatRate}
                >
                  <span className="font-mono font-semibold text-muted-foreground">
                    VAT {row.vatRate}%
                  </span>
                  <span className="text-right font-mono text-foreground">
                    {formatMoney(row.net, currency)}
                  </span>
                  <span className="text-right font-mono text-foreground">
                    {formatMoney(row.vat, currency)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <dl className="divide-y divide-border">
          <div className="flex items-center justify-between px-4 py-3 text-sm">
            <dt className="font-semibold text-muted-foreground">{netLabel}</dt>
            <dd className="font-mono font-bold text-foreground">
              {formatMoney(net, currency)}
            </dd>
          </div>
          <div className="flex items-center justify-between px-4 py-3 text-sm">
            <dt className="font-semibold text-muted-foreground">{vatLabel}</dt>
            <dd className="font-mono font-bold text-foreground">
              {formatMoney(vat, currency)}
            </dd>
          </div>
          <div className="flex items-center justify-between bg-primary-soft px-4 py-4">
            <dt className="text-sm font-extrabold uppercase tracking-[0.12em] text-primary">
              {grossLabel}
            </dt>
            <dd className="font-mono text-xl font-extrabold text-primary">
              {formatMoney(gross, currency)}
            </dd>
          </div>
        </dl>
      </aside>
    );
  }
);
DocumentTotals.displayName = "DocumentTotals";

export { DocumentTotals };
