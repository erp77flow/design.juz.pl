import * as React from "react";
import { cn } from "@/lib/utils";

interface FieldDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  hint?: React.ReactNode;
  orientation?: "vertical" | "horizontal";
}

const FieldDisplay = React.forwardRef<HTMLDivElement, FieldDisplayProps>(
  (
    { className, label, value, hint, orientation = "vertical", ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        orientation === "vertical"
          ? "flex flex-col gap-1"
          : "flex items-baseline justify-between gap-3",
        className
      )}
      {...props}
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
      {hint ? (
        <span className="text-xs text-muted-foreground">{hint}</span>
      ) : null}
    </div>
  )
);
FieldDisplay.displayName = "FieldDisplay";

export { FieldDisplay };
export type { FieldDisplayProps };
