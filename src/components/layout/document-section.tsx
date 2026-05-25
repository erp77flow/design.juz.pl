import * as React from "react";
import { cn } from "@/lib/utils";

export interface DocumentSectionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  bodyClassName?: string;
}

const DocumentSection = React.forwardRef<HTMLElement, DocumentSectionProps>(
  (
    { className, title, description, actions, bodyClassName, children, ...props },
    ref
  ) => {
    return (
      <section
        className={cn(
          "rounded-xl border border-border bg-card shadow-juz-sm",
          className
        )}
        ref={ref}
        {...props}
      >
        <header className="flex flex-col gap-2 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-base font-extrabold leading-tight text-foreground">
              {title}
            </h2>
            {description ? (
              <p className="mt-0.5 text-sm text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
          {actions ? (
            <div className="flex flex-wrap items-center gap-2">{actions}</div>
          ) : null}
        </header>
        <div className={cn("p-5", bodyClassName)}>{children}</div>
      </section>
    );
  }
);
DocumentSection.displayName = "DocumentSection";

export { DocumentSection };
