import * as React from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

interface AppSidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Logo shown in the expanded state (top of the sidebar). */
  logo?: React.ReactNode;
  /** Logo shown in the collapsed (icon-only) state. */
  logoCollapsed?: React.ReactNode;
  /**
   * Width of the expanded sidebar (Tailwind class). Defaults to `w-56`
   * — pass `w-64` etc. to widen.
   */
  expandedWidthClassName?: string;
  /** Width of the collapsed sidebar. Defaults to `w-16`. */
  collapsedWidthClassName?: string;
}

const AppSidebar = React.forwardRef<HTMLElement, AppSidebarProps>(
  (
    {
      logo,
      logoCollapsed,
      expandedWidthClassName = "w-56",
      collapsedWidthClassName = "w-16",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const {
      isExpanded,
      isPinned,
      isMobileOpen,
      togglePin,
      setHovered,
      setMobileOpen,
    } = useSidebar();

    return (
      <>
        {isMobileOpen ? (
          <div
            aria-hidden
            className="fixed inset-0 z-29 bg-foreground/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        ) : null}

        <aside
          ref={ref}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={cn(
            "fixed left-0 top-0 z-30 flex h-screen flex-col border-r bg-card shadow-juz-sm",
            "transition-[width,transform] duration-200 ease-in-out",
            isExpanded ? expandedWidthClassName : collapsedWidthClassName,
            isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-3 border-b px-3 py-5">
            <div className="flex min-w-0 flex-1 items-center">
              {isExpanded ? logo : logoCollapsed}
            </div>
          </div>

          <ScrollArea className="flex-1 px-2 py-3">
            <nav className="space-y-0.5">{children}</nav>
          </ScrollArea>

          <button
            type="button"
            onClick={togglePin}
            title={isPinned ? "Zwiń sidebar" : "Rozwiń sidebar"}
            className={cn(
              "flex items-center justify-center border-t py-3 text-muted-foreground transition-colors hover:text-foreground",
              "outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            )}
          >
            {isExpanded ? (
              <ChevronsLeft className="size-5" />
            ) : (
              <ChevronsRight className="size-5" />
            )}
          </button>
        </aside>
      </>
    );
  }
);
AppSidebar.displayName = "AppSidebar";

export { AppSidebar };
export type { AppSidebarProps };
