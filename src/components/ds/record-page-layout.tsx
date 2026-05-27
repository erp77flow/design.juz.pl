import * as React from "react";
import { cn } from "@/lib/utils";

export interface RecordPageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  nav?: React.ReactNode;
  summary?: React.ReactNode;
  children?: React.ReactNode;
  /** Domyślnie 3 kolumny. Ustaw "2" jeśli nie ma summary (260px + 1fr). */
  columns?: "2" | "3";
}

export const RecordPageLayout = React.forwardRef<HTMLDivElement, RecordPageLayoutProps>(
  ({ nav, summary, children, columns = "3", className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid gap-4",
        columns === "3"
          ? "xl:grid-cols-[260px_minmax(0,1fr)_340px]"
          : "xl:grid-cols-[260px_minmax(0,1fr)]",
        className
      )}
      {...props}
    >
      {nav}
      <main className="min-w-0 space-y-5">{children}</main>
      {columns === "3" && summary ? (
        <aside className="space-y-5 xl:sticky xl:top-20 xl:self-start">{summary}</aside>
      ) : null}
    </div>
  )
);
RecordPageLayout.displayName = "RecordPageLayout";
