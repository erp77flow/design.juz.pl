import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export interface DocumentLineItem {
  name: string;
  description?: string;
  qty: number;
  unit: string;
  price: number;
  vatRate: number;
  total: number;
  code?: string;
}

export interface DocumentLineItemsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: DocumentLineItem[];
  currency?: string;
  showOrdinal?: boolean;
  emptyLabel?: string;
}

function formatNumber(value: number, fractionDigits = 2) {
  return new Intl.NumberFormat("pl-PL", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

function formatMoney(value: number, currency: string) {
  return `${formatNumber(value)} ${currency}`;
}

const DocumentLineItems = React.forwardRef<
  HTMLDivElement,
  DocumentLineItemsProps
>(
  (
    {
      className,
      items,
      currency = "PLN",
      showOrdinal = true,
      emptyLabel = "Brak pozycji w dokumencie.",
      ...props
    },
    ref
  ) => {
    if (!items.length) {
      return (
        <div
          className={cn(
            "rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {emptyLabel}
        </div>
      );
    }

    return (
      <div className={cn(className)} ref={ref} {...props}>
        <Table>
          <TableHeader>
            <TableRow>
              {showOrdinal ? (
                <TableHead className="w-12 text-center">Lp.</TableHead>
              ) : null}
              <TableHead>Nazwa</TableHead>
              <TableHead className="text-right">Ilość</TableHead>
              <TableHead>J.m.</TableHead>
              <TableHead className="text-right">Cena netto</TableHead>
              <TableHead className="text-right">VAT</TableHead>
              <TableHead className="text-right">Wartość brutto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={`${item.code ?? item.name}-${index}`}>
                {showOrdinal ? (
                  <TableCell className="text-center font-mono text-sm text-muted-foreground">
                    {index + 1}
                  </TableCell>
                ) : null}
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground">
                      {item.name}
                    </span>
                    {item.code ? (
                      <span className="font-mono text-xs text-muted-foreground">
                        {item.code}
                      </span>
                    ) : null}
                    {item.description ? (
                      <span className="mt-1 text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    ) : null}
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono">
                  {formatNumber(item.qty, item.qty % 1 === 0 ? 0 : 3)}
                </TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {item.unit}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {formatMoney(item.price, currency)}
                </TableCell>
                <TableCell className="text-right font-mono text-sm text-muted-foreground">
                  {item.vatRate}%
                </TableCell>
                <TableCell className="text-right font-mono font-bold">
                  {formatMoney(item.total, currency)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
);
DocumentLineItems.displayName = "DocumentLineItems";

export { DocumentLineItems };
