import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function SegmentedTabs({
  items,
  value,
  defaultValue,
  onValueChange,
  stretch = false,
  className
}: {
  items: string[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  stretch?: boolean;
  className?: string;
}) {
  return (
    <Tabs
      className={className}
      defaultValue={value === undefined ? defaultValue ?? items[0] : undefined}
      onValueChange={onValueChange}
      value={value}
    >
      <TabsList
        className={cn("h-auto rounded-md bg-muted p-1", stretch ? "grid w-full" : "inline-flex")}
        style={stretch ? { gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` } : undefined}
      >
        {items.map((item) => (
          <TabsTrigger
            className="rounded-sm px-4 py-2 font-bold text-muted-foreground data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-juz-sm"
            key={item}
            value={item}
          >
            {item}
          </TabsTrigger>
        ))}
      </TabsList>
      {/* See RecordTabs for rationale — placeholder panels for aria-controls. */}
      {items.map((item) => (
        <TabsContent
          key={item}
          value={item}
          forceMount
          aria-hidden="true"
          className="hidden mt-0"
        />
      ))}
    </Tabs>
  );
}
