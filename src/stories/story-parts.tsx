import * as React from "react";
import {
  AlertTriangle,
  Archive,
  ArrowLeft,
  BarChart3,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock,
  Copy,
  Download,
  Eye,
  ExternalLink,
  FileText,
  GripVertical,
  Image,
  Layers,
  Link,
  MapPin,
  MoreHorizontal,
  Package,
  Pencil,
  Phone,
  Play,
  Share2,
  Search,
  Send,
  Settings,
  Trash2,
  UploadCloud,
  User,
  Wrench,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible } from "@/components/ui/collapsible";
import { CalendarEvent } from "@/components/ds/calendar-event";
import { TokenBarChart, TokenDonutChart, TokenLineChart } from "@/components/ds/chart-primitives";
import { DataTablePattern } from "@/components/ds/data-table-pattern";
import { JuzLogo } from "@/components/ds/logo";
import { RecordTabs } from "@/components/ds/record-tabs";
import { SegmentedTabs } from "@/components/ds/segmented-tabs";
import { Stepper } from "@/components/ds/stepper";
import { PlainTimeline } from "@/components/ds/timeline";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function StoryCanvas({ children }: { children: React.ReactNode }) {
  return <div className="w-full max-w-none bg-background p-8 text-foreground">{children}</div>;
}

const atomDocCopy: Record<string, { description: string; features: string[]; usage: string; props: Array<[string, string, string]> }> = {
  Button: {
    description: "Podstawowa akcja interfejsu. Obsługuje warianty, rozmiary, ikony, stan loading i disabled.",
    features: ["warianty: default, outline, ghost, destructive i link", "ikony przed lub po tekście", "pełna obsługa focus, disabled i aria-label dla ikon"],
    usage: '<Button variant="default" size="default" onClick={handleClick}>Zapisz</Button>',
    props: [["variant", "ButtonVariant", "Styl wizualny przycisku"], ["size", "ButtonSize", "Wysokość i gęstość przycisku"], ["disabled", "boolean", "Blokuje interakcję"]]
  },
  Badge: {
    description: "Mała etykieta statusu lub tagu z kolorami opartymi o tokeny semantyczne.",
    features: ["warianty statusów i tonów", "kontrast zgodny z paletą juz.pl", "do tabel, kart i nagłówków rekordów"],
    usage: '<Badge variant="success">Aktywny</Badge>',
    props: [["variant", "BadgeVariant", "Wariant statusu"], ["children", "ReactNode", "Treść etykiety"], ["className", "string", "Opcjonalne rozszerzenie stylu"]]
  },
  Input: {
    description: "Pole tekstowe dla formularzy, filtrów i wyszukiwania.",
    features: ["spójna wysokość z buttonami", "czytelny focus ring", "placeholder i disabled w tokenach DS"],
    usage: '<Input placeholder="Nazwa produktu" />',
    props: [["type", "HTMLInputTypeAttribute", "Typ pola"], ["placeholder", "string", "Tekst pomocniczy"], ["disabled", "boolean", "Stan nieaktywny"]]
  },
  Select: {
    description: "Pojedynczy wybór wartości z listy, zgodny z Radix/shadcn i tokenami juz.pl.",
    features: ["trigger z wycentrowaną strzałką", "lista opcji w popoverze", "obsługa klawiatury"],
    usage: '<Select><SelectTrigger><SelectValue placeholder="Wybierz" /></SelectTrigger><SelectContent><SelectItem value="active">Aktywne</SelectItem></SelectContent></Select>',
    props: [["value", "string", "Wybrana wartość"], ["onValueChange", "function", "Zmiana wartości"], ["disabled", "boolean", "Blokada wyboru"]]
  }
};

const defaultAtomDoc = (name: string) => ({
  description: `Atom ${name} jest najmniejszym stabilnym klockiem UI w design.juz.pl. Używaj go w molekułach, patternach, layoutach i ekranach zamiast lokalnych makiet.`,
  features: [
    "oparty o tokeny kolorów, spacingu, radiusów i cieni juz.pl",
    "zgodny z architekturą shadcn/Radix albo z lokalnym prymitywem DS",
    "gotowy do ponownego użycia w większych wzorcach bez kopiowania stylów"
  ],
  usage: `<${name} />`,
  props: [["className", "string", "Opcjonalne rozszerzenie stylu"], ["children", "ReactNode", "Treść lub elementy potomne"], ["aria-*", "string", "Atrybuty dostępności, gdy komponent ich wymaga"]]
});

function AtomDocumentation({
  name,
  children
}: {
  name: string;
  children: React.ReactNode;
}) {
  const doc = atomDocCopy[name] ?? defaultAtomDoc(name);

  return (
    <StoryCanvas>
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_240px]">
        <main className="min-w-0 space-y-8">
          <section>
            <p className="juz-label">Atom</p>
            <h1 className="mt-2 text-5xl font-extrabold tracking-normal">{name}</h1>
            <h2 className="mt-8 text-4xl font-extrabold tracking-normal">{name} component</h2>
            <p className="mt-4 max-w-3xl text-lg font-medium leading-8 text-muted-foreground">{doc.description}</p>
          </section>

          <section id="features">
            <h2 className="border-b pb-3 text-3xl font-semibold tracking-normal">Features</h2>
            <ul className="mt-5 list-disc space-y-2 pl-6 text-base text-muted-foreground">
              {doc.features.map((feature) => (
                <li key={feature}>
                  <span className="font-semibold text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="usage">
            <h2 className="border-b pb-3 text-3xl font-semibold tracking-normal">Usage</h2>
            <pre className="mt-5 overflow-x-auto rounded-lg border bg-muted p-5 font-mono text-sm leading-7 text-foreground">
              <code>{doc.usage}</code>
            </pre>
          </section>

          <section id="preview">
            <h2 className="border-b pb-3 text-3xl font-semibold tracking-normal">Preview</h2>
            <Card className="mt-5 w-full max-w-full overflow-x-auto p-6">{children}</Card>
          </section>

          <section id="api">
            <h2 className="border-b pb-3 text-3xl font-semibold tracking-normal">API</h2>
            <div className="mt-5 overflow-hidden rounded-lg border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {doc.props.map(([prop, type, description]) => (
                    <TableRow key={prop}>
                      <TableCell className="font-mono font-bold">{prop}</TableCell>
                      <TableCell><Badge variant="neutral">{type}</Badge></TableCell>
                      <TableCell className="text-muted-foreground">{description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
        </main>

        <aside className="hidden xl:block">
          <div className="sticky top-8 border-l pl-5">
            <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.12em]">Table of contents</p>
            {["Features", "Usage", "Preview", "API"].map((item) => (
              <a className="block py-2 text-sm font-semibold text-muted-foreground hover:text-primary" href={`#${item.toLowerCase()}`} key={item}>
                {item}
              </a>
            ))}
          </div>
        </aside>
      </div>
    </StoryCanvas>
  );
}

export function StorySpec({ name, type, children }: { name: string; type: "Atom" | "Molecule"; children: React.ReactNode }) {
  if (type === "Atom") {
    return <AtomDocumentation name={name}>{children}</AtomDocumentation>;
  }

  return (
    <StoryCanvas>
      <div className="mb-6">
        <p className="juz-label">{type}</p>
        <h1 className="mt-2 text-4xl font-extrabold">{name}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Komponent zgodny z architekturą shadcn/Radix, ostylowany tokenami juz.pl.
        </p>
      </div>
      <Card className="w-full max-w-full overflow-x-auto p-6">{children}</Card>
    </StoryCanvas>
  );
}

const metricCardItems: Array<[string, string, React.ComponentType<{ className?: string }>]> = [
  ["Aktywne zlecenia", "3", FileText],
  ["Zlecenia produkcji", "5", Wrench],
  ["Wartość 30 dni", "24 680 PLN", Package]
];

const iconTileItems: Array<[string, React.ComponentType<{ className?: string }>]> = [
  ["Dane firmy", Building2],
  ["Kontakt", Phone],
  ["Lokalizacja", MapPin],
  ["Ustawienia", Settings]
];

function MiniMonthAtom() {
  const days = [
    null,
    null,
    null,
    null,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31
  ];

  return (
    <Card className="w-[320px] max-w-full p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Button aria-label="Poprzedni miesiąc" size="icon" variant="outline">
          <ChevronLeft className="size-4" />
        </Button>
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Maj</p>
          <p className="text-lg font-extrabold">2026</p>
        </div>
        <Button aria-label="Następny miesiąc" size="icon" variant="outline">
          <ChevronRight className="size-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm font-semibold">
        {["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"].map((day) => (
          <span className="py-2 text-xs uppercase text-muted-foreground" key={day}>
            {day}
          </span>
        ))}
        {days.map((day, index) => (
          <span
            className={cn(
              "grid size-9 place-items-center rounded-md",
              day === 25 && "bg-primary text-primary-foreground shadow-juz-sm",
              day === 24 && "bg-primary-soft text-primary",
              !day && "text-transparent"
            )}
            key={`${day ?? "empty"}-${index}`}
          >
            {day ?? "."}
          </span>
        ))}
      </div>
    </Card>
  );
}

function RichCalendarEvent({
  code = "MP-2405",
  title = "Marker Permanent czarny",
  time = "10:00 - 11:20",
  duration = "80 min",
  station = "Stanowisko 3",
  owner = "Kamil",
  status = "Nowe"
}: {
  code?: string;
  title?: string;
  time?: string;
  duration?: string;
  station?: string;
  owner?: string;
  status?: string;
}) {
  return (
    <article className="min-w-[240px] rounded-md border border-primary/20 border-l-4 border-l-primary bg-primary-soft/55 p-3 shadow-juz-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-sm font-extrabold text-foreground">{code}</p>
          <p className="truncate text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">{title}</p>
        </div>
        <Badge>{status}</Badge>
      </div>
      <div className="mt-2 space-y-1 text-sm font-semibold">
        <p className="flex items-center gap-1.5"><Clock className="size-4 text-primary" /> {time} ({duration})</p>
        <p className="text-muted-foreground">[{station}] {owner}</p>
      </div>
    </article>
  );
}

function WeekWorkstationsView() {
  const [viewMode, setViewMode] = React.useState("Stanowiska");
  const [shift, setShift] = React.useState("Zmiana 1");
  const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00"];
  const stations = ["[1] Mieszanie", "[2] Nadruk", "[3] Pakowanie", "[4] Kontrola", "[5] Wysyłka"];
  const events = [
    { col: 1, row: 0, code: "DLG-0824", title: "Długopis Classic 0.7", time: "08:00 - 09:20", duration: "80 min", station: "2", owner: "Kuba" },
    { col: 2, row: 0, code: "MRK-504", title: "Marker Permanent", time: "08:00 - 09:20", duration: "80 min", station: "3", owner: "Kamil" },
    { col: 4, row: 0, code: "FLM-358", title: "Flamaster Kids 12", time: "08:00 - 09:40", duration: "100 min", station: "5", owner: "Janek" },
    { col: 1, row: 1, code: "ETY-342", title: "Etykiety CMYK", time: "09:20 - 11:00", duration: "100 min", station: "2", owner: "Kuba" },
    { col: 2, row: 2, code: "OPK-928", title: "Opakowanie zbiorcze", time: "10:00 - 11:20", duration: "80 min", station: "3", owner: "Kamil" },
    { col: 4, row: 2, code: "WKL-328", title: "Wkłady niebieskie", time: "10:00 - 10:40", duration: "40 min", station: "5", owner: "Janek" },
    { col: 1, row: 4, code: "NDR-887", title: "Nadruk logo", time: "13:00 - 14:20", duration: "80 min", station: "2", owner: "Kuba" }
  ];

  return (
    <div className="w-full max-w-full overflow-hidden rounded-lg border bg-card shadow-juz-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b p-4">
        <div className="flex items-center gap-3">
          <div className="overflow-hidden rounded-md border bg-card text-center shadow-juz-sm">
            <div className="bg-foreground px-4 py-1 text-xs font-extrabold uppercase text-background">Maj</div>
            <div className="px-4 py-2 text-2xl font-extrabold">24</div>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-extrabold">Tydzień produkcji</h3>
              <Badge variant="neutral">3271 wydarzeń</Badge>
            </div>
            <p className="text-sm font-semibold text-muted-foreground">Poniedziałek, 25 Maj 2026</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={() => setViewMode("Stanowiska")} variant={viewMode === "Stanowiska" ? "default" : "outline"}><Wrench /> Stanowiska</Button>
          <Button onClick={() => setShift((value) => value === "Zmiana 1" ? "Zmiana 2" : "Zmiana 1")} variant="outline">{shift} <ChevronDown className="size-4" /></Button>
          <Button onClick={() => setViewMode((value) => value === "Tydzien" ? "Stanowiska" : "Tydzien")} variant={viewMode === "Tydzien" ? "default" : "outline"}>Widok tygodnia <ChevronDown className="size-4" /></Button>
        </div>
      </div>
      <div className="grid lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="border-r p-4">
          <atoms.Calendar />
          <p className="mt-4 rounded-md bg-muted p-3 text-center text-sm font-semibold text-muted-foreground">Brak bieżących alertów</p>
        </aside>
        <div className="overflow-x-auto">
          <div className="min-w-[920px]">
            <div className="grid grid-cols-[72px_repeat(5,minmax(170px,1fr))] border-b bg-muted/35">
              <div className="border-r p-3" />
              {stations.map((station) => (
                <div className="border-r p-3 text-center text-sm font-extrabold text-muted-foreground last:border-r-0" key={station}>{station}</div>
              ))}
            </div>
            <div className="relative grid grid-cols-[72px_repeat(5,minmax(170px,1fr))]">
              <div className="col-span-full grid grid-cols-[72px_repeat(5,minmax(170px,1fr))]">
                {hours.map((hour) => (
                  <div className="contents" key={hour}>
                    <div className="h-28 border-r border-t p-3 text-right text-sm font-semibold text-muted-foreground">{hour}</div>
                    {stations.map((station) => <div className="h-28 border-r border-t last:border-r-0" key={`${hour}-${station}`} />)}
                  </div>
                ))}
              </div>
              {events.map((event) => (
                <div
                  className="absolute p-2"
                  key={event.code}
                  style={{
                    left: `calc(72px + ${event.col} * ((100% - 72px) / 5))`,
                    top: `calc(${event.row} * 112px + 8px)`,
                    width: "calc((100% - 72px) / 5)"
                  }}
                >
                  <RichCalendarEvent
                    code={event.code}
                    duration={event.duration}
                    owner={event.owner}
                    station={`Stanowisko ${event.station}`}
                    time={event.time}
                    title={event.title}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardExamples() {
  return (
    <div className="grid w-[980px] max-w-full gap-4 md:grid-cols-3">
      <Card className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Zlecenia dzisiaj</p>
            <p className="mt-2 text-4xl font-extrabold">42</p>
          </div>
          <span className="grid size-11 place-items-center rounded-md bg-primary-soft text-primary">
            <FileText className="size-5" />
          </span>
        </div>
        <p className="mt-4 text-sm text-success">+12% vs wczoraj</p>
      </Card>
      <Card className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Wartość miesiąca</p>
            <p className="mt-2 text-2xl font-extrabold leading-tight">184 200 PLN</p>
          </div>
          <span className="grid size-11 place-items-center rounded-md bg-primary-soft text-primary">
            <BarChart3 className="size-5" />
          </span>
        </div>
        <p className="mt-4 text-sm text-success">+3.2% vs poprzedni miesiąc</p>
      </Card>
      <Card className="overflow-hidden">
        <div className="border-b p-5">
          <div className="flex items-center justify-between">
            <b>Linia produkcyjna A</b>
            <Badge variant="success">Aktywna</Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Długopisy Classic 0.7</p>
        </div>
        <div className="space-y-3 p-5">
          <div className="flex justify-between text-sm font-semibold"><span>Postep</span><span>68%</span></div>
          <div className="h-2 rounded-full bg-muted"><div className="h-full w-[68%] rounded-full bg-primary" /></div>
          <p className="font-mono text-sm text-muted-foreground">ZP/00042/05/26</p>
        </div>
      </Card>
      <Card className="p-5">
        <p className="juz-label">Alert magazynowy</p>
        <h3 className="mt-2 text-xl font-extrabold">Wklady niebieskie</h3>
        <p className="mt-2 text-sm text-muted-foreground">Stan spadl ponizej progu minimalnego.</p>
        <Button className="mt-5 w-full" variant="outline">Uzupelnij zapas</Button>
      </Card>
    </div>
  );
}

function ChartExamples() {
  return (
    <div className="grid w-[980px] max-w-full gap-4 lg:grid-cols-2">
      <TokenBarChart
        data={[
          { label: "Pn", value: 42 },
          { label: "Wt", value: 66 },
          { label: "Sr", value: 38 },
          { label: "Cz", value: 84 },
          { label: "Pt", value: 71 },
          { label: "So", value: 55 },
          { label: "Nd", value: 92 }
        ]}
      />
      <TokenLineChart
        data={[
          { label: "Pn", value: 52 },
          { label: "Wt", value: 71 },
          { label: "Sr", value: 63 },
          { label: "Cz", value: 82 },
          { label: "Pt", value: 68 },
          { label: "So", value: 93 },
          { label: "Nd", value: 104 }
        ]}
      />
      <TokenDonutChart
        className="lg:col-span-2"
        data={[
          { label: "W produkcji", value: 48, tone: "primary" },
          { label: "Gotowe", value: 24, tone: "success" },
          { label: "Planowane", value: 17, tone: "warning" },
          { label: "Wymaga uwagi", value: 11, tone: "destructive" }
        ]}
      />
    </div>
  );
}

function CommandDemo() {
  const [query, setQuery] = React.useState("");
  const [selectedAction, setSelectedAction] = React.useState("Utwórz złeceńie");
  const commands: Array<{ label: string; description: string; Icon: React.ComponentType<{ className?: string }> }> = [
    { label: "Utwórz złeceńie", description: "Dodaj nowe złeceńie produkcyjne", Icon: FileText },
    { label: "Dodaj produkt", description: "Długopis, mazak albo flamaster", Icon: Layers },
    { label: "Zaplanuj produkcje", description: "Rezerwacja linii i terminu", Icon: Send },
    { label: "Ustawienia", description: "Profile, integracje i uprawnienia", Icon: Settings }
  ];
  const filtered = commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <Card className="w-[520px] max-w-full overflow-hidden">
      <div className="flex items-center gap-2 border-b px-4 py-3">
        <Search className="size-5 text-muted-foreground" />
        <input
          className="h-9 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Szukaj akcji..."
        />
      </div>
      <div className="p-2">
        {filtered.length ? filtered.map(({ label, description, Icon }) => (
          <button
            aria-pressed={selectedAction === label}
            className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-left hover:bg-primary-soft aria-pressed:bg-primary-soft"
            key={label}
            onClick={() => setSelectedAction(label)}
            type="button"
          >
            <span className="grid size-9 place-items-center rounded-md bg-primary-soft text-primary">
              <Icon className="size-4" />
            </span>
            <span>
              <span className="block font-bold">{label}</span>
              <span className="text-sm text-muted-foreground">{description}</span>
            </span>
          </button>
        )) : (
          <p className="px-3 py-8 text-center text-sm font-semibold text-muted-foreground">Brak pasujacych akcji</p>
        )}
      </div>
      <div className="border-t bg-muted/25 px-4 py-3 text-sm text-muted-foreground">
        Wybrano: <strong className="text-foreground">{selectedAction}</strong>
      </div>
    </Card>
  );
}

function DialogDemo() {
  return (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button variant="outline">Otwórz dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Usuńąć złeceńie?</DialogTitle>
          <DialogDescription>
            Zlecenie ZS/00015/05/26 zostanie przeniesione do kosza. Dane analityczne i historia pozostaną w systemie.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Anuluj</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive"><Trash2 /> Usuń</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AlertDialogDemo() {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 /> Usuń partię
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent role="alertdialog">
        <AlertDialogHeader>
          <div className="flex items-start gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-md bg-destructive-soft text-destructive">
              <AlertTriangle className="size-5" />
            </span>
            <div>
              <AlertDialogTitle>Potwierdź usunięcie partii</AlertDialogTitle>
              <AlertDialogDescription>
                Ta akcja zatrzyma publikację oraz ukryje powiązane wpisy w kalendarzu. Możesz ją później odtworzyć z historii.
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Anuluj</Button>
          </AlertDialogCancel>
          <AlertDialogCancel asChild>
            <Button variant="destructive">
              <Trash2 /> Usuń partię
            </Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
function AlertDemo() {
  return (
    <div className="grid w-[760px] max-w-full gap-3">
      <div className="flex gap-3 rounded-md border border-primary/25 bg-primary-soft p-4 text-primary">
        <FileText className="size-5 shrink-0" />
        <div>
          <b>Plan publikacji zapisany.</b>
          <p className="mt-1 text-sm text-foreground/70">Wpisy pojawia sie w kalendarzu po akceptacji.</p>
        </div>
      </div>
      <div className="flex gap-3 rounded-md border border-warning/30 bg-warning-soft p-4 text-warning">
        <AlertTriangle className="size-5 shrink-0" />
        <div>
          <b>Post wymaga akceptacji.</b>
          <p className="mt-1 text-sm text-foreground/70">Brakuje finalnej grafiki dla kampanii MarkerPro.</p>
        </div>
      </div>
      <div className="flex gap-3 rounded-md border border-destructive/25 bg-destructive-soft p-4 text-destructive">
        <X className="size-5 shrink-0" />
        <div>
          <b>Nie mozna usunac aktywnej serii.</b>
          <p className="mt-1 text-sm text-foreground/70">Najpierw zatrzymaj publikację i odpnij zaplanowane wpisy.</p>
        </div>
      </div>
    </div>
  );
}

function AvatarDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="grid size-16 place-items-center rounded-full bg-primary text-xl font-extrabold text-primary-foreground">MP</div>
      <div className="grid size-14 place-items-center rounded-full bg-success-soft text-lg font-extrabold text-success">DL</div>
      <div className="grid size-12 place-items-center rounded-full bg-warning-soft text-base font-extrabold text-warning">KM</div>
      <div className="grid size-10 place-items-center rounded-full border bg-card text-sm font-extrabold text-muted-foreground">
        <User className="size-5" />
      </div>
      <div className="flex -space-x-3">
        {["MP", "DL", "KM", "+4"].map((label, index) => (
          <span className="grid size-10 place-items-center rounded-full border-2 border-card bg-primary-soft text-xs font-extrabold text-primary" key={`${label}-${index}`}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function AspectRatioDemo() {
  return (
    <div className="w-[520px] max-w-full overflow-hidden rounded-lg border bg-card shadow-juz-sm">
      <div className="aspect-video bg-primary-soft p-6">
        <div className="flex h-full flex-col justify-between rounded-md border border-primary/20 bg-card/80 p-5">
          <div>
            <p className="juz-label">16:9</p>
            <h3 className="mt-2 text-2xl font-extrabold">Podgląd kampanii</h3>
          </div>
          <p className="text-sm text-muted-foreground">Stały format dla miniaturek, grafik i podglądów publikacji.</p>
        </div>
      </div>
    </div>
  );
}

function BreadcrumbDemo() {
  const items = ["Produkcja", "Zlecenia", "ZP/00042/05/26"];

  return (
    <nav aria-label="Ścieżka" className="flex flex-wrap items-center gap-2 text-sm font-semibold">
      {items.map((item, index) => (
        <React.Fragment key={item}>
          <button className={index === items.length - 1 ? "text-foreground" : "text-muted-foreground hover:text-primary"} type="button">
            {item}
          </button>
          {index < items.length - 1 ? <ChevronRight className="size-4 text-muted-foreground" /> : null}
        </React.Fragment>
      ))}
    </nav>
  );
}

function ButtonGroupDemo() {
  const [active, setActive] = React.useState("Tydzień");

  return (
    <div className="inline-flex overflow-hidden rounded-md border bg-card shadow-juz-sm">
      {["Dzień", "Tydzień", "Miesiąc"].map((item) => (
        <button
          aria-pressed={active === item}
          className="border-r px-4 py-2 text-sm font-bold last:border-r-0 hover:bg-primary-soft aria-pressed:bg-primary aria-pressed:text-primary-foreground"
          key={item}
          onClick={() => setActive(item)}
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function CarouselDemo() {
  const slides = [
    ["Plan", "120 publikacji zaplanowanych na maj"],
    ["Produkcja", "68% serii w toku"],
    ["Wyniki", "Kliknięcia wzrosły o 24%"]
  ];
  const [index, setIndex] = React.useState(0);

  return (
    <div className="w-[520px] max-w-full rounded-lg border bg-card p-4 shadow-juz-sm">
      <div className="rounded-md bg-primary-soft p-6">
        <p className="juz-label">{index + 1} / {slides.length}</p>
        <h3 className="mt-2 text-2xl font-extrabold">{slides[index][0]}</h3>
        <p className="mt-2 text-muted-foreground">{slides[index][1]}</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Button
          aria-label="Poprzedni slajd"
          onClick={() => setIndex((value) => (value + slides.length - 1) % slides.length)}
          size="icon"
          variant="outline"
        >
          <ChevronLeft />
        </Button>
        <div className="flex gap-1">
          {slides.map((slide, slideIndex) => (
            <span className={`h-2 w-8 rounded-full ${slideIndex === index ? "bg-primary" : "bg-muted"}`} key={slide[0]} />
          ))}
        </div>
        <Button
          aria-label="Następny slajd"
          onClick={() => setIndex((value) => (value + 1) % slides.length)}
          size="icon"
          variant="outline"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

function EmptyDemo() {
  return (
    <div className="grid w-[460px] max-w-full place-items-center rounded-lg border bg-card p-10 text-center shadow-juz-sm">
      <span className="grid size-14 place-items-center rounded-md bg-primary-soft text-primary">
        <Archive className="size-6" />
      </span>
      <h3 className="mt-4 text-xl font-extrabold">Brak publikacji</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">Dodaj pierwszy wpis albo zmień filtry, żeby zobaczyć wyniki.</p>
      <Button className="mt-5"><PlusIcon /> Dodaj wpis</Button>
    </div>
  );
}

function PlusIcon() {
  return <span className="text-xl leading-none">+</span>;
}

function HoverCardDemo() {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="w-[520px] max-w-full">
      <button
        className="rounded-md border bg-card px-4 py-2 font-bold shadow-juz-sm"
        onMouseEnter={() => setOpen(true)}
        onFocus={() => setOpen(true)}
        type="button"
      >
        MarkerPro
      </button>
      {open ? (
        <div className="mt-3 w-[360px] rounded-lg border bg-card p-4 shadow-juz">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground">MP</span>
            <div>
              <b>MarkerPro</b>
              <p className="text-sm text-muted-foreground">Klient produkcyjny · 42 aktywne linki</p>
            </div>
          </div>
          <Button className="mt-4 w-full" variant="outline" onClick={() => setOpen(false)}>Zamknij podgląd</Button>
        </div>
      ) : null}
    </div>
  );
}

function InputGroupDemo() {
  return (
    <div className="flex h-11 w-[520px] max-w-full overflow-hidden rounded-md border bg-card shadow-juz-sm">
      <span className="grid h-full shrink-0 place-items-center border-r bg-muted px-3 text-muted-foreground">juz.pl/</span>
      <Input className="h-full min-w-0 rounded-none border-0 shadow-none focus-visible:ring-0" defaultValue="markerpro-maj" />
      <Button className="h-full shrink-0 rounded-none border-0 shadow-none" variant="ghost"><Copy /> Kopiuj</Button>
    </div>
  );
}

function InputOtpDemo() {
  const [value, setValue] = React.useState(["2", "4", "", "", "", ""]);

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {value.map((digit, index) => (
          <Input
            aria-label={`Cyfra ${index + 1}`}
            className="h-12 w-11 text-center text-lg font-extrabold"
            inputMode="numeric"
            key={index}
            maxLength={1}
            onChange={(event) => {
              const next = [...value];
              next[index] = event.target.value.slice(-1);
              setValue(next);
            }}
            value={digit}
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">Kod: {value.join("") || "—"}</p>
    </div>
  );
}

function InputDemo() {
  const [value, setValue] = React.useState("ZP/00042/05/26");

  return (
    <div className="grid w-[760px] max-w-full gap-4 md:grid-cols-2">
      <label className="space-y-2">
        <span className="text-sm font-bold text-muted-foreground">Numer zlecenia</span>
        <Input value={value} onChange={(event) => setValue(event.target.value)} />
      </label>
      <label className="space-y-2">
        <span className="text-sm font-bold text-muted-foreground">Szukaj</span>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Szukaj serii, klientów, kampanii..." />
        </div>
      </label>
      <label className="space-y-2">
        <span className="text-sm font-bold text-muted-foreground">Blad walidacji</span>
        <Input aria-invalid className="border-destructive focus-visible:ring-destructive/25" defaultValue="abc" />
        <span className="text-xs font-semibold text-destructive">Wpisz numer w formacie ZP/00000/MM/RR.</span>
      </label>
      <label className="space-y-2">
        <span className="text-sm font-bold text-muted-foreground">Wylaczone</span>
        <Input disabled defaultValue="Pole tylko do odczytu" />
      </label>
    </div>
  );
}

function DecimalInputDemo() {
  const [value, setValue] = React.useState("5230.00");

  return (
    <div className="grid w-[520px] max-w-full gap-4 sm:grid-cols-2">
      <label className="space-y-2">
        <span className="text-sm font-bold text-muted-foreground">Kwota netto</span>
        <div className="relative">
          <Input className="pr-12 text-right font-mono" inputMode="decimal" onChange={(event) => setValue(event.target.value)} value={value} />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">PLN</span>
        </div>
      </label>
      <label className="space-y-2">
        <span className="text-sm font-bold text-muted-foreground">VAT</span>
        <div className="relative">
          <Input className="pr-10 text-right font-mono" defaultValue="23.00" inputMode="decimal" />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">%</span>
        </div>
      </label>
      <p className="sm:col-span-2 text-sm text-muted-foreground">
        Wartość robocza: <strong className="font-mono text-foreground">{value || "0.00"} PLN</strong>
      </p>
    </div>
  );
}

function LabelDemo() {
  return (
    <div className="grid w-[560px] max-w-full gap-4">
      <div className="space-y-2">
        <Label htmlFor="label-order-name">Nazwa zlecenia</Label>
        <Input defaultValue="MarkerPro - seria majowa" id="label-order-name" />
      </div>
      <div className="space-y-2">
        <Label className="flex items-center gap-2" htmlFor="label-publish-date">
          Termin publikacji <Badge variant="warning">wymagane</Badge>
        </Label>
        <Input id="label-publish-date" placeholder="dd.mm.rrrr" />
      </div>
    </div>
  );
}

function KbdDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <kbd className="rounded border bg-muted px-2 py-1 font-mono shadow-juz-xs">⌘</kbd>
      <kbd className="rounded border bg-muted px-2 py-1 font-mono shadow-juz-xs">K</kbd>
      <span className="text-muted-foreground">otwiera command palette</span>
    </div>
  );
}

function MenubarDemo() {
  const [active, setActive] = React.useState("Produkcja");

  return (
    <div className="flex w-fit overflow-hidden rounded-md border bg-card shadow-juz-sm">
      {["Produkcja", "Magazyn", "Analityka", "Ustawienia"].map((item) => (
        <button
          aria-pressed={active === item}
          className="border-r px-4 py-2 text-sm font-bold last:border-r-0 hover:bg-primary-soft aria-pressed:bg-primary-soft aria-pressed:text-primary"
          key={item}
          onClick={() => setActive(item)}
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function PopoverDemo() {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="w-[420px] max-w-full">
      <Button aria-expanded={open} onClick={() => setOpen((value) => !value)} variant="outline">
        <Settings /> Ustawienia widoku
      </Button>
      {open ? (
        <div className="mt-2 rounded-lg border bg-card p-4 shadow-juz">
          <b>Widok listy</b>
          <div className="mt-3 space-y-2">
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Kolumna status</label>
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Akcje w wierszu</label>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function RadioGroupDemo() {
  const [value, setValue] = React.useState("standard");

  return (
    <div className="space-y-3">
      {[
        ["standard", "Standardowy plan publikacji"],
        ["express", "Ekspresowy plan publikacji"],
        ["manual", "Ręczne zatwierdzanie"]
      ].map(([key, label]) => (
        <label className="flex cursor-pointer items-center gap-3 rounded-md border bg-card p-3 shadow-juz-sm" key={key}>
          <input checked={value === key} onChange={() => setValue(key)} type="radio" />
          <span className="font-semibold">{label}</span>
        </label>
      ))}
    </div>
  );
}

function ScrollAreaDemo() {
  return (
    <div className="h-56 w-[420px] max-w-full overflow-y-auto rounded-lg border bg-card p-3 shadow-juz-sm">
      {Array.from({ length: 18 }, (_, index) => (
        <div className="border-b py-3 last:border-b-0" key={index}>
          <b>Zdarzenie {index + 1}</b>
          <p className="text-sm text-muted-foreground">Aktualizacja statusu partii produkcyjnej.</p>
        </div>
      ))}
    </div>
  );
}

function SeparatorDemo() {
  return (
    <div className="w-[420px] max-w-full">
      <b>Plan publikacji</b>
      <div className="my-3 h-px bg-border" />
      <p className="text-sm text-muted-foreground">Separator rozdziela grupy treści w panelach i rekordach.</p>
    </div>
  );
}

function SheetDemo() {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="w-[620px] max-w-full">
      <Button onClick={() => setOpen(true)} variant="outline">Pokaż panel boczny</Button>
      {open ? (
        <div className="mt-4 grid min-h-72 grid-cols-[1fr_280px] overflow-hidden rounded-lg border bg-card shadow-juz-sm">
          <div className="p-5 text-muted-foreground">Treść ekranu pozostaje w tle.</div>
          <aside className="border-l bg-background p-5">
            <div className="flex items-center justify-between gap-3">
              <b>Kolumny</b>
              <Button aria-label="Zamknij" onClick={() => setOpen(false)} size="icon" variant="ghost"><X /></Button>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Status</label>
              <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Termin</label>
              <label className="flex items-center gap-2"><input type="checkbox" /> Opiekun</label>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}

function DrawerDemo() {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="w-[620px] max-w-full">
      <Button onClick={() => setOpen(true)} variant="outline">
        <ChevronDown className="-rotate-90" /> Otwórz drawer
      </Button>
      <div className="mt-4 overflow-hidden rounded-xl border bg-muted/35 shadow-juz-sm">
        <div className="grid min-h-80 place-items-end p-4">
          {open ? (
            <section aria-label="Drawer" className="w-full rounded-t-2xl border bg-card p-5 shadow-juz">
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-border" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-extrabold">Szybkie akcje wpisu</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Wariant dolnego panelu dla mobile i gestow.</p>
                </div>
                <Button aria-label="Zamknij drawer" onClick={() => setOpen(false)} size="icon" variant="ghost">
                  <X />
                </Button>
              </div>
              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                <Button variant="outline"><Eye /> Podgląd</Button>
                <Button><Pencil /> Edytuj</Button>
                <Button variant="destructive"><Trash2 /> Usuń</Button>
              </div>
            </section>
          ) : (
            <div className="grid min-h-44 w-full place-items-center text-sm font-semibold text-muted-foreground">
              Drawer zamkniety.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SliderDemo() {
  const [value, setValue] = React.useState(68);

  return (
    <label className="block w-[420px] max-w-full space-y-3">
      <span className="font-bold">Priorytet kampanii: {value}%</span>
      <input className="w-full accent-primary" max="100" min="0" onChange={(event) => setValue(Number(event.target.value))} type="range" value={value} />
    </label>
  );
}

function ToastDemo() {
  const [visible, setVisible] = React.useState(true);

  return (
    <div className="w-[420px] max-w-full">
      <Button onClick={() => setVisible(true)}>Pokaż toast</Button>
      {visible ? (
        <div className="mt-4 flex items-start gap-3 rounded-lg border bg-card p-4 shadow-juz">
          <Check className="mt-0.5 size-5 text-success" />
          <div className="flex-1">
            <b>Widok zapisany</b>
            <p className="text-sm text-muted-foreground">Ustawienia kolumn zostały zapamiętane.</p>
          </div>
          <Button aria-label="Zamknij" onClick={() => setVisible(false)} size="icon" variant="ghost"><X /></Button>
        </div>
      ) : null}
    </div>
  );
}

function ToggleDemo() {
  const [pressed, setPressed] = React.useState(true);

  return (
    <Button aria-pressed={pressed} onClick={() => setPressed((value) => !value)} variant={pressed ? "default" : "outline"}>
      <Eye /> {pressed ? "Widoczne" : "Ukryte"}
    </Button>
  );
}

function ToggleGroupDemo() {
  const [active, setActive] = React.useState("Lista");

  return (
    <div className="inline-flex overflow-hidden rounded-md border bg-card shadow-juz-sm">
      {["Lista", "Karty", "Kalendarz"].map((item) => (
        <button
          aria-pressed={active === item}
          className="border-r px-4 py-2 text-sm font-bold last:border-r-0 hover:bg-primary-soft aria-pressed:bg-primary aria-pressed:text-primary-foreground"
          key={item}
          onClick={() => setActive(item)}
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function TypographyAtomDemo() {
  return (
    <div className="space-y-3">
      <p className="juz-label">Typography primitive</p>
      <h1 className="text-4xl font-extrabold">Nagłówek rekordu</h1>
      <p className="text-base text-muted-foreground">Tekst pomocniczy zgodny z tokenami typografii juz.pl.</p>
      <code className="rounded bg-muted px-2 py-1 font-mono text-sm">ZP/00042/05/26</code>
    </div>
  );
}

function ProgressDemo() {
  const values = [
    ["Produkcja", 68, "bg-primary"],
    ["Pakowanie", 42, "bg-success"],
    ["Ryzyko opóźnienia", 18, "bg-warning"]
  ];

  return (
    <div className="w-[560px] max-w-full space-y-5">
      {values.map(([label, value, color]) => (
        <div key={label}>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>{label}</span>
            <span>{value}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function CheckboxDemo() {
  const [automation, setAutomation] = React.useState(true);
  const [qualityGate, setQualityGate] = React.useState(false);

  const items = [
    {
      checked: automation,
      description: "System sam przypisze serie do wolnej linii.",
      label: "Uruchom automatyzacje produkcji",
      onChange: setAutomation
    },
    {
      checked: qualityGate,
      description: "Wymagaj potwierdzenia kontroli jakości.",
      label: "Dodaj bramke kontroli",
      onChange: setQualityGate
    }
  ];

  return (
    <div className="w-[520px] max-w-full space-y-3">
      {items.map((item) => (
        <label
          className="flex cursor-pointer items-start gap-3 rounded-md border bg-card p-3 shadow-juz-sm transition-colors hover:bg-primary-soft/45"
          key={item.label}
        >
          <input
            checked={item.checked}
            className="peer sr-only"
            onChange={(event) => item.onChange(event.target.checked)}
            type="checkbox"
          />
          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-sm border border-input bg-card text-primary-foreground peer-checked:border-primary peer-checked:bg-primary">
            {item.checked ? <Check className="size-3.5" /> : null}
          </span>
          <span>
            <span className="block font-semibold">{item.label}</span>
            <span className="text-sm text-muted-foreground">{item.description}</span>
          </span>
        </label>
      ))}
    </div>
  );
}

function CalendarAtomDemo() {
  const monthNames = ["Maj", "Czerwiec", "Lipiec"];
  const monthLengths = [31, 30, 31];
  const leadingBlanks = [3, 6, 1];
  const [monthIndex, setMonthIndex] = React.useState(0);
  const [selectedDay, setSelectedDay] = React.useState(24);
  const days = Array.from({ length: monthLengths[monthIndex] }, (_, index) => index + 1);

  function changeMonth(direction: -1 | 1) {
    setMonthIndex((current) => {
      const next = Math.min(monthNames.length - 1, Math.max(0, current + direction));
      setSelectedDay((day) => Math.min(day, monthLengths[next]));
      return next;
    });
  }

  return (
    <div className="w-[340px] rounded-lg border bg-card p-4 shadow-juz-sm">
      <div className="mb-4 flex items-center justify-between">
        <Button
          aria-label="Poprzedni miesiąc"
          disabled={monthIndex === 0}
          onClick={() => changeMonth(-1)}
          size="icon"
          variant="ghost"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <div className="text-center">
          <p className="font-extrabold">{monthNames[monthIndex]} 2026</p>
          <p className="text-xs text-muted-foreground">Wybierz datę publikacji</p>
        </div>
        <Button
          aria-label="Następny miesiąc"
          disabled={monthIndex === monthNames.length - 1}
          onClick={() => changeMonth(1)}
          size="icon"
          variant="ghost"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
        {["Pn", "Wt", "Sr", "Cz", "Pt", "So", "Nd"].map((day) => <span className="py-2" key={day}>{day}</span>)}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1 text-center text-sm">
        {Array.from({ length: leadingBlanks[monthIndex] }, (_, index) => (
          <span aria-hidden="true" className="h-10" key={`blank-${index}`} />
        ))}
        {days.map((day) => (
          <button
            aria-current={selectedDay === day ? "date" : undefined}
            className="grid h-10 place-items-center rounded-md font-semibold text-foreground hover:bg-primary-soft hover:text-primary aria-[current=date]:bg-primary aria-[current=date]:text-primary-foreground"
            key={day}
            onClick={() => setSelectedDay(day)}
            type="button"
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}

function SelectDemo() {
  const [value, setValue] = React.useState("Linia A");

  return (
    <div className="grid w-[360px] max-w-full gap-2">
      <Label htmlFor="line-select">Linia produkcyjna</Label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger id="line-select">
          <SelectValue placeholder="Wybierz linię" />
        </SelectTrigger>
        <SelectContent>
          {["Linia A", "Linia B", "Linia C", "Pakowanie"].map((item) => (
            <SelectItem key={item} value={item}>{item}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-xs font-semibold text-muted-foreground">Wybrano: {value}</span>
    </div>
  );
}

function FilterSelectDemo() {
  const options = ["PZ", "WZ", "MM", "RW", "PW", "FZ", "WP", "Korekta", "Inwentaryzacja"];
  const [open, setOpen] = React.useState(true);
  const [selected, setSelected] = React.useState<string[]>([]);

  const label = selected.length ? `${selected.length} wybrane` : "Wszystkie";

  function toggleOption(option: string) {
    setSelected((current) =>
      current.includes(option) ? current.filter((item) => item !== option) : [...current, option]
    );
  }

  return (
    <div className="w-[540px] max-w-full">
      <label className="mb-2 block text-sm font-bold text-muted-foreground" htmlFor="filter-select-trigger">
        Typ
      </label>
      <button
        aria-controls="filter-select-options"
        aria-expanded={open}
        className={[
          "flex h-11 w-full items-center justify-between rounded-md border bg-card px-3 text-left text-base font-normal shadow-juz-sm transition-colors",
          open ? "border-primary ring-4 ring-primary/15" : "border-input hover:border-primary/50"
        ].join(" ")}
        id="filter-select-trigger"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span className={selected.length ? "text-foreground" : "text-muted-foreground"}>{label}</span>
        <ChevronDown className={`size-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div
          className="mt-2 max-h-64 overflow-y-auto rounded-md border bg-card p-2 shadow-juz"
          id="filter-select-options"
          role="listbox"
          aria-multiselectable="true"
        >
          {options.map((option) => {
            const checked = selected.includes(option);
            return (
              <button
                aria-selected={checked}
                className="flex w-full items-center gap-3 rounded-md px-2 py-2.5 text-left text-sm font-semibold hover:bg-primary-soft focus-visible:bg-primary-soft focus-visible:outline-none"
                key={option}
                onClick={() => toggleOption(option)}
                role="option"
                type="button"
              >
                <span
                  className={[
                    "grid size-5 place-items-center rounded-sm border",
                    checked ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/55 bg-card"
                  ].join(" ")}
                >
                  {checked ? <Check className="size-3.5" /> : null}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      ) : null}

      <p className="mt-3 text-sm text-muted-foreground">
        Wybrano: <strong className="text-foreground">{selected.length ? selected.join(", ") : "Wszystkie"}</strong>
      </p>
    </div>
  );
}

function SkeletonDemo() {
  const [loading, setLoading] = React.useState(true);

  return (
    <div className="w-[520px] max-w-full space-y-4">
      <Button variant="outline" onClick={() => setLoading((value) => !value)}>{loading ? "Pokaż dane" : "Pokaż skeleton"}</Button>
      <Card className="p-5">
        {loading ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-12 animate-pulse rounded-full bg-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
              </div>
            </div>
            <div className="h-24 animate-pulse rounded-lg bg-muted" />
          </div>
        ) : (
          <div>
            <b>Długopis Classic 0.7</b>
            <p className="mt-2 text-muted-foreground">Zlecenie gotowe do pakowania. Ostatnia aktualizacja: 24.05.2026.</p>
          </div>
        )}
      </Card>
    </div>
  );
}

function SwitchDemo() {
  const [checked, setChecked] = React.useState(true);

  return (
    <button
      aria-checked={checked}
      className="flex items-center gap-3"
      role="switch"
      type="button"
      onClick={() => setChecked((value) => !value)}
    >
      <span className={`inline-flex h-7 w-12 items-center rounded-full p-1 transition-colors ${checked ? "bg-primary" : "bg-muted"}`}>
        <span className={`size-5 rounded-full bg-card shadow-juz-sm transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`} />
      </span>
      <span className="min-w-[260px] font-semibold">{checked ? "Automatyzacja wlaczona" : "Automatyzacja wylaczona"}</span>
    </button>
  );
}

function SpinnerDemo() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <span className="size-5 animate-spin rounded-full border-2 border-primary border-t-transparent" aria-label="Ladowanie male" />
      <span className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" aria-label="Ladowanie standard" />
      <Button disabled>
        <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground/70 border-t-transparent" />
        Zapisywanie...
      </Button>
      <div className="flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm font-semibold shadow-juz-sm">
        <span className="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        Synchronizacja kalendarza
      </div>
    </div>
  );
}

function TabsDemo() {
  const tabs = ["Dane", "Zamówienia", "Komunikacja", "Pliki"];
  const [recordTab, setRecordTab] = React.useState("Dane podstawowe");

  return (
    <div className="grid gap-6">
      <Tabs className="w-[760px] max-w-full" defaultValue="Dane">
        <TabsList>
          {tabs.map((item) => (
            <TabsTrigger key={item} value={item}>
              {item}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((item) => (
          <TabsContent key={item} value={item}>
            <Card className="p-5">
              <p className="juz-label">Aktywna zakładka</p>
              <h3 className="mt-2 text-xl font-extrabold">{item}</h3>
              <p className="mt-2 text-muted-foreground">Bazowy atom shadcn/Radix do prostych przełączników treści.</p>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="w-[960px] max-w-full">
        <p className="juz-label mb-3">Wariant rekordu</p>
        <RecordTabs
          items={[
            { value: "Dane podstawowe", badge: "2/1" },
            "Produkt",
            "Pozycje zamówienia",
            { value: "Rozliczenie i faktura", badge: "2/1" },
            "Pliki",
            "Historia"
          ]}
          onValueChange={setRecordTab}
          value={recordTab}
        />
        <Card className="mt-4 p-5">
          <p className="juz-label">Aktywny record tab</p>
          <h3 className="mt-2 text-xl font-extrabold">{recordTab}</h3>
          <p className="mt-2 text-muted-foreground">Ten wariant jest używany w ekranach podglądu rekordu, np. zamówienie i firma.</p>
        </Card>
      </div>
    </div>
  );
}

function AutocompleteDemo() {
  const options = [
    { name: "MarkerPro", meta: "produkcja markerów i długopisów" },
    { name: "PaperLine", meta: "hurtownia artykulow biurowych" },
    { name: "KolorMix", meta: "flamastry i zakreslacze" },
    { name: "OfficePilot", meta: "dystrybucja B2B" }
  ];
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState(options[0]);
  const [open, setOpen] = React.useState(true);
  const visible = options.filter((option) => option.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="w-[480px] max-w-full">
      <label className="mb-2 block text-sm font-bold text-muted-foreground" htmlFor="autocomplete-client">
        Klient
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls="autocomplete-client-list"
          className="pl-9"
          id="autocomplete-client"
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Wpisz klienta..."
          role="combobox"
          value={query}
        />
      </div>
      {open ? (
        <div className="mt-2 overflow-hidden rounded-md border bg-card shadow-juz-sm" id="autocomplete-client-list" role="listbox">
          {visible.length ? (
            visible.map((option) => (
              <button
                className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left hover:bg-primary-soft focus-visible:bg-primary-soft focus-visible:outline-none"
                key={option.name}
                onClick={() => {
                  setSelected(option);
                  setQuery(option.name);
                  setOpen(false);
                }}
                role="option"
                type="button"
              >
                <span>
                  <span className="block font-bold">{option.name}</span>
                  <span className="text-sm text-muted-foreground">{option.meta}</span>
                </span>
                {selected.name === option.name ? <Check className="size-4 text-primary" /> : null}
              </button>
            ))
          ) : (
            <p className="px-3 py-4 text-sm font-semibold text-muted-foreground">Brak wyników</p>
          )}
        </div>
      ) : null}
      <p className="mt-3 text-sm text-muted-foreground">
        Wybrano: <strong className="text-foreground">{selected.name}</strong>
      </p>
    </div>
  );
}

function BasicMenuItemDemo() {
  const items = [
    { label: "Raport produkcji", description: "Wydajność, odpady i opóźnienia", Icon: FileText },
    { label: "Zlecenia produkcyjne", description: "Lista partii i terminów", Icon: ClipboardList },
    { label: "Ustawienia konta", description: "Profile, integracje, uprawnienia", Icon: Settings }
  ];
  const [active, setActive] = React.useState(items[0].label);

  return (
    <div className="w-[420px] max-w-full rounded-lg border bg-card p-2 shadow-juz-sm">
      {items.map(({ label, description, Icon }) => (
        <button
          aria-current={active === label ? "page" : undefined}
          className={`flex w-full items-center gap-3 rounded-md px-3 py-3 text-left transition-colors ${
            active === label ? "bg-primary-soft text-primary" : "hover:bg-muted"
          }`}
          key={label}
          onClick={() => setActive(label)}
          type="button"
        >
          <span className="grid size-9 place-items-center rounded-md bg-background text-current">
            <Icon className="size-4" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-bold">{label}</span>
            <span className="block truncate text-sm text-muted-foreground">{description}</span>
          </span>
          {active === label ? <Check className="size-4" /> : null}
        </button>
      ))}
      <div className="mt-2 rounded-md bg-muted/55 px-3 py-2 text-sm">
        Aktywna pozycja: <strong>{active}</strong>
      </div>
    </div>
  );
}

function DatePickerDemo() {
  const [open, setOpen] = React.useState(true);
  const [monthIndex, setMonthIndex] = React.useState(4);
  const [day, setDay] = React.useState(24);
  const months = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień"
  ];
  const daysInMonth = new Date(2026, monthIndex + 1, 0).getDate();
  const leadingDays = (new Date(2026, monthIndex, 1).getDay() + 6) % 7;
  const value = `${String(Math.min(day, daysInMonth)).padStart(2, "0")}.${String(monthIndex + 1).padStart(2, "0")}.2026`;

  function changeMonth(direction: -1 | 1) {
    setMonthIndex((current) => {
      const next = Math.min(11, Math.max(0, current + direction));
      setDay((currentDay) => Math.min(currentDay, new Date(2026, next + 1, 0).getDate()));
      return next;
    });
  }

  return (
    <div className="w-[360px] max-w-full">
      <Button
        aria-expanded={open}
        className="w-full justify-between"
        onClick={() => setOpen((current) => !current)}
        variant="outline"
      >
        <span className="flex items-center gap-2"><Calendar /> {value}</span>
        <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </Button>
      {open ? (
        <div className="mt-2 rounded-lg border bg-card p-4 shadow-juz">
          <div className="mb-3 flex items-center justify-between">
            <Button aria-label="Poprzedni miesiąc" disabled={monthIndex === 0} onClick={() => changeMonth(-1)} size="icon" variant="ghost">
              <ChevronLeft className="size-4" />
            </Button>
            <b>{months[monthIndex]} 2026</b>
            <Button aria-label="Następny miesiąc" disabled={monthIndex === 11} onClick={() => changeMonth(1)} size="icon" variant="ghost">
              <ChevronRight className="size-4" />
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
            {["Pn", "Wt", "Sr", "Cz", "Pt", "So", "Nd"].map((label) => <span className="py-2" key={label}>{label}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: leadingDays }, (_, index) => <span className="h-9" key={`empty-${index}`} />)}
            {Array.from({ length: daysInMonth }, (_, index) => {
              const nextDay = index + 1;
              return (
                <button
                  aria-current={day === nextDay ? "date" : undefined}
                  className="grid h-9 place-items-center rounded-md text-sm font-bold hover:bg-primary-soft hover:text-primary aria-[current=date]:bg-primary aria-[current=date]:text-primary-foreground"
                  key={nextDay}
                  onClick={() => {
                    setDay(nextDay);
                    setOpen(false);
                  }}
                  type="button"
                >
                  {nextDay}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Wybrano: <strong className="text-foreground">{value}</strong>
          </p>
        </div>
      ) : null}
    </div>
  );
}

function SearchableSelectDemo() {
  const options = [
    "MarkerPro",
    "Długopis S.A.",
    "KolorMix",
    "Pisakowo",
    "Finezja Office",
    "PaperLine",
    "Flamaster Studio"
  ];
  const [open, setOpen] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState("Długopis S.A.");
  const filtered = options.filter((option) => option.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="w-[460px] max-w-full">
      <label className="mb-2 block text-sm font-bold text-muted-foreground" htmlFor="searchable-select-trigger">
        Klient
      </label>
      <button
        aria-controls="searchable-select-list"
        aria-expanded={open}
        className={[
          "flex h-11 w-full items-center justify-between rounded-md border bg-card px-3 text-left text-base shadow-juz-sm transition-colors",
          open ? "border-primary ring-4 ring-primary/15" : "border-input hover:border-primary/50"
        ].join(" ")}
        id="searchable-select-trigger"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span className="truncate font-semibold text-foreground">{selected}</span>
        <ChevronDown className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div className="mt-2 overflow-hidden rounded-md border bg-card shadow-juz" id="searchable-select-list">
          <div className="border-b p-2">
            <div className="flex h-10 items-center gap-2 rounded-md border bg-background px-3">
              <Search className="size-4 text-muted-foreground" />
              <input
                aria-label="Szukaj klienta"
                className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Szukaj..."
                value={query}
              />
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto p-1" role="listbox">
            {filtered.length ? (
              filtered.map((option) => (
                <button
                  aria-selected={selected === option}
                  className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-semibold hover:bg-primary-soft aria-selected:bg-primary-soft aria-selected:text-primary"
                  key={option}
                  onClick={() => {
                    setSelected(option);
                    setOpen(false);
                  }}
                  role="option"
                  type="button"
                >
                  <span>{option}</span>
                  {selected === option ? <Check className="size-4" /> : null}
                </button>
              ))
            ) : (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">Brak wyników</p>
            )}
          </div>
        </div>
      ) : null}
      <p className="mt-3 text-sm text-muted-foreground">
        Wybrano: <strong className="text-foreground">{selected}</strong>
      </p>
    </div>
  );
}

function MultiSelectDemo() {
  const options = [
    "Linia A",
    "Linia B",
    "Linia C",
    "Pakowanie",
    "Kontrola jakości",
    "Magazyn",
    "Wysyłka",
    "Utrzymanie ruchu"
  ];
  const [open, setOpen] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState<string[]>(["Linia A", "Kontrola jakości"]);
  const filtered = options.filter((option) => option.toLowerCase().includes(query.toLowerCase()));

  function toggleOption(option: string) {
    setSelected((current) =>
      current.includes(option) ? current.filter((item) => item !== option) : [...current, option]
    );
  }

  return (
    <div className="w-[560px] max-w-full">
      <label className="mb-2 block text-sm font-bold text-muted-foreground" htmlFor="multi-select-trigger">
        Obszary produkcji
      </label>
      <button
        aria-controls="multi-select-list"
        aria-expanded={open}
        className={[
          "flex min-h-11 w-full items-center justify-between gap-3 rounded-md border bg-card px-3 py-2 text-left shadow-juz-sm transition-colors",
          open ? "border-primary ring-4 ring-primary/15" : "border-input hover:border-primary/50"
        ].join(" ")}
        id="multi-select-trigger"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span className="flex min-w-0 flex-1 flex-wrap gap-1.5">
          {selected.length ? (
            selected.map((option) => (
              <span
                className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1 text-xs font-bold text-primary"
                key={option}
              >
                {option}
                <span
                  aria-label={`Usuń ${option}`}
                  className="grid size-4 place-items-center rounded-full hover:bg-primary/10"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleOption(option);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      event.stopPropagation();
                      toggleOption(option);
                    }
                  }}
                >
                  <X className="size-3" />
                </span>
              </span>
            ))
          ) : (
            <span className="text-base text-muted-foreground">Wybierz...</span>
          )}
        </span>
        <ChevronDown className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div className="mt-2 overflow-hidden rounded-md border bg-card shadow-juz" id="multi-select-list">
          <div className="border-b p-2">
            <div className="flex h-10 items-center gap-2 rounded-md border bg-background px-3">
              <Search className="size-4 text-muted-foreground" />
              <input
                aria-label="Szukaj kanałów"
                className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Szukaj..."
                value={query}
              />
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto p-1" role="listbox" aria-multiselectable="true">
            {filtered.length ? (
              filtered.map((option) => {
                const checked = selected.includes(option);
                return (
                  <button
                    aria-selected={checked}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-semibold hover:bg-primary-soft focus-visible:bg-primary-soft focus-visible:outline-none"
                    key={option}
                    onClick={() => toggleOption(option)}
                    role="option"
                    type="button"
                  >
                    <span
                      className={[
                        "grid size-5 place-items-center rounded-sm border",
                        checked ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card"
                      ].join(" ")}
                    >
                      {checked ? <Check className="size-3.5" /> : null}
                    </span>
                    {option}
                  </button>
                );
              })
            ) : (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">Brak wyników</p>
            )}
          </div>
        </div>
      ) : null}
      <div className="mt-3 flex items-center justify-between gap-3 text-sm text-muted-foreground">
        <span>Wybrano: {selected.length || 0}</span>
        {selected.length ? (
          <button className="font-bold text-primary hover:underline" onClick={() => setSelected([])} type="button">
            Wyczyść
          </button>
        ) : null}
      </div>
    </div>
  );
}

function DateFilterDemo() {
  const monthNames = ["maj", "czerwiec", "lipiec"];
  const monthLengths = [31, 30, 31];
  const leadingCounts = [4, 0, 2];
  const [open, setOpen] = React.useState(true);
  const [monthIndex, setMonthIndex] = React.useState(0);
  const [day, setDay] = React.useState<number | null>(24);
  const weekDays = ["p", "w", "s", "c", "p", "s", "n"];
  const days = Array.from({ length: monthLengths[monthIndex] }, (_, index) => index + 1);
  const leading = Array.from({ length: leadingCounts[monthIndex] }, (_, index) => index);
  const trailing = Array.from({ length: (7 - ((leading.length + days.length) % 7)) % 7 }, (_, index) => index + 1);
  const value = day ? `${String(day).padStart(2, "0")}.${String(monthIndex + 5).padStart(2, "0")}.2026` : "";

  function changeMonth(direction: -1 | 1) {
    setMonthIndex((current) => {
      const next = Math.min(monthNames.length - 1, Math.max(0, current + direction));
      setDay((currentDay) => currentDay ? Math.min(currentDay, monthLengths[next]) : currentDay);
      return next;
    });
  }

  return (
    <div className="w-[520px] max-w-full">
      <label className="mb-2 block text-sm font-bold text-muted-foreground" htmlFor="date-filter">
        Data wystawienia
      </label>
      <div className="relative">
        <Input
          className="h-12 pr-12 text-base"
          id="date-filter"
          placeholder="dd.mm.rrrr"
          readOnly
          value={value}
          onClick={() => setOpen(true)}
        />
        <button
          aria-label="Otwórz kalendarz"
          className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-sm text-foreground hover:bg-primary-soft hover:text-primary"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          <Calendar className="size-4" />
        </button>
      </div>

      {open ? (
        <div className="mt-2 w-[380px] rounded-md border bg-card p-5 shadow-juz" role="dialog" aria-label="Kalendarz">
          <div className="mb-5 flex items-center justify-between">
            <button className="flex items-center gap-1 text-lg font-extrabold capitalize" type="button">
              {monthNames[monthIndex]} 2026 <ChevronDown className="size-4" />
            </button>
            <div className="flex gap-3">
              <Button
                disabled={monthIndex === 0}
                onClick={() => changeMonth(-1)}
                size="icon"
                variant="ghost"
                aria-label="Poprzedni miesiąc"
              >
                <ChevronLeft className="size-5" />
              </Button>
              <Button
                disabled={monthIndex === monthNames.length - 1}
                onClick={() => changeMonth(1)}
                size="icon"
                variant="ghost"
                aria-label="Następny miesiąc"
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-sm font-bold text-foreground">
            {weekDays.map((label, index) => (
              <span className="py-1" key={`${label}-${index}`}>{label}</span>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-2 text-center text-base">
            {leading.map((value) => (
              <span className="grid size-9 place-items-center font-semibold text-muted-foreground" key={`lead-${value}`} />
            ))}
            {days.map((date) => {
              return (
                <button
                  aria-current={day === date ? "date" : undefined}
                  className="grid size-9 place-items-center rounded-sm font-semibold hover:bg-primary-soft hover:text-primary aria-[current=date]:bg-primary aria-[current=date]:text-primary-foreground"
                  key={date}
                  onClick={() => setDay(date)}
                  type="button"
                >
                  {date}
                </button>
              );
            })}
            {trailing.map((value) => (
              <span className="grid size-9 place-items-center font-semibold text-muted-foreground" key={`trail-${value}`}>{value}</span>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setDay(null)}>Wyczyść</Button>
            <Button
              variant="ghost"
              onClick={() => {
                setMonthIndex(0);
                setDay(24);
              }}
            >
              Dzisiaj
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function AdvancedFiltersPanelDemo() {
  const defaultFilters = {
    number: "",
    gross: "",
    net: "",
    status: "Wszystkie",
    warehouse: "",
    source: "",
    contractor: ""
  };
  const [filters, setFilters] = React.useState(defaultFilters);
  const [applied, setApplied] = React.useState(0);
  const update = (key: keyof typeof filters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };
  const activeFilters = Object.entries(filters).filter(([key, value]) => value && !(key === "status" && value === "Wszystkie")).length;

  return (
    <Card className="w-[1180px] max-w-full overflow-hidden">
      <div className="border-b bg-muted/35 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl font-extrabold">Filtry zaawansowane</h3>
          {applied > 0 ? <Badge variant="neutral">Aktywne: {applied}</Badge> : null}
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-4">
          <DateFilterDemo />
          <label className="space-y-2">
            <span className="block text-sm font-bold text-muted-foreground">Nr dokumentu</span>
            <Input className="h-12" onChange={(event) => update("number", event.target.value)} placeholder="Zawiera..." value={filters.number} />
          </label>
          <label className="space-y-2">
            <span className="block text-sm font-bold text-muted-foreground">Wartość brutto</span>
            <Input className="h-12" onChange={(event) => update("gross", event.target.value)} placeholder="Od" value={filters.gross} />
          </label>
          <label className="space-y-2">
            <span className="block text-sm font-bold text-muted-foreground">Wartość netto</span>
            <Input className="h-12" onChange={(event) => update("net", event.target.value)} placeholder="Od" value={filters.net} />
          </label>
          <label className="space-y-2">
            <span className="block text-sm font-bold text-muted-foreground">Status</span>
            <select
              className="h-12 w-full rounded-md border bg-card px-3 text-foreground shadow-juz-sm"
              onChange={(event) => update("status", event.target.value)}
              value={filters.status}
            >
              <option>Wszystkie</option>
              <option>Aktywne</option>
              <option>W przygotowaniu</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="block text-sm font-bold text-muted-foreground">Magazyn</span>
            <Input className="h-12" onChange={(event) => update("warehouse", event.target.value)} placeholder="Zawiera..." value={filters.warehouse} />
          </label>
          <label className="space-y-2">
            <span className="block text-sm font-bold text-muted-foreground">Źródło</span>
            <Input className="h-12" onChange={(event) => update("source", event.target.value)} placeholder="Zawiera..." value={filters.source} />
          </label>
          <label className="space-y-2">
            <span className="block text-sm font-bold text-muted-foreground">Kontrahent</span>
            <Input className="h-12" onChange={(event) => update("contractor", event.target.value)} placeholder="Zawiera..." value={filters.contractor} />
          </label>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Button
            variant="ghost"
            onClick={() => {
              setFilters(defaultFilters);
              setApplied(0);
            }}
          >
            <ChevronDown className="size-4 rotate-90" />
            Wyczyść wszystkie
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setApplied(0)}>Anuluj</Button>
            <Button onClick={() => setApplied(activeFilters)}>Filtruj</Button>
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data wystawienia</TableHead>
            <TableHead>Nr dokumentu</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Wartość netto</TableHead>
            <TableHead>Wartość brutto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>16.05.2026</TableCell>
            <TableCell className="font-mono font-bold text-primary">WZ/2026/005</TableCell>
            <TableCell><Badge variant="success">Zaksiegowany</Badge></TableCell>
            <TableCell>3465,00 zł</TableCell>
            <TableCell>4261,14 zł</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}

function TextEditorDemo() {
  const [bold, setBold] = React.useState(true);
  const [italic, setItalic] = React.useState(false);
  const [hasImage, setHasImage] = React.useState(false);
  const [content, setContent] = React.useState("Seria MarkerPro startuje w poniedziałek. Potwierdź plan publikacji i materiały graficzne.");

  return (
    <div className="w-[680px] max-w-full overflow-hidden rounded-lg border bg-card shadow-juz-sm">
      <div className="flex flex-wrap gap-1 border-b p-2">
        <Button
          aria-pressed={bold}
          size="sm"
          variant={bold ? "default" : "ghost"}
          onClick={() => setBold((value) => !value)}
        >
          B
        </Button>
        <Button
          aria-pressed={italic}
          size="sm"
          variant={italic ? "default" : "ghost"}
          onClick={() => setItalic((value) => !value)}
        >
          I
        </Button>
        <Button
          aria-pressed={hasImage}
          size="sm"
          variant={hasImage ? "default" : "ghost"}
          onClick={() => setHasImage((value) => !value)}
        >
          <Image /> Media
        </Button>
      </div>
      <Textarea
        className={[
          "min-h-36 border-0 shadow-none",
          bold ? "font-bold" : "font-normal",
          italic ? "italic" : "not-italic"
        ].join(" ")}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Treść posta..."
        value={content}
      />
      <div className="flex flex-wrap items-center justify-between gap-3 border-t bg-muted/25 px-3 py-2 text-sm text-muted-foreground">
        <span>{content.length} znaków</span>
        {hasImage ? <Badge>1 plik media</Badge> : <span>Bez mediow</span>}
      </div>
    </div>
  );
}

function TextareaDemo() {
  const [value, setValue] = React.useState("Wpis startuje po akceptacji grafiki i sprawdzeniu linku docelowego.");

  return (
    <div className="grid w-[760px] max-w-full gap-4 md:grid-cols-2">
      <label className="space-y-2">
        <span className="text-sm font-bold text-muted-foreground">Opis publikacji</span>
        <Textarea value={value} onChange={(event) => setValue(event.target.value)} />
        <span className="text-xs text-muted-foreground">{value.length} znaków</span>
      </label>
      <label className="space-y-2">
        <span className="text-sm font-bold text-muted-foreground">Blad</span>
        <Textarea aria-invalid className="border-destructive focus-visible:ring-destructive/25" defaultValue="" placeholder="Wpisz uzasadnienie..." />
        <span className="text-xs font-semibold text-destructive">To pole jest wymagane przy odrzuceniu wpisu.</span>
      </label>
    </div>
  );
}

function DropdownMenuDemo() {
  const [lastAction, setLastAction] = React.useState("Brak");
  const actions = [
    { label: "Podgląd", Icon: Eye },
    { label: "Edytuj", Icon: Pencil },
    { label: "Duplikuj", Icon: Copy },
    { label: "Usuń", Icon: Trash2, danger: true }
  ];

  return (
    <div className="w-[320px] max-w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Akcje <ChevronDown className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Operacje</DropdownMenuLabel>
          {actions.map(({ label, Icon, danger }) => (
            <DropdownMenuItem
              className={danger ? "text-destructive focus:bg-destructive-soft focus:text-destructive" : undefined}
              key={label}
              onSelect={() => setLastAction(label)}
            >
              <Icon className="size-4" />
              {label}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setLastAction("Eksport")}>
            <Download className="size-4" />
            Eksport
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <p className="mt-3 text-sm text-muted-foreground">
        Ostatnia akcja: <strong className="text-foreground">{lastAction}</strong>
      </p>
    </div>
  );
}

function ComboboxDemo() {
  const [open, setOpen] = React.useState(true);
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState("MarkerPro");
  const options = ["MarkerPro", "PaperLine", "KolorMix", "OfficePilot"];
  const filtered = options.filter((option) => option.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="w-[360px] max-w-full">
      <Button aria-expanded={open} className="w-full justify-between" onClick={() => setOpen((value) => !value)} variant="outline">
        {selected} <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </Button>
      {open ? (
        <div className="mt-2 overflow-hidden rounded-lg border bg-card shadow-juz-sm">
          <div className="border-b p-2">
            <div className="flex h-10 items-center gap-2 rounded-md border bg-background px-3">
              <Search className="size-4 text-muted-foreground" />
              <input
                aria-label="Szukaj klienta"
                className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Szukaj..."
                value={query}
              />
            </div>
          </div>
          <div className="p-1" role="listbox">
            {filtered.length ? filtered.map((option) => (
              <button
                aria-selected={selected === option}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left font-semibold hover:bg-primary-soft"
                key={option}
                onClick={() => {
                  setSelected(option);
                  setQuery("");
                  setOpen(false);
                }}
                role="option"
                type="button"
              >
                {option}
                {selected === option ? <Check className="size-4 text-primary" /> : null}
              </button>
            )) : (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">Brak wyników</p>
            )}
          </div>
        </div>
      ) : null}
      <p className="mt-3 text-sm text-muted-foreground">Wybrano: <strong className="text-foreground">{selected}</strong></p>
    </div>
  );
}

function ContextMenuDemo() {
  const [open, setOpen] = React.useState(true);
  const [action, setAction] = React.useState("Brak");
  return (
    <div className="w-[420px] max-w-full">
      <div
        className="rounded-lg border bg-muted/35 p-5"
        onContextMenu={(event) => {
          event.preventDefault();
          setOpen(true);
        }}
      >
        <b>ZP/00042/05/26</b>
        <p className="mt-1 text-sm text-muted-foreground">Kliknij prawym albo użyj widocznego menu akcji.</p>
      </div>
      {open ? (
        <div className="mt-2 max-w-sm rounded-lg border bg-card p-2 shadow-juz-sm">
          {["Edytuj", "Duplikuj", "Archiwizuj"].map((label) => (
            <button
              className="block w-full rounded-md px-3 py-2 text-left font-semibold hover:bg-muted"
              key={label}
              onClick={() => {
                setAction(label);
                setOpen(false);
              }}
              type="button"
            >
              {label}
            </button>
          ))}
          <button
            className="block w-full rounded-md px-3 py-2 text-left font-semibold text-destructive hover:bg-destructive-soft"
            onClick={() => {
              setAction("Usuń");
              setOpen(false);
            }}
            type="button"
          >
            Usuń
          </button>
        </div>
      ) : null}
      <p className="mt-3 text-sm text-muted-foreground">Akcja: <strong className="text-foreground">{action}</strong></p>
    </div>
  );
}

function ModeToggleDemo() {
  const [mode, setMode] = React.useState("Jasny");
  return (
    <div>
      <div className="inline-flex gap-2 rounded-md bg-muted p-1">
        {["Jasny", "Ciemny", "System"].map((item) => (
          <Button
            className={mode === item ? "" : "shadow-none"}
            key={item}
            onClick={() => setMode(item)}
            size="sm"
            variant={mode === item ? "default" : "secondary"}
          >
            {item}
          </Button>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">Tryb: <strong className="text-foreground">{mode}</strong></p>
    </div>
  );
}

function PaginationDemo() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const total = 73;
  const pageCount = Math.ceil(total / pageSize);
  const currentPage = Math.min(page, pageCount);
  const first = (currentPage - 1) * pageSize + 1;
  const last = Math.min(currentPage * pageSize, total);

  React.useEffect(() => {
    setPage(1);
  }, [pageSize]);

  return (
    <div className="w-full rounded-lg border bg-card p-4 shadow-juz-sm">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <p className="text-sm font-semibold text-muted-foreground">
          Pokazano <span className="text-foreground">{first}-{last}</span> z <span className="text-foreground">{total}</span> wyników
        </p>
        <div className="flex flex-wrap items-center gap-1">
          <Button aria-label="Poprzednia strona" disabled={currentPage <= 1} onClick={() => setPage((value) => Math.max(1, value - 1))} size="icon" variant="outline">
            <ChevronLeft />
          </Button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).slice(0, 7).map((item) => (
            <Button key={item} onClick={() => setPage(item)} size="icon" variant={currentPage === item ? "default" : "outline"}>
              {item}
            </Button>
          ))}
          {pageCount > 7 ? <span className="px-2 text-sm font-bold text-muted-foreground">...</span> : null}
          <Button aria-label="Następna strona" disabled={currentPage >= pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))} size="icon" variant="outline">
            <ChevronRight />
          </Button>
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          Wyników na stronie
          <select
            className="h-10 rounded-md border bg-card px-3 pr-10 font-bold text-foreground shadow-juz-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onChange={(event) => setPageSize(Number(event.target.value))}
            value={pageSize}
          >
            {[10, 20, 40, 60].map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

function ProfileMenuDemo() {
  const [open, setOpen] = React.useState(true);
  const [action, setAction] = React.useState("Brak");
  return (
    <div className="w-[320px] max-w-full">
      <button className="flex w-full items-center justify-between rounded-lg border p-3" onClick={() => setOpen((value) => !value)} type="button">
        <span className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-primary text-white">KP</span><b>Kamil</b></span>
        <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="mt-2 rounded-lg border bg-card p-2 shadow-juz-sm">
          {["Profil", "Ustawienia", "Wyloguj"].map((label) => (
            <button className="block w-full rounded-md px-3 py-2 text-left font-semibold hover:bg-muted" key={label} onClick={() => setAction(label)} type="button">
              {label}
            </button>
          ))}
        </div>
      ) : null}
      <p className="mt-3 text-sm text-muted-foreground">Akcja: <strong className="text-foreground">{action}</strong></p>
    </div>
  );
}

function MoleculeTabsDemo() {
  const [recordTab, setRecordTab] = React.useState("Dane podstawowe");

  return (
    <div className="grid gap-6">
      <Tabs className="w-[560px] max-w-full" defaultValue="Dane">
        <TabsList>
          {["Dane", "Analityka", "Historia"].map((item) => (
            <TabsTrigger key={item} value={item}>{item}</TabsTrigger>
          ))}
        </TabsList>
        {["Dane", "Analityka", "Historia"].map((item) => (
          <TabsContent key={item} value={item}>
            <Card className="p-4">
              <p className="juz-label">Aktywna sekcja</p>
              <h3 className="mt-1 text-lg font-extrabold">{item}</h3>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="w-[920px] max-w-full">
        <RecordTabs
          items={[
            { value: "Dane podstawowe", badge: "2/1" },
            "Produkt",
            "Pozycje zamówienia",
            "Tabele",
            { value: "Rozliczenie i faktura", badge: "2/1" },
            "Kontakt",
            "Historia"
          ]}
          onValueChange={setRecordTab}
          value={recordTab}
        />
        <Card className="mt-4 p-4">
          <p className="juz-label">RecordTabs</p>
          <h3 className="mt-1 text-lg font-extrabold">{recordTab}</h3>
        </Card>
      </div>

      <div className="w-[720px] max-w-full">
        <p className="juz-label mb-3">SegmentedTabs</p>
        <SegmentedTabs items={["Zarządzanie", "Wyszukiwanie", "Użytkownicy"]} stretch />
      </div>
    </div>
  );
}

function TimePickerDemo() {
  const [open, setOpen] = React.useState(true);
  const [time, setTime] = React.useState("19:30");
  const times = ["10:00", "15:00", "19:30", "22:00"];

  return (
    <div className="w-[260px] max-w-full">
      <Button aria-expanded={open} className="w-full justify-between" onClick={() => setOpen((value) => !value)} variant="outline">
        <span className="flex items-center gap-2"><Clock /> {time}</span>
        <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </Button>
      {open ? (
        <div className="mt-2 rounded-lg border bg-card p-2 shadow-juz-sm">
          {times.map((item) => (
            <button className="flex w-full items-center justify-between rounded-md px-3 py-2 font-semibold hover:bg-primary-soft" key={item} onClick={() => { setTime(item); setOpen(false); }} type="button">
              {item}
              {time === item ? <Check className="size-4 text-primary" /> : null}
            </button>
          ))}
        </div>
      ) : null}
      <p className="mt-3 text-sm text-muted-foreground">Godzina: <strong className="text-foreground">{time}</strong></p>
    </div>
  );
}

function CollapsibleMenuItemDemo() {
  const [open, setOpen] = React.useState(true);
  const [active, setActive] = React.useState("Linia A");
  const items = [
    { label: "Linia A", count: 18 },
    { label: "Linia B", count: 12 },
    { label: "Kontrola jakości", count: 7 },
    { label: "Pakowanie", count: 4 }
  ];

  return (
    <div className="w-[360px] max-w-full space-y-3">
      <nav aria-label="Menu produkcji" className="rounded-lg border bg-card p-2 shadow-juz-sm">
        <button
          aria-expanded={open}
          className="flex min-h-12 w-full items-center justify-between rounded-md px-3 text-left font-bold text-foreground transition hover:bg-primary-soft hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          <span>Obszary</span>
          <ChevronDown className={`size-5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open ? (
          <div className="mt-1 space-y-1 border-l pl-3">
            {items.map((item) => {
              const selected = active === item.label;
              return (
                <button
                  aria-current={selected ? "page" : undefined}
                  className={`flex min-h-11 w-full items-center justify-between rounded-md px-3 text-left text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    selected
                      ? "bg-primary-soft text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  key={item.label}
                  onClick={() => setActive(item.label)}
                  type="button"
                >
                  <span>{item.label}</span>
                  <Badge variant={selected ? "default" : "neutral"}>{item.count}</Badge>
                </button>
              );
            })}
          </div>
        ) : null}
      </nav>
      <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm font-semibold text-muted-foreground">
        Wybrana pozycja: <span className="text-foreground">{active}</span>
      </div>
    </div>
  );
}

function FileActionsDemo() {
  const [action, setAction] = React.useState("Brak");
  const actions = [
    { label: "Podgląd", icon: Eye, variant: "outline" as const },
    { label: "Pobierz", icon: Download, variant: "outline" as const },
    { label: "Kopiuj link", icon: Link, variant: "outline" as const },
    { label: "Udostepnij", icon: Share2, variant: "outline" as const },
    { label: "Duplikuj", icon: Copy, variant: "outline" as const },
    { label: "Archiwizuj", icon: Archive, variant: "outline" as const },
    { label: "Usuń", icon: Trash2, variant: "destructive" as const }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {actions.map(({ label, icon: Icon, variant }) => (
          <Button key={label} onClick={() => setAction(label)} size="sm" variant={variant}>
            <Icon />
            {label}
          </Button>
        ))}
        <Button aria-label="Więcej akcji" onClick={() => setAction("Więcej")} size="icon" variant="outline">
          <MoreHorizontal />
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/30 p-3">
        <FileText className="size-5 text-primary" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-bold">faktura-markerpro-05-2026.pdf</p>
          <p className="text-sm text-muted-foreground">PDF · 248 KB · ostatnia akcja: {action}</p>
        </div>
        <div className="flex gap-1">
          <Button aria-label="Szybki podglad" onClick={() => setAction("Szybki podglad")} size="icon" variant="ghost">
            <Eye />
          </Button>
          <Button aria-label="Szybkie pobranie" onClick={() => setAction("Szybkie pobranie")} size="icon" variant="ghost">
            <Download />
          </Button>
          <Button aria-label="Szybkie usuniecie" onClick={() => setAction("Szybkie usuniecie")} size="icon" variant="ghost">
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  );
}

function UploadDemo({ compact = false }: { compact?: boolean }) {
  const [files, setFiles] = React.useState([
    { name: "brief-markerpro.pdf", size: "248 KB", status: "Gotowy" },
    { name: "etykieta-flamaster.png", size: "1.2 MB", status: "Przeslany" }
  ]);
  const [error, setError] = React.useState("");
  const [dragging, setDragging] = React.useState(false);

  function addDemoFile() {
    if (files.some((file) => file.name === "harmonogram-produkcji.xlsx")) {
      setError("Ten plik jest juz na liscie.");
      return;
    }
    setError("");
    setFiles((current) => [
      ...current,
      { name: "harmonogram-produkcji.xlsx", size: "86 KB", status: "Nowy" }
    ]);
  }

  return (
    <div className={compact ? "w-[520px] max-w-full" : "w-[720px] max-w-full"}>
      <button
        className={[
          "grid min-h-40 w-full place-items-center rounded-lg border border-dashed bg-muted/30 p-6 text-center transition-colors",
          dragging ? "border-primary bg-primary-soft" : "hover:border-primary/60 hover:bg-primary-soft/40"
        ].join(" ")}
        onClick={addDemoFile}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setDragging(false);
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          addDemoFile();
        }}
        type="button"
      >
        <span>
          <UploadCloud className="mx-auto mb-2 size-8 text-primary" />
          <b>{compact ? "Dodaj plik" : "Prześlij media lub dokument"}</b>
          <span className="mt-1 block text-sm text-muted-foreground">PDF, PNG, JPG, XLSX do 25 MB</span>
        </span>
      </button>
      {error ? <p className="mt-3 rounded-md bg-destructive-soft px-3 py-2 text-sm font-semibold text-destructive">{error}</p> : null}
      <div className="mt-4 space-y-2">
        {files.map((file) => (
          <div className="flex items-center gap-3 rounded-md border bg-card px-3 py-2 shadow-juz-sm" key={file.name}>
            <FileText className="size-5 text-primary" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold">{file.name}</p>
              <p className="text-sm text-muted-foreground">{file.size} · {file.status}</p>
            </div>
            <Button
              aria-label={`Usuń ${file.name}`}
              onClick={() => setFiles((current) => current.filter((item) => item.name !== file.name))}
              size="icon"
              variant="ghost"
            >
              <X />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export const atoms = {
  Accordion: () => (
    <details className="group rounded-md border bg-card p-4 shadow-juz-sm" open>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
        Jak dziala panel produkcji?
        <ChevronDown className="size-4 text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>
      <p className="mt-3 text-muted-foreground">Zbierasz zlecenia, planujesz linie i kontrolujesz status produkcji.</p>
    </details>
  ),
  Alert: () => <AlertDemo />,
  AlertDialog: () => <AlertDialogDemo />,
  AspectRatio: () => <AspectRatioDemo />,
  Avatar: () => <AvatarDemo />,
  Badge: () => <div className="flex gap-2"><Badge>Online</Badge><Badge variant="success">Aktywny</Badge><Badge variant="warning">Pauza</Badge></div>,
  BarChart: () => (
    <TokenBarChart
      data={[
        { label: "Pn", value: 42 },
        { label: "Wt", value: 66 },
        { label: "Śr", value: 38 },
        { label: "Cz", value: 84 },
        { label: "Pt", value: 71 }
      ]}
    />
  ),
  Breadcrumb: () => <BreadcrumbDemo />,
  Button: () => (
    <div className="flex flex-wrap gap-2">
      <Button><Check /> Zatwierdz</Button>
      <Button variant="outline"><Download /> Eksport</Button>
      <Button variant="ghost">Wyczyść</Button>
      <Button variant="destructive"><Trash2 /> Usuń</Button>
      <Button size="icon" variant="outline" aria-label="Więcej akcji"><MoreHorizontal /></Button>
    </div>
  ),
  ButtonGroup: () => <ButtonGroupDemo />,
  Calendar: () => <CalendarAtomDemo />,
  CalendarEvent: () => (
    <CalendarEvent
      description="Długopis żelowy niebieski"
      endTime="11:20"
      isActive
      owner="Kamil"
      startTime="10:00"
      station="Stanowisko 3"
      status="new"
      title="DLG-2405"
    />
  ),
  Card: () => <CardExamples />,
  Carousel: () => <CarouselDemo />,
  Chart: () => <ChartExamples />,
  Checkbox: () => <CheckboxDemo />,
  ColumnVisibilitySwitch: () => (
    <div className="w-[360px] space-y-3 rounded-lg border bg-card p-4 shadow-juz-sm">
      {["Numer dokumentu", "Data", "Status", "Magazyn"].map((label) => (
        <label className="flex min-h-12 items-center justify-between gap-4 rounded-md border bg-background px-3 text-sm font-bold" key={label}>
          <span className="flex items-center gap-3">
            <GripVertical className="size-4 text-muted-foreground" />
            {label}
          </span>
          <input aria-label={`Pokaż kolumnę ${label}`} className="h-5 w-9 accent-primary" defaultChecked type="checkbox" />
        </label>
      ))}
    </div>
  ),
  Collapsible: () => (
    <Collapsible defaultOpen trigger="Zaawansowane ustawieńia linii">
      Limity serii, priorytet i rezerwacja stanowiska.
    </Collapsible>
  ),
  Command: () => <CommandDemo />,
  DateRangeInput: () => (
    <div className="grid w-[540px] max-w-full gap-3 sm:grid-cols-2">
      <label className="space-y-2">
        <span className="text-sm font-bold text-muted-foreground">Od</span>
        <div className="flex min-h-12 items-center gap-3 rounded-md border bg-background px-3">
          <Input className="border-0 p-0 shadow-none focus-visible:ring-0" placeholder="dd.mm.rrrr" />
          <Calendar className="size-5 text-muted-foreground" />
        </div>
      </label>
      <label className="space-y-2">
        <span className="text-sm font-bold text-muted-foreground">Do</span>
        <div className="flex min-h-12 items-center gap-3 rounded-md border bg-background px-3">
          <Input className="border-0 p-0 shadow-none focus-visible:ring-0" placeholder="dd.mm.rrrr" />
          <Calendar className="size-5 text-muted-foreground" />
        </div>
      </label>
    </div>
  ),
  DecimalInput: () => <DecimalInputDemo />,
  DateFilter: () => <DateFilterDemo />,
  Dialog: () => <DialogDemo />,
  DonutChart: () => (
    <TokenDonutChart
      data={[
        { label: "W produkcji", value: 48, tone: "primary" },
        { label: "Gotowe", value: 24, tone: "success" },
        { label: "Planowane", value: 17, tone: "warning" },
        { label: "Wymaga uwagi", value: 11, tone: "destructive" }
      ]}
    />
  ),
  Drawer: () => <DrawerDemo />,
  Empty: () => <EmptyDemo />,
  EmptyState: () => (
    <div className="grid min-h-[240px] w-[520px] max-w-full place-items-center rounded-lg border bg-card p-8 text-center shadow-juz-sm">
      <div>
        <span className="mx-auto grid size-14 place-items-center rounded-md bg-primary-soft text-primary">
          <Package className="size-7" />
        </span>
        <h3 className="mt-4 text-xl font-extrabold">Brak pozycji</h3>
        <p className="mt-2 text-sm font-medium text-muted-foreground">Dodaj pierwszy produkt lub zaimportuj dane z pliku.</p>
      </div>
    </div>
  ),
  FieldDisplay: () => (
    <div className="grid w-[760px] max-w-full gap-5 rounded-lg border bg-card p-5 sm:grid-cols-4">
      {[
        ["Pełna nazwa", "Długopis S.A."],
        ["NIP", "6761234568"],
        ["Opiekun", "Monika Kamińska"],
        ["Status", "Aktywny"]
      ].map(([label, value]) => (
        <div key={label}>
          <p className="text-sm font-semibold text-muted-foreground">{label}</p>
          <p className="mt-2 font-extrabold">{value}</p>
        </div>
      ))}
    </div>
  ),
  FilterSelect: () => <FilterSelectDemo />,
  HoverCard: () => <HoverCardDemo />,
  Input: () => <InputDemo />,
  InputGroup: () => <InputGroupDemo />,
  InputOTP: () => <InputOtpDemo />,
  IconActionButton: () => (
    <div className="flex flex-wrap gap-2">
      <Button aria-label="Podgląd" size="icon" variant="outline"><Eye /></Button>
      <Button aria-label="Edytuj" size="icon" variant="outline"><Pencil /></Button>
      <Button aria-label="Kopiuj" size="icon" variant="outline"><Copy /></Button>
      <Button aria-label="Usuń" size="icon" variant="destructive"><Trash2 /></Button>
    </div>
  ),
  IconTile: () => (
    <div className="grid w-[520px] max-w-full gap-3 sm:grid-cols-2">
      {iconTileItems.map(([label, Icon]) => (
        <button className="flex min-h-16 items-center gap-3 rounded-md border bg-card px-4 text-left font-extrabold shadow-juz-sm hover:border-primary hover:text-primary" key={label} type="button">
          <span className="grid size-10 place-items-center rounded-md bg-primary-soft text-primary">
            <Icon className="size-5" />
          </span>
          {label}
        </button>
      ))}
    </div>
  ),
  Kbd: () => <KbdDemo />,
  Label: () => <LabelDemo />,
  LineChart: () => (
    <TokenLineChart
      data={[
        { label: "Pn", value: 52 },
        { label: "Wt", value: 71 },
        { label: "Śr", value: 63 },
        { label: "Cz", value: 82 },
        { label: "Pt", value: 68 }
      ]}
    />
  ),
  Logo: () => <JuzLogo />,
  MetricCard: () => (
    <div className="grid w-[880px] max-w-full gap-4 md:grid-cols-3">
      {metricCardItems.map(([label, value, Icon]) => (
        <Card className="min-h-[128px] p-5" key={label}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold leading-5 text-muted-foreground">{label}</p>
              <p className="mt-2 text-xl font-extrabold leading-tight tracking-normal">{value}</p>
            </div>
            <span className="grid size-11 shrink-0 place-items-center rounded-md bg-primary-soft text-primary">
              <Icon className="size-5" />
            </span>
          </div>
        </Card>
      ))}
    </div>
  ),
  MetaTile: () => (
    <div className="grid w-[760px] max-w-full gap-0 overflow-hidden rounded-lg border bg-card md:grid-cols-3">
      {[
        ["Klient", "MarkerPro"],
        ["Data utworzenia", "28.02.2026"],
        ["Kliknięcia łącznie", "10"]
      ].map(([label, value]) => (
        <div className="border-b p-5 md:border-b-0 md:border-r md:last:border-r-0" key={label}>
          <p className="text-sm font-semibold text-muted-foreground">{label}</p>
          <p className="mt-2 text-xl font-extrabold">{value}</p>
        </div>
      ))}
    </div>
  ),
  Menubar: () => <MenubarDemo />,
  MiniMonth: () => <MiniMonthAtom />,
  MultiSelect: () => <MultiSelectDemo />,
  NativeSelect: () => <SelectDemo />,
  AddressCard: () => (
    <Card className="w-[520px] max-w-full overflow-hidden">
      <div className="p-5">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground">Adres</p>
        <h3 className="mt-2 text-xl font-extrabold">Magazyn główny</h3>
        <p className="mt-1 text-muted-foreground">ul. Papierowa 12, 30-001 Kraków, Polska</p>
      </div>
      <div className="grid min-h-40 place-items-center border-t bg-primary-soft/40">
        <MapPin className="size-12 text-primary" />
      </div>
      <div className="p-5">
        <Button variant="outline"><Copy /> Kopiuj współrzędne</Button>
      </div>
    </Card>
  ),
  PageSizeControl: () => (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-card p-4">
      <span className="text-sm font-semibold text-muted-foreground">Wyników na stronie</span>
      {[10, 20, 40, 60].map((value) => (
        <Button key={value} size="sm" variant={value === 10 ? "default" : "outline"}>{value}</Button>
      ))}
    </div>
  ),
  PhoneFrame: () => (
    <div className="w-[340px] rounded-[2rem] border-[10px] border-foreground bg-background p-4 shadow-juz-lg">
      <div className="mx-auto mb-4 h-6 w-28 rounded-full bg-foreground" />
      <Card className="bg-primary p-5 text-primary-foreground">
        <p className="text-sm font-bold uppercase tracking-[0.16em] opacity-80">Dziś</p>
        <p className="mt-2 text-3xl font-extrabold">4 prace w kolejce</p>
      </Card>
      <div className="mt-4 space-y-3">
        {["DLG/00342", "MRK/00339", "FLM/00337"].map((code) => (
          <div className="rounded-md border bg-card p-3 shadow-juz-sm" key={code}>
            <p className="font-mono font-extrabold text-primary">{code}</p>
            <p className="text-sm text-muted-foreground">Produkcja markerów · 30 min</p>
          </div>
        ))}
      </div>
    </div>
  ),
  Popover: () => <PopoverDemo />,
  Progress: () => <ProgressDemo />,
  RadioGroup: () => <RadioGroupDemo />,
  ScrollArea: () => <ScrollAreaDemo />,
  SearchableSelect: () => <SearchableSelectDemo />,
  SectionNavItem: () => (
    <div className="w-[320px] rounded-lg border bg-card p-3">
      <button className="flex w-full items-center gap-3 rounded-md bg-primary-soft px-4 py-3 text-left" type="button">
        <span className="h-10 w-1 rounded-full bg-primary" />
        <span>
          <span className="block font-extrabold text-primary">Dane firmy</span>
          <span className="text-sm font-semibold text-muted-foreground">Wymagane</span>
        </span>
      </button>
    </div>
  ),
  Select: () => <SelectDemo />,
  Separator: () => <SeparatorDemo />,
  Sheet: () => <SheetDemo />,
  Skeleton: () => <SkeletonDemo />,
  Slider: () => <SliderDemo />,
  Spinner: () => <SpinnerDemo />,
  Stepper: () => (
    <div className="w-[980px] max-w-full">
      <Stepper current={4} steps={["Nowe", "Weryfikacja", "Planowanie", "Na produkcji", "Pakowanie", "Wysłane", "Rozliczenie", "Zakończone"]} />
    </div>
  ),
  SummaryTile: () => (
    <Card className="w-[320px] p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-muted-foreground">Rozliczenie</p>
          <p className="mt-2 text-xl font-extrabold">2 460 PLN</p>
          <p className="mt-1 text-sm font-semibold text-success">Opłacone</p>
        </div>
        <span className="grid size-11 place-items-center rounded-md bg-primary-soft text-primary">
          <BarChart3 className="size-5" />
        </span>
      </div>
    </Card>
  ),
  Switch: () => <SwitchDemo />,
  Tabs: () => <TabsDemo />,
  TablePrimitive: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Kod</TableHead>
          <TableHead>Nazwa</TableHead>
          <TableHead>Ilość</TableHead>
          <TableHead>Netto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          ["WK-NIEB-07", "Wkład niebieski 0.7", "1200", "504,00"],
          ["TUSZ-BLK", "Tusz markerowy czarny", "80", "1512,00"]
        ].map(([code, name, qty, net]) => (
          <TableRow key={code}>
            <TableCell className="font-mono font-extrabold text-primary">{code}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{qty}</TableCell>
            <TableCell>{net}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  Textarea: () => <TextareaDemo />,
  Timeline: () => (
    <PlainTimeline
      items={[
        { title: "Telefon: potwierdzono termin produkcji.", meta: "24.05.2026 · Monika Kamińska" },
        { title: "Email: przesłano plik etykiety.", meta: "24.05.2026 · Monika Kamińska" },
        { title: "Notatka: klient zaakceptował próbkę.", meta: "24.05.2026 · Monika Kamińska" }
      ]}
    />
  ),
  Toast: () => <ToastDemo />,
  Toggle: () => <ToggleDemo />,
  ToggleGroup: () => <ToggleGroupDemo />,
  Tooltip: () => (
    <TooltipProvider>
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <Button variant="outline">Najedź, aby zobaczyć tooltip</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          Tooltip z DS juz.pl: krotka pomoc kontekstowa
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  Typography: () => <TypographyAtomDemo />,
  Upload: () => <UploadDemo compact />
};

export const molecules = {
  ActionButtons: () => <div className="flex flex-wrap gap-2"><Button variant="outline"><Eye /> Podgląd</Button><Button><Pencil /> Edytuj</Button><Button variant="destructive"><Trash2 /> Usuń</Button></div>,
  AdvancedFiltersPanel: () => <AdvancedFiltersPanelDemo />,
  Autocomplete: () => <AutocompleteDemo />,
  BasicMenuItem: () => <BasicMenuItemDemo />,
  CalendarEventSection: () => <div className="space-y-2"><b>Pon 23.05 · 120 operacji</b><div className="rounded-md bg-primary-soft p-3">Linia A 10:00 · 2 serie</div><div className="rounded-md bg-muted p-3">Pakowanie 15:00 · 4 partie</div></div>,
  CollapsibleMenuItem: () => <CollapsibleMenuItemDemo />,
  Combobox: () => <ComboboxDemo />,
  ContextMenu: () => <ContextMenuDemo />,
  DatePicker: () => <DatePickerDemo />,
  DropdownMenu: () => <DropdownMenuDemo />,
  FormField: () => <label className="block max-w-md space-y-2"><span className="text-sm font-semibold">Adres e-mail</span><Input placeholder="kontakt@firma.pl" /><span className="text-xs text-muted-foreground">Używany do logowania.</span></label>,
  Header: () => (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold">Linki</h2>
          <p className="text-muted-foreground">Zarządzaj skróconymi linkami.</p>
        </div>
        <Button>Nowy link</Button>
      </div>
      <div className="flex flex-wrap items-start justify-between gap-3 rounded-lg border bg-card p-4">
        <div className="flex items-start gap-3">
          <Button aria-label="Wróć" className="mt-0.5" size="icon" variant="outline">
            <ArrowLeft />
          </Button>
          <div>
            <h2 className="text-2xl font-extrabold">Podgląd szablonu</h2>
            <p className="text-muted-foreground">Powiadomienie o gotowości partii produkcyjnej</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline"><ExternalLink /> Podgląd</Button>
          <Button><Send /> Wyślij wiadomość testową</Button>
        </div>
      </div>
    </div>
  ),
  ModeToggle: () => <ModeToggleDemo />,
  Pagination: () => <PaginationDemo />,
  PrefixInput: () => <div className="flex max-w-md overflow-hidden rounded-md border bg-card"><span className="grid place-items-center bg-muted px-3 text-muted-foreground">juz.pl/</span><Input className="border-0 shadow-none" placeholder="moj-link" /></div>,
  ProfileMenu: () => <ProfileMenuDemo />,
  Table: () => <div className="w-[980px] max-w-full"><DataTablePattern density="record" /></div>,
  Tabs: () => <MoleculeTabsDemo />,
  TextEditor: () => <TextEditorDemo />,
  TimeInput: () => (
    <div className="flex flex-wrap items-end gap-4">
      <label className="space-y-2">
        <span className="block text-sm font-semibold text-muted-foreground">Godzina publikacji</span>
        <Input className="h-11 w-24 text-center font-mono" defaultValue="19:30" type="time" />
      </label>
      <label className="space-y-2">
        <span className="block text-sm font-semibold text-muted-foreground">Od</span>
        <Input className="h-11 w-24 text-center font-mono" defaultValue="10:00" type="time" />
      </label>
      <label className="space-y-2">
        <span className="block text-sm font-semibold text-muted-foreground">Do</span>
        <Input className="h-11 w-24 text-center font-mono" defaultValue="11:20" type="time" />
      </label>
    </div>
  ),
  TimePicker: () => <TimePickerDemo />,
  Upload: () => <UploadDemo />,
  FileActions: () => <FileActionsDemo />,
  WeekWorkstations: () => <WeekWorkstationsView />
};
