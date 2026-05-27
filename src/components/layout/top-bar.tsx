import * as React from "react";
import { cn } from "@/lib/utils";

export interface TopBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  filters?: React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryActions?: React.ReactNode;
  meta?: React.ReactNode;
}

const TopBar = React.forwardRef<HTMLDivElement, TopBarProps>(
  (
    {
      className,
      title,
      description,
      filters,
      primaryAction,
      secondaryActions,
      meta,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          "flex flex-col gap-3 border-b border-border bg-card px-4 py-4 shadow-juz-sm md:px-6",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-extrabold leading-tight text-foreground">
              {title}
            </h1>
            {description ? (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            ) : null}
            {meta ? (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {meta}
              </div>
            ) : null}
          </div>

          {secondaryActions || primaryAction ? (
            <div className="flex flex-wrap items-center gap-2">
              {secondaryActions}
              {primaryAction}
            </div>
          ) : null}
        </div>

        {filters ? (
          <div className="flex flex-wrap items-center gap-2 border-t border-border pt-3">
            {filters}
          </div>
        ) : null}
      </div>
    );
  }
);
TopBar.displayName = "TopBar";

export { TopBar };
