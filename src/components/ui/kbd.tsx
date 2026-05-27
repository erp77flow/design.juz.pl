import * as React from "react";
import { cn } from "@/lib/utils";

interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "default" | "lg";
}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, size = "default", children, ...props }, ref) => {
    const sizes = {
      sm: "h-5 min-w-5 px-1 text-[10px] leading-5",
      default: "h-6 min-w-6 px-1.5 text-xs",
      lg: "h-7 min-w-7 px-2 text-sm",
    };
    return (
      <kbd
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-0.5 rounded-md border border-border bg-muted font-mono font-semibold text-muted-foreground shadow-juz-sm",
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </kbd>
    );
  }
);
Kbd.displayName = "Kbd";

export { Kbd };
export type { KbdProps };
