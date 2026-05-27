import * as React from "react";
import { ChevronLeft, ChevronRight, Copy, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ColumnFilterPanel,
  ColumnManagerPanel,
  DataTableAdvancedFilters,
  DataTableToolbar,
  SortableColumnHeader
} from "@/components/ds/data-table-molecules";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

type StatusTone = "success" | "warning" | "destructive" | "neutral";

type DemoRow = {
  id: string;
  order: string;
  product: string;
  client: string;
  line: string;
  progress: number;
  owner: string;
  status: string;
  tone: StatusTone;
  deadline: string;
};

type BaseRow = Record<string, React.ReactNode> & { id: string; tone?: StatusTone; search?: string };

export type DataTableColumn<Row extends BaseRow = BaseRow> = {
  key: Extract<keyof Row, string>;
  label: string;
  align?: "right";
  render?: (row: Row) => React.ReactNode;
};

type ColumnKey = keyof Pick<DemoRow, "order" | "product" | "client" | "line" | "progress" | "owner" | "status" | "deadline">;

const columns: Array<{ key: ColumnKey; label: string; align?: "right" }> = [
  { key: "order", label: "Zlecenie" },
  { key: "product", label: "Produkt" },
  { key: "client", label: "Klient" },
  { key: "line", label: "Linia" },
  { key: "progress", label: "Postep", align: "right" },
  { key: "owner", label: "Opiekun" },
  { key: "status", label: "Status" },
  { key: "deadline", label: "Termin" }
];

const rows: DemoRow[] = [
  {
    id: "1",
    order: "ZP/00042/05/26",
    product: "Długopis Classic 0.7",
    client: "Firma testowa",
    line: "Linia A",
    progress: 68,
    owner: "Opiekun 1",
    status: "Aktywny",
    tone: "success",
    deadline: "28.05.2026"
  },
  {
    id: "2",
    order: "ZP/00043/05/26",
    product: "Flamaster Neon Mix",
    client: "PisakLab",
    line: "Linia B",
    progress: 34,
    owner: "Tomasz Nowak",
    status: "Zaplanowany",
    tone: "neutral",
    deadline: "29.05.2026"
  },
  {
    id: "3",
    order: "ZP/00044/05/26",
    product: "Mazak Pro B2B",
    client: "NordOffice",
    line: "Linia C",
    progress: 12,
    owner: "Anna Zielinska",
    status: "Wstrzymany",
    tone: "warning",
    deadline: "30.05.2026"
  },
  {
    id: "4",
    order: "ZP/00045/05/26",
    product: "Pisaki szkolne Q2",
    client: "InkFactory",
    line: "Linia A",
    progress: 9,
    owner: "Kamil Wrobel",
    status: "Wymaga uwagi",
    tone: "destructive",
    deadline: "30.05.2026"
  },
  {
    id: "5",
    order: "ZP/00046/05/26",
    product: "Eco Pen Series",
    client: "GreenWrite",
    line: "Linia D",
    progress: 82,
    owner: "Opiekun 1",
    status: "Aktywny",
    tone: "success",
    deadline: "31.05.2026"
  },
  {
    id: "6",
    order: "ZP/00047/05/26",
    product: "Zestaw markerów B2B",
    client: "OfficeMax",
    line: "Linia B",
    progress: 55,
    owner: "Tomasz Nowak",
    status: "Aktywny",
    tone: "success",
    deadline: "02.06.2026"
  },
  {
    id: "7",
    order: "ZP/00048/05/26",
    product: "Back to school pack",
    client: "PisakLab",
    line: "Linia C",
    progress: 24,
    owner: "Anna Zielinska",
    status: "Zaplanowany",
    tone: "neutral",
    deadline: "03.06.2026"
  },
  {
    id: "8",
    order: "ZP/00049/05/26",
    product: "Seria InkFactory Premium",
    client: "InkFactory",
    line: "Linia D",
    progress: 72,
    owner: "Kamil Wrobel",
    status: "Aktywny",
    tone: "success",
    deadline: "04.06.2026"
  },
  {
    id: "9",
    order: "ZP/00050/05/26",
    product: "Zamówienie hurtowe 5000",
    client: "NordOffice",
    line: "Linia A",
    progress: 18,
    owner: "Opiekun 1",
    status: "Wstrzymany",
    tone: "warning",
    deadline: "05.06.2026"
  },
  {
    id: "10",
    order: "ZP/00051/05/26",
    product: "Limitowana seria violet",
    client: "Firma testowa",
    line: "Linia B",
    progress: 91,
    owner: "Tomasz Nowak",
    status: "Aktywny",
    tone: "success",
    deadline: "06.06.2026"
  },
  {
    id: "11",
    order: "ZP/00052/05/26",
    product: "Pakiet sprzedazowy 12 szt.",
    client: "WriteFlow",
    line: "Linia C",
    progress: 7,
    owner: "Anna Zielinska",
    status: "Wymaga uwagi",
    tone: "destructive",
    deadline: "06.06.2026"
  },
  {
    id: "12",
    order: "ZP/00053/05/26",
    product: "Ekspozycja sklepowa",
    client: "RetailPoint",
    line: "Linia D",
    progress: 63,
    owner: "Kamil Wrobel",
    status: "Aktywny",
    tone: "success",
    deadline: "07.06.2026"
  }
];

const initialVisible = columns.reduce<Record<ColumnKey, boolean>>((acc, column) => {
  acc[column.key] = true;
  return acc;
}, {} as Record<ColumnKey, boolean>);

export function DataTablePattern<Row extends BaseRow = DemoRow>({
  density = "default",
  title,
  description,
  actionLabel,
  searchPlaceholder,
  rows: providedRows,
  columns: providedColumns,
  defaultSort
}: {
  density?: "default" | "record";
  title?: string;
  description?: string;
  actionLabel?: string;
  searchPlaceholder?: string;
  rows?: Row[];
  columns?: DataTableColumn<Row>[];
  defaultSort?: Extract<keyof Row, string>;
}) {
  const tableRows = (providedRows ?? rows) as Row[];
  const tableColumns = (providedColumns ?? columns) as DataTableColumn<Row>[];
  type ActiveKey = Extract<keyof Row, string>;
  const defaultVisible = React.useMemo(() => {
    return tableColumns.reduce<Record<ActiveKey, boolean>>((acc, column) => {
      acc[column.key as ActiveKey] = true;
      return acc;
    }, {} as Record<ActiveKey, boolean>);
  }, [tableColumns]);
  const [query, setQuery] = React.useState("");
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [columnsOpen, setColumnsOpen] = React.useState(false);
  const [columnFilter, setColumnFilter] = React.useState<ActiveKey | null>(null);
  const [columnFilterDraft, setColumnFilterDraft] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<Partial<Record<ActiveKey, string>>>({});
  const [visible, setVisible] = React.useState<Record<ActiveKey, boolean>>(defaultVisible);
  const [sortKey, setSortKey] = React.useState<ActiveKey>((defaultSort ?? tableColumns[0]?.key ?? "id") as ActiveKey);
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("desc");
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  React.useEffect(() => {
    setVisible(defaultVisible);
    setSortKey((defaultSort ?? tableColumns[0]?.key ?? "id") as ActiveKey);
  }, [defaultSort, defaultVisible, tableColumns]);

  const filteredRows = React.useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return tableRows
      .filter((row) => {
        if (!normalized) return true;
        return Object.values(row).some((value) =>
          String(value).toLowerCase().includes(normalized)
        );
      })
      .filter((row) => {
        return Object.entries(columnFilters).every(([key, value]) => {
          const normalizedValue = (value ?? "").trim().toLowerCase();
          if (!normalizedValue) return true;
          return String(row[key as ActiveKey]).toLowerCase().includes(normalizedValue);
        });
      })
      .sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (typeof av === "number" && typeof bv === "number") {
          return sortDir === "asc" ? av - bv : bv - av;
        }
        return sortDir === "asc"
          ? String(av).localeCompare(String(bv), "pl")
          : String(bv).localeCompare(String(av), "pl");
      });
  }, [columnFilters, query, sortDir, sortKey, tableRows]);

  const pageCount = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleRows = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [currentPage, filteredRows, pageSize]);
  const firstResult = filteredRows.length ? (currentPage - 1) * pageSize + 1 : 0;
  const lastResult = Math.min(currentPage * pageSize, filteredRows.length);

  React.useEffect(() => {
    setPage(1);
  }, [pageSize, query]);

  function sortBy(key: ActiveKey, direction: "asc" | "desc") {
    setSortKey(key);
    setSortDir(direction);
  }

  function openColumnFilter(key: ActiveKey) {
    setColumnFilter((current) => {
      if (current === key) return null;
      setColumnFilterDraft(columnFilters[key] ?? "");
      return key;
    });
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className={cn("font-extrabold", density === "record" ? "text-2xl" : "text-3xl")}>
            {title ?? (density === "record" ? "Zlecenia w rekordzie" : "Lista złeceń")}
          </h2>
          <p className="text-muted-foreground">
            {description ?? "Wspólny wzorzec listy: wyszukiwanie, filtry, kolumny, sortowanie, paginacja i akcje."}
          </p>
        </div>
        <Button className="h-11 px-5">{actionLabel ?? "Nowe złeceńie"}</Button>
      </div>

      <div className="rounded-xl border bg-card shadow-juz-sm">
        <DataTableToolbar
          columnsOpen={columnsOpen}
          filtersOpen={filtersOpen}
          onColumnsToggle={() => setColumnsOpen((value) => !value)}
          onFiltersToggle={() => setFiltersOpen((value) => !value)}
          onQueryChange={setQuery}
          query={query}
          searchPlaceholder={searchPlaceholder ?? "Szukaj po złeceńiu, produkcie, kliencie... (Enter aby dodac filtr)"}
          visibleCount={Object.values(visible).filter(Boolean).length}
        />

        {filtersOpen ? <DataTableAdvancedFilters /> : null}
        {columnFilter ? (
          <ColumnFilterPanel
            label={tableColumns.find((column) => column.key === columnFilter)?.label ?? columnFilter}
            value={columnFilterDraft}
            onValueChange={setColumnFilterDraft}
            onApply={() => {
              setColumnFilters((current) => ({ ...current, [columnFilter]: columnFilterDraft }));
              setPage(1);
              setColumnFilter(null);
            }}
            onClear={() => {
              setColumnFilters((current) => {
                const next = { ...current };
                delete next[columnFilter];
                return next;
              });
              setColumnFilterDraft("");
              setPage(1);
            }}
            onClose={() => setColumnFilter(null)}
          />
        ) : null}

        <div className={cn("grid", columnsOpen && "2xl:grid-cols-[minmax(0,1fr)_360px]")}>
          <div className="min-w-0">
            <Table className="border-0 shadow-none">
              <TableHeader>
                <TableRow>
                  {tableColumns.map((column) =>
                    visible[column.key] ? (
                      <TableHead key={column.key} className={cn(column.align === "right" && "text-right")}>
                        <SortableColumnHeader
                          label={column.label}
                          active={sortKey === column.key}
                          direction={sortDir}
                          align={column.align}
                          filtered={Boolean(columnFilters[column.key])}
                          onAsc={() => sortBy(column.key, "asc")}
                          onDesc={() => sortBy(column.key, "desc")}
                          onFilter={() => openColumnFilter(column.key)}
                        />
                      </TableHead>
                    ) : null
                  )}
                  <TableHead className="text-right">Akcje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleRows.map((row) => (
                  <TableRow key={row.id}>
                    {tableColumns.map((column) =>
                      visible[column.key] ? (
                        <TableCell className={cn(column.align === "right" && "text-right")} key={column.key}>
                          {column.render ? column.render(row) : row[column.key]}
                        </TableCell>
                      ) : null
                    )}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" aria-label="Podgląd">
                          <Eye />
                        </Button>
                        <Button variant="ghost" size="icon" aria-label="Kopiuj">
                          <Copy />
                        </Button>
                        <Button variant="ghost" size="icon" aria-label="Więcej">
                          <MoreHorizontal />
                        </Button>
                        <Button variant="ghost" size="icon" aria-label="Usuń" className="text-destructive hover:bg-destructive-soft">
                          <Trash2 />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex flex-col gap-3 border-t px-4 py-3 md:flex-row md:items-center md:justify-between">
              <p className="text-sm font-semibold text-muted-foreground">
                Pokazano <span className="text-foreground">{firstResult}-{lastResult}</span> z{" "}
                <span className="text-foreground">{filteredRows.length}</span> wyników
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  Wyników na stronie
                  <select
                    className="h-10 rounded-md border bg-card px-3 font-bold text-foreground shadow-juz-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                    onChange={(event) => setPageSize(Number(event.target.value))}
                    value={pageSize}
                  >
                    {[10, 20, 40, 60].map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </label>
                <div className="flex items-center gap-1">
                  <Button
                    aria-label="Poprzednia strona"
                    disabled={currentPage <= 1}
                    onClick={() => setPage((value) => Math.max(1, value - 1))}
                    size="icon"
                    variant="outline"
                  >
                    <ChevronLeft />
                  </Button>
                  {Array.from({ length: pageCount }, (_, index) => index + 1).map((item) => (
                    <Button
                      aria-label={`Strona ${item}`}
                      key={item}
                      onClick={() => setPage(item)}
                      size="icon"
                      variant={currentPage === item ? "default" : "outline"}
                    >
                      {item}
                    </Button>
                  ))}
                  <Button
                    aria-label="Następna strona"
                    disabled={currentPage >= pageCount}
                    onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
                    size="icon"
                    variant="outline"
                  >
                    <ChevronRight />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {columnsOpen ? (
            <ColumnManagerPanel
              columns={tableColumns}
              visible={visible}
              onVisibleChange={(key, value) => setVisible((current) => ({ ...current, [key]: value }))}
              onReset={() => setVisible(defaultVisible)}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
