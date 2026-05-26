import * as React from "react";
import {
  AlertTriangle,
  Archive,
  ArrowLeft,
  BarChart3,
  Building2,
  Calendar as CalendarIcon,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock as ClockIcon,
  Copy,
  Download,
  Eye,
  ExternalLink,
  FileText,
  GripVertical,
  Layers,
  Link,
  MapPin,
  MoreHorizontal,
  Package,
  Pencil,
  Phone,
  Share2,
  Search,
  Send,
  Settings,
  Trash2,
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
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { ButtonGroup } from "@/components/ui/button-group";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import {
  Command as CommandRoot,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import { DateFilter } from "@/components/ui/date-filter";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Empty } from "@/components/ui/empty";
import { FilterSelect } from "@/components/ui/filter-select";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { InputGroup } from "@/components/ui/input-group";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Kbd } from "@/components/ui/kbd";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger
} from "@/components/ui/menubar";
import { MultiSelect } from "@/components/ui/multi-select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchableSelect } from "@/components/ui/searchable-select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Toaster, toast as showToast } from "@/components/ui/toast";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Typography } from "@/components/ui/typography";
import { Upload } from "@/components/ui/upload";
import { ColumnVisibilitySwitch } from "@/components/ui/column-visibility-switch";
import { DateRangeInput } from "@/components/ui/date-range-input";
import { DonutChart } from "@/components/ui/donut-chart";
import { BarChart as DsBarChart } from "@/components/ui/bar-chart";
import { LineChart as DsLineChart } from "@/components/ui/line-chart";
import { MetricCard } from "@/components/ui/metric-card";
import { SummaryTile } from "@/components/ui/summary-tile";
import { AddressCard } from "@/components/ui/address-card";
import { Autocomplete } from "@/components/ds/autocomplete";
import { BasicMenuItem } from "@/components/ds/basic-menu-item";
import { CollapsibleMenuItem } from "@/components/ds/collapsible-menu-item";
import { Combobox } from "@/components/ds/combobox";
import { DatePicker } from "@/components/ds/date-picker";
import { FileActions } from "@/components/ds/file-actions";
import { Pagination as DsPagination } from "@/components/ds/pagination";
import { ProfileMenu } from "@/components/ds/profile-menu";
import { TextEditor } from "@/components/ds/text-editor";
import { TimePicker } from "@/components/ds/time-picker";

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
    features: ["spójna wysokość z buttonami", "czytelny focus ring-3", "placeholder i disabled w tokenach DS"],
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
        <p className="flex items-center gap-1.5"><ClockIcon className="size-4 text-primary" /> {time} ({duration})</p>
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
        <div className="overflow-x-auto" role="region" aria-label="Kalendarz stanowisk" tabIndex={0}>
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
  const [selectedAction, setSelectedAction] = React.useState("Utwórz złeceńie");
  const commands: Array<{ label: string; description: string; Icon: React.ComponentType<{ className?: string }> }> = [
    { label: "Utwórz złeceńie", description: "Dodaj nowe złeceńie produkcyjne", Icon: FileText },
    { label: "Dodaj produkt", description: "Długopis, mazak albo flamaster", Icon: Layers },
    { label: "Zaplanuj produkcje", description: "Rezerwacja linii i terminu", Icon: Send },
    { label: "Ustawienia", description: "Profile, integracje i uprawnienia", Icon: Settings }
  ];

  return (
    <Card className="w-[520px] max-w-full overflow-hidden p-0">
      <CommandRoot>
        <CommandInput placeholder="Szukaj akcji..." />
        <CommandList>
          <CommandEmpty>Brak pasujacych akcji</CommandEmpty>
          <CommandGroup>
            {commands.map(({ label, description, Icon }) => (
              <CommandItem
                key={label}
                value={label}
                onSelect={() => setSelectedAction(label)}
                className="gap-3"
              >
                <span className="grid size-9 place-items-center rounded-md bg-primary-soft text-primary">
                  <Icon className="size-4" />
                </span>
                <span>
                  <span className="block font-bold">{label}</span>
                  <span className="text-sm text-muted-foreground">{description}</span>
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandRoot>
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
      <Alert variant="info">
        <FileText />
        <AlertTitle>Plan publikacji zapisany.</AlertTitle>
        <AlertDescription>Wpisy pojawia sie w kalendarzu po akceptacji.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTriangle />
        <AlertTitle>Post wymaga akceptacji.</AlertTitle>
        <AlertDescription>Brakuje finalnej grafiki dla kampanii MarkerPro.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <X />
        <AlertTitle>Nie mozna usunac aktywnej serii.</AlertTitle>
        <AlertDescription>Najpierw zatrzymaj publikację i odpnij zaplanowane wpisy.</AlertDescription>
      </Alert>
    </div>
  );
}

function AvatarDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar className="size-16">
        <AvatarFallback className="bg-primary text-xl font-extrabold text-primary-foreground">MP</AvatarFallback>
      </Avatar>
      <Avatar className="size-14">
        <AvatarFallback className="bg-success-soft text-lg font-extrabold text-success">DL</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarFallback className="bg-warning-soft text-base font-extrabold text-warning">KM</AvatarFallback>
      </Avatar>
      <Avatar className="size-10 border bg-card">
        <AvatarFallback className="bg-card text-sm font-extrabold text-muted-foreground">
          <User className="size-5" />
        </AvatarFallback>
      </Avatar>
      <div className="flex -space-x-3">
        {["MP", "DL", "KM", "+4"].map((label, index) => (
          <Avatar className="size-10 border-2 border-card" key={`${label}-${index}`}>
            <AvatarFallback className="bg-primary-soft text-xs font-extrabold text-primary">{label}</AvatarFallback>
          </Avatar>
        ))}
      </div>
    </div>
  );
}

function AspectRatioDemo() {
  return (
    <div className="w-[520px] max-w-full overflow-hidden rounded-lg border bg-card shadow-juz-sm">
      <AspectRatio className="bg-primary-soft p-6" ratio={16 / 9}>
        <div className="flex h-full flex-col justify-between rounded-md border border-primary/20 bg-card/80 p-5">
          <div>
            <p className="juz-label">16:9</p>
            <h3 className="mt-2 text-2xl font-extrabold">Podgląd kampanii</h3>
          </div>
          <p className="text-sm text-muted-foreground">Stały format dla miniaturek, grafik i podglądów publikacji.</p>
        </div>
      </AspectRatio>
    </div>
  );
}

function BreadcrumbDemo() {
  const items = ["Produkcja", "Zlecenia", "ZP/00042/05/26"];

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-sm font-semibold">
        {items.map((item, index) => (
          <React.Fragment key={item}>
            <BreadcrumbItem>
              {index === items.length - 1 ? (
                <BreadcrumbPage>{item}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href="#" className="hover:text-primary">{item}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 ? <BreadcrumbSeparator /> : null}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function ButtonGroupDemo() {
  const [active, setActive] = React.useState("Tydzień");

  return (
    <ButtonGroup>
      {["Dzień", "Tydzień", "Miesiąc"].map((item) => (
        <Button
          key={item}
          aria-pressed={active === item}
          onClick={() => setActive(item)}
          variant={active === item ? "default" : "outline"}
        >
          {item}
        </Button>
      ))}
    </ButtonGroup>
  );
}

function CarouselDemo() {
  const slides: Array<[string, string]> = [
    ["Plan", "120 publikacji zaplanowanych na maj"],
    ["Produkcja", "68% serii w toku"],
    ["Wyniki", "Kliknięcia wzrosły o 24%"]
  ];

  return (
    <div className="w-[520px] max-w-full rounded-lg border bg-card p-4 shadow-juz-sm">
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {slides.map((slide, slideIndex) => (
            <CarouselItem key={slide[0]}>
              <div className="rounded-md bg-primary-soft p-6">
                <p className="juz-label">{slideIndex + 1} / {slides.length}</p>
                <h3 className="mt-2 text-2xl font-extrabold">{slide[0]}</h3>
                <p className="mt-2 text-muted-foreground">{slide[1]}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-3 flex items-center justify-between">
          <CarouselPrevious className="static translate-y-0" />
          <div className="flex gap-1">
            {slides.map((slide) => (
              <span className="h-2 w-8 rounded-full bg-muted" key={slide[0]} />
            ))}
          </div>
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
}

function EmptyDemo() {
  return (
    <Empty
      className="w-[460px] max-w-full border-solid bg-card p-10 shadow-juz-sm"
      icon={<Archive className="size-6 text-primary" />}
      title={<span className="text-xl font-extrabold">Brak publikacji</span>}
      description="Dodaj pierwszy wpis albo zmień filtry, żeby zobaczyć wyniki."
      action={<Button className="mt-5"><PlusIcon /> Dodaj wpis</Button>}
    />
  );
}

function PlusIcon() {
  return <span className="text-xl leading-none">+</span>;
}

function HoverCardDemo() {
  return (
    <div className="w-[520px] max-w-full">
      <HoverCard defaultOpen openDelay={0}>
        <HoverCardTrigger asChild>
          <Button variant="outline" className="font-bold">MarkerPro</Button>
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-[360px]">
          <div className="flex items-center gap-3">
            <Avatar className="size-11">
              <AvatarFallback className="bg-primary text-primary-foreground">MP</AvatarFallback>
            </Avatar>
            <div>
              <b>MarkerPro</b>
              <p className="text-sm text-muted-foreground">Klient produkcyjny · 42 aktywne linki</p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

function InputGroupDemo() {
  return (
    <InputGroup
      className="h-11 w-[520px] max-w-full"
      leading="juz.pl/"
      trailing={
        <Button className="h-full rounded-none border-0 shadow-none" variant="ghost">
          <Copy /> Kopiuj
        </Button>
      }
    >
      <Input defaultValue="markerpro-maj" />
    </InputGroup>
  );
}

function InputOtpDemo() {
  const [value, setValue] = React.useState("24");

  return (
    <div className="space-y-3">
      <InputOTP maxLength={6} value={value} onChange={setValue}>
        <InputOTPGroup className="gap-2">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <InputOTPSlot
              key={index}
              index={index}
              className="h-12 w-11 rounded-md border-l text-lg font-extrabold first:rounded-l-md last:rounded-r-md"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      <p className="text-sm text-muted-foreground">Kod: {value || "—"}</p>
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
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
      <span className="text-muted-foreground">otwiera command palette</span>
    </div>
  );
}

function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Produkcja</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Zlecenia</MenubarItem>
          <MenubarItem>Plan tygodnia</MenubarItem>
          <MenubarItem>Stanowiska</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Magazyn</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Stany</MenubarItem>
          <MenubarItem>Przyjęcia</MenubarItem>
          <MenubarItem>Wydania</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Analityka</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Raporty</MenubarItem>
          <MenubarItem>Wskaźniki</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Ustawienia</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Profile</MenubarItem>
          <MenubarItem>Integracje</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

function PopoverDemo() {
  const [statusColumn, setStatusColumn] = React.useState(true);
  const [rowActions, setRowActions] = React.useState(true);

  return (
    <div className="w-[420px] max-w-full">
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <Settings /> Ustawienia widoku
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <b>Widok listy</b>
          <div className="mt-3 space-y-2">
            <Label className="flex items-center gap-2">
              <Checkbox checked={statusColumn} onCheckedChange={(v) => setStatusColumn(Boolean(v))} /> Kolumna status
            </Label>
            <Label className="flex items-center gap-2">
              <Checkbox checked={rowActions} onCheckedChange={(v) => setRowActions(Boolean(v))} /> Akcje w wierszu
            </Label>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function RadioGroupDemo() {
  const [value, setValue] = React.useState("standard");
  const items: Array<[string, string]> = [
    ["standard", "Standardowy plan publikacji"],
    ["express", "Ekspresowy plan publikacji"],
    ["manual", "Ręczne zatwierdzanie"]
  ];

  return (
    <RadioGroup value={value} onValueChange={setValue} className="space-y-3">
      {items.map(([key, label]) => (
        <Label
          className="flex cursor-pointer items-center gap-3 rounded-md border bg-card p-3 shadow-juz-sm"
          htmlFor={`radio-${key}`}
          key={key}
        >
          <RadioGroupItem id={`radio-${key}`} value={key} />
          <span className="font-semibold">{label}</span>
        </Label>
      ))}
    </RadioGroup>
  );
}

function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-56 w-[420px] max-w-full rounded-lg border bg-card p-3 shadow-juz-sm">
      {Array.from({ length: 18 }, (_, index) => (
        <div className="border-b py-3 last:border-b-0" key={index}>
          <b>Zdarzenie {index + 1}</b>
          <p className="text-sm text-muted-foreground">Aktualizacja statusu partii produkcyjnej.</p>
        </div>
      ))}
    </ScrollArea>
  );
}

function SeparatorDemo() {
  return (
    <div className="space-y-6">
      <div className="w-[420px] max-w-full">
        <b>Plan publikacji</b>
        <Separator className="my-3" />
        <p className="text-sm text-muted-foreground">Separator rozdziela grupy treści w panelach i rekordach.</p>
      </div>
      <div className="flex h-16 items-center gap-4 text-sm text-muted-foreground">
        <span>Zlecenia</span>
        <Separator orientation="vertical" />
        <span>Produkcja</span>
        <Separator orientation="vertical" />
        <span>Magazyn</span>
      </div>
    </div>
  );
}

function SheetDemo() {
  const [status, setStatus] = React.useState(true);
  const [termin, setTermin] = React.useState(true);
  const [opiekun, setOpiekun] = React.useState(false);

  return (
    <div className="w-[620px] max-w-full">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Pokaż panel boczny</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Kolumny</SheetTitle>
            <SheetDescription>Wybierz kolumny widoczne w tabeli.</SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-3 text-sm">
            <Label className="flex items-center gap-2">
              <Checkbox checked={status} onCheckedChange={(v) => setStatus(Boolean(v))} /> Status
            </Label>
            <Label className="flex items-center gap-2">
              <Checkbox checked={termin} onCheckedChange={(v) => setTermin(Boolean(v))} /> Termin
            </Label>
            <Label className="flex items-center gap-2">
              <Checkbox checked={opiekun} onCheckedChange={(v) => setOpiekun(Boolean(v))} /> Opiekun
            </Label>
          </div>
          <SheetFooter className="mt-6">
            <SheetClose asChild>
              <Button variant="outline">Zamknij</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function DrawerDemo() {
  return (
    <div className="w-[620px] max-w-full">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <ChevronDown className="-rotate-90" /> Otwórz drawer
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-xl font-extrabold">Szybkie akcje wpisu</DrawerTitle>
            <DrawerDescription>Wariant dolnego panelu dla mobile i gestow.</DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-2 px-4 pb-4 sm:grid-cols-3">
            <Button variant="outline"><Eye /> Podgląd</Button>
            <Button><Pencil /> Edytuj</Button>
            <Button variant="destructive"><Trash2 /> Usuń</Button>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="ghost">Zamknij</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function SliderDemo() {
  const [value, setValue] = React.useState([68]);

  return (
    <div className="block w-[420px] max-w-full space-y-3">
      <Label className="font-bold">Priorytet kampanii: {value[0]}%</Label>
      <Slider value={value} onValueChange={setValue} max={100} min={0} step={1} />
    </div>
  );
}

function ToastDemo() {
  return (
    <div className="w-[420px] max-w-full">
      <Button
        onClick={() =>
          showToast.success("Widok zapisany", {
            description: "Ustawienia kolumn zostały zapamiętane."
          })
        }
      >
        Pokaż toast
      </Button>
      <Toaster />
    </div>
  );
}

function ToggleDemo() {
  const [pressed, setPressed] = React.useState(true);

  return (
    <Toggle aria-label="Widoczność" pressed={pressed} onPressedChange={setPressed} variant="outline">
      <Eye /> {pressed ? "Widoczne" : "Ukryte"}
    </Toggle>
  );
}

function ToggleGroupDemo() {
  const [active, setActive] = React.useState("Lista");

  return (
    <ToggleGroup
      type="single"
      value={active}
      onValueChange={(value) => value && setActive(value)}
      variant="outline"
    >
      {["Lista", "Karty", "Kalendarz"].map((item) => (
        <ToggleGroupItem key={item} value={item}>
          {item}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

function TypographyAtomDemo() {
  return (
    <div className="space-y-3">
      <p className="juz-label">Typography primitive</p>
      <Typography variant="h1" className="text-4xl font-extrabold">Nagłówek rekordu</Typography>
      <Typography variant="muted" className="text-base">Tekst pomocniczy zgodny z tokenami typografii juz.pl.</Typography>
      <Typography variant="code">ZP/00042/05/26</Typography>
    </div>
  );
}

function ProgressDemo() {
  const values: Array<[string, number, string]> = [
    ["Produkcja", 68, "[&>div]:bg-primary"],
    ["Pakowanie", 42, "[&>div]:bg-success"],
    ["Ryzyko opóźnienia", 18, "[&>div]:bg-warning"]
  ];

  return (
    <div className="w-[560px] max-w-full space-y-5">
      {values.map(([label, value, colorClass]) => (
        <div key={label}>
          <div className="mb-2 flex justify-between text-sm font-bold">
            <span>{label}</span>
            <span>{value}%</span>
          </div>
          <Progress value={value} className={`h-3 ${colorClass}`} />
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
          <Checkbox
            checked={item.checked}
            onCheckedChange={(value) => item.onChange(Boolean(value))}
            className="mt-0.5"
          />
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
  const [selected, setSelected] = React.useState<Date | undefined>(new Date(2026, 4, 24));

  return (
    <div className="w-[340px] rounded-lg border bg-card p-4 shadow-juz-sm">
      <p className="mb-2 text-center text-xs text-muted-foreground">Wybierz datę publikacji</p>
      <CalendarComponent
        mode="single"
        selected={selected}
        onSelect={setSelected}
        defaultMonth={new Date(2026, 4, 1)}
      />
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
  const options = ["PZ", "WZ", "MM", "RW", "PW", "FZ", "WP", "Korekta", "Inwentaryzacja"].map(
    (label) => ({ value: label, label })
  );
  const [selected, setSelected] = React.useState<string | undefined>(undefined);

  return (
    <div className="w-[540px] max-w-full">
      <Label className="mb-2 block text-sm font-bold text-muted-foreground" htmlFor="filter-select-trigger">
        Typ
      </Label>
      <FilterSelect
        options={options}
        value={selected}
        onValueChange={setSelected}
        placeholder="Wszystkie"
        className="h-11 w-full"
      />
      <p className="mt-3 text-sm text-muted-foreground">
        Wybrano: <strong className="text-foreground">{selected ?? "Wszystkie"}</strong>
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
              <Skeleton className="size-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
            <Skeleton className="h-24 rounded-lg" />
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
  const [notify, setNotify] = React.useState(false);

  return (
    <div className="w-[420px] space-y-4">
      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-md border bg-card p-3 shadow-juz-sm">
        <span>
          <span className="block font-semibold">Automatyzacja</span>
          <span className="text-sm text-muted-foreground">{checked ? "Włączona" : "Wyłączona"}</span>
        </span>
        <Switch checked={checked} onCheckedChange={setChecked} />
      </label>
      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-md border bg-card p-3 shadow-juz-sm">
        <span>
          <span className="block font-semibold">Powiadomienia mailowe</span>
          <span className="text-sm text-muted-foreground">{notify ? "Wysyłam do brygadzistów" : "Wyłączone"}</span>
        </span>
        <Switch checked={notify} onCheckedChange={setNotify} />
      </label>
    </div>
  );
}

function SpinnerDemo() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <Spinner size="sm" variant="primary" label="Ładowanie małe" />
      <Spinner size="lg" variant="primary" label="Ładowanie standard" />
      <Button disabled>
        <Spinner size="sm" className="text-primary-foreground/70" />
        Zapisywanie...
      </Button>
      <div className="flex items-center gap-2 rounded-md border bg-card px-3 py-2 text-sm font-semibold shadow-juz-sm">
        <Spinner size="sm" variant="primary" />
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
    { value: "MarkerPro", label: "MarkerPro" },
    { value: "PaperLine", label: "PaperLine" },
    { value: "KolorMix", label: "KolorMix" },
    { value: "OfficePilot", label: "OfficePilot" }
  ];
  const [selected, setSelected] = React.useState<string>("MarkerPro");

  return (
    <div className="w-[480px] max-w-full">
      <Label className="mb-2 block text-sm font-bold text-muted-foreground" htmlFor="autocomplete-client">
        Klient
      </Label>
      <Autocomplete
        options={options}
        value={selected}
        onValueChange={setSelected}
        placeholder="Wpisz klienta..."
        searchPlaceholder="Szukaj..."
        emptyMessage="Brak wyników"
      />
      <p className="mt-3 text-sm text-muted-foreground">
        Wybrano: <strong className="text-foreground">{selected}</strong>
      </p>
    </div>
  );
}

function BasicMenuItemDemo() {
  const items = [
    { label: "Raport produkcji", Icon: FileText },
    { label: "Zlecenia produkcyjne", Icon: ClipboardList },
    { label: "Ustawienia konta", Icon: Settings }
  ];
  const [active, setActive] = React.useState(items[0].label);

  return (
    <div className="w-[420px] max-w-full rounded-lg border bg-card p-2 shadow-juz-sm">
      <div className="space-y-1">
        {items.map(({ label, Icon }) => (
          <BasicMenuItem
            key={label}
            icon={<Icon className="size-4" />}
            label={label}
            active={active === label}
            onClick={() => setActive(label)}
          />
        ))}
      </div>
      <div className="mt-2 rounded-md bg-muted/55 px-3 py-2 text-sm">
        Aktywna pozycja: <strong>{active}</strong>
      </div>
    </div>
  );
}

function DatePickerDemo() {
  const [value, setValue] = React.useState<Date | undefined>(new Date(2026, 4, 24));

  return (
    <div className="w-[360px] max-w-full">
      <DatePicker value={value} onValueChange={setValue} placeholder="Wybierz datę" />
      <p className="mt-3 text-sm text-muted-foreground">
        Wybrano: <strong className="text-foreground">{value ? value.toLocaleDateString("pl-PL") : "—"}</strong>
      </p>
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
  ].map((label) => ({ value: label, label }));
  const [selected, setSelected] = React.useState("Długopis S.A.");

  return (
    <div className="w-[460px] max-w-full">
      <Label className="mb-2 block text-sm font-bold text-muted-foreground" htmlFor="searchable-select-trigger">
        Klient
      </Label>
      <SearchableSelect
        options={options}
        value={selected}
        onValueChange={setSelected}
        placeholder="Wybierz klienta"
        searchPlaceholder="Szukaj..."
        empty="Brak wyników"
      />
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
  ].map((label) => ({ value: label, label }));
  const [selected, setSelected] = React.useState<string[]>(["Linia A", "Kontrola jakości"]);

  return (
    <div className="w-[560px] max-w-full">
      <Label className="mb-2 block text-sm font-bold text-muted-foreground" htmlFor="multi-select-trigger">
        Obszary produkcji
      </Label>
      <MultiSelect
        options={options}
        value={selected}
        onValueChange={setSelected}
        placeholder="Wybierz..."
        searchPlaceholder="Szukaj..."
        empty="Brak wyników"
      />
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
  const [value, setValue] = React.useState<Date | undefined>(new Date(2026, 4, 24));

  return (
    <div className="w-[520px] max-w-full">
      <Label className="mb-2 block text-sm font-bold text-muted-foreground" htmlFor="date-filter">
        Data wystawienia
      </Label>
      <DateFilter
        value={value}
        onValueChange={setValue}
        placeholder="dd.mm.rrrr"
        className="h-12"
      />
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
            <Select value={filters.status} onValueChange={(value) => update("status", value)}>
              <SelectTrigger className="h-12 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Wszystkie">Wszystkie</SelectItem>
                <SelectItem value="Aktywne">Aktywne</SelectItem>
                <SelectItem value="W przygotowaniu">W przygotowaniu</SelectItem>
              </SelectContent>
            </Select>
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
  const [content, setContent] = React.useState("Seria MarkerPro startuje w poniedziałek. Potwierdź plan publikacji i materiały graficzne.");

  return (
    <div className="w-[680px] max-w-full">
      <TextEditor
        value={content}
        onValueChange={setContent}
        placeholder="Treść posta..."
        ariaLabel="Treść posta"
      />
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-b-md border-t bg-muted/25 px-3 py-2 text-sm text-muted-foreground">
        <span>{content.replace(/<[^>]+>/g, "").length} znaków</span>
        <span>Bez mediow</span>
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
  const options = ["MarkerPro", "PaperLine", "KolorMix", "OfficePilot"].map((label) => ({
    value: label,
    label
  }));
  const [selected, setSelected] = React.useState("MarkerPro");

  return (
    <div className="w-[360px] max-w-full">
      <Combobox
        options={options}
        value={selected}
        onValueChange={setSelected}
        placeholder="Wybierz klienta"
        searchPlaceholder="Szukaj..."
        empty="Brak wyników"
      />
      <p className="mt-3 text-sm text-muted-foreground">Wybrano: <strong className="text-foreground">{selected}</strong></p>
    </div>
  );
}

function ContextMenuDemo() {
  const [action, setAction] = React.useState("Brak");

  return (
    <div className="w-[420px] max-w-full">
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="rounded-lg border bg-muted/35 p-5">
            <b>ZP/00042/05/26</b>
            <p className="mt-1 text-sm text-muted-foreground">Kliknij prawym albo użyj widocznego menu akcji.</p>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          {["Edytuj", "Duplikuj", "Archiwizuj"].map((label) => (
            <ContextMenuItem key={label} onSelect={() => setAction(label)}>
              {label}
            </ContextMenuItem>
          ))}
          <ContextMenuSeparator />
          <ContextMenuItem
            className="text-destructive focus:bg-destructive-soft focus:text-destructive"
            onSelect={() => setAction("Usuń")}
          >
            Usuń
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <p className="mt-3 text-sm text-muted-foreground">Akcja: <strong className="text-foreground">{action}</strong></p>
    </div>
  );
}

function ModeToggleDemo() {
  const [mode, setMode] = React.useState("Jasny");
  return (
    <div>
      <ToggleGroup
        type="single"
        value={mode}
        onValueChange={(value) => value && setMode(value)}
        className="gap-2 rounded-md bg-muted p-1"
      >
        {["Jasny", "Ciemny", "System"].map((item) => (
          <ToggleGroupItem
            key={item}
            value={item}
            size="sm"
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
          >
            {item}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <p className="mt-3 text-sm text-muted-foreground">Tryb: <strong className="text-foreground">{mode}</strong></p>
    </div>
  );
}

function PaginationDemo() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState("10");
  const total = 73;
  const pageCount = Math.ceil(total / Number(pageSize));
  const currentPage = Math.min(page, pageCount);
  const first = (currentPage - 1) * Number(pageSize) + 1;
  const last = Math.min(currentPage * Number(pageSize), total);

  React.useEffect(() => {
    setPage(1);
  }, [pageSize]);

  return (
    <div className="w-full rounded-lg border bg-card p-4 shadow-juz-sm">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <p className="text-sm font-semibold text-muted-foreground">
          Pokazano <span className="text-foreground">{first}-{last}</span> z <span className="text-foreground">{total}</span> wyników
        </p>
        <DsPagination
          page={currentPage}
          pageCount={pageCount}
          onPageChange={setPage}
        />
        <label className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          Wyników na stronie
          <Select value={pageSize} onValueChange={setPageSize}>
            <SelectTrigger className="h-10 w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 40, 60].map((size) => (
                <SelectItem key={size} value={String(size)}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
      </div>
    </div>
  );
}

function ProfileMenuDemo() {
  const [action, setAction] = React.useState("Brak");

  return (
    <div className="w-[320px] max-w-full">
      <ProfileMenu
        user={{ name: "Kamil Pawłowski", email: "kamil@juz.pl", role: "Brygadzista" }}
        items={[
          { key: "profile", label: "Profil", onClick: () => setAction("Profil") },
          { key: "settings", label: "Ustawienia", onClick: () => setAction("Ustawienia") }
        ]}
        onLogout={() => setAction("Wyloguj")}
        showName
        align="start"
      />
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
  const [time, setTime] = React.useState("19:30");

  return (
    <div className="w-[260px] max-w-full">
      <TimePicker value={time} onValueChange={setTime} />
      <p className="mt-3 text-sm text-muted-foreground">Godzina: <strong className="text-foreground">{time}</strong></p>
    </div>
  );
}

function CollapsibleMenuItemDemo() {
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
        <CollapsibleMenuItem
          label="Obszary"
          defaultOpen
          items={items.map((item) => ({
            key: item.label,
            label: item.label,
            count: item.count,
            active: active === item.label,
            onClick: () => setActive(item.label)
          }))}
        />
      </nav>
      <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm font-semibold text-muted-foreground">
        Wybrana pozycja: <span className="text-foreground">{active}</span>
      </div>
    </div>
  );
}

function FileActionsDemo() {
  const [action, setAction] = React.useState("Brak");
  const buttons = [
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
        {buttons.map(({ label, icon: Icon, variant }) => (
          <Button key={label} onClick={() => setAction(label)} size="sm" variant={variant}>
            <Icon />
            {label}
          </Button>
        ))}
        <Button aria-label="Więcej akcji" onClick={() => setAction("Więcej")} size="icon" variant="outline">
          <MoreHorizontal />
        </Button>
      </div>

      <FileActions
        file={{
          name: "faktura-markerpro-05-2026.pdf",
          size: 248 * 1024,
          type: "application/pdf"
        }}
        actions={[
          { key: "preview", label: "Szybki podglad", icon: <Eye />, onClick: () => setAction("Szybki podglad") },
          { key: "download", label: "Szybkie pobranie", icon: <Download />, onClick: () => setAction("Szybkie pobranie") },
          { key: "delete", label: "Szybkie usuniecie", icon: <Trash2 />, onClick: () => setAction("Szybkie usuniecie") }
        ]}
      />
      <p className="text-sm text-muted-foreground">Ostatnia akcja: <strong className="text-foreground">{action}</strong></p>
    </div>
  );
}

function UploadDemo({ compact = false }: { compact?: boolean }) {
  const [files, setFiles] = React.useState<File[]>(() => [
    new File(["brief"], "brief-markerpro.pdf", { type: "application/pdf" }),
    new File(["etykieta"], "etykieta-flamaster.png", { type: "image/png" })
  ]);

  return (
    <div className={compact ? "w-[520px] max-w-full" : "w-[720px] max-w-full"}>
      <Upload
        value={files}
        onValueChange={setFiles}
        label={compact ? "Dodaj plik" : "Prześlij media lub dokument"}
        hint="PDF, PNG, JPG, XLSX do 25 MB"
      />
    </div>
  );
}

function ColumnVisibilitySwitchDemo() {
  const [columns, setColumns] = React.useState([
    { id: "code", label: "Numer dokumentu", visible: true },
    { id: "date", label: "Data", visible: true },
    { id: "status", label: "Status", visible: true },
    { id: "warehouse", label: "Magazyn", visible: false }
  ]);

  return (
    <ColumnVisibilitySwitch
      columns={columns}
      onChange={(id, visible) =>
        setColumns((prev) =>
          prev.map((column) => (column.id === id ? { ...column, visible } : column))
        )
      }
    />
  );
}

function DateRangeInputDemo() {
  const [range, setRange] = React.useState<import("react-day-picker").DateRange | undefined>(() => ({
    from: new Date(2026, 4, 1),
    to: new Date(2026, 4, 14)
  }));

  return (
    <div className="w-[540px] max-w-full">
      <DateRangeInput value={range} onValueChange={setRange} />
    </div>
  );
}

function BarChartAtomDemo() {
  return (
    <div className="w-full">
      <DsBarChart
        data={[
          { label: "Pn", value: 42 },
          { label: "Wt", value: 66 },
          { label: "Śr", value: 38 },
          { label: "Cz", value: 84 },
          { label: "Pt", value: 71 }
        ]}
        categoryKey="label"
        series={[{ key: "value", label: "Operacje" }]}
      />
    </div>
  );
}

function LineChartAtomDemo() {
  return (
    <div className="w-full">
      <DsLineChart
        data={[
          { label: "Pn", value: 52 },
          { label: "Wt", value: 71 },
          { label: "Śr", value: 63 },
          { label: "Cz", value: 82 },
          { label: "Pt", value: 68 }
        ]}
        categoryKey="label"
        series={[{ key: "value", label: "Skuteczność" }]}
      />
    </div>
  );
}

function DonutChartAtomDemo() {
  return (
    <DonutChart
      data={[
        { key: "production", value: 48, label: "W produkcji" },
        { key: "done", value: 24, label: "Gotowe" },
        { key: "planned", value: 17, label: "Planowane" },
        { key: "attention", value: 11, label: "Wymaga uwagi" }
      ]}
    />
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
  BarChart: () => <BarChartAtomDemo />,
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
  ColumnVisibilitySwitch: () => <ColumnVisibilitySwitchDemo />,
  Collapsible: () => (
    <Collapsible defaultOpen trigger="Zaawansowane ustawieńia linii">
      Limity serii, priorytet i rezerwacja stanowiska.
    </Collapsible>
  ),
  Command: () => <CommandDemo />,
  DateRangeInput: () => <DateRangeInputDemo />,
  DecimalInput: () => <DecimalInputDemo />,
  DateFilter: () => <DateFilterDemo />,
  Dialog: () => <DialogDemo />,
  DonutChart: () => <DonutChartAtomDemo />,
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
  LineChart: () => <LineChartAtomDemo />,
  Logo: () => <JuzLogo />,
  MetricCard: () => (
    <div className="grid w-[880px] max-w-full gap-4 md:grid-cols-3">
      {metricCardItems.map(([label, value, Icon]) => (
        <MetricCard
          key={label}
          label={label}
          value={value}
          icon={<Icon />}
        />
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
    <AddressCard
      className="w-[520px] max-w-full"
      name="Magazyn główny"
      street="ul. Papierowa 12"
      postalCode="30-001"
      city="Kraków"
      country="Polska"
      tax="6761234568"
      phone="+48 12 345 67 89"
      email="kontakt@firma.pl"
      isPrimary
    />
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
    <div className="w-[340px] rounded-4xl border-10 border-foreground bg-background p-4 shadow-juz-lg">
      <div className="mx-auto mb-4 h-6 w-28 rounded-full bg-foreground" />
      <Card className="bg-primary p-5 text-primary-foreground">
        {/* `opacity-80` on inherited `text-primary-foreground` (white) over
            `bg-primary` blends to #e3d7fd (~4.3:1, FAIL AA). Drop the opacity
            so this hero label still reads on the dark primary surface. */}
        <p className="text-sm font-bold uppercase tracking-[0.16em]">Dziś</p>
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
    <SummaryTile
      className="w-[320px]"
      label="Rozliczenie"
      value="2 460 PLN"
      hint="Opłacone"
    />
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
