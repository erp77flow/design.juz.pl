import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FilterSelectProps {
  options: FilterSelectOption[];
  value?: string;
  onValueChange?: (value: string | undefined) => void;
  placeholder?: string;
  label?: string;
  clearable?: boolean;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
}

const FilterSelect = React.forwardRef<HTMLButtonElement, FilterSelectProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = "Wybierz...",
      label,
      clearable = true,
      disabled,
      className,
      contentClassName,
    },
    ref
  ) => {
    const selected = options.find((opt) => opt.value === value);

    return (
      <Select
        value={value ?? ""}
        onValueChange={(v) => onValueChange?.(v || undefined)}
        disabled={disabled}
      >
        <SelectTrigger
          ref={ref}
          className={cn("h-10 gap-2", className)}
          aria-label={label ?? placeholder}
        >
          <div className="flex flex-1 items-center gap-2">
            {label ? (
              <span className="text-sm font-semibold text-muted-foreground">
                {label}:
              </span>
            ) : null}
            {selected ? (
              <Badge variant="default" className="gap-1 pl-2 pr-1">
                {selected.label}
                {clearable ? (
                  <span
                    role="button"
                    tabIndex={-1}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onValueChange?.(undefined);
                    }}
                    className="ml-0.5 inline-flex size-4 items-center justify-center rounded-full hover:bg-primary/20"
                    aria-label="Wyczyść filtr"
                  >
                    <X className="size-3" />
                  </span>
                ) : null}
              </Badge>
            ) : (
              <SelectValue placeholder={placeholder} />
            )}
          </div>
        </SelectTrigger>
        <SelectContent className={contentClassName}>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);
FilterSelect.displayName = "FilterSelect";

export { FilterSelect };
export type { FilterSelectProps, FilterSelectOption };
