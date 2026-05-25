import * as React from "react";
import {
  ArrowLeft,
  Bell,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardList,
  Copy,
  Edit3,
  ExternalLink,
  FileText,
  Filter,
  Gauge,
  LayoutGrid,
  Mail,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Package,
  Pause,
  PenLine,
  Phone,
  Plus,
  Save,
  Search,
  Send,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Trash2,
  User,
  Users,
  Wrench
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RecordTabs, type RecordTabItem } from "@/components/ds/record-tabs";
import { SegmentedTabs } from "@/components/ds/segmented-tabs";
import { Stepper } from "@/components/ds/stepper";
import { PlainTimeline } from "@/components/ds/timeline";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

type BadgeTone = "default" | "success" | "warning" | "destructive" | "neutral" | "outline";

function IconTile({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary-soft text-primary">
      <Icon className="size-4" />
    </span>
  );
}

export function EnterpriseShell({
  title,
  children,
  wide = false
}: {
  title: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  const nav = ["Pulpit", "Linki", "Kampanie", "Publikacje", "Magazyn", "Produkcja", "Ustawienia"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-card/95 px-4 backdrop-blur">
        <div className="flex items-center gap-2 border-r pr-4">
          <span className="grid size-9 place-items-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="size-5" />
          </span>
          <b>juz.pl</b>
        </div>
        <nav className="hidden min-w-0 flex-1 items-center gap-1 lg:flex">
          {nav.map((item) => (
            <button className="rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground hover:bg-primary-soft hover:text-primary" key={item}>
              {item}
            </button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden h-9 w-64 items-center gap-2 rounded-md border bg-background px-3 text-sm text-muted-foreground md:flex">
            <Search className="size-4" />
            Szukaj...
            <kbd className="ml-auto rounded-sm bg-muted px-1.5 py-0.5 text-xs">⌘S</kbd>
          </div>
          <Button size="icon" variant="ghost" aria-label="Powiadomienia"><Bell /></Button>
          <Button size="icon" variant="ghost" aria-label="Ustawienia"><Settings /></Button>
          <span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">DS</span>
        </div>
      </header>

      <main className={wide ? "p-0" : "p-6"}>
        <div className={wide ? "w-full" : "mx-auto w-full max-w-[1680px]"}>
          <h1 className="sr-only">{title}</h1>
          {children}
        </div>
      </main>
    </div>
  );
}

function SideModuleShell({ children, active = "Zamówienia" }: { children: React.ReactNode; active?: string }) {
  const items = [
    ["Panel główny", LayoutGrid],
    ["Kalendarz", CalendarDays],
    ["Zamówienia", ClipboardList],
    ["Klienci", Users],
    ["Firmy", Building2],
    ["Produkty", Package],
    ["Raporty", Gauge],
    ["Szablony", Mail],
    ["Uprawnienia", ShieldCheck]
  ] as const;

  return (
    <div className="grid min-h-[calc(100vh-56px)] grid-cols-1 lg:grid-cols-[272px_minmax(0,1fr)]">
      <aside className="hidden border-r bg-card px-5 py-6 lg:block">
        <nav className="space-y-1">
          {items.map(([label, Icon]) => (
            <button
              className={[
                "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-bold",
                active === label ? "bg-primary-soft text-primary" : "text-foreground hover:bg-muted"
              ].join(" ")}
              key={label}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </nav>
      </aside>
      <section className="min-w-0 p-5 lg:p-7">{children}</section>
    </div>
  );
}

const steps = ["Nowe", "Weryfikacja", "Planowanie", "Na produkcji", "Pakowanie", "Wysłane", "Rozliczenie", "Zakończone"];

export function ProcessStepper({ current = 4 }: { current?: number }) {
  return (
    <div className="overflow-x-auto bg-card px-6 py-6">
      <div className="min-w-[980px]">
        <Stepper current={current} steps={steps} />
      </div>
    </div>
  );
}

function RecordHeader({ title = "ZS/00042/05/26" }: { title?: string }) {
  return (
    <Card className="overflow-hidden shadow-none">
      <div className="flex flex-wrap items-start gap-3 border-b p-4">
        <Button variant="outline"><ArrowLeft /> Wróć</Button>
        <IconTile icon={FileText} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-extrabold">Podgląd zamówienia <span className="font-mono text-primary">{title}</span></h2>
            <Badge variant="default">Na produkcji</Badge>
            <span className="text-sm font-semibold text-muted-foreground">Planowana wysyłka: 04.06.2026</span>
            <Badge variant="warning">11 dni</Badge>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Zlecenie produkcyjne <a className="font-bold text-primary" href="#">ZP/00042/05/26 <ExternalLink className="inline size-3" /></a>
            <Badge className="ml-2" variant="default">Seria Marker Pro</Badge>
            <span className="ml-2">z dnia: 16.05.2026, 17:33</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline">Anuluj</Button>
          <Button><Save /> Zapisz zamówienie</Button>
          <Button variant="outline"><MessageSquare /> Czat</Button>
          <Button size="icon" variant="ghost" aria-label="Więcej"><MoreHorizontal /></Button>
        </div>
      </div>
      <div className="grid border-b md:grid-cols-3 xl:grid-cols-6">
        {[
          ["Klient", "Długopis S.A.", "ul. Przemysłowa 8, Poznań"],
          ["Opiekun", "Monika Kamińska", "kontakt@długopis-sa.pl"],
          ["Produkt", "Marker permanent czarny", "Partia MP-2405"],
          ["Data zamówienia", "16.05.2026", "Wystawił: Kamil Brzeziński"],
          ["Dostawa", "Kurier", "magazyn centralny"],
          ["Płatność", "przelew", "14 dni"]
        ].map(([label, value, helper]) => (
          <div className="border-r p-4 last:border-r-0" key={label}>
            <p className="juz-label">{label}</p>
            <b className="mt-2 block">{value}</b>
            <p className="mt-1 text-sm text-muted-foreground">{helper}</p>
          </div>
        ))}
      </div>
      <ProcessStepper current={4} />
    </Card>
  );
}

const orderDetailTabs: RecordTabItem[] = [
  { value: "Dane podstawowe", badge: "2/1" },
  "Produkt",
  "Pozycje zamówienia",
  { value: "Tabele", badge: "3" },
  "Materiał",
  "Karta pracy",
  { value: "Rozliczenie i faktura", badge: "2/1" },
  "Pliki",
  "Kontakt",
  "Historia"
];

function DetailTabs({ active = "Dane podstawowe" }: { active?: string }) {
  return <RecordTabs items={orderDetailTabs} value={active} />;
}

function SectionNav() {
  const sections = ["Dane firmy", "Dane do wysyłki", "Produkt", "Plan produkcji", "Rozliczenie", "Pliki"];
  return (
    <Card className="sticky top-20 hidden p-4 xl:block">
      <p className="juz-label mb-3">Sekcje</p>
      {sections.map((section, index) => (
        <button className={["mb-1 block w-full rounded-md px-3 py-3 text-left", index === 0 ? "bg-primary-soft text-primary" : "hover:bg-muted"].join(" ")} key={section}>
          <b>{section}</b>
          <p className="text-sm text-muted-foreground">{index < 3 ? "Wymagane" : "Opcjonalne"}</p>
        </button>
      ))}
    </Card>
  );
}

function FieldGrid({ edit = false }: { edit?: boolean }) {
  const fields = [
    ["Pełna nazwa", "Długopis S.A."],
    ["NIP", "7821234567"],
    ["Skrot", "DLG"],
    ["Telefon", "+48 61 555 02 02"],
    ["Email", "kontakt@długopis-sa.pl"],
    ["Adres", "ul. Przemysłowa 8"],
    ["Kod pocztowy", "60-101"],
    ["Miasto", "Poznań"],
    ["Kraj", "Polska"]
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {fields.map(([label, value]) => (
        <label className="space-y-1" key={label}>
          <span className="text-sm font-semibold text-muted-foreground">{label}</span>
          {edit ? <Input defaultValue={value} /> : <b className="block">{value}</b>}
        </label>
      ))}
    </div>
  );
}

function FormSection({
  title,
  icon,
  children,
  actions
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  const Icon = icon;
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b p-4">
        <div className="flex items-center gap-3">
          <IconTile icon={Icon} />
          <h3 className="text-lg font-extrabold">{title}</h3>
        </div>
        {actions}
      </div>
      <div className="p-4">{children}</div>
    </Card>
  );
}

function NoteRail() {
  const notes = [
    ["Wazna", "Zmieniono priorytet partii po rozmowie z klientem.", "16.05.2026, 16:55"],
    ["Info", "Kontrola jakości poprosila o dodatkowy test tuszu.", "16.05.2026, 15:20"]
  ];
  return (
    <aside className="space-y-4">
      <Card className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <b>Wazne notatki</b>
          <Badge variant="neutral">2</Badge>
        </div>
        <div className="space-y-3">
          {notes.map(([tone, text, date]) => (
            <div className="rounded-md border bg-muted/35 p-3" key={text}>
              <Badge variant={tone === "Wazna" ? "destructive" : "default"}>{tone}</Badge>
              <p className="mt-2 text-sm font-semibold">{text}</p>
              <p className="mt-1 text-xs text-muted-foreground">Dodala: Monika Kamińska · {date}</p>
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <b>Historia kontaktu</b>
          <Button size="sm" variant="outline"><Plus /> Dodaj</Button>
        </div>
        <PlainTimeline
          items={[
            { title: "Telefon: potwierdzono termin produkcji.", meta: "24.05.2026 · Monika Kamińska" },
            { title: "Email: przesłano plik etykiety.", meta: "24.05.2026 · Monika Kamińska" },
            { title: "Notatka: klient zaakceptował próbkę.", meta: "24.05.2026 · Monika Kamińska" }
          ]}
        />
      </Card>
    </aside>
  );
}

function BillingTable() {
  const rows = [
    ["1", "Marker permanent czarny - korpus", "1200", "1,80", "23%", "2656,80"],
    ["2", "Tusz szybkoschnący", "1200", "0,42", "23%", "619,92"],
    ["3", "Opakowanie zbiorcze", "60", "6,50", "23%", "479,70"],
    ["4", "Etykieta personalizowana", "1200", "0,22", "23%", "324,72"],
    ["5", "Kontrola jakości", "1", "180,00", "zw.", "180,00"]
  ];
  return (
    <FormSection
      actions={<Button><FileText /> Wystaw fakturę</Button>}
      icon={FileText}
      title="Rozliczenie i faktura"
    >
      <Table>
        <TableHeader>
          <TableRow>
            {["LP", "Nazwa", "Ilość", "Cena jedn.", "VAT", "Brutto"].map((head) => <TableHead key={head}>{head}</TableHead>)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row[0]}>
              {row.map((cell, index) => <TableCell className={index === 1 ? "font-semibold" : ""} key={cell}>{cell}</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 rounded-md border bg-muted/35 p-4 text-right">
        <p className="text-sm text-muted-foreground">Razem netto: 3465,00 zł</p>
        <p className="text-sm text-muted-foreground">VAT: 796,14 zł</p>
        <p className="text-xl font-extrabold">Razem brutto: 4261,14 zł</p>
      </div>
    </FormSection>
  );
}

export function OrderDetailScreen({ mode = "basic" }: { mode?: "basic" | "shipping" | "billing" }) {
  const active = mode === "billing" ? "Rozliczenie i faktura" : "Dane podstawowe";

  return (
    <EnterpriseShell title="Podgląd zamówienia" wide>
      <SideModuleShell>
        <div className="space-y-5">
          <RecordHeader />
          <DetailTabs active={active} />
          <div className="grid gap-5 xl:grid-cols-[260px_minmax(0,1fr)_320px]">
            <SectionNav />
            <div className="space-y-5">
              {mode === "billing" ? (
                <BillingTable />
              ) : (
                <>
                  <FormSection
                    actions={<Button variant="outline"><Edit3 /> Edytuj</Button>}
                    icon={Building2}
                    title="Dane firmy"
                  >
                    <FieldGrid edit={mode === "shipping"} />
                  </FormSection>
                  <FormSection
                    actions={<><Button variant="outline">Wyczyść</Button><Button><Save /> Zapisz</Button></>}
                    icon={Package}
                    title="Dane do wysyłki"
                  >
                    {mode === "shipping" ? (
                      <div className="grid gap-4 md:grid-cols-2">
                        <Input placeholder="Etykieta adresu" defaultValue="Magazyn główny" />
                        <Input placeholder="Nazwa firmy / oddział" defaultValue="Długopis S.A. - kompletacja" />
                        <Input className="md:col-span-2" placeholder="Ulica" defaultValue="ul. Magazynowa 4" />
                        <Input placeholder="Kod pocztowy" defaultValue="60-102" />
                        <Input placeholder="Miasto" defaultValue="Poznań" />
                        <Input placeholder="Email" defaultValue="logistyka@długopis-sa.pl" />
                        <Input placeholder="Telefon" defaultValue="+48 61 555 03 03" />
                      </div>
                    ) : (
                      <div className="rounded-md border p-4">
                        <b>Siedziba glowna (domyslny)</b>
                        <p className="mt-1 text-muted-foreground">ul. Przemysłowa 8, 60-101 Poznań, Polska</p>
                      </div>
                    )}
                  </FormSection>
                  <FormSection icon={ClipboardList} title="Produkt">
                    <FieldGrid />
                  </FormSection>
                </>
              )}
            </div>
            <NoteRail />
          </div>
        </div>
      </SideModuleShell>
    </EnterpriseShell>
  );
}

export function RolesPermissionsScreen() {
  const groups = ["Administracja", "Klienci", "Magazyn", "Produkcja", "Raporty", "Szablony", "Użytkownicy"];
  const permissions = ["Dodanie jednostki miary", "Edycja produktu", "Podgląd zlecenia", "Eksport raportu", "Usuwanie szkicu"];
  return (
    <EnterpriseShell title="Role i uprawnienia" wide>
      <SideModuleShell active="Uprawnienia">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Button variant="ghost"><ArrowLeft /> Wróć</Button>
            <h2 className="mt-3 text-2xl font-extrabold">Rola: Kierownik produkcji</h2>
            <p className="text-muted-foreground">Macierz uprawnień oparta o tokeny i komponenty DS.</p>
          </div>
          <Button><Save /> Zapisz</Button>
        </div>
        <SegmentedTabs className="mb-4" items={["Zarządzanie", "Wyszukiwanie", "Użytkownicy", "Podstawowe informacje"]} stretch />
        <Card className="grid overflow-hidden lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="border-r p-3">
            {groups.map((group, index) => (
              <button className={["mb-1 flex w-full items-center justify-between rounded-md px-4 py-3 text-left font-bold", index === 3 ? "bg-primary-soft text-primary" : "hover:bg-muted"].join(" ")} key={group}>
                {group}<span>{index + 1}/5</span>
              </button>
            ))}
          </div>
          <div className="p-5">
            <div className="mb-5 flex gap-2">
              <Button variant="secondary">Lista (1/1)</Button>
              <Button variant="outline">Ogolne (4/4)</Button>
            </div>
            <div className="space-y-5">
              {permissions.map((permission, index) => (
                <div className="flex items-center justify-between gap-4 border-b pb-4 last:border-b-0" key={permission}>
                  <div>
                    <b>{permission}</b>
                    <p className="text-sm text-muted-foreground">Uprawnienie modulu Produkcja / Slowniki</p>
                  </div>
	                  <button
	                    className={[
	                      "h-7 w-12 rounded-full p-1 transition-colors",
	                      index < 4 ? "bg-primary" : "bg-muted"
	                    ].join(" ")}
	                    aria-label={`${index < 4 ? "Wylacz" : "Wlacz"} uprawnieńie: ${permission}`}
	                    aria-pressed={index < 4}
	                  >
                    <span className={["block size-5 rounded-full bg-card transition-transform", index < 4 ? "translate-x-5" : ""].join(" ")} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </SideModuleShell>
    </EnterpriseShell>
  );
}

export function EmailTemplateScreen() {
  const variables = ["${orderNumber}", "${clientName}", "${productName}", "${plannedShipDate}", "${stageName}", "${paymentTotalGross}", "${contactFirstName}", "${deliveryAddress}", "${trackingNumber}", "${supportEmail}"];
  return (
    <EnterpriseShell title="Szablon wiadomości" wide>
      <SideModuleShell active="Szablony">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <Button className="mt-0.5" size="icon" variant="outline" aria-label="Wróć"><ArrowLeft /></Button>
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
        <Card className="space-y-5 p-5">
          <label className="block space-y-2"><b>Nazwa szablonu</b><Input defaultValue="Partia gotowa do odbioru" /></label>
          <div className="grid gap-4 md:grid-cols-3">
            <label className="block space-y-2"><b>Moduł</b><Input defaultValue="Produkcja" /></label>
            <label className="block space-y-2"><b>Typ wiadomości</b><Input defaultValue="Podsumowanie" /></label>
            <label className="block space-y-2"><b>Język</b><Input defaultValue="Polski" /></label>
          </div>
          <label className="block space-y-2"><b>Temat wiadomości</b><Input defaultValue="Zamówienie ${orderNumber} jest gotowe do odbioru" /></label>
          <label className="block space-y-2">
            <b>Treść wiadomości</b>
            <Textarea rows={5} defaultValue={"Dzień dobry ${contactFirstName},\n\npartia ${productName} dla ${clientName} jest gotowa. Planowany odbiór: ${plannedShipDate}.\n\nPozdrawiamy,\nzespół juz.pl"} />
          </label>
          <div className="rounded-md bg-primary-soft p-5">
            <b>Tagi, które możesz użyć</b>
            <div className="mt-3 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
              {variables.map((variable) => (
                <code className="rounded-sm bg-card px-2 py-1 font-mono text-sm text-primary" key={variable}>{variable}</code>
              ))}
            </div>
          </div>
        </Card>
      </SideModuleShell>
    </EnterpriseShell>
  );
}

export function CompanyRecordScreen() {
  return (
    <EnterpriseShell title="Podgląd firmy" wide>
      <SideModuleShell active="Firmy">
        <div className="mb-6 flex items-center gap-3">
          <Button size="icon" variant="outline" aria-label="Wróć"><ArrowLeft /></Button>
          <div>
            <h2 className="text-2xl font-extrabold">Podgląd firmy</h2>
            <p className="text-muted-foreground">Długopis S.A. · klient produkcyjny</p>
          </div>
        </div>
        <SegmentedTabs className="mb-5" items={["Informacje", "Osoby kontaktowe", "Wyceny", "Zlecenia", "Reklamacje", "Produkty"]} stretch />
        <Card className="p-5">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-4">
              <label className="block space-y-2">
                <b>NIP</b>
                <Input defaultValue="7821234567" />
              </label>
              <label className="block space-y-2">
                <b>Uwagi</b>
                <Textarea rows={5} placeholder="Uwagi opcjonalne" />
              </label>
              <Button variant="outline"><Copy /> Pobierz z GUS</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {["Pełna nazwa", "Ulica", "Nr budynku", "Nr lokalu", "Kod pocztowy", "Miasto", "Kraj"].map((field) => (
                <label className={field === "Pełna nazwa" || field === "Kraj" ? "space-y-2 md:col-span-2" : "space-y-2"} key={field}>
                  <b>{field}</b>
                  <Input defaultValue={field === "Pełna nazwa" ? "Długopis S.A." : field === "Kraj" ? "Polska" : ""} placeholder="Wpisz" />
                </label>
              ))}
            </div>
          </div>
        </Card>
      </SideModuleShell>
    </EnterpriseShell>
  );
}

export function MobileOperatorShowcase() {
  const cards = ["ZP/00342 Marker Pro", "ZP/00339 Długopis Classic", "ZP/00337 Flamaster Kids"];
  return (
    <EnterpriseShell title="Mobilny panel produkcji">
      <div className="grid gap-8 xl:grid-cols-3">
        {["Kolejka zadań", "Karta zadańia", "Czat z opiekunem"].map((title, phoneIndex) => (
          <div className="mx-auto w-full max-w-[390px] rounded-[28px] border bg-card p-4 shadow-juz-lg" key={title}>
            <div className="min-h-[760px] rounded-[20px] bg-background p-4">
              <div className="mb-5 flex items-center justify-between">
                <div><p className="text-xs text-muted-foreground">9:41</p><b>{title}</b></div>
                <Button size="icon" variant="ghost" aria-label="Menu"><MoreHorizontal /></Button>
              </div>
              {phoneIndex === 0 ? (
                <>
                  <div className="rounded-lg bg-primary p-5 text-primary-foreground shadow-juz">
                    <p className="text-xs font-bold uppercase">Dzis · środa</p>
                    <h3 className="mt-2 text-2xl font-extrabold">4 prace w kolejce</h3>
                    <div className="mt-4 grid grid-cols-3 gap-3 text-sm"><b>1<br />w toku</b><b>3<br />oczekuje</b><b>2<br />pilne</b></div>
                  </div>
                  <div className="mt-5 space-y-3">
                    {cards.map((card, index) => (
                      <div className={["rounded-md border p-3", index === 0 ? "border-primary" : ""].join(" ")} key={card}>
                        <div className="flex justify-between"><b>{card}</b><Badge variant={index === 0 ? "default" : "neutral"}>{index === 0 ? "W toku" : "Nowe"}</Badge></div>
                        <p className="mt-2 text-sm text-muted-foreground">Marker Pro · kompletacja · {index + 1}h 10m</p>
                        <div className="mt-3 h-2 rounded-full bg-muted"><div className="h-full w-2/3 rounded-full bg-primary" /></div>
                      </div>
                    ))}
                  </div>
                </>
              ) : phoneIndex === 1 ? (
                <>
                  <div className="rounded-lg bg-primary p-5 text-primary-foreground">
                    <p className="text-xs font-bold uppercase">Obecny etap</p>
                    <h3 className="text-2xl font-extrabold">Pakowanie</h3>
                    <p className="mt-3 font-semibold">65% · ok. 1h 10m do konca</p>
                    <div className="mt-2 h-2 rounded-full bg-white/30"><div className="h-full w-2/3 rounded-full bg-white" /></div>
                  </div>
                  <Card className="mt-4 p-4"><b>Marker permanent czarny</b><FieldGrid /></Card>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {["Skan", "Karta", "Pytanie"].map((item) => <Button variant="outline" key={item}>{item}</Button>)}
                  </div>
                  <Button className="mt-4 w-full"><Check /> Zakończ etap</Button>
                  <Button className="mt-3 w-full" variant="outline">Zglos problem</Button>
                </>
              ) : (
                <div className="flex h-[620px] flex-col">
                  <div className="space-y-3">
                    <div className="max-w-[78%] rounded-md bg-muted p-3 text-sm">Czy mozna przesunac kompletacje na 14:00?</div>
                    <div className="ml-auto max-w-[78%] rounded-md bg-primary p-3 text-sm text-primary-foreground">Tak, termin zostal zmieniony w harmonogramie.</div>
                    <div className="max-w-[78%] rounded-md bg-muted p-3 text-sm">Dziekuje. Akceptuje plan.</div>
                  </div>
                  <div className="mt-auto flex gap-2"><Input placeholder="Napisz wiadomość..." /><Button size="icon" aria-label="Wyślij"><Send /></Button></div>
                </div>
              )}
              <MobileProductionNav />
            </div>
          </div>
        ))}
      </div>
    </EnterpriseShell>
  );
}

function MobileProductionNav() {
  return (
    <nav className="sticky bottom-0 mt-5 grid grid-cols-5 gap-1 rounded-lg border bg-card p-2 text-center text-[11px] font-bold text-muted-foreground">
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
