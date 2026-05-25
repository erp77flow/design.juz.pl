import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface SummaryTileProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  hint?: React.ReactNode;
}

const SummaryTile = React.forwardRef<HTMLDivElement, SummaryTileProps>(
  ({ label, value, hint, className, ...props }, ref) => (
    <Card
      ref={ref}
      className={cn("flex flex-col gap-1 p-4", className)}
      {...props}
    >
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      <span className="text-lg font-bold leading-tight text-foreground">
        {value}
      </span>
      {hint ? (
        <span className="text-xs text-muted-foreground">{hint}</span>
      ) : null}
    </Card>
  )
);
SummaryTile.displayName = "SummaryTile";

export { SummaryTile };
export type { SummaryTileProps };
