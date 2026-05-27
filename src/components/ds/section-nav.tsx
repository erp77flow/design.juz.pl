import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionNavEntry {
  id: string;
  label: string;
  icon: React.ElementType;
  state?: "Wymagane" | "Opcjonalne";
}

export interface SectionNavProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  title?: string;
  items: SectionNavEntry[];
  activeId?: string;
  onSelect?: (id: string) => void;
}

export const SectionNav = React.forwardRef<HTMLElement, SectionNavProps>(
  ({ title = "Sekcje", items, activeId, onSelect, className, ...props }, ref) => (
    <aside
      ref={ref}
      className={cn("xl:sticky xl:top-20 xl:self-start", className)}
      {...props}
    >
      <div className="rounded-lg border bg-card p-3 shadow-juz-sm">
        <p className="juz-label mb-2">{title}</p>
        <nav aria-label={title} className="space-y-1">
          {items.map((s) => {
            const Icon = s.icon;
            const isActive = activeId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelect?.(s.id)}
                className={cn(
                  "relative flex w-full items-start justify-between gap-3 rounded-md px-3 py-3 text-left text-sm hover:bg-primary-soft",
                  isActive &&
                    "bg-primary-soft text-primary before:absolute before:-left-3 before:top-3 before:h-8 before:w-1 before:rounded-r-full before:bg-primary"
                )}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon className="size-4" />
                  {s.label}
                </span>
                {s.state ? (
                  <span
                    className={cn(
                      "text-xs",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {s.state}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  )
);
SectionNav.displayName = "SectionNav";
