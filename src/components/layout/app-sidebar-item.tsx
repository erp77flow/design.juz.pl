import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface AppSidebarItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Compose with a custom link element (e.g. Next.js `<Link>`). */
  asChild?: boolean;
  /** Current-page styling. */
  isActive?: boolean;
  /**
   * Render as a top-level item without the nested-indent (no parent group).
   * Adds the same padding as a AppSidebarGroup header so standalone items
   * line up with grouped ones.
   */
  isStandalone?: boolean;
}

const AppSidebarItem = React.forwardRef<
  HTMLButtonElement,
  AppSidebarItemProps
>(({ className, asChild = false, isActive, isStandalone, ...props }, ref) => {
  const Comp: any = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      data-active={isActive ? "" : undefined}
      className={cn(
        "group flex w-full items-center gap-3 rounded-lg py-2 text-[13px] transition-colors",
        "[&>svg]:size-5 [&>svg]:shrink-0",
        "outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isStandalone ? "px-3 font-medium" : "px-3 pl-9 font-normal",
        isActive
          ? "bg-primary-soft font-medium text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        className
      )}
      {...props}
    />
  );
});
AppSidebarItem.displayName = "AppSidebarItem";

export { AppSidebarItem };
export type { AppSidebarItemProps };
