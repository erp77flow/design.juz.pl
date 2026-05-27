import * as React from "react";
import {
  ArrowDown,
  ArrowUp,
  Bookmark,
  Columns3,
  Filter,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type DataTableColumnMeta = {
  key: string;
  label: string;
  align?: "right";
};

export function DataTableToolbar({
  query,
  filtersOpen,
  columnsOpen,
  visibleCount,
  searchPlaceholder,
  onQueryChange,
  onFiltersToggle,
  onColumnsToggle
}: {
  query: string;
  filtersOpen: boolean;
  columnsOpen: boolean;
  visibleCount: number;
  searchPlaceholder: string;
  onQueryChange: (value: string) => void;
  onFiltersToggle: () => void;
  onColumnsToggle: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 border-b p-4 xl:flex-row xl:items-center">
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="h-11 pl-10"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={searchPlaceholder}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <Button className="h-11 px-4" variant={filtersOpen ? "default" : "outline"} onClick={onFiltersToggle}>
          <Filter />
          {filtersOpen ? "Ukryj filtry" : "Pokaż filtry"}
          {filtersOpen ? <span className="rounded-full bg-primary-soft px-1.5 text-xs text-primary">1</span> : null}
        </Button>
        <Button className="h-11 px-4" variant={columnsOpen ? "default" : "outline"} onClick={onColumnsToggle}>
          <Columns3 />
          {columnsOpen ? "Ukryj kolumny" : "Pokaż kolumny"}
          <span className="rounded-full bg-primary-soft px-1.5 text-xs text-primary">{visibleCount}</span>
        </Button>
      </div>
    </div>
  );
}

export function DataTableAdvancedFilters() {
  const [values, setValues] = React.useState({
    client: "",
    product: "",
    line: "",
    deadline: "",
    status: "Wszystkie",
    warehouse: "",
    source: "",
    contractor: ""
  });
  const [applied, setApplied] = React.useState(0);

  function updateValue(key: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function clearValues() {
    setValues({
      client: "",
      product: "",
      line: "",
      deadline: "",
      status: "Wszystkie",
      warehouse: "",
      source: "",
      contractor: ""
    });
    setApplied(0);
  }

  function applyValues() {
    setApplied(Object.values(values).filter((value) => value && value !== "Wszystkie").length);
  }

  return (
    <div className="border-b bg-muted/30 p-4">
      <div className="mb-4 flex items-center gap-2 text-lg font-bold">
        <SlidersHorizontal className="size-5 text-primary" />
        Filtry zaawansowane
        {applied ? <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs font-extrabold text-primary">{applied}</span> : null}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DataTableField label="Klient"><Input placeholder="np. Firma testowa" value={values.client} onChange={(event) => updateValue("client", event.target.value)} /></DataTableField>
        <DataTableField label="Produkt"><Input placeholder="np. Classic 0.7" value={values.product} onChange={(event) => updateValue("product", event.target.value)} /></DataTableField>
        <DataTableField label="Linia"><Input placeholder="Linia A, pakowanie..." value={values.line} onChange={(event) => updateValue("line", event.target.value)} /></DataTableField>
        <DataTableField label="Termin"><Input placeholder="Od - do" value={values.deadline} onChange={(event) => updateValue("deadline", event.target.value)} /></DataTableField>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="ghost" onClick={clearValues}>Wyczyść</Button>
        <Button variant="outline" onClick={clearValues}>Anuluj</Button>
        <Button onClick={applyValues}>Filtruj</Button>
      </div>
    </div>
  );
}

export function DataTableField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-muted-foreground">
      {label}
      {children}
    </label>
  );
}

export function SortableColumnHeader({
  label,
  active,
  direction,
  filtered,
  align,
  onAsc,
  onDesc,
  onFilter
}: {
  label: string;
  active: boolean;
  direction: "asc" | "desc";
  filtered: boolean;
  align?: "right";
  onAsc: () => void;
  onDesc: () => void;
  onFilter: () => void;
}) {
  return (
    <div className={cn("flex items-center gap-2", align === "right" && "justify-end")}>
      <span>{label}</span>
      <div className="inline-flex h-8 overflow-hidden rounded-full border bg-background shadow-juz-sm">
        <button
          className={cn("grid w-8 place-items-center text-muted-foreground hover:text-primary", active && direction === "asc" && "bg-primary text-primary-foreground")}
          type="button"
          onClick={onAsc}
          aria-label={`${label}: sortuj rosnaco`}
        >
          <ArrowUp className="size-4" />
        </button>
        <button
          className={cn("grid w-8 place-items-center border-l text-muted-foreground hover:text-primary", active && direction === "desc" && "bg-primary text-primary-foreground")}
          type="button"
          onClick={onDesc}
          aria-label={`${label}: sortuj malejaco`}
        >
          <ArrowDown className="size-4" />
        </button>
        <button
          className={cn("grid w-8 place-items-center border-l text-muted-foreground hover:text-primary", filtered && "bg-primary-soft text-primary")}
          type="button"
          onClick={onFilter}
          aria-label={`${label}: filtr kolumny`}
        >
          <Filter className="size-4" />
        </button>
      </div>
    </div>
  );
}

export function ColumnFilterPanel({
  label,
  value = "",
  type = "text",
  options = [],
  onValueChange,
  onApply,
  onClear,
  onClose
}: {
  label: string;
  value?: string;
  type?: "text" | "select";
  options?: string[];
  onValueChange?: (value: string) => void;
  onApply?: () => void;
  onClear?: () => void;
  onClose: () => void;
}) {
  return (
    <div className="border-b bg-background p-4">
      <Card className="w-full overflow-hidden shadow-juz-sm">
        <div className="flex items-start justify-between border-b p-4">
          <div>
            <p className="juz-label">Filtrowanie na kolumnie</p>
            <h3 className="text-xl font-extrabold">{label}</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Zamknij filtr kolumny">
            <X />
          </Button>
        </div>
        <div className="grid gap-3 p-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
          <DataTableField label="Zawiera">
            {type === "select" ? (
              <select
                className="h-11 w-full rounded-md border bg-card px-3 text-sm shadow-juz-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                value={value}
                onChange={(event) => onValueChange?.(event.target.value)}
              >
                <option value="">Wszystkie</option>
                {options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <Input
                placeholder={`Filtruj: ${label.toLowerCase()}`}
                value={value}
                onChange={(event) => onValueChange?.(event.target.value)}
              />
            )}
          </DataTableField>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClear}>Wyczyść</Button>
            <Button onClick={onApply}>Zastosuj</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function ColumnManagerPanel({
  columns,
  visible,
  onVisibleChange,
  onReset
}: {
  columns: DataTableColumnMeta[];
  visible: Record<string, boolean>;
  onVisibleChange: (key: string, value: boolean) => void;
  onReset?: () => void;
}) {
  const [saved, setSaved] = React.useState(false);

  return (
    <aside className="border-l bg-card">
      <div className="border-b p-4">
        <h3 className="text-lg font-extrabold">Zarządzaj kolumnami</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Widoczne: <strong className="text-foreground">{Object.values(visible).filter(Boolean).length}</strong>
        </p>
      </div>
      <div className="space-y-3 p-4">
        {columns.map((column) => (
          <label key={column.key} className="flex items-center justify-between gap-3 rounded-lg border bg-background px-3 py-2">
            <span className="flex items-center gap-2 font-semibold">
              <Columns3 className="size-4 text-muted-foreground" />
              {column.label}
            </span>
            <input
              className="h-5 w-5 accent-[hsl(var(--primary))]"
              checked={visible[column.key]}
              type="checkbox"
              onChange={(event) => onVisibleChange(column.key, event.target.checked)}
            />
          </label>
        ))}
      </div>
      <div className="space-y-2 border-t p-4">
        <Button className="w-full" onClick={() => setSaved(true)}>
          <Bookmark />
          {saved ? "Widok zapisany" : "Zapisz jako widok"}
        </Button>
        <Button
          className="w-full"
          variant="outline"
          onClick={() => {
            onReset?.();
            setSaved(false);
          }}
        >
          <RotateCcw />
          Resetuj do domyslnych
        </Button>
      </div>
    </aside>
  );
}
