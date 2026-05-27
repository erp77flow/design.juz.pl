import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

/**
 * Radix Tabs uses the `value` prop verbatim as a fragment of the
 * `aria-controls` / element-id attribute on every Tab/Content pair. That
 * breaks when consumers pass natural-language labels (e.g. "Dane podstawowe",
 * "Rozliczenie i faktura"), because spaces are not allowed in HTML id tokens
 * and axe-core flags `aria-valid-attr-value`. To keep the ergonomic API of
 * passing human strings as `value`, we slugify the value at the boundary
 * with Radix so the DOM ids are safe while the public `onValueChange`
 * payload, `value`/`defaultValue` props, and consumer state still use the
 * original string.
 */
function slugifyTabValue(value: string): string {
  if (!value) return value;
  // Normalize accented chars, drop diacritics, keep alnum + dash/underscore.
  const normalized = value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized.toLowerCase() || "tab";
}

type TabsSlugContextValue = {
  toSlug: (value: string) => string;
  fromSlug: (slug: string) => string;
};

const TabsSlugContext = React.createContext<TabsSlugContextValue | null>(null);

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ value, defaultValue, onValueChange, children, ...props }, ref) => {
  // Map slug <-> original. Children declared at render time register their
  // value -> slug pair via TabsTrigger/TabsContent calling `toSlug`.
  const mapRef = React.useRef<{ toSlug: Map<string, string>; fromSlug: Map<string, string> }>({
    toSlug: new Map(),
    fromSlug: new Map(),
  });

  const ensure = React.useCallback((original: string) => {
    if (!original) return original;
    const map = mapRef.current;
    if (map.toSlug.has(original)) return map.toSlug.get(original)!;
    let candidate = slugifyTabValue(original);
    let suffix = 1;
    // Disambiguate collisions deterministically.
    while (map.fromSlug.has(candidate) && map.fromSlug.get(candidate) !== original) {
      candidate = `${slugifyTabValue(original)}-${suffix++}`;
    }
    map.toSlug.set(original, candidate);
    map.fromSlug.set(candidate, original);
    return candidate;
  }, []);

  const context = React.useMemo<TabsSlugContextValue>(
    () => ({
      toSlug: (v: string) => ensure(v),
      fromSlug: (s: string) => mapRef.current.fromSlug.get(s) ?? s,
    }),
    [ensure]
  );

  const slugValue = value !== undefined ? context.toSlug(value) : undefined;
  const slugDefaultValue = defaultValue !== undefined ? context.toSlug(defaultValue) : undefined;

  const handleValueChange = React.useCallback(
    (slug: string) => {
      onValueChange?.(context.fromSlug(slug));
    },
    [context, onValueChange]
  );

  return (
    <TabsSlugContext.Provider value={context}>
      <TabsPrimitive.Root
        ref={ref}
        defaultValue={slugDefaultValue}
        onValueChange={onValueChange ? handleValueChange : undefined}
        value={slugValue}
        {...props}
      >
        {children}
      </TabsPrimitive.Root>
    </TabsSlugContext.Provider>
  );
});
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    className={cn("inline-flex min-h-11 items-center gap-1 rounded-lg bg-muted p-1 text-muted-foreground", className)}
    ref={ref}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, value, ...props }, ref) => {
  const ctx = React.useContext(TabsSlugContext);
  const slug = ctx && typeof value === "string" ? ctx.toSlug(value) : value;
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex min-h-9 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-extrabold transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-juz-sm",
        className
      )}
      ref={ref}
      value={slug as string}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, value, ...props }, ref) => {
  const ctx = React.useContext(TabsSlugContext);
  const slug = ctx && typeof value === "string" ? ctx.toSlug(value) : value;
  return (
    <TabsPrimitive.Content
      className={cn("mt-4 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring", className)}
      ref={ref}
      value={slug as string}
      {...props}
    />
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
