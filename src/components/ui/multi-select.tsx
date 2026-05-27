import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  empty?: string;
  maxBadges?: number;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
}

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = "Wybierz...",
      searchPlaceholder = "Szukaj...",
      empty = "Brak wyników.",
      maxBadges = 3,
      disabled,
      className,
      contentClassName,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    const selectedOptions = React.useMemo(
      () => options.filter((opt) => value.includes(opt.value)),
      [options, value]
    );

    const toggle = (val: string) => {
      if (value.includes(val)) {
        onValueChange(value.filter((v) => v !== val));
      } else {
        onValueChange([...value, val]);
      }
    };

    const removeOne = (val: string, event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onValueChange(value.filter((v) => v !== val));
    };

    const visibleBadges = selectedOptions.slice(0, maxBadges);
    const hiddenCount = selectedOptions.length - visibleBadges.length;

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            disabled={disabled}
            aria-label={placeholder}
            className={cn(
              "flex min-h-12 w-full items-center justify-between gap-2 rounded-md border border-input bg-card px-3 py-2 text-left text-sm font-semibold text-foreground shadow-juz-sm transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
          >
            <div className="flex flex-1 flex-wrap items-center gap-1.5">
              {selectedOptions.length === 0 ? (
                <span className="text-muted-foreground font-normal">{placeholder}</span>
              ) : (
                <>
                  {visibleBadges.map((opt) => (
                    <Badge
                      key={opt.value}
                      variant="default"
                      className="gap-1 pl-2 pr-1"
                    >
                      {opt.label}
                      <span
                        role="button"
                        tabIndex={-1}
                        onClick={(e) => removeOne(opt.value, e)}
                        className="ml-0.5 inline-flex size-4 items-center justify-center rounded-full hover:bg-primary/20"
                        aria-label={`Usuń ${opt.label}`}
                      >
                        <X className="size-3" />
                      </span>
                    </Badge>
                  ))}
                  {hiddenCount > 0 ? (
                    <Badge variant="neutral">+{hiddenCount}</Badge>
                  ) : null}
                </>
              )}
            </div>
            <ChevronDown className="size-4 shrink-0 opacity-80" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className={cn("w-(--radix-popover-trigger-width) p-0", contentClassName)}
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{empty}</CommandEmpty>
              <CommandGroup>
                {options.map((opt) => {
                  const selected = value.includes(opt.value);
                  return (
                    <CommandItem
                      key={opt.value}
                      value={opt.label}
                      disabled={opt.disabled}
                      onSelect={() => toggle(opt.value)}
                    >
                      <span
                        className={cn(
                          "mr-2 flex size-4 items-center justify-center rounded-sm border border-input",
                          selected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "bg-background"
                        )}
                      >
                        {selected ? (
                          <Check className="size-3.5" strokeWidth={3} />
                        ) : null}
                      </span>
                      {opt.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);
MultiSelect.displayName = "MultiSelect";

export { MultiSelect };
export type { MultiSelectProps, MultiSelectOption };
