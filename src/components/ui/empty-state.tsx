import * as React from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  illustration?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      illustration,
      title,
      description,
      primaryAction,
      secondaryAction,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "grid place-items-center gap-5 rounded-xl border bg-card px-8 py-12 text-center shadow-juz-sm",
        className
      )}
      {...props}
    >
      {illustration ? (
        <div className="flex size-20 items-center justify-center rounded-full bg-primary-soft text-primary [&_svg]:size-9">
          {illustration}
        </div>
      ) : null}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        {description ? (
          <p className="mx-auto max-w-md text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {primaryAction || secondaryAction ? (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {primaryAction}
          {secondaryAction}
        </div>
      ) : null}
    </div>
  )
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
export type { EmptyStateProps };
