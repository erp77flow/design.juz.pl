import * as React from "react";
import { cn } from "@/lib/utils";

export interface FieldGridProps extends React.HTMLAttributes<HTMLDListElement> {
  /** Liczba kolumn na breakpoint xl. Domyślnie 4. */
  columnsXl?: 2 | 3 | 4;
}

const COLS_XL: Record<2 | 3 | 4, string> = {
  2: "xl:grid-cols-2",
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4"
};

export const FieldGrid = React.forwardRef<HTMLDListElement, FieldGridProps>(
  ({ columnsXl = 4, className, ...props }, ref) => (
    <dl
      ref={ref}
      className={cn("grid gap-x-10 gap-y-6 md:grid-cols-2", COLS_XL[columnsXl], className)}
      {...props}
    />
  )
);
FieldGrid.displayName = "FieldGrid";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value?: React.ReactNode;
  /** Gdy true — wartość pisana monospace (np. NIP, kod) */
  mono?: boolean;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ label, value, mono, className, children, ...props }, ref) => (
    <div ref={ref} className={cn("min-w-0", className)} {...props}>
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className={cn("mt-1 text-sm", mono && "font-mono")}>
        {value ?? children ?? <span className="text-muted-foreground">—</span>}
      </dd>
    </div>
  )
);
Field.displayName = "Field";
