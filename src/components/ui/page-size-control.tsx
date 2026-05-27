import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PageSizeControlProps {
  value: number;
  onValueChange: (value: number) => void;
  options?: number[];
  label?: string;
  itemSuffix?: string;
  className?: string;
  disabled?: boolean;
}

const DEFAULT_OPTIONS = [10, 25, 50, 100];

const PageSizeControl = React.forwardRef<HTMLDivElement, PageSizeControlProps>(
  (
    {
      value,
      onValueChange,
      options = DEFAULT_OPTIONS,
      label = "Wierszy na stronę",
      itemSuffix = "/ strona",
      className,
      disabled,
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn("inline-flex items-center gap-2", className)}
    >
      {label ? (
        <span className="text-sm font-semibold text-muted-foreground">
          {label}:
        </span>
      ) : null}
      <Select
        value={String(value)}
        onValueChange={(v) => onValueChange(Number(v))}
        disabled={disabled}
      >
        <SelectTrigger className="h-9 w-auto min-w-28 gap-2" aria-label={label}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {option} {itemSuffix}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
);
PageSizeControl.displayName = "PageSizeControl";

export { PageSizeControl };
export type { PageSizeControlProps };
