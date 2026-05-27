import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export interface FilterOption {
  value: string;
  label: string;
}

export interface AdvancedFiltersValue {
  dateFrom?: Date | null;
  dateTo?: Date | null;
  statuses?: string[];
  tags?: string[];
  [key: string]: unknown;
}

export interface AdvancedFiltersPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: AdvancedFiltersValue;
  onFiltersChange?: (filters: AdvancedFiltersValue) => void;
  onApply?: (filters: AdvancedFiltersValue) => void;
  onReset?: () => void;
  statusOptions?: FilterOption[];
  tagOptions?: FilterOption[];
  title?: string;
  description?: string;
  dateRangeSlot?: React.ReactNode;
  tagsSlot?: React.ReactNode;
  extraSlot?: React.ReactNode;
  className?: string;
}

function AdvancedFiltersPanel({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  onApply,
  onReset,
  statusOptions = [],
  tagOptions = [],
  title = "Filtry zaawansowane",
  description = "Zawęź wyniki używając kryteriów poniżej.",
  dateRangeSlot,
  tagsSlot,
  extraSlot,
  className,
}: AdvancedFiltersPanelProps) {
  const setField = React.useCallback(
    (patch: Partial<AdvancedFiltersValue>) => {
      onFiltersChange?.({ ...filters, ...patch });
    },
    [filters, onFiltersChange]
  );

  const toggleStatus = (value: string, checked: boolean) => {
    const current = filters.statuses ?? [];
    setField({
      statuses: checked ? [...current, value] : current.filter((v) => v !== value),
    });
  };

  const toggleTag = (value: string, checked: boolean) => {
    const current = filters.tags ?? [];
    setField({
      tags: checked ? [...current, value] : current.filter((v) => v !== value),
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className={cn("flex w-full max-w-md flex-col gap-0 p-0", className)}
      >
        <SheetHeader className="border-b p-6">
          <SheetTitle>{title}</SheetTitle>
          {description ? <SheetDescription>{description}</SheetDescription> : null}
        </SheetHeader>

        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          {dateRangeSlot ? (
            <section className="space-y-3">
              <Label>Zakres dat</Label>
              {dateRangeSlot}
            </section>
          ) : null}

          {statusOptions.length > 0 ? (
            <section className="space-y-3">
              <Label>Statusy</Label>
              <div className="space-y-2">
                {statusOptions.map((option) => {
                  const checked = (filters.statuses ?? []).includes(option.value);
                  return (
                    <div key={option.value} className="flex items-center gap-2">
                      <Checkbox
                        id={`filter-status-${option.value}`}
                        checked={checked}
                        onCheckedChange={(value) =>
                          toggleStatus(option.value, value === true)
                        }
                      />
                      <Label
                        htmlFor={`filter-status-${option.value}`}
                        className="cursor-pointer text-sm font-medium text-foreground"
                      >
                        {option.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}

          {tagsSlot ? (
            <section className="space-y-3">
              <Label>Tagi</Label>
              {tagsSlot}
            </section>
          ) : tagOptions.length > 0 ? (
            <section className="space-y-3">
              <Label>Tagi</Label>
              <div className="space-y-2">
                {tagOptions.map((option) => {
                  const checked = (filters.tags ?? []).includes(option.value);
                  return (
                    <div key={option.value} className="flex items-center gap-2">
                      <Checkbox
                        id={`filter-tag-${option.value}`}
                        checked={checked}
                        onCheckedChange={(value) =>
                          toggleTag(option.value, value === true)
                        }
                      />
                      <Label
                        htmlFor={`filter-tag-${option.value}`}
                        className="cursor-pointer text-sm font-medium text-foreground"
                      >
                        {option.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}

          {extraSlot ? (
            <>
              <Separator />
              <section className="space-y-3">{extraSlot}</section>
            </>
          ) : null}
        </div>

        <SheetFooter className="border-t bg-muted/30 p-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              onReset?.();
            }}
          >
            Wyczyść
          </Button>
          <Button
            type="button"
            onClick={() => {
              onApply?.(filters);
              onOpenChange(false);
            }}
          >
            Zastosuj filtry
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { AdvancedFiltersPanel };
