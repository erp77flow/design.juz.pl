import * as React from "react";
import {
  ArrowLeft,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  FileText,
  Filter,
  Mail,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  Plus,
  RefreshCcw,
  Save,
  Search,
  Settings,
  Smartphone,
  Truck,
  User,
  Warehouse,
  Wrench,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { DetailHeader } from "@/components/ds/detail-header";

function ScreenShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen w-full bg-background p-6 text-foreground">{children}</div>;
}

function ScreenHeader({
  title,
  description,
  actions
}: {
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-extrabold tracking-normal">{title}</h1>
        <p className="mt-1 text-base font-medium text-muted-foreground">{description}</p>
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

function MetricCard({
  label,
  value,
  helper,
  icon: Icon
}: {
  label: string;
  value: string;
  helper?: string;
  icon: React.ElementType;
}) {
  return (
    <Card className="min-h-[128px] p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="whitespace-nowrap text-sm font-semibold leading-5 text-muted-foreground">{label}</p>
          <p className="mt-2 whitespace-nowrap text-xl font-extrabold leading-tight tracking-normal">
            {value}
          </p>
          {helper ? <p className="mt-1 text-sm font-semibold text-success">{helper}</p> : null}
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-md bg-primary-soft text-primary">
          <Icon className="size-5" />
        </span>
      </div>
    </Card>
  );
}

function MiniMonth() {
  const days = ["pon", "wto", "śro", "czw", "pia", "sob", "nie"];
  const dates = [27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <Button size="icon" variant="outline" aria-label="Poprzedni miesiąc">
          <ArrowLeft className="size-4" />
        </Button>
        <b>maj 2026</b>
        <Button size="icon" variant="outline" aria-label="Następny miesiąc">
          <ChevronDown className="-rotate-90" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {days.map((day) => (
          <span className="pb-2 font-bold text-muted-foreground" key={day}>{day}</span>
        ))}
        {dates.map((date, index) => (
          <span
            className={[
              "grid size-9 place-items-center rounded-md font-bold",
              date === 24 ? "bg-primary text-primary-foreground shadow-juz" : "",
              index < 4 ? "text-muted-foreground" : ""
            ].join(" ")}
            key={`${date}-${index}`}
          >
            {date}
          </span>
        ))}
      </div>
    </Card>
  );
}

export function MachineLoadCard({
  name,
  model,
  value,
  time
}: {
  name: string;
  model: string;
  value: number;
  time: string;
}) {
  const tone = value > 100 ? "bg-destructive" : value > 80 ? "bg-warning" : "bg-primary";

  return (
    <div className="rounded-md border bg-card p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-extrabold">{name}</p>
          <p className="text-sm font-medium text-muted-foreground">{model}</p>
        </div>
        <b>{value}%</b>
      </div>
      <div className="mt-3 h-2 rounded-full bg-muted">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
      <p className="mt-2 text-sm font-semibold text-muted-foreground">{time}</p>
    </div>
  );
}

export function ProductionTaskCard({
  code,
  title,
  time,
  progress,
  tone = "primary"
}: {
  code: string;
  title: string;
  time: string;
  progress: number;
  tone?: "primary" | "warning" | "success" | "destructive";
}) {
  const toneClass = {
    primary: "border-l-primary bg-primary-soft/60",
    warning: "border-l-warning bg-warning-soft/70",
    success: "border-l-success bg-success-soft/70",
    destructive: "border-l-destructive bg-destructive-soft/70"
  }[tone];

  return (
    <article className={`rounded-md border border-l-4 p-3 shadow-juz-sm ${toneClass}`}>
      <div className="min-w-0">
        <p className="font-mono text-sm font-extrabold">{code}</p>
        <p className="truncate text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">{title}</p>
      </div>
      <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold"><Clock className="size-4" /> {time}</p>
      <div className="mt-3 h-2 rounded-full bg-card">
        <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
      </div>
    </article>
  );
}

export function ProductionCalendarScreen() {
  const machines = [
    ["Linia A", "Długopis Classic", 82, "6h 35m / 8h"],
    ["Linia B", "Marker Pro", 65, "5h 10m / 8h"],
    ["Linia C", "Flamaster Kids", 109, "8h 25m / 8h"],
    ["Pakowanie", "Zestawy szkolne", 45, "3h 15m / 8h"],
    ["Kontrola", "QA optyczne", 90, "7h 15m / 8h"]
  ] as const;

  const hours = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
  const columns = ["Linia A", "Linia B", "Linia C", "Pakowanie", "Kontrola"];
  const events = [
    { col: 0, row: 0, code: "ZP/00091", title: "Długopis Classic niebieski", time: "07:30 - 09:35", progress: 100, tone: "success" as const },
    { col: 1, row: 2, code: "ZP/00092", title: "Marker permanent czarny", time: "09:40 - 12:00", progress: 60 },
    { col: 2, row: 1, code: "ZP/00093", title: "Flamaster Kids 12 kolorów", time: "08:15 - 11:45", progress: 20, tone: "warning" as const },
    { col: 3, row: 5, code: "ZP/00094", title: "Pakiet B2B 500 szt.", time: "12:30 - 15:00", progress: 35 },
    { col: 4, row: 0, code: "QA/00018", title: "Kontrola partii MP-24", time: "07:45 - 10:45", progress: 75 }
  ];

  return (
    <ScreenShell>
      <ScreenHeader
        title="Kalendarz produkcji - Długopis S.A."
        description="Dzienny plan pracy linii, obciążenie stanowisk i zlecenia w osi czasu."
        actions={
          <>
            <Button variant="outline"><RefreshCcw /> Odśwież</Button>
            <Button variant="outline"><CalendarDays /> Dzisiaj</Button>
            <Button><Filter /> Filtry</Button>
          </>
        }
      />

      <div className="mb-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard icon={BarChart3} label="Łączne obciążenie" value="78%" helper="26h 15m / 33h 30m" />
        <MetricCard icon={Package} label="Aktywne zlecenia" value="7" />
        <MetricCard icon={CalendarDays} label="Zaplanowane" value="5" />
        <MetricCard icon={Bell} label="Opóźnione" value="2" />
        <MetricCard icon={Wrench} label="Stanowiska wolne" value="1" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[340px_minmax(0,1fr)]">
        <div className="space-y-4">
          <MiniMonth />
          <Card className="space-y-3 p-4">
            <p className="juz-label">Maszyna</p>
            {machines.map(([name, model, value, time]) => (
              <MachineLoadCard key={name} model={model} name={name} time={time} value={value} />
            ))}
          </Card>
        </div>

        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
            <div>
              <h2 className="text-xl font-extrabold">24.05.2026 (Wtorek)</h2>
              <p className="text-sm text-muted-foreground">Auto-odswiezanie za 20 s</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Dzien</Button>
              <Button variant="outline">Tydzien</Button>
              <Button variant="outline">Zmiana <ChevronDown /></Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[1080px]">
              <div className="grid grid-cols-[72px_repeat(5,minmax(190px,1fr))] border-b bg-muted/45">
                <div className="border-r p-3" />
                {columns.map((column) => (
                  <div className="border-r p-3 text-center text-sm font-extrabold text-muted-foreground last:border-r-0" key={column}>{column}</div>
                ))}
              </div>
              <div className="relative grid grid-cols-[72px_repeat(5,minmax(190px,1fr))]">
                <div className="col-span-full grid grid-cols-[72px_repeat(5,minmax(190px,1fr))]">
                  {hours.map((hour) => (
                    <React.Fragment key={hour}>
                      <div className="h-28 border-r border-t p-3 text-right text-sm font-bold text-muted-foreground">{hour}</div>
                      {columns.map((column) => <div className="h-28 border-r border-t last:border-r-0" key={`${hour}-${column}`} />)}
                    </React.Fragment>
                  ))}
                </div>
                <div className="absolute left-0 right-0 top-[250px] border-t-2 border-primary">
                  <span className="absolute -top-3 left-3 rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">10:35</span>
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
                    <ProductionTaskCard {...event} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </ScreenShell>
  );
}

export function ProductionMobileUserScreen() {
  const tasks = [
    ["ZL/00342", "Marker Pro czarny - partia 2500 szt.", "W toku", "Nadruk", "ok. 1h 10m"],
    ["ZL/00339", "Długopis Classic - niebieski", "Oczekuje", "Montaz", "2h 15m"],
    ["ZL/00337", "Flamaster Kids - komplet 12", "Pilne", "Pakowanie", "30 min"],
    ["ZL/00331", "Mazak Whiteboard - zielony", "Oczekuje", "Kontrola", "45 min"]
  ];

  return (
    <ScreenShell>
      <ScreenHeader
        title="Wersja mobilna"
        description="Konto użytkownika produkcji: kolejka zadań, karta pracy, status etapu i komunikacja na telefonie."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <PhoneFrame>
          <div className="mb-5 flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">9:41</p>
              <h2 className="mt-3 text-2xl font-extrabold">Witaj, Kamil</h2>
              <p className="juz-label mt-1">Dzis · Sroda 24 Maj</p>
            </div>
            <span className="grid size-11 place-items-center rounded-md bg-primary text-primary-foreground">MW</span>
          </div>
          <div className="mb-5 grid grid-cols-4 gap-2">
            {[
              ["4", "w kolejce"],
              ["1", "w toku"],
              ["3", "oczekuje"],
              ["2", "pilne"]
            ].map(([value, label]) => (
              <div className="rounded-md bg-muted p-3 text-center" key={label}>
                <p className="text-xl font-extrabold">{value}</p>
                <p className="text-xs font-semibold text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
          <div className="mb-3 flex items-center justify-between">
            <b>Twoja kolejka</b>
            <Button size="sm" variant="outline">Sortuj <ChevronDown /></Button>
          </div>
          <div className="space-y-3">
            {tasks.map(([code, title, status, stage, time]) => (
              <Card className="p-4" key={code}>
                <div className="flex items-start justify-between gap-2">
                  <b className="font-mono">{code}</b>
                  <Badge variant={status === "Pilne" ? "destructive" : status === "W toku" ? "default" : "neutral"}>{status}</Badge>
                </div>
                <p className="mt-2 font-semibold">{title}</p>
                <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                  <span>{stage}</span>
                  <span>{time}</span>
                </div>
              </Card>
            ))}
          </div>
          <MobileNav label="Nawigacja mobilna — kolejka zadań" />
        </PhoneFrame>

        <PhoneFrame>
          <p className="text-sm font-semibold text-muted-foreground">9:41</p>
          <h2 className="mt-4 text-2xl font-extrabold">Karta zadańia</h2>
          <Card className="mt-5 p-4">
            <p className="juz-label">Obecny etap</p>
            <h3 className="mt-1 text-xl font-extrabold">Nadruk UV</h3>
            <div className="mt-4 h-2 rounded-full bg-muted"><div className="h-full w-[65%] rounded-full bg-primary" /></div>
            <p className="mt-2 text-sm font-semibold text-muted-foreground">65% · ~1h 10m do konca</p>
          </Card>
          <Card className="mt-4 p-4">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-md bg-primary-soft font-extrabold text-primary">DS</span>
              <div>
                <b>Długopis S.A.</b>
                <p className="text-sm text-muted-foreground">ZL/2026/00342</p>
              </div>
            </div>
            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
              {[
                ["Produkt", "Marker Pro"],
                ["Kolor", "Czarny"],
                ["Ilość", "2500 szt."],
                ["Termin", "26.05.2026"],
                ["Tryb", "Standardowy"],
                ["Materiał", "PP + tusz"]
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="font-semibold text-muted-foreground">{label}</dt>
                  <dd className="font-extrabold">{value}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <div className="mt-4 grid gap-2">
            <Button><Check /> Zakończ etap</Button>
            <Button variant="outline"><Bell /> Zglos problem</Button>
          </div>
          <MobileNav label="Nawigacja mobilna — karta zadania" />
        </PhoneFrame>

        <PhoneFrame>
          <p className="text-sm font-semibold text-muted-foreground">9:41</p>
          <h2 className="mt-4 text-2xl font-extrabold">Czat produkcyjny</h2>
          <div className="mt-5 space-y-4">
            {[
              ["Planista", "Czy mozemy przyspieszyć partie MP-24?", "09:14"],
              ["Kamil", "Tak, ustawiam ja po biezacym nadruku.", "11:42"],
              ["Kontrola", "Prosimy o dodatkowa próbkę koloru.", "13:20"]
            ].map(([author, text, time]) => (
              <Card className="p-4" key={time}>
                <div className="mb-1 flex items-center justify-between">
                  <b>{author}</b>
                  <span className="text-xs font-semibold text-muted-foreground">{time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{text}</p>
              </Card>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <Input placeholder="Napisz wiadomość..." />
            <Button size="icon" aria-label="Wyślij"><MessageSquare /></Button>
          </div>
          <MobileNav label="Nawigacja mobilna — czat produkcyjny" />
        </PhoneFrame>
      </div>
    </ScreenShell>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[390px] rounded-[28px] border bg-card p-4 shadow-juz-lg">
      <div className="min-h-[760px] rounded-[20px] bg-background p-4">{children}</div>
    </div>
  );
}

function MobileNav({ label = "Nawigacja mobilna" }: { label?: string }) {
  return (
    <nav aria-label={label} className="sticky bottom-0 mt-5 grid grid-cols-5 gap-1 rounded-lg border bg-card p-2 text-center text-[11px] leading-[1.5] font-bold text-muted-foreground">
      {[
        [FileText, "Zadania"],
        [Smartphone, "Skan"],
        [Wrench, "Stanow."],
        [MessageSquare, "Czat"],
        [User, "Profil"]
      ].map(([Icon, label]) => (
        <span className="grid place-items-center gap-1 rounded-md p-2 first:bg-primary-soft first:text-primary" key={label as string}>
          {React.createElement(Icon as React.ElementType, { className: "size-4" })}
          {label as string}
        </span>
      ))}
    </nav>
  );
}

export function ProductionCostsScreen() {
  const categories = [
    ["Materiały", "64 470 zł", "+2.1%", "35", "primary"],
    ["Praca", "46 050 zł", "+1.8%", "25", "warning"],
    ["Energia", "36 840 zł", "-0.5%", "20", "success"],
    ["Transport", "22 104 zł", "+5.3%", "12", "destructive"],
    ["Inne", "14 736 zł", "-2.0%", "8", "neutral"]
  ] as const;

  return (
    <ScreenShell>
      <ScreenHeader
        title="Analiza kosztów produkcji"
        description="Rozkład kosztów i trendy dla linii Długopis S.A."
        actions={<Button><DownloadIcon /> Eksport</Button>}
      />
      <div className="mb-5 grid gap-4 md:grid-cols-4">
        <MetricCard icon={BarChart3} label="Koszty całkowite" value="184 200 zł" helper="+3.2%" />
        <MetricCard icon={Package} label="Koszt jednostkowy" value="42 zł" helper="-1.5%" />
        <MetricCard icon={Check} label="Zysk / jedn." value="28 zł" helper="+4.1%" />
        <MetricCard icon={Truck} label="Przychód" value="322 800 zł" helper="+8.7%" />
      </div>
      <div className="grid gap-5 xl:grid-cols-[420px_minmax(0,1fr)]">
        <Card className="p-5">
          <h2 className="text-xl font-extrabold">Rozkład kosztów</h2>
          <div className="mt-6 grid place-items-center">
            <div
              className="grid size-64 place-items-center rounded-full"
              style={{ background: "conic-gradient(hsl(var(--primary)) 0 35%, hsl(var(--warning)) 35% 60%, hsl(var(--success)) 60% 80%, hsl(var(--destructive)) 80% 92%, hsl(var(--muted-foreground)) 92% 100%)" }}
            >
              <div className="grid size-36 place-items-center rounded-full bg-card text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Koszty</p>
                  <b className="text-xl">184 200 zł</b>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card className="overflow-hidden">
          <div className="border-b p-5">
            <h2 className="text-xl font-extrabold">Kategorie kosztów</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kategoria</TableHead>
                <TableHead>Wartość</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Udzial</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map(([name, value, trend, share, tone]) => (
                <TableRow key={name}>
                  <TableCell className="font-extrabold">{name}</TableCell>
                  <TableCell>{value}</TableCell>
                  <TableCell className={trend.startsWith("+") ? "text-success" : "text-muted-foreground"}>{trend}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-44 rounded-full bg-muted"><div className={`h-full rounded-full ${tone === "primary" ? "bg-primary" : tone === "warning" ? "bg-warning" : tone === "success" ? "bg-success" : tone === "destructive" ? "bg-destructive" : "bg-muted-foreground"}`} style={{ width: `${share}%` }} /></div>
                      <b>{share}%</b>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </ScreenShell>
  );
}

function DownloadIcon() {
  return <FileText className="size-4" />;
}

export function ProductionGanttScreen() {
  const rows = [
    ["Linia A", [["ZP-001", 1, 2, "primary"], ["ZP-002", 4, 2, "success"]]],
    ["Linia B", [["ZP-003", 2, 3, "warning"], ["ZP-004", 6, 1, "primary"]]],
    ["Linia C", [["ZP-005", 1, 1, "destructive"], ["ZP-006", 3, 4, "primary"]]],
    ["Pakowanie", [["ZP-007", 2, 2, "success"], ["ZP-008", 5, 2, "warning"]]],
    ["Kontrola", [["QA-009", 3, 1, "primary"], ["QA-010", 6, 1, "success"]]]
  ] as const;
  const days = ["Pon", "Wt", "Sr", "Czw", "Pt", "Sob", "Nie"];

  return (
    <ScreenShell>
      <ScreenHeader
        title="Kalendarz Gantt maszyn"
        description="Harmonogram pracy maszyn produkcyjnych w widoku tygodnia."
        actions={
          <>
            <Button variant="outline">Tydzien</Button>
            <Button variant="outline">Miesiac</Button>
            <Button><Plus /> Nowe złeceńie</Button>
          </>
        }
      />
      <Card className="overflow-hidden">
        <div className="grid grid-cols-[220px_repeat(7,minmax(140px,1fr))] border-b bg-muted/45">
          <div className="border-r p-4 font-extrabold">Maszyna</div>
          {days.map((day) => <div className="border-r p-4 text-center font-extrabold last:border-r-0" key={day}>{day}</div>)}
        </div>
        {rows.map(([machine, tasks]) => (
          <div className="grid min-h-24 grid-cols-[220px_repeat(7,minmax(140px,1fr))] border-b last:border-b-0" key={machine}>
            <div className="border-r p-4 font-extrabold">{machine}</div>
            <div className="relative col-span-7 grid grid-cols-7">
              {days.map((day) => <div className="border-r last:border-r-0" key={day} />)}
              {tasks.map(([label, start, span, tone]) => (
                <div
                  className={`absolute top-5 rounded-md px-4 py-3 font-mono font-extrabold shadow-juz-sm ${tone === "success" ? "bg-success-soft text-success" : tone === "warning" ? "bg-warning-soft text-warning" : tone === "destructive" ? "bg-destructive-soft text-destructive" : "bg-primary-soft text-primary"}`}
                  key={label}
                  style={{
                    left: `calc(${start - 1} * 100% / 7 + 10px)`,
                    width: `calc(${span} * 100% / 7 - 20px)`
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        ))}
      </Card>
    </ScreenShell>
  );
}

export function CrmPhoneScreen() {
  const activeOrders = [
    ["ZS/00031/05/26", "W produkcji", "56%"],
    ["ZS/00028/05/26", "Pakowanie", "90%"],
    ["ZS/00022/05/26", "Wyslano", "100%"]
  ];
  const notes = [
    ["24.05.2026 14:32", "Telefon", "Pytanie o termin dostawy markerów MP-24"],
    ["20.05.2026 10:15", "Email", "Zmiana adresu dostawy"],
    ["18.05.2026 16:08", "Zgłoszenie", "Reklamacja nadruku na serii Classic"],
    ["15.05.2026 09:41", "Telefon", "Prośba o fakturę zbiorczą"]
  ];

  return (
    <ScreenShell>
      <ScreenHeader title="CRM telefon" description="Kontekst rozmowy przy przychodzącym połączeniu." />
      <div className="grid gap-5 xl:grid-cols-[420px_minmax(0,1fr)]">
        <Card className="p-6">
          <div className="text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-primary text-xl font-extrabold text-primary-foreground">MP</span>
            <p className="juz-label mt-4">Przychódzace polaczenie</p>
            <h2 className="mt-2 text-3xl font-extrabold">+48 506 022 300</h2>
            <p className="mt-2 text-lg font-semibold text-muted-foreground">Marta Pawlak · MarkerPro</p>
          </div>
          <div className="mt-6 space-y-3 rounded-lg bg-muted p-4 text-sm">
            <p className="flex gap-2"><Package className="size-4 text-primary" /> Firma: MarkerPro Sp. z o.o.</p>
            <p className="flex gap-2"><MapPin className="size-4 text-primary" /> Poznań, ul. Fabryczna 12</p>
            <p className="flex gap-2"><Mail className="size-4 text-primary" /> marta@markerpro.pl</p>
            <p className="flex gap-2"><User className="size-4 text-primary" /> Opiekun: Ewa Linek</p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button><Phone /> Odbierz</Button>
            <Button variant="destructive"><X /> Odrzuć</Button>
          </div>
        </Card>

        <div className="grid gap-5 lg:grid-cols-5">
          <MetricCard icon={FileText} label="Aktywne zamówienia" value="3" />
          <MetricCard icon={Wrench} label="Zlecenia produkcji" value="5" />
          <MetricCard icon={Bell} label="Opóźnione" value="1" />
          <MetricCard icon={BarChart3} label="Zaległe płatności" value="0 PLN" />
          <MetricCard icon={Package} label="Wartość 30 dni" value="24 680 PLN" />
          <Card className="overflow-hidden lg:col-span-2">
            <div className="flex items-center justify-between border-b p-5">
              <h3 className="font-extrabold">Aktywne zamówienia</h3>
              <Button variant="ghost">Zobacz wszystkie</Button>
            </div>
            <div className="divide-y">
              {activeOrders.map(([number, status, progress]) => (
                <div className="flex items-center justify-between p-4" key={number}>
                  <b className="font-mono text-primary">{number}</b>
                  <span className="text-sm text-muted-foreground">{status}</span>
                  <b>{progress}</b>
                </div>
              ))}
            </div>
          </Card>
          <Card className="overflow-hidden lg:col-span-3">
            <div className="flex items-center justify-between border-b p-5">
              <h3 className="font-extrabold">Ostatnie kontakty</h3>
              <Button variant="ghost">Zobacz wszystkie</Button>
            </div>
            <div className="divide-y">
              {notes.map(([date, type, text]) => (
                <div className="grid gap-2 p-4 md:grid-cols-[160px_120px_minmax(0,1fr)]" key={date}>
                  <span className="text-sm font-semibold text-muted-foreground">{date}</span>
                  <Badge variant="neutral">{type}</Badge>
                  <b>{text}</b>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </ScreenShell>
  );
}

export function WarehousePzDocumentScreen() {
  const positions = [
    ["1", "WK-NIEB-07", "Wklad niebieski 0.7", "1200", "szt.", "23%", "0,42", "504,00"],
    ["2", "TUSZ-BLK", "Tusz markerówy czarny", "80", "l", "23%", "18,90", "1512,00"],
    ["3", "OPK-SET12", "Opakowanie zestaw 12", "400", "szt.", "23%", "1,10", "440,00"]
  ];

  return (
    <ScreenShell>
      <div className="mb-6">
        <DetailHeader
          title="PZ/2026/0005"
          subtitle="Przyjecie zewnetrzne · Surowce i komponenty · PapierMix Sp. z o.o."
          status="Roboczy"
          statusVariant="neutral"
          actions={[
            { label: "Anuluj", variant: "outline", icon: X },
            { label: "Zapisz i zatwierdź", variant: "default", icon: Save }
          ]}
          metaItems={[]}
        />
      </div>
      <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
        <Card className="h-max p-4">
          <p className="juz-label mb-3">Sekcje</p>
          {["Dane dokumentu", "Dane firmy", "Pozycje", "Rozliczenie", "Uwagi"].map((item, index) => (
            <button className={`mb-2 w-full rounded-md p-3 text-left font-bold ${index === 0 ? "bg-primary-soft text-primary" : "hover:bg-muted"}`} key={item}>
              {item}
              <span className="block text-sm font-semibold text-muted-foreground">{index < 4 ? "Wymagane" : "Opcjonalne"}</span>
            </button>
          ))}
        </Card>

        <div className="space-y-5">
          <Card className="p-5">
            <h2 className="mb-4 text-xl font-extrabold">Dane dokumentu</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Magazyn"><Input value="Surowce i komponenty" readOnly /></Field>
              <Field label="Data wystawienia"><Input value="24.05.2026" readOnly /></Field>
              <Field label="Waluta"><Input value="PLN" readOnly /></Field>
              <Field label="Nr dok. zewn."><Input placeholder="FV/2026/0524" /></Field>
              <Field label="Sposób płatności"><Input value="Przelew" readOnly /></Field>
              <Field label="Termin"><Input value="7.06.2026" readOnly /></Field>
            </div>
          </Card>

          <Card className="p-5">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="juz-label">Dostawca</p>
                <h2 className="mt-1 text-xl font-extrabold">Dane firmy</h2>
              </div>
              <Badge variant="neutral">Zweryfikowany</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {[
                ["Pełna nazwa", "PapierMix Sp. z o.o."],
                ["NIP", "782-11-24-900"],
                ["Email", "dostawy@papiermix.pl"],
                ["Adres", "ul. Poligraficzna 8, Poznań"],
                ["Kraj", "Polska"]
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-sm font-semibold text-muted-foreground">{label}</p>
                  <p className="mt-1 font-extrabold">{value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
              <h2 className="text-xl font-extrabold">Pozycje</h2>
              <div className="flex gap-2">
                <Button variant="outline"><Search /> Wyszukaj produkt</Button>
                <Button><Plus /> Pusta pozycja</Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/45">
                  <tr>
                    {["Lp", "Kod", "Nazwa", "Ilość", "JM", "VAT", "Cena jedn.", "Netto"].map((header) => (
                      <th className="h-12 px-5 text-left align-middle text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground" key={header}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {positions.map((row) => (
                    <tr className="border-b transition-colors last:border-b-0 hover:bg-muted/35" key={row[1]}>
                      {row.map((cell, index) => (
                        <td className={index === 1 ? "px-5 py-4 align-middle font-mono font-bold text-primary" : "px-5 py-4 align-middle text-foreground"} key={cell}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="mb-4 text-xl font-extrabold">Rozliczenie</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <SummaryTile label="Suma netto" value="2456,00 PLN" />
              <SummaryTile label="Podatek VAT" value="564,88 PLN" />
              <SummaryTile label="Suma brutto" value="3020,88 PLN" strong />
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="mb-4 text-xl font-extrabold">Uwagi</h2>
            <Textarea placeholder="Notatki do dokumentu..." />
          </Card>
        </div>
      </div>
    </ScreenShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function SummaryTile({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="rounded-md border bg-card p-4">
      <p className="text-sm font-semibold text-muted-foreground">{label}</p>
      <p className={strong ? "mt-2 text-xl font-extrabold leading-tight" : "mt-2 text-lg font-bold leading-tight"}>{value}</p>
    </div>
  );
}
