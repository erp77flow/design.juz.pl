import * as React from "react";
import { ChevronDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

interface AppSidebarGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "id"> {
  /** Stable identifier used to persist collapsed state per group. */
  id: string;
  /** Group header label (shown when sidebar is expanded). */
  label: string;
  /** Icon shown next to the label (and as the only marker when collapsed). */
  icon?: React.ReactNode;
  /** Current-page styling on the header itself. */
  isActive?: boolean;
}

const AppSidebarGroup = React.forwardRef<HTMLDivElement, AppSidebarGroupProps>(
  ({ id, label, icon, isActive, className, children, ...props }, ref) => {
    const { isExpanded, collapsedGroups, toggleGroup, setHovered } =
      useSidebar();
    // collapsedGroups stores explicit state; default open for typical app UX
    const isOpen = collapsedGroups[id] ?? true;

    // Collapsed (icon-only) mode — render the header as a tooltipped icon
    // and hide the body entirely.
    if (!isExpanded) {
      return (
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => setHovered(true)}
                className={cn(
                  "flex w-full items-center justify-center rounded-lg px-3 py-2.5 transition-colors",
                  "[&>svg]:size-5 [&>svg]:shrink-0",
                  "outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  className
                )}
              >
                {icon}
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              {label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    // Expanded — header (collapsible toggle) + body
    return (
      <div ref={ref} className={className} {...props}>
        <button
          type="button"
          onClick={() => toggleGroup(id)}
          aria-expanded={isOpen}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold uppercase tracking-wide transition-colors",
            "[&>svg:first-child]:size-5 [&>svg:first-child]:shrink-0",
            "outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            isActive
              ? "text-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {icon}
          <span className="flex-1 truncate text-left">{label}</span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 transition-transform duration-200",
              !isOpen && "-rotate-90"
            )}
          />
        </button>

        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-200",
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <div className="overflow-hidden">
            <div className="space-y-0.5 py-1">{children}</div>
          </div>
        </div>
      </div>
    );
  }
);
AppSidebarGroup.displayName = "AppSidebarGroup";

export { AppSidebarGroup };
export type { AppSidebarGroupProps };
