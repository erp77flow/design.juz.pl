import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  trigger: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Collapsible({
  trigger,
  children,
  defaultOpen = false,
  open,
  disabled = false,
  onOpenChange,
  className,
  ...props
}: CollapsibleProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const toggle = () => {
    if (disabled) return;
    const nextOpen = !isOpen;
    if (!isControlled) setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  return (
    <div className={cn("rounded-md border bg-card shadow-juz-sm", className)} {...props}>
      <button
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left font-semibold transition-colors hover:bg-primary-soft/45 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={disabled}
        onClick={toggle}
        type="button"
      >
        <span>{trigger}</span>
        <ChevronDown className={cn("size-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen ? <div className="border-t px-4 py-3 text-muted-foreground">{children}</div> : null}
    </div>
  );
}
