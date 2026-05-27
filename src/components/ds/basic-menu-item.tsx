import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export interface BasicMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label: React.ReactNode;
  active?: boolean;
  count?: number;
  asChild?: boolean;
}

const BasicMenuItem = React.forwardRef<HTMLButtonElement, BasicMenuItemProps>(
  (
    { icon, label, active, count, asChild, className, children, ...props },
    ref
  ) => {
    const Comp: React.ElementType = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : "button"}
        data-active={active || undefined}
        aria-current={active ? "page" : undefined}
        className={cn(
          "group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors",
          "hover:bg-muted hover:text-foreground",
          "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          active && "bg-primary-soft text-primary hover:bg-primary-soft",
          className
        )}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {icon ? (
              <span
                className={cn(
                  "inline-flex size-5 items-center justify-center text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0",
                  active && "text-primary"
                )}
              >
                {icon}
              </span>
            ) : null}
            <span className="flex-1 truncate text-left">{label}</span>
            {typeof count === "number" ? (
              <Badge
                variant={active ? "default" : "neutral"}
                className="shrink-0"
              >
                {count}
              </Badge>
            ) : null}
          </>
        )}
      </Comp>
    );
  }
);
BasicMenuItem.displayName = "BasicMenuItem";

export { BasicMenuItem };
