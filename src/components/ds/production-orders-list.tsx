import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Columns3,
  Eye,
  Filter,
  GripVertical,
  MoreHorizontal,
  PanelRightOpen,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ColumnFilterPanel, SortableColumnHeader } from "@/components/ds/data-table-molecules";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

type OrderStatus = "Nowe" | "Oczekuje na akceptację" | "Na produkcji" | "Wymaga poprawy" | "Anulowane";
type JobStatus = "Nowe" | "Przyjęcie danych" | "W trakcie" | "Pakowane" | "—";

type ProductionOrder = {
  date: string;
  number: string;
  status: OrderStatus;
  product: string[];
  series: string;
  owner: string;
  deadline: string;
  jobStatus: JobStatus;
  jobNumber: string;
  invoice: string;
  progress: number;
};

type AdvancedFilterState = {
  dateFrom: string;
  dateTo: string;
  number: string;
  status: string;
  product: string;
  owner: string;
  series: string;
  deadlineFrom: string;
  deadlineTo: string;
  jobStatus: string;
  jobNumber: string;
  invoice: string;
};

const orders: ProductionOrder[] = [
  {
    date: "15.05.2026",
    number: "ZS/00024/05/26",
    status: "Anulowane",
    product: ["Długopis automatyczny"],
    series: "Seria Office Basic",
    owner: "Kontakt 1",
    deadline: "12.06.2026",
    jobStatus: "—",
    jobNumber: "—",
    invoice: "—",
    progress: 0
  },
  {
    date: "05.05.2026",
    number: "ZS/00023/05/26",
    status: "Anulowane",
    product: ["Marker suchościeralny"],
    series: "Seria Whiteboard",
    owner: "Kontakt 1",
    deadline: "22.05.2026",
    jobStatus: "Nowe",
    jobNumber: "ZP/00016/05/26",
    invoice: "—",
    progress: 10
  },
  {
    date: "17.05.2026",
    number: "ZS/00016/05/26",
    status: "Nowe",
    product: ["Długopis żelowy"],
    series: "Seria Retail Blue",
    owner: "Agnieszka Wierzbicka",
    deadline: "—",
    jobStatus: "—",
    jobNumber: "—",
    invoice: "—",
    progress: 5
  },
  {
    date: "15.05.2026",
    number: "ZS/00015/05/26",
    status: "Oczekuje na akceptację",
    product: ["Długopis Classic 0.7", "Wkład niebieski", "Opakowanie 50 szt."],
    series: "Seria Classic Blue",
    owner: "Kontakt 2",
    deadline: "26.05.2026",
    jobStatus: "Przyjęcie danych",
    jobNumber: "ZP/00015/05/26",
    invoice: "—",
    progress: 24
  },
  {
    date: "13.05.2026",
    number: "ZS/00014/05/26",
    status: "Na produkcji",
    product: ["Marker Permanent", "Tusze alkoholowe", "Etykieta kartonowa"],
    series: "Seria Permanent Black",
    owner: "Tomasz Nowak",
    deadline: "30.05.2026",
    jobStatus: "W trakcie",
    jobNumber: "ZP/00014/05/26",
    invoice: "—",
    progress: 58
  },
  {
    date: "14.05.2026",
    number: "ZS/00013/05/26",
    status: "Wymaga poprawy",
    product: ["Flamaster Kids 12 kolorów"],
    series: "Zestaw Kids 12",
    owner: "Joanna Adamska",
    deadline: "14.06.2026",
    jobStatus: "W trakcie",
    jobNumber: "ZP/00013/05/26",
    invoice: "FV/0001/05/26",
    progress: 42
  },
  {
    date: "13.05.2026",
    number: "ZS/00012/05/26",
    status: "Na produkcji",
    product: ["Zakreślacz pastelowy", "Blister 4 szt."],
    series: "Zestaw Pastel Mix",
    owner: "Kontakt 3",
    deadline: "12.06.2026",
    jobStatus: "Pakowane",
    jobNumber: "ZP/00012/05/26",
    invoice: "—",
    progress: 100
  }
];

const columnLabels = {
  date: "Data zamówienia",
  number: "Numer zamówienia",
  status: "Status",
  product: "Produkt",
  series: "Produkt / seria",
  owner: "Opiekun",
  deadline: "Termin",
  jobStatus: "Status zlecenia",
  jobNumber: "Nr zlecenia",
  invoice: "Faktura"
};

type ColumnKey = keyof typeof columnLabels;

const defaultVisible: Record<ColumnKey, boolean> = {
  date: true,
  number: true,
  status: true,
  product: true,
  series: true,
  owner: true,
  deadline: true,
  jobStatus: true,
  jobNumber: true,
  invoice: true
};

const viewTabs = ["Wszystkie", "Nowe", "Produkcja", "Po terminie", "Zrealizowane"];

const emptyAdvancedFilters: AdvancedFilterState = {
  dateFrom: "",
  dateTo: "",
  number: "",
  status: "",
  product: "",
  owner: "",
  series: "",
  deadlineFrom: "",
  deadlineTo: "",
  jobStatus: "",
  jobNumber: "",
  invoice: ""
};

function normalize(value: unknown) {
  return String(value).toLowerCase();
}

function matchesText(value: unknown, query: string) {
  return !query || normalize(value).includes(query.trim().toLowerCase());
}

function toDateValue(value: string) {
  if (!value || value === "—") return 0;
  const [day, month, year] = value.split(".").map(Number);
  if (!day || !month || !year) return 0;
  return new Date(year, month - 1, day).getTime();
}

function isInDateRange(value: string, from: string, to: string) {
  const current = toDateValue(value);
  if (!current) return !from && !to;
  const fromValue = from ? toDateValue(from) : 0;
  const toValue = to ? toDateValue(to) : Number.POSITIVE_INFINITY;
  return current >= fromValue && current <= toValue;
}

function statusBadge(status: OrderStatus) {
  if (status === "Na produkcji") return <Badge>Na produkcji</Badge>;
  if (status === "Nowe") return <Badge variant="neutral">Nowe</Badge>;
  if (status === "Oczekuje na akceptację") return <Badge variant="warning">Oczekuje</Badge>;
  if (status === "Wymaga poprawy") return <Badge variant="destructive">Wymaga poprawy</Badge>;
  return <Badge variant="outline">Anulowane</Badge>;
}

function jobBadge(status: JobStatus) {
  if (status === "W trakcie") return <Badge>W trakcie</Badge>;
  if (status === "Nowe") return <Badge variant="neutral">Nowe</Badge>;
  if (status === "Przyjęcie danych") return <Badge variant="warning">Przyjęcie</Badge>;
  if (status === "Pakowane") return <Badge variant="success">Pakowane</Badge>;
  return <span className="text-muted-foreground">—</span>;
}

export function ProductionOrdersListPattern() {
  const [query, setQuery] = React.useState("");
  const [activeView, setActiveView] = React.useState("Wszystkie");
  const [advancedFilters, setAdvancedFilters] = React.useState<AdvancedFilterState>(emptyAdvancedFilters);
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [columnsOpen, setColumnsOpen] = React.useState(false);
  const [columnFilter, setColumnFilter] = React.useState<ColumnKey | null>(null);
  const [columnFilters, setColumnFilters] = React.useState<Partial<Record<ColumnKey, string>>>({});
  const [previewOpen, setPreviewOpen] = React.useState(true);
  const [selected, setSelected] = React.useState<ProductionOrder>(orders[3]);
  const [sortKey, setSortKey] = React.useState<ColumnKey>("date");
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("desc");
  const [visible, setVisible] = React.useState(defaultVisible);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const visibleColumnCount = Object.values(visible).filter(Boolean).length;
  const activeAdvancedCount = Object.values(advancedFilters).filter(Boolean).length;
  const activeColumnFilterCount = Object.values(columnFilters).filter(Boolean).length;
  const activeFilterCount = activeAdvancedCount + activeColumnFilterCount + (query ? 1 : 0) + (activeView !== "Wszystkie" ? 1 : 0);

  const filtered = React.useMemo(() => {
    return orders
      .filter((order) => {
        const haystack = [
          order.date,
          order.number,
          order.status,
          order.product.join(" "),
          order.series,
          order.owner,
          order.deadline,
          order.jobStatus,
          order.jobNumber,
          order.invoice
        ].join(" ");
        if (!matchesText(haystack, query)) return false;
        if (activeView === "Nowe" && order.status !== "Nowe") return false;
        if (activeView === "Produkcja" && order.status !== "Na produkcji") return false;
        if (activeView === "Po terminie" && order.status !== "Wymaga poprawy") return false;
        if (activeView === "Zrealizowane" && order.jobStatus !== "Pakowane") return false;
        if (!isInDateRange(order.date, advancedFilters.dateFrom, advancedFilters.dateTo)) return false;
        if (!matchesText(order.number, advancedFilters.number)) return false;
        if (advancedFilters.status && order.status !== advancedFilters.status) return false;
        if (!matchesText(order.product.join(" "), advancedFilters.product)) return false;
        if (!matchesText(order.owner, advancedFilters.owner)) return false;
        if (!matchesText(order.series, advancedFilters.series)) return false;
        if (!isInDateRange(order.deadline, advancedFilters.deadlineFrom, advancedFilters.deadlineTo)) return false;
        if (advancedFilters.jobStatus && order.jobStatus !== advancedFilters.jobStatus) return false;
        if (!matchesText(order.jobNumber, advancedFilters.jobNumber)) return false;
        if (!matchesText(order.invoice, advancedFilters.invoice)) return false;
        return (Object.entries(columnFilters) as Array<[ColumnKey, string]>).every(([key, value]) => {
          if (!value) return true;
          const raw = key === "product" ? order.product.join(" ") : order[key];
          return matchesText(raw, value);
        });
      })
      .sort((a, b) => {
      const av = Array.isArray(a[sortKey]) ? a[sortKey].join(" ") : String(a[sortKey]);
      const bv = Array.isArray(b[sortKey]) ? b[sortKey].join(" ") : String(b[sortKey]);
      return sortDir === "asc" ? av.localeCompare(bv, "pl") : bv.localeCompare(av, "pl");
      });
  }, [activeView, advancedFilters, columnFilters, query, sortDir, sortKey]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pagedRows = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [currentPage, filtered, pageSize]);
  const firstResult = filtered.length ? (currentPage - 1) * pageSize + 1 : 0;
  const lastResult = Math.min(currentPage * pageSize, filtered.length);

  React.useEffect(() => {
    setPage(1);
  }, [activeView, advancedFilters, columnFilters, pageSize, query]);

  function sortBy(key: ColumnKey, dir: "asc" | "desc") {
    setSortKey(key);
    setSortDir(dir);
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 2xl:flex-row 2xl:items-end 2xl:justify-between">
        <div>
          <p className="juz-label">Wzorzec ekranu / produkcja</p>
          <h2 className="mt-2 text-3xl font-extrabold">Zamówienia</h2>
          <p className="text-muted-foreground">Zlecenia Klient testowy S.A. z filtrami, widokami i bocznym podglądem rekordu.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <RefreshCw />
            Synchronizuj dane
          </Button>
          <Button>
            <Plus />
            Dodaj zamówienie
          </Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Nowe" value="6" description="oczekuje na produkcję" />
        <KpiCard label="W produkcji" value="7" description="aktywnych złeceń" />
        <KpiCard label="Po terminie" value="3" description="wymaga akcji" tone="danger" />
        <KpiCard label="Zrealizowane" value="3" description="ukończonych" tone="success" />
      </div>

      <Card className="overflow-visible">
        <div className="flex flex-col gap-3 border-b p-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap gap-2">
            {viewTabs.map((tab) => (
              <Button key={tab} size="sm" variant={activeView === tab ? "default" : "outline"} onClick={() => setActiveView(tab)}>
                {tab}
              </Button>
            ))}
            <Button size="sm" variant="ghost">
              <Plus />
              Nowy widok
            </Button>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <div className="relative min-w-[260px]">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Szukaj zamówienia... (Enter aby dodać filtr)"
                value={query}
              />
            </div>
            <Button variant={filtersOpen ? "default" : "outline"} onClick={() => setFiltersOpen((v) => !v)}>
              <Filter />
              {filtersOpen ? "Ukryj filtry" : "Pokaż filtry"}
              {activeFilterCount ? <span className="rounded-full bg-primary-soft px-1.5 text-xs text-primary">{activeFilterCount}</span> : null}
            </Button>
            <Button variant={columnsOpen ? "default" : "outline"} onClick={() => setColumnsOpen((v) => !v)}>
              <Columns3 />
              {columnsOpen ? "Ukryj kolumny" : "Pokaż kolumny"}
              <span className="rounded-full bg-primary-soft px-1.5 text-xs text-primary">{visibleColumnCount}</span>
            </Button>
            <Button variant={previewOpen ? "default" : "outline"} onClick={() => setPreviewOpen((v) => !v)}>
              <PanelRightOpen />
              {previewOpen ? "Ukryj panel" : "Pokaż panel"}
            </Button>
          </div>
        </div>

        {filtersOpen ? (
          <AdvancedFilters
            filters={advancedFilters}
            onChange={setAdvancedFilters}
            onClear={() => setAdvancedFilters(emptyAdvancedFilters)}
          />
        ) : null}
        {columnFilter ? (
          <ColumnFilterPanel
            label={columnLabels[columnFilter]}
            options={columnFilter === "status" ? ["Nowe", "Oczekuje na akceptację", "Na produkcji", "Wymaga poprawy", "Anulowane"] : columnFilter === "jobStatus" ? ["Nowe", "Przyjęcie danych", "W trakcie", "Pakowane", "—"] : []}
            type={columnFilter === "status" || columnFilter === "jobStatus" ? "select" : "text"}
            value={columnFilters[columnFilter] ?? ""}
            onValueChange={(value) => setColumnFilters((current) => ({ ...current, [columnFilter]: value }))}
            onClear={() => setColumnFilters((current) => ({ ...current, [columnFilter]: "" }))}
            onApply={() => setColumnFilter(null)}
            onClose={() => setColumnFilter(null)}
          />
        ) : null}

        <div className={cn("grid", (columnsOpen || previewOpen) && "2xl:grid-cols-[minmax(0,1fr)_390px]")}>
          <div className="min-w-0 overflow-x-auto" role="region" aria-label="Lista zleceń produkcyjnych" tabIndex={0}>
            <Table wrapperClassName="rounded-none border-0 bg-transparent shadow-none">
              <TableHeader>
                <TableRow>
                  {(Object.keys(columnLabels) as ColumnKey[]).map((key) =>
                    visible[key] ? (
                      <TableHead className="whitespace-nowrap" key={key}>
                        <SortableColumnHeader
                          active={sortKey === key}
                          direction={sortDir}
                          filtered={columnFilter === key}
                          label={columnLabels[key]}
                          onAsc={() => sortBy(key, "asc")}
                          onDesc={() => sortBy(key, "desc")}
                          onFilter={() => setColumnFilter(columnFilter === key ? null : key)}
                        />
                      </TableHead>
                    ) : null
                  )}
                  <TableHead className="w-[132px] pr-5 text-right">Akcje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagedRows.map((order) => (
                  <TableRow
                    className={cn("cursor-pointer", selected.number === order.number && "bg-primary-soft/70")}
                    key={order.number}
                    onClick={() => {
                      setSelected(order);
                      setPreviewOpen(true);
                    }}
                  >
                    {visible.date ? <TableCell className="whitespace-nowrap font-mono text-sm">{order.date}</TableCell> : null}
                    {visible.number ? <TableCell className="whitespace-nowrap font-mono font-bold text-primary">{order.number}</TableCell> : null}
                    {visible.status ? <TableCell>{statusBadge(order.status)}</TableCell> : null}
                    {visible.product ? (
                      <TableCell className="min-w-[260px]">
                        <div className="flex flex-wrap gap-1">
                          {order.product.map((product) => (
                            <span className="rounded-full bg-muted px-2 py-1 text-xs font-semibold" key={product}>
                              {product}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                    ) : null}
                    {visible.series ? <TableCell className="whitespace-nowrap">{order.series}</TableCell> : null}
                    {visible.owner ? <TableCell className="whitespace-nowrap text-muted-foreground">{order.owner}</TableCell> : null}
                    {visible.deadline ? <TableCell className="whitespace-nowrap font-mono text-sm">{order.deadline}</TableCell> : null}
                    {visible.jobStatus ? <TableCell>{jobBadge(order.jobStatus)}</TableCell> : null}
                    {visible.jobNumber ? <TableCell className="whitespace-nowrap font-mono text-sm">{order.jobNumber}</TableCell> : null}
                    {visible.invoice ? <TableCell className="whitespace-nowrap">{order.invoice}</TableCell> : null}
                    <TableCell className="whitespace-nowrap pr-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          aria-label="Pokaż podgląd"
                          size="icon"
                          type="button"
                          variant="ghost"
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelected(order);
                            setPreviewOpen(true);
                          }}
                        >
                          <Eye />
                        </Button>
                        <Button
                          aria-label="Więcej"
                          size="icon"
                          type="button"
                          variant="ghost"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <MoreHorizontal />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {!pagedRows.length ? (
                  <TableRow>
                    <TableCell className="h-32 text-center text-muted-foreground" colSpan={visibleColumnCount + 1}>
                      Brak wyników dla wybranych filtrów.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
            <div className="flex flex-col gap-3 border-t p-4 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-muted-foreground">
                Pokazano <strong className="text-foreground">{firstResult}-{lastResult}</strong> z <strong className="text-foreground">{filtered.length}</strong>
              </div>
              <div className="flex flex-wrap items-center gap-2">
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
                  <Button key={item} onClick={() => setPage(item)} size="icon" variant={item === currentPage ? "default" : "outline"}>
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
                <select
                  aria-label="Wyników na stronę"
                  className="h-10 rounded-md border bg-card px-3 text-sm font-semibold shadow-juz-sm"
                  onChange={(event) => setPageSize(Number(event.target.value))}
                  value={pageSize}
                >
                  {[5, 10, 20, 40, 60].map((size) => (
                    <option key={size} value={size}>{size} / stronę</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {columnsOpen ? (
            <ColumnsManagerPanel
              onClose={() => setColumnsOpen(false)}
              onReset={() => setVisible(defaultVisible)}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
              onVisibleChange={setVisible}
              visible={visible}
            />
          ) : previewOpen ? (
            <aside className="border-t bg-muted/20 p-4 2xl:border-l 2xl:border-t-0">
              <Card className="overflow-hidden 2xl:sticky 2xl:top-6">
                <div className="flex items-start justify-between border-b p-5">
                  <div>
                    <p className="juz-label">Boczny podgląd rekordu</p>
                    <h3 className="mt-2 text-xl font-extrabold">{selected.number}</h3>
                    <p className="text-sm text-muted-foreground">{selected.series} · {selected.owner}</p>
                  </div>
                  <button className="inline-flex size-9 items-center justify-center rounded-md hover:bg-muted" aria-label="Zamknij panel" onClick={() => setPreviewOpen(false)}>
                    <X className="size-5 text-muted-foreground" />
                  </button>
                </div>
                <div className="space-y-4 p-5">
                  <div className="flex flex-wrap gap-2">
                    {statusBadge(selected.status)}
                    {jobBadge(selected.jobStatus)}
                  </div>
                  {/*
                    Wrapping in <dl> so the <dt>/<dd> nodes inside PreviewField
                    have a description-list ancestor. Required by axe-core
                    `dlitem` rule; HTML5 also allows <div> wrappers around
                    each dt/dd pair within a <dl>.
                  */}
                  <dl className="grid grid-cols-2 gap-3">
                    <PreviewField label="Data" value={selected.date} />
                    <PreviewField label="Termin" value={selected.deadline} />
                    <PreviewField label="Nr zlecenia" value={selected.jobNumber} />
                    <PreviewField label="Faktura" value={selected.invoice} />
                  </dl>
                  <div>
                    <span className="text-sm text-muted-foreground">Produkty</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selected.product.map((product) => (
                        <Badge key={product} variant="neutral">{product}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex justify-between text-sm font-semibold">
                      <span>Postęp</span>
                      <span>{selected.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${selected.progress}%` }} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">Otwórz pełny rekord</Button>
                    <Button variant="outline">Historia</Button>
                  </div>
                </div>
              </Card>
            </aside>
          ) : null}
        </div>
      </Card>
    </section>
  );
}

function ColumnsManagerPanel({
  visible,
  onVisibleChange,
  onReset,
  onClose,
  pageSize,
  onPageSizeChange
}: {
  visible: Record<ColumnKey, boolean>;
  onVisibleChange: React.Dispatch<React.SetStateAction<Record<ColumnKey, boolean>>>;
  onReset: () => void;
  onClose: () => void;
  pageSize: number;
  onPageSizeChange: (value: number) => void;
}) {
  return (
    <aside className="border-t bg-muted/20 p-4 2xl:border-l 2xl:border-t-0">
      <Card className="overflow-hidden 2xl:sticky 2xl:top-6">
        <div className="flex items-center justify-between border-b p-5">
          <h3 className="text-lg font-extrabold">Zarządzaj kolumnami</h3>
          <button className="inline-flex size-9 items-center justify-center rounded-md hover:bg-muted" aria-label="Zamknij panel kolumn" onClick={onClose}>
            <X className="size-5 text-muted-foreground" />
          </button>
        </div>

        <div className="space-y-2 p-5">
          {(Object.keys(columnLabels) as ColumnKey[]).map((key) => (
            <div className="flex items-center gap-3 rounded-md border bg-card px-3 py-2 shadow-juz-sm" key={key}>
              <GripVertical className="size-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 flex-1 text-sm font-semibold">{columnLabels[key]}</span>
              <button
                aria-label={`${visible[key] ? "Ukryj" : "Pokaż"} kolumnę ${columnLabels[key]}`}
                aria-pressed={visible[key]}
                className={cn(
                  "relative h-7 w-12 rounded-full border transition-colors",
                  visible[key] ? "border-primary bg-primary" : "border-border bg-muted"
                )}
                onClick={() => onVisibleChange((state) => ({ ...state, [key]: !state[key] }))}
                type="button"
              >
                <span
                  className={cn(
                    "absolute top-1 size-5 rounded-full bg-card shadow-juz-sm transition-transform",
                    visible[key] ? "left-6" : "left-1"
                  )}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-3 border-t p-5">
          <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
            <span>Wyników na stronie</span>
            <div className="flex gap-1">
              {[5, 10, 20, 40, 60].map((value) => (
                <button
                  className={cn(
                    "inline-flex h-8 min-w-8 items-center justify-center rounded-sm border px-2 text-sm font-bold",
                    value === pageSize ? "border-primary bg-primary text-primary-foreground" : "bg-card text-muted-foreground"
                  )}
                  key={value}
                  onClick={() => onPageSizeChange(value)}
                  type="button"
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <Button className="w-full">Zapisz jako widok</Button>
          <Button className="w-full" variant="outline" onClick={onReset}>
            <RotateCcw />
            Resetuj do domyślnych
          </Button>
          <Button className="w-full" variant="outline" onClick={onClose}>
            Zamknij
          </Button>
        </div>
      </Card>
    </aside>
  );
}

function KpiCard({
  label,
  value,
  description,
  tone = "default"
}: {
  label: string;
  value: string;
  description: string;
  tone?: "default" | "danger" | "success";
}) {
  return (
    <Card className={cn("p-4", tone === "danger" && "border-destructive/25", tone === "success" && "border-success/25")}>
      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
      <div className="mt-2 whitespace-nowrap text-xl font-extrabold leading-tight">{value}</div>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </Card>
  );
}

function AdvancedFilters({
  filters,
  onChange,
  onClear
}: {
  filters: AdvancedFilterState;
  onChange: React.Dispatch<React.SetStateAction<AdvancedFilterState>>;
  onClear: () => void;
}) {
  function update(key: keyof AdvancedFilterState, value: string) {
    onChange((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="border-b bg-muted/25 p-4">
      <div className="mb-4 flex items-center gap-2 font-bold">
        <SlidersHorizontal className="size-4 text-primary" />
        Filtry zaawansowane
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6">
        <DateRange
          from={filters.dateFrom}
          label="Data zamówienia"
          onFromChange={(value) => update("dateFrom", value)}
          onToChange={(value) => update("dateTo", value)}
          to={filters.dateTo}
        />
        <Field label="Numer zamówienia" onChange={(value) => update("number", value)} placeholder="Zawiera..." value={filters.number} />
        <Field
          asSelect
          label="Status"
          onChange={(value) => update("status", value)}
          options={["Nowe", "Oczekuje na akceptację", "Na produkcji", "Wymaga poprawy", "Anulowane"]}
          value={filters.status}
        />
        <Field label="Produkt" onChange={(value) => update("product", value)} placeholder="Zawiera..." value={filters.product} />
        <Field label="Opiekun" onChange={(value) => update("owner", value)} placeholder="Zawiera..." value={filters.owner} />
        <Field label="Produkt / seria" onChange={(value) => update("series", value)} placeholder="Zawiera..." value={filters.series} />
        <DateRange
          from={filters.deadlineFrom}
          label="Termin"
          onFromChange={(value) => update("deadlineFrom", value)}
          onToChange={(value) => update("deadlineTo", value)}
          to={filters.deadlineTo}
        />
        <Field
          asSelect
          label="Status zlecenia"
          onChange={(value) => update("jobStatus", value)}
          options={["Nowe", "Przyjęcie danych", "W trakcie", "Pakowane", "—"]}
          value={filters.jobStatus}
        />
        <Field label="Nr zlecenia" onChange={(value) => update("jobNumber", value)} placeholder="Zawiera..." value={filters.jobNumber} />
        <Field label="Faktura" onChange={(value) => update("invoice", value)} placeholder="Zawiera..." value={filters.invoice} />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="ghost" onClick={onClear}>Wyczyść wszystkie</Button>
        <Button variant="outline">Anuluj</Button>
        <Button>Filtruj</Button>
      </div>
    </div>
  );
}

function Field({
  label,
  placeholder,
  asSelect,
  options = [],
  value = "",
  onChange
}: {
  label: string;
  placeholder?: string;
  asSelect?: boolean;
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="space-y-1.5">
      <span className="text-sm font-semibold text-muted-foreground">{label}</span>
      {asSelect ? (
        <select className="h-10 w-full rounded-md border bg-card px-3 text-sm shadow-juz-sm" onChange={(event) => onChange?.(event.target.value)} value={value}>
          <option value="">Wszystkie</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <Input onChange={(event) => onChange?.(event.target.value)} placeholder={placeholder} value={value} />
      )}
    </label>
  );
}

function DateRange({
  label,
  from,
  to,
  onFromChange,
  onToChange
}: {
  label: string;
  from: string;
  to: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <span className="text-sm font-semibold text-muted-foreground">{label}</span>
      <div className="grid grid-cols-2 gap-2">
        <Input aria-label={`${label} od`} onChange={(event) => onFromChange(event.target.value)} placeholder="dd.mm.rrrr" value={from} />
        <Input aria-label={`${label} do`} onChange={(event) => onToChange(event.target.value)} placeholder="dd.mm.rrrr" value={to} />
      </div>
    </div>
  );
}

function PreviewField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border bg-muted/25 p-3">
      <dt className="text-xs font-semibold text-muted-foreground">{label}</dt>
      <dd className="mt-1 wrap-break-word font-bold">{value}</dd>
    </div>
  );
}
