import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface SummaryPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children?: React.ReactNode;
}

export const SummaryPanel = React.forwardRef<HTMLDivElement, SummaryPanelProps>(
  ({ title = "Podsumowanie", className, children, ...props }, ref) => (
    <Card ref={ref} className={cn("p-4", className)} {...props}>
      <p className="juz-label">{title}</p>
      <dl className="mt-3 space-y-2 text-sm">{children}</dl>
    </Card>
  )
);
SummaryPanel.displayName = "SummaryPanel";

export interface SummaryRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value?: React.ReactNode;
}

export const SummaryRow = React.forwardRef<HTMLDivElement, SummaryRowProps>(
  ({ label, value, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-between gap-3", className)}
      {...props}
    >
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">
        {value ?? children ?? <span className="text-muted-foreground">—</span>}
      </dd>
    </div>
  )
);
SummaryRow.displayName = "SummaryRow";
