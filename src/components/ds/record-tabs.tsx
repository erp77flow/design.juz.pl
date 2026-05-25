import * as React from "react";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export type RecordTabItem =
  | string
  | {
      value: string;
      label?: string;
      badge?: string;
      badgeVariant?: BadgeProps["variant"];
    };

export function normalizeRecordTabs(items: RecordTabItem[]) {
  return items.map((item) => (typeof item === "string" ? { value: item, label: item } : { label: item.value, ...item }));
}

export function RecordTabs({
  items,
  value,
  defaultValue,
  onValueChange,
  sticky = false,
  className,
  listClassName
}: {
  items: RecordTabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  sticky?: boolean;
  className?: string;
  listClassName?: string;
}) {
  const tabs = normalizeRecordTabs(items);
  const initialValue = defaultValue ?? tabs[0]?.value;

  return (
    <Tabs
      className={cn(
        "overflow-x-auto border-b bg-background/95",
        sticky && "sticky top-0 z-30 shadow-juz-sm backdrop-blur",
        className
      )}
      defaultValue={value === undefined ? initialValue : undefined}
      onValueChange={onValueChange}
      value={value}
    >
      <TabsList className={cn("flex h-auto min-w-max gap-1 rounded-none bg-transparent p-0", listClassName)}>
        {tabs.map((tab) => (
          <TabsTrigger
            className="relative h-auto gap-1 rounded-none border-b-2 border-transparent bg-transparent px-4 py-3 text-sm font-bold text-muted-foreground shadow-none transition hover:text-primary data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
            key={tab.value}
            value={tab.value}
          >
            {tab.label}
            {tab.badge ? (
              <Badge className="ml-1 px-1.5 py-0.5 text-[10px]" variant={tab.badgeVariant ?? "destructive"}>
                {tab.badge}
              </Badge>
            ) : null}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
