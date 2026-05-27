import * as React from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Building2,
  CheckCircle2,
  ClipboardList,
  Columns3,
  Copy,
  CreditCard,
  Edit,
  FileText,
  Filter,
  GripVertical,
  Mail,
  MapPin,
  MessageSquareText,
  MoreHorizontal,
  PackagePlus,
  Phone,
  Plus,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Users,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTablePattern, type DataTableColumn } from "@/components/ds/data-table-pattern";
import { RecordTabs } from "@/components/ds/record-tabs";
import { Input } from "@/components/ui/input";
import { VerticalTimeline } from "./timeline";
import { cn } from "@/lib/utils";

const tabs = [
  "Dane podstawowe",
  "Kontakty",
  "Produkty",
  "Zamówienia",
  "Tabele",
  "Zlecenia",
  "Rozliczenia",
  "Reklamacje",
  "Komunikacja",
  "Pliki"
];

const sections = [
  ["Dane firmy", "Wymagane"],
  ["Dane do wysyłki", "Opcjonalne"],
  ["Sekcja handlowa", "Opcjonalne"],
  ["Dane rejestrowe", "Opcjonalne"],
  ["KSeF", "Opcjonalne"],
  ["Typ firmy", "Opcjonalne"]
];

const companyFields = [
  ["Pełna nazwa", "Firma testowa sp. z o.o."],
  ["NIP", "5421234588"],
  ["Skrót", "FIRMA-TEST"],
  ["Telefon", "+48 85 555 22 22"],
  ["Email", "produkcja@firma-testowa.pl"],
  ["Adres", "ul. Przemysłowa 14"],
  ["Kod pocztowy", "15-421"],
  ["Miasto", "Białystok"],
  ["Kraj", "Polska"]
];

const commercialFields = [
  ["Klient od", "16.05.2026"],
  ["Sposób płatności", "przelew"],
  ["Termin płatności", "14 dni"],
  ["Cennik", "Cennik standardowy 2026"],
  ["Opiekun handlowy", "Opiekun handlowy"],
  ["Sposób dostawy", "Kurier / paleta"]
];

const contacts = [
  ["Kontakt 1", "48", "aktywny"],
  ["Kontakt 2", "35", "aktywna"],
  ["Kontakt 3", "28", "aktywna"]
];

const products = [
  ["Długopis", "Classic 0.7 niebieski", "ZS/00015/05/26", "15.05.2026"],
  ["Marker", "Permanent czarny", "ZS/00014/05/26", "13.05.2026"],
  ["Flamaster", "Kids 12 kolorów", "ZS/00013/05/26", "14.05.2026"]
];

const orders = [
  ["ZS/00015/05/26", "Oczekuje", "Długopis Classic 0.7", "26.05.2026"],
  ["ZS/00014/05/26", "Na produkcji", "Marker Permanent", "30.05.2026"],
  ["ZS/00013/05/26", "Wymaga poprawy", "Flamaster Kids 12", "14.06.2026"]
];

type RecordOrderColumn = "number" | "status" | "product" | "deadline";

const recordOrderColumnLabels: Record<RecordOrderColumn, string> = {
  number: "Numer",
  status: "Status",
  product: "Produkt",
  deadline: "Termin"
};

const recordOrderRows = orders.map(([number, status, product, deadline]) => ({
  number,
  status,
  product,
  deadline
}));

const nestedOrders = [
  {
    number: "ZS/00015/05/26",
    status: "Oczekuje",
    owner: "Kontakt 1",
    product: "Długopis Classic 0.7",
    rows: [
      ["Wkład niebieski 0.7", "16 kart.", "niebieski", "kompletacja"],
      ["Korpus transparentny", "11 kart.", "PP", "wtrysk"],
      ["Nadruk logo", "24 kart.", "1 kolor", "gotowe"]
    ]
  },
  {
    number: "ZS/00014/05/26",
    status: "Na produkcji",
    owner: "Kontakt 2",
    product: "Marker Permanent",
    rows: [
      ["Marker czarny", "26 kart.", "czarny", "napełnianie"],
      ["Etykieta opakowania", "15 kart.", "CMYK", "kontrola"]
    ]
  }
];

export function ClientDetailPattern() {
  const [activeTab, setActiveTab] = React.useState("Dane podstawowe");
  const [activeSection, setActiveSection] = React.useState("Dane firmy");

  return (
    <section className="space-y-5">
      <RecordHeader />
      <HeaderTiles />
      <TabsBar activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "Dane podstawowe" ? (
        <BasicData activeSection={activeSection} onSectionChange={setActiveSection} />
      ) : null}
      {activeTab === "Kontakty" ? <ContactsTab /> : null}
      {activeTab === "Produkty" ? <ProductsTab /> : null}
      {activeTab === "Zamówienia" ? <OrdersTab title="Zamówienia produkcyjne" /> : null}
      {activeTab === "Tabele" ? <NestedTablesTab /> : null}
      {activeTab === "Zlecenia" ? <OrdersTab title="Zlecenia produkcyjne" /> : null}
      {activeTab === "Rozliczenia" ? <BillingTab /> : null}
      {activeTab === "Reklamacje" ? <EmptyTab title="Reklamacje" text="Brak reklamacji dla tej firmy." /> : null}
      {activeTab === "Komunikacja" ? <CommunicationTab /> : null}
      {activeTab === "Pliki" ? <FilesTab /> : null}
    </section>
  );
}

function RecordHeader() {
  return (
    <Card className="overflow-hidden shadow-juz-sm">
      <div className="flex flex-col gap-4 border-b p-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <Button variant="outline" size="sm">
            <ArrowLeft />
            Wróć
          </Button>
          <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
            <Building2 className="size-5" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-xl font-extrabold">Podgląd firmy</h2>
              <Badge variant="success">Aktywna</Badge>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">
            <Edit />
            Edytuj
          </Button>
          <Button>
            <PackagePlus />
            Nowe zamówienie
          </Button>
          <Button variant="ghost" size="icon" aria-label="Więcej akcji">
            <MoreHorizontal />
          </Button>
        </div>
      </div>
      <div className="juz-record-meta-row">
        <HeaderMeta label="Nazwa">
          <strong>FIRMA-TEST</strong>
          <span>ul. Przemysłowa 14, 15-421 Białystok</span>
          <span>Opiekun: Opiekun handlowy</span>
        </HeaderMeta>
        <HeaderMeta label="NIP"><strong>5421234588</strong></HeaderMeta>
        <HeaderMeta label="Role">
          <strong>Klient B2B, dystrybutor</strong>
          <span>produkcja</span>
        </HeaderMeta>
        <HeaderMeta label="Opiekun"><strong>Opiekun handlowy</strong></HeaderMeta>
        <HeaderMeta label="Płatność">
          <strong>przelew</strong>
          <span>Termin: 14 dni</span>
        </HeaderMeta>
        <HeaderMeta label="KSeF"><strong>—</strong></HeaderMeta>
      </div>
    </Card>
  );
}

function HeaderTiles() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <Metric icon={ClipboardList} label="Zamówienia (30 dni)" value="1" helper="1 łącznie" tone="blue" />
      <Metric icon={CreditCard} label="Wartość zamówień (30 dni)" value="—" helper="brak danych cen" muted />
      <Metric icon={Users} label="Kontakty" value="3" helper="aktywne osoby" tone="green" />
      <Metric icon={CheckCircle2} label="Reklamacje" value="0" helper="brak" tone="red" />
    </div>
  );
}

function TabsBar({ activeTab, onChange }: { activeTab: string; onChange: (tab: string) => void }) {
  return <RecordTabs items={tabs} onValueChange={onChange} sticky value={activeTab} />;
}

function BasicData({
  activeSection,
  onSectionChange
}: {
  activeSection: string;
  onSectionChange: (section: string) => void;
}) {
  const mainRef = React.useRef<HTMLElement | null>(null);
  const sectionRefs = React.useRef<Record<string, HTMLDivElement | null>>({});

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
    onSectionChange("Dane firmy");
  }, [onSectionChange]);

  function scrollToSection(label: string) {
    const main = mainRef.current;
    const section = sectionRefs.current[label];
    if (!main || !section) return;

    onSectionChange(label);
    window.scrollTo({
      behavior: "smooth",
      top: section.getBoundingClientRect().top + window.scrollY - 96
    });
  }

  function syncActiveSection() {
    const main = mainRef.current;
    if (!main) return;

    const current = sections
      .map(([label]) => ({
        label,
        top: Math.abs((sectionRefs.current[label]?.offsetTop ?? 0) - main.offsetTop - main.scrollTop)
      }))
      .sort((a, b) => a.top - b.top)[0]?.label;

    if (current && current !== activeSection) {
      onSectionChange(current);
    }
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)_340px]">
      <aside className="xl:sticky xl:top-20 xl:self-start">
        <div className="rounded-lg border bg-card p-3 shadow-juz-sm">
          <p className="juz-label mb-2">Sekcje</p>
          <nav className="space-y-1" aria-label="Sekcje rekordu">
            {sections.map(([label, state]) => (
              <button
                className={cn(
                  "relative flex w-full items-start justify-between gap-3 rounded-md px-3 py-3 text-left text-sm hover:bg-primary-soft",
                  activeSection === label && "bg-primary-soft text-primary before:absolute before:-left-3 before:top-3 before:h-8 before:w-1 before:rounded-r-full before:bg-primary"
                )}
                key={label}
                onClick={() => scrollToSection(label)}
                type="button"
              >
                <span>
                  <span className="block font-bold">{label}</span>
                  <span className="block text-xs text-muted-foreground">{state}</span>
                </span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="min-w-0 space-y-5" ref={mainRef}>
        <div ref={(node) => { sectionRefs.current["Dane firmy"] = node; }}>
          <InfoSection icon={Building2} title="Dane firmy" action="Edytuj">
            <FieldGrid fields={companyFields} />
          </InfoSection>
        </div>
        <div ref={(node) => { sectionRefs.current["Dane do wysyłki"] = node; }}>
          <InfoSection icon={PackagePlus} title="Dane do wysyłki" action="+ Dodaj adres">
            <div className="divide-y rounded-md border">
              <AddressCard isDefault title="Siedziba główna" value="ul. Lipowa 14, 15-427 Białystok, Polska" />
              <AddressCard title="Oddział Starosielce" value="ul. Wysockiego 68, 15-168 Białystok, Polska" />
            </div>
          </InfoSection>
        </div>
        <div ref={(node) => { sectionRefs.current["Sekcja handlowa"] = node; }}>
          <InfoSection icon={CreditCard} title="Sekcja handlowa">
            <FieldGrid fields={commercialFields} />
          </InfoSection>
        </div>
        <div ref={(node) => { sectionRefs.current["Dane rejestrowe"] = node; }}>
          <InfoSection icon={FileText} title="Dane rejestrowe">
            <FieldGrid fields={[["REGON", "—"], ["KRS", "—"], ["PKD", "—"], ["Status VAT", "—"], ["Data weryfikacji VAT", "—"], ["Typ podmiotu", "—"]]} />
          </InfoSection>
        </div>
        <div ref={(node) => { sectionRefs.current["KSeF"] = node; }}>
          <InfoSection icon={FileText} title="Integracja z KSeF">
            <div className="space-y-3">
              <CheckLine label="Wystawiaj e-faktury KSeF — faktury sprzedażowe trafiają do KSeF" />
              <CheckLine label="Pobieraj e-faktury kosztówe z KSeF — faktury kosztówe pobierane automatycznie" />
            </div>
          </InfoSection>
        </div>
        <div ref={(node) => { sectionRefs.current["Typ firmy"] = node; }}>
          <InfoSection icon={Building2} title="Typ firmy">
            <div className="flex flex-wrap gap-2">
              <Badge>Klient</Badge>
              <Badge variant="neutral">Dystrybutor</Badge>
            </div>
          </InfoSection>
        </div>
      </main>

      <aside className="space-y-5 xl:sticky xl:top-20 xl:self-start">
        <MapPanel />
        <Card className="p-4">
          <p className="juz-label">Kontakt</p>
          <div className="mt-3 space-y-2 text-sm">
            <p className="flex items-center gap-2 font-semibold"><Phone className="size-4 text-primary" /> +48 85 555 11 11</p>
            <p className="text-muted-foreground">produkcja@firma-testowa.pl</p>
          </div>
        </Card>
      </aside>
    </div>
  );
}

function ContactsTab() {
  return (
    <Card className="overflow-hidden">
      <ListToolbar title="Kontakty firmy" button="Dodaj kontakt" />
      <RecordTable>
        <RecordTableHeader>
          <RecordTableRow>
            <RecordTableHead>Kontakt</RecordTableHead>
            <RecordTableHead>Zamówienia</RecordTableHead>
            <RecordTableHead>Status</RecordTableHead>
            <RecordTableHead className="text-right">Akcje</RecordTableHead>
          </RecordTableRow>
        </RecordTableHeader>
        <tbody>
          {contacts.map(([name, count, status]) => (
            <RecordTableRow key={name}>
              <RecordTableCell className="font-bold">{name}</RecordTableCell>
              <RecordTableCell>{count}</RecordTableCell>
              <RecordTableCell><Badge variant="success">{status}</Badge></RecordTableCell>
              <RecordTableCell className="text-right"><Button variant="ghost" size="sm">Otwórz</Button></RecordTableCell>
            </RecordTableRow>
          ))}
        </tbody>
      </RecordTable>
    </Card>
  );
}

function ProductsTab() {
  return (
    <Card className="overflow-hidden">
      <ListToolbar title="Produkty powiązane z zamówieniami" button="Dodaj produkt" />
      <RecordTable>
        <RecordTableHeader>
          <RecordTableRow>
            <RecordTableHead>Kategoria</RecordTableHead>
            <RecordTableHead>Nazwa produktu</RecordTableHead>
            <RecordTableHead>Ostatnie zamówienie</RecordTableHead>
            <RecordTableHead>Data</RecordTableHead>
          </RecordTableRow>
        </RecordTableHeader>
        <tbody>
          {products.map(([firstName, lastName, order, date]) => (
            <RecordTableRow key={order}>
              <RecordTableCell>{firstName}</RecordTableCell>
              <RecordTableCell className="font-bold">{lastName}</RecordTableCell>
              <RecordTableCell className="font-mono text-primary">{order}</RecordTableCell>
              <RecordTableCell>{date}</RecordTableCell>
            </RecordTableRow>
          ))}
        </tbody>
      </RecordTable>
    </Card>
  );
}

function OrdersTab({ title }: { title: string }) {
  type OrderRow = {
    id: string;
    number: string;
    status: string;
    product: string;
    deadline: string;
    search: string;
  };

  const tableRows: OrderRow[] = recordOrderRows.map((order) => ({
    id: order.number,
    number: order.number,
    status: order.status,
    product: order.product,
    deadline: order.deadline,
    search: `${order.number} ${order.status} ${order.product} ${order.deadline}`
  }));

  const tableColumns: DataTableColumn<OrderRow>[] = [
    {
      key: "number",
      label: "Numer",
      render: (order) => <span className="font-mono font-bold text-primary">{order.number}</span>
    },
    {
      key: "status",
      label: "Status",
      render: (order) => (
        <Badge variant={order.status === "Wymaga poprawy" ? "destructive" : order.status === "Na produkcji" ? "default" : "warning"}>
          {order.status}
        </Badge>
      )
    },
    { key: "product", label: "Produkt" },
    { key: "deadline", label: "Termin", render: (order) => <span className="font-mono">{order.deadline}</span> }
  ];

  return (
    <DataTablePattern
      actionLabel="Nowe zamówienie"
      columns={tableColumns}
      defaultSort="number"
      density="record"
      description="Lista w zakładce rekordu korzysta z tego samego mechanizmu co listy główne."
      rows={tableRows}
      searchPlaceholder="Szukaj po numerze, produkcie albo statusie..."
      title={title}
    />
  );
}

function RecordListToolbar({
  title,
  button,
  filtersOpen,
  columnsOpen,
  visible,
  onFiltersOpenChange,
  onColumnsOpenChange
}: {
  title: string;
  button: string;
  filtersOpen: boolean;
  columnsOpen: boolean;
  visible: Record<RecordOrderColumn, boolean>;
  onFiltersOpenChange: (open: boolean) => void;
  onColumnsOpenChange: (open: boolean) => void;
}) {
  const visibleCount = Object.values(visible).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-3 border-b p-4 xl:flex-row xl:items-center xl:justify-between">
      <h3 className="font-extrabold">{title}</h3>
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative min-w-[260px]">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="h-11 pl-9" placeholder="Szukaj..." />
        </div>
        <Button className="h-11 px-4" variant={filtersOpen ? "default" : "outline"} onClick={() => onFiltersOpenChange(!filtersOpen)}>
          <Filter />
          {filtersOpen ? "Ukryj filtry" : "Pokaż filtry"}
          {filtersOpen ? <span className="rounded-full bg-primary-soft px-1.5 text-xs text-primary">1</span> : null}
        </Button>
        <Button className="h-11 px-4" variant={columnsOpen ? "default" : "outline"} onClick={() => onColumnsOpenChange(!columnsOpen)}>
          <Columns3 />
          {columnsOpen ? "Ukryj kolumny" : "Pokaż kolumny"}
          <span className="rounded-full bg-primary-soft px-1.5 text-xs text-primary">{visibleCount}</span>
        </Button>
        <Button className="h-11 px-5"><Plus /> {button}</Button>
      </div>
    </div>
  );
}

function RecordColumnsPanel({
  visible,
  onVisibleChange,
  onClose
}: {
  visible: Record<RecordOrderColumn, boolean>;
  onVisibleChange: (visible: Record<RecordOrderColumn, boolean>) => void;
  onClose: () => void;
}) {
  return (
    <aside className="border-t bg-muted/20 p-4 2xl:border-l 2xl:border-t-0">
      <Card className="overflow-hidden shadow-juz-sm">
        <div className="flex items-center justify-between border-b p-4">
          <h4 className="font-extrabold">Zarządzaj kolumnami</h4>
          <Button aria-label="Zamknij kolumny" size="icon" variant="ghost" onClick={onClose}>
            <X />
          </Button>
        </div>
        <div className="space-y-2 p-4">
          {(Object.keys(recordOrderColumnLabels) as RecordOrderColumn[]).map((key) => (
            <div className="flex items-center gap-3 rounded-md border bg-card px-3 py-2 text-sm font-semibold shadow-juz-sm" key={key}>
              <GripVertical className="size-4 text-muted-foreground" />
              <span className="flex-1">{recordOrderColumnLabels[key]}</span>
              <button
                aria-label={`${visible[key] ? "Ukryj" : "Pokaż"} kolumnę ${recordOrderColumnLabels[key]}`}
                aria-pressed={visible[key]}
                className={cn(
                  "relative h-7 w-12 rounded-full border transition-colors",
                  visible[key] ? "border-primary bg-primary" : "border-border bg-muted"
                )}
                onClick={() => onVisibleChange({ ...visible, [key]: !visible[key] })}
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
        <div className="space-y-2 border-t p-4">
          <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
            <span>Wyników na stronie</span>
            <div className="flex gap-1">
              {[10, 20, 40, 60].map((value) => (
                <button
                  className={cn(
                    "inline-flex h-8 min-w-8 items-center justify-center rounded-sm border px-2 text-sm font-bold",
                    value === 10 ? "border-primary bg-primary text-primary-foreground" : "bg-card text-muted-foreground"
                  )}
                  key={value}
                  type="button"
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <Button className="w-full">Zapisz jako widok</Button>
          <Button className="w-full" variant="outline"><RotateCcw /> Resetuj do domyślnych</Button>
          <Button className="w-full" variant="outline" onClick={onClose}>Zamknij</Button>
        </div>
      </Card>
    </aside>
  );
}

function RecordOrdersFilters() {
  return (
    <div className="border-b bg-muted/25 p-4">
      <div className="mb-3 flex items-center gap-2 font-bold">
        <SlidersHorizontal className="size-4 text-primary" />
        Filtry listy w rekordzie
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <label className="space-y-1.5">
          <span className="text-sm font-semibold text-muted-foreground">Numer</span>
          <Input placeholder="ZS/..." />
        </label>
        <label className="space-y-1.5">
          <span className="text-sm font-semibold text-muted-foreground">Status</span>
          <select className="h-11 w-full rounded-md border bg-card px-3 text-sm shadow-juz-sm">
            <option>Wszystkie</option>
            <option>Oczekuje</option>
            <option>Na produkcji</option>
            <option>Wymaga poprawy</option>
          </select>
        </label>
        <label className="space-y-1.5">
          <span className="text-sm font-semibold text-muted-foreground">Produkt</span>
          <Input placeholder="Nazwa lub kategoria" />
        </label>
        <label className="space-y-1.5">
          <span className="text-sm font-semibold text-muted-foreground">Termin</span>
          <Input placeholder="Od - do" />
        </label>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="ghost">Wyczyść</Button>
        <Button variant="outline">Anuluj</Button>
        <Button>Filtruj</Button>
      </div>
    </div>
  );
}

function SortableHead({
  label,
  active,
  direction,
  filterActive,
  onAsc,
  onDesc,
  onFilter
}: {
  label: string;
  active: boolean;
  direction: "asc" | "desc";
  filterActive: boolean;
  onAsc: () => void;
  onDesc: () => void;
  onFilter: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <span>{label}</span>
      <span className="inline-flex items-center rounded-md border bg-card p-0.5">
        <button
          aria-label={`${label} sortuj rosnąco`}
          className={cn(
            "inline-flex h-6 w-5 items-center justify-center rounded-sm hover:bg-primary-soft hover:text-primary",
            active && direction === "asc" && "bg-primary text-primary-foreground"
          )}
          onClick={onAsc}
          type="button"
        >
          <ArrowUp className="size-3" />
        </button>
        <button
          aria-label={`${label} sortuj malejąco`}
          className={cn(
            "inline-flex h-6 w-5 items-center justify-center rounded-sm hover:bg-primary-soft hover:text-primary",
            active && direction === "desc" && "bg-primary text-primary-foreground"
          )}
          onClick={onDesc}
          type="button"
        >
          <ArrowDown className="size-3" />
        </button>
        <button
          aria-label={`${label} filtruj kolumnę`}
          className={cn(
            "ml-0.5 inline-flex h-6 w-5 items-center justify-center rounded-sm border-l hover:bg-primary-soft hover:text-primary",
            filterActive && "bg-primary text-primary-foreground"
          )}
          onClick={onFilter}
          type="button"
        >
          <Filter className="size-3" />
        </button>
      </span>
    </span>
  );
}

function ColumnFilterPanel({
  column,
  onClose
}: {
  column: RecordOrderColumn;
  onClose: () => void;
}) {
  const label = recordOrderColumnLabels[column];
  const isDate = column === "deadline";
  const isStatus = column === "status";

  return (
    <div className="border-b bg-primary-soft/45 p-4">
      <Card className="w-full overflow-hidden shadow-juz-sm">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div>
            <p className="juz-label">Filtrowanie na kolumnie</p>
            <h4 className="font-extrabold">{label}</h4>
          </div>
          <Button aria-label="Zamknij filtr kolumny" size="icon" variant="ghost" onClick={onClose}>
            <X />
          </Button>
        </div>
        <div className="grid gap-3 p-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
          {isDate ? (
            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-1.5">
                <span className="text-sm font-semibold text-muted-foreground">Od</span>
                <Input placeholder="dd.mm.rrrr" />
              </label>
              <label className="space-y-1.5">
                <span className="text-sm font-semibold text-muted-foreground">Do</span>
                <Input placeholder="dd.mm.rrrr" />
              </label>
            </div>
          ) : isStatus ? (
            <label className="space-y-1.5">
              <span className="text-sm font-semibold text-muted-foreground">Wartość</span>
              <select className="h-11 w-full rounded-md border bg-card px-3 text-sm shadow-juz-sm">
                <option>Wszystkie</option>
                <option>Oczekuje</option>
                <option>Na produkcji</option>
                <option>Wymaga poprawy</option>
              </select>
            </label>
          ) : (
            <label className="space-y-1.5">
              <span className="text-sm font-semibold text-muted-foreground">Zawiera</span>
              <Input placeholder={`Filtruj: ${label.toLowerCase()}`} />
            </label>
          )}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>Wyczyść</Button>
            <Button onClick={onClose}>Zastosuj</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function BillingTab() {
  return (
    <Card className="overflow-hidden">
      <ListToolbar title="Rozliczenia" button="Dodaj fakturę" />
      <RecordTable>
        <RecordTableHeader>
          <RecordTableRow>
            <RecordTableHead>Dokument</RecordTableHead>
            <RecordTableHead>Status</RecordTableHead>
            <RecordTableHead>Kwota</RecordTableHead>
            <RecordTableHead>Termin</RecordTableHead>
          </RecordTableRow>
        </RecordTableHeader>
        <tbody>
          <RecordTableRow>
            <RecordTableCell className="font-mono font-bold text-primary">FV/0001/05/26</RecordTableCell>
            <RecordTableCell><Badge variant="warning">Po terminie</Badge></RecordTableCell>
            <RecordTableCell>2 450,00 PLN</RecordTableCell>
            <RecordTableCell>30.05.2026</RecordTableCell>
          </RecordTableRow>
        </tbody>
      </RecordTable>
    </Card>
  );
}

function NestedTablesTab() {
  return (
    <div className="space-y-5">
      <Card className="overflow-hidden">
        <ListToolbar title="Tabela 2: rozwijany wiersz z pozycjami" button="Nowe zamówienie" />
        <RecordTable>
          <RecordTableHeader>
            <RecordTableRow>
              <RecordTableHead>Numer</RecordTableHead>
              <RecordTableHead>Status</RecordTableHead>
              <RecordTableHead>Opiekun</RecordTableHead>
              <RecordTableHead>Produkt</RecordTableHead>
              <RecordTableHead className="text-right">Akcje</RecordTableHead>
            </RecordTableRow>
          </RecordTableHeader>
          <tbody>
            {nestedOrders.map((order) => (
              <React.Fragment key={order.number}>
                <RecordTableRow>
                  <RecordTableCell className="font-mono font-bold text-primary">{order.number}</RecordTableCell>
                  <RecordTableCell>
                    <Badge variant={order.status === "Na produkcji" ? "default" : "warning"}>{order.status}</Badge>
                  </RecordTableCell>
                  <RecordTableCell>{order.owner}</RecordTableCell>
                  <RecordTableCell>{order.product}</RecordTableCell>
                  <RecordTableCell className="text-right">
                    <Button variant="ghost" size="sm">Podgląd</Button>
                  </RecordTableCell>
                </RecordTableRow>
                <tr className="border-b bg-muted/25">
                  <td className="px-5 py-4" colSpan={5}>
                    <NestedTablePanel
                      caption={`Pozycje zamówienia ${order.number}`}
                      description="Tabela zagnieżdżona ma własny, lekki panel bez cienia i bez drugiego ciężkiego kontenera."
                      rows={order.rows}
                    />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </RecordTable>
      </Card>

      <Card className="overflow-hidden">
        <ListToolbar title="Tabela 3: lista z podsumowaniem w wierszu" button="Dodaj rozliczenie" />
        <RecordTable>
          <RecordTableHeader>
            <RecordTableRow>
              <RecordTableHead>Faktura</RecordTableHead>
              <RecordTableHead>Powiązane zamówienia</RecordTableHead>
              <RecordTableHead>Status</RecordTableHead>
              <RecordTableHead className="text-right">Kwota</RecordTableHead>
            </RecordTableRow>
          </RecordTableHeader>
          <tbody>
            <RecordTableRow>
              <RecordTableCell className="font-mono font-bold text-primary">FV/0001/05/26</RecordTableCell>
              <RecordTableCell>
                <div className="flex flex-wrap gap-2">
                  <Badge>ZS/00015/05/26</Badge>
                  <Badge variant="neutral">ZS/00014/05/26</Badge>
                  <Badge variant="neutral">+ 2</Badge>
                </div>
              </RecordTableCell>
              <RecordTableCell><Badge variant="success">Opłacona</Badge></RecordTableCell>
              <RecordTableCell className="text-right font-bold">4 820,00 PLN</RecordTableCell>
            </RecordTableRow>
            <tr className="border-b bg-muted/25">
              <td className="px-5 py-4" colSpan={4}>
                <NestedTablePanel
                  caption="Rozbicie faktury"
                  description="Ten wariant pokazuje drugą tabelę jako szczegóły finansowe rekordu."
                  headers={["Zakres", "Ilość", "Kwota", "VAT"]}
                  rows={[
                    ["Długopisy i wkłady", "3 partie", "3 450,00 PLN", "23% VAT"],
                    ["Mazaki i flamastry", "5 partii", "870,00 PLN", "23% VAT"],
                    ["Dostawa", "1", "500,00 PLN", "23% VAT"]
                  ]}
                />
              </td>
            </tr>
          </tbody>
        </RecordTable>
      </Card>
    </div>
  );
}

function NestedTablePanel({
  caption,
  description,
  headers = ["Pozycja", "Ilość", "Parametr", "Etap"],
  rows
}: {
  caption: string;
  description: string;
  headers?: string[];
  rows: string[][];
}) {
  return (
    <div className="rounded-md border bg-card/80 p-3">
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-extrabold">{caption}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <Badge variant="neutral">Szczegóły</Badge>
      </div>
      <div className="overflow-x-auto rounded-sm border bg-background">
        <table className="w-full text-sm">
          <thead className="bg-muted/55">
            <tr>
              {headers.map((header) => (
                <th className="px-4 py-2 text-left text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground" key={header}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr className="border-t last:border-b-0" key={row.join("-")}>
                {row.map((cell, index) => (
                  <td className={cn("px-4 py-2", index === 0 && "font-semibold")} key={cell}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CommunicationTab() {
  const contactHistory = [
    {
      title: "Telefon z recepcją: potwierdzono termin odbioru.",
      meta: "24.05.2026 · Opiekun 1",
      icon: Phone,
      state: "done" as const,
      description: "Ustalono odbiór partii markerów Permanent czarny na wtorek do 14:00."
    },
    {
      title: "Email z nowym plikiem etykiety.",
      meta: "23.05.2026 · Opiekun 1",
      icon: Mail,
      state: "active" as const,
      description: "Klient dosłał poprawioną wersję projektu opakowania dla serii Kids 12 kolorów."
    },
    {
      title: "Notatka handlowa po wizycie opiekuna.",
      meta: "22.05.2026 · Opiekun 1",
      icon: MessageSquareText,
      state: "planned" as const,
      description: "Do sprawdzenia rabat wolumenowy dla kolejnego zamówienia długopisow Classic 0.7."
    }
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-extrabold">Historia kontaktu</h3>
          <Button size="sm"><Plus /> Dodaj kontakt</Button>
        </div>
        <VerticalTimeline items={contactHistory} />
      </Card>
      <Card className="p-5">
        <p className="juz-label">Szybki wpis</p>
        <textarea className="mt-3 min-h-36 w-full rounded-md border bg-card p-3 text-sm" placeholder="Dodaj notatkę..." />
        <Button className="mt-3 w-full">Zapisz kontakt</Button>
      </Card>
    </div>
  );
}

function FilesTab() {
  return <EmptyTab title="Pliki" text="Brak plików. Tu pokazujemy dropzone, listę załączników i akcje plików." button="Dodaj plik" />;
}

function EmptyTab({ title, text, button }: { title: string; text: string; button?: string }) {
  return (
    <Card className="flex min-h-[280px] flex-col items-center justify-center p-8 text-center">
      <div className="flex size-16 items-center justify-center rounded-lg bg-primary-soft text-primary">
        <FileText className="size-7" />
      </div>
      <h3 className="mt-4 text-xl font-extrabold">{title}</h3>
      <p className="mt-1 max-w-md text-muted-foreground">{text}</p>
      {button ? <Button className="mt-4"><Plus /> {button}</Button> : null}
    </Card>
  );
}

function ListToolbar({ title, button }: { title: string; button: string }) {
  return (
    <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
      <h3 className="font-extrabold">{title}</h3>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="h-11 pl-9" placeholder="Szukaj..." />
        </div>
        <Button className="h-11 px-5"><Plus /> {button}</Button>
      </div>
    </div>
  );
}

function RecordTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full caption-bottom text-sm">{children}</table>
    </div>
  );
}

function RecordTableHeader({ children }: { children: React.ReactNode }) {
  return <thead className="border-b bg-muted/45">{children}</thead>;
}

function RecordTableRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <tr className={cn("border-b transition-colors last:border-b-0 hover:bg-muted/35", className)}>{children}</tr>;
}

function RecordTableHead({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th className={cn("h-12 px-5 text-left align-middle text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground", className)}>
      {children}
    </th>
  );
}

function RecordTableCell({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={cn("px-5 py-4 align-middle text-foreground", className)}>{children}</td>;
}

function Metric({
  icon: Icon,
  label,
  value,
  helper,
  muted,
  tone = "purple"
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  helper?: string;
  muted?: boolean;
  tone?: "purple" | "blue" | "green" | "red";
}) {
  const toneClass = {
    purple: "bg-primary-soft text-primary",
    blue: "bg-primary-soft text-primary",
    green: "bg-success-soft text-success",
    red: "bg-destructive-soft text-destructive"
  }[tone];
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
        <span className={cn("inline-flex size-8 items-center justify-center rounded-md", toneClass)}>
          <Icon className="size-4" />
        </span>
        {label}
      </div>
      <div className={cn("mt-4 whitespace-nowrap text-xl font-extrabold leading-tight", muted && "text-muted-foreground")}>{value}</div>
      {helper ? <p className="mt-1 text-sm text-muted-foreground">{helper}</p> : null}
    </Card>
  );
}

function HeaderMeta({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("flex min-h-28 min-w-0 flex-col gap-1 bg-card p-5 text-sm", className)}>
      <p className="juz-label">{label}</p>
      <div className="flex min-w-0 flex-col gap-1 text-foreground [&_strong]:wrap-break-word [&_span]:wrap-break-word [&_span]:text-muted-foreground">{children}</div>
    </div>
  );
}

function InfoSection({
  icon: Icon,
  title,
  action,
  children
}: {
  icon: React.ElementType;
  title: string;
  action?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b px-5 py-3">
        <h3 className="inline-flex items-center gap-2 font-extrabold">
          <span className="inline-flex size-7 items-center justify-center rounded-md bg-primary-soft text-primary">
            <Icon className="size-4" />
          </span>
          {title}
        </h3>
        {action ? <Button variant="ghost" size="sm">{action}</Button> : null}
      </div>
      <div className="p-5">{children}</div>
    </Card>
  );
}

function FieldGrid({ fields }: { fields: string[][] }) {
  return (
    <dl className="grid gap-x-10 gap-y-6 md:grid-cols-2 xl:grid-cols-4">
      {fields.map(([label, value]) => (
        <div key={label}>
          <dt className="text-sm text-muted-foreground">{label}</dt>
          <dd className="mt-1 wrap-break-word text-sm font-semibold">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function AddressCard({ title, value, isDefault }: { title: string; value: string; isDefault?: boolean }) {
  return (
    <div className="p-4">
      <p className="text-sm font-bold">
        {title} {isDefault ? <span className="text-xs font-semibold text-primary">(domyślny)</span> : null}
      </p>
      <p className="mt-1 text-muted-foreground">{value}</p>
    </div>
  );
}

function CheckLine({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-3 rounded-md border bg-muted/25 p-3 text-sm font-semibold text-muted-foreground">
      <input disabled type="checkbox" className="size-4" />
      {label}
    </label>
  );
}

function MapPanel() {
  return (
    <Card className="overflow-hidden">
      <div className="border-b p-4">
        <h3 className="font-extrabold">Lokalizacja</h3>
        <p className="mt-1 font-mono text-sm text-muted-foreground">53.12350, 18.00840</p>
      </div>
      <div className="relative h-72 bg-primary-soft">
        <div className="absolute inset-0 opacity-70 bg-[linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] bg-size-[32px_32px]" />
        <div className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-juz">
          <MapPin className="size-7" />
        </div>
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button className="inline-flex size-9 items-center justify-center rounded-md border bg-card font-bold shadow-juz-sm">+</button>
          <button className="inline-flex size-9 items-center justify-center rounded-md border bg-card font-bold shadow-juz-sm">-</button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 p-4">
        <Button variant="outline" size="sm">
          <Copy />
          Kopiuj współrzędne
        </Button>
        <Button variant="ghost" size="sm">Pokaż na mapie</Button>
      </div>
    </Card>
  );
}
