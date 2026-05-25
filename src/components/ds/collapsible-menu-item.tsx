import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  BasicMenuItem,
  type BasicMenuItemProps,
} from "@/components/ds/basic-menu-item";

export interface CollapsibleMenuItemEntry extends BasicMenuItemProps {
  key: string;
}

export interface CollapsibleMenuItemProps {
  icon?: React.ReactNode;
  label: React.ReactNode;
  count?: number;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  items: CollapsibleMenuItemEntry[];
  className?: string;
}

const CollapsibleMenuItem = React.forwardRef<
  HTMLDivElement,
  CollapsibleMenuItemProps
>(
  (
    {
      icon,
      label,
      count,
      defaultOpen = false,
      open,
      onOpenChange,
      items,
      className,
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isControlled = open !== undefined;
    const isOpen = isControlled ? !!open : internalOpen;

    const toggle = () => {
      const next = !isOpen;
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    };

    return (
      <div ref={ref} className={cn("w-full", className)}>
        <button
          type="button"
          aria-expanded={isOpen}
          onClick={toggle}
          className={cn(
            "group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors",
            "hover:bg-muted hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            isOpen && "text-foreground"
          )}
        >
          {icon ? (
            <span className="inline-flex size-5 items-center justify-center [&_svg]:size-4 [&_svg]:shrink-0">
              {icon}
            </span>
          ) : null}
          <span className="flex-1 truncate text-left">{label}</span>
          {typeof count === "number" ? (
            <Badge variant="neutral" className="shrink-0">
              {count}
            </Badge>
          ) : null}
          <ChevronDown
            aria-hidden
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>
        {isOpen ? (
          <div className="ml-6 mt-1 flex flex-col gap-0.5 border-l border-border pl-2">
            {items.map((item) => {
              const { key, ...rest } = item;
              return <BasicMenuItem key={key} {...rest} />;
            })}
          </div>
        ) : null}
      </div>
    );
  }
);
CollapsibleMenuItem.displayName = "CollapsibleMenuItem";

export { CollapsibleMenuItem };
