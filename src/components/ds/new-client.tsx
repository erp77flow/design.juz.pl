import * as React from "react";
import {
  ArrowLeft,
  Building2,
  ChevronDown,
  ClipboardList,
  Copy,
  CreditCard,
  Download,
  Eraser,
  FileText,
  MapPin,
  Pencil,
  Plus,
  ShoppingCart,
  Tag,
  Truck,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { cn } from "@/lib/utils";

type SectionId =
  | "sec-firma"
  | "sec-wysylka"
  | "sec-handlowa"
  | "sec-rejestrowe"
  | "sec-ksef"
  | "sec-typ";

type SectionDef = {
  id: SectionId;
  label: string;
  state: "Wymagane" | "Opcjonalne";
  icon: React.ElementType;
};

const sections: SectionDef[] = [
  { id: "sec-firma", label: "Dane firmy", state: "Wymagane", icon: Building2 },
  { id: "sec-wysylka", label: "Dane do wysyłki", state: "Opcjonalne", icon: Truck },
  { id: "sec-handlowa", label: "Sekcja handlowa", state: "Opcjonalne", icon: ShoppingCart },
  { id: "sec-rejestrowe", label: "Dane rejestrowe", state: "Opcjonalne", icon: ClipboardList },
  { id: "sec-ksef", label: "KSeF", state: "Opcjonalne", icon: FileText },
  { id: "sec-typ", label: "Typ firmy", state: "Opcjonalne", icon: Tag }
];

type Company = {
  name: string;
  street: string;
  buildingNumber: string;
  apartmentNumber: string;
  postalCode: string;
  city: string;
  country: string;
  email: string;
  phone: string;
};

type ShippingDraft = {
  label: string;
  name: string;
  street: string;
  buildingNumber: string;
  apartmentNumber: string;
  postalCode: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  isDefault: boolean;
};

const emptyCompany = (): Company => ({
  name: "",
  street: "",
  buildingNumber: "",
  apartmentNumber: "",
  postalCode: "",
  city: "",
  country: "PL",
  email: "",
  phone: ""
});

const emptyShipping = (): ShippingDraft => ({
  label: "",
  name: "",
  street: "",
  buildingNumber: "",
  apartmentNumber: "",
  postalCode: "",
  city: "",
  country: "PL",
  email: "",
  phone: "",
  isDefault: false
});

const sampleCompany: Company = {
  name: "Firma testowa sp. z o.o.",
  street: "Przemysłowa",
  buildingNumber: "14",
  apartmentNumber: "",
  postalCode: "15-421",
  city: "Białystok",
  country: "PL",
  email: "produkcja@firma-testowa.pl",
  phone: "+48 85 555 22 22"
};

const sampleShipping: ShippingDraft[] = [
  {
    label: "Magazyn główny",
    name: "Firma testowa · Logistyka",
    street: "Lipowa",
    buildingNumber: "14",
    apartmentNumber: "",
    postalCode: "15-427",
    city: "Białystok",
    country: "PL",
    email: "magazyn@firma-testowa.pl",
    phone: "+48 85 555 22 23",
    isDefault: true
  },
  {
    label: "Oddział Starosielce",
    name: "Firma testowa · Oddział",
    street: "Wysockiego",
    buildingNumber: "68",
    apartmentNumber: "",
    postalCode: "15-168",
    city: "Białystok",
    country: "PL",
    email: "oddzial@firma-testowa.pl",
    phone: "+48 85 555 22 24",
    isDefault: false
  }
];

const COUNTRY_LABEL: Record<string, string> = {
  PL: "Polska",
  DE: "Niemcy",
  CZ: "Czechy",
  SK: "Słowacja"
};

export function NewClientPattern() {
  const [activeSection, setActiveSection] = React.useState<SectionId>("sec-firma");

  // Dane firmy
  const [nip, setNip] = React.useState("5421234588");
  const [shortName, setShortName] = React.useState("FIRMA-TEST");
  const [invoiceEmail, setInvoiceEmail] = React.useState("faktury@firma-testowa.pl");
  const [company, setCompany] = React.useState<Company>(sampleCompany);
  const [editingFirma, setEditingFirma] = React.useState(false);
  const snapshotRef = React.useRef<{ c: Company; n: string; s: string; e: string } | null>(null);

  // Wysyłka
  const [shipping, setShipping] = React.useState<ShippingDraft[]>(sampleShipping);
  const [selectedShipIdx, setSelectedShipIdx] = React.useState<number | null>(0);
  const [editorOpen, setEditorOpen] = React.useState(false);
  const [editorIdx, setEditorIdx] = React.useState<number | null>(null);
  const [shipForm, setShipForm] = React.useState<ShippingDraft>(emptyShipping());

  // Sekcja handlowa
  const [paymentMethod, setPaymentMethod] = React.useState("przelew");
  const [paymentDays, setPaymentDays] = React.useState("14");
  const [pricelist, setPricelist] = React.useState("Cennik standardowy 2026");
  const [assignedEmployee, setAssignedEmployee] = React.useState("monika");
  const [costCategory, setCostCategory] = React.useState("");
  const [shippingMethods, setShippingMethods] = React.useState<string[]>(["Kurier", "Paleta"]);

  // KSeF
  const [ksefIssue, setKsefIssue] = React.useState(false);
  const [ksefReceive, setKsefReceive] = React.useState(false);

  // Role + typ firmy
  const [isCustomer, setIsCustomer] = React.useState(true);
  const [isSupplier, setIsSupplier] = React.useState(false);
  const [isLab, setIsLab] = React.useState(false);
  const [extraTypes, setExtraTypes] = React.useState<string[]>(["Dystrybutor"]);

  const rolesLabel = [isCustomer && "Klient", isSupplier && "Dostawca", isLab && "Klient lab."]
    .filter(Boolean)
    .join(", ");

  const ksefLabel = [ksefIssue && "Wystawia", ksefReceive && "Pobiera"].filter(Boolean).join(" + ");

  const opiekunLabel =
    assignedEmployee === "monika"
      ? "Opiekun handlowy"
      : assignedEmployee === "kamil"
        ? "Opiekun 2"
        : "—";

  // Refs do sekcji — scroll
  const sectionRefs = React.useRef<Record<SectionId, HTMLDivElement | null>>({
    "sec-firma": null,
    "sec-wysylka": null,
    "sec-handlowa": null,
    "sec-rejestrowe": null,
    "sec-ksef": null,
    "sec-typ": null
  });

  function scrollToSection(id: SectionId) {
    const node = sectionRefs.current[id];
    if (!node) return;
    setActiveSection(id);
    window.scrollTo({
      behavior: "smooth",
      top: node.getBoundingClientRect().top + window.scrollY - 96
    });
  }

  function startEditFirma() {
    snapshotRef.current = { c: { ...company }, n: nip, s: shortName, e: invoiceEmail };
    setEditingFirma(true);
  }
  function cancelEditFirma() {
    if (snapshotRef.current) {
      setCompany(snapshotRef.current.c);
      setNip(snapshotRef.current.n);
      setShortName(snapshotRef.current.s);
      setInvoiceEmail(snapshotRef.current.e);
    }
    snapshotRef.current = null;
    setEditingFirma(false);
  }
  function saveEditFirma() {
    snapshotRef.current = null;
    setEditingFirma(false);
  }
  function clearFirma() {
    setCompany(emptyCompany());
    setNip("");
    setShortName("");
    setInvoiceEmail("");
  }

  // Adresy wysyłki
  function startAddShipping() {
    setEditorIdx(null);
    setShipForm({ ...emptyShipping(), isDefault: shipping.length === 0 });
    setEditorOpen(true);
  }
  function startEditShipping(idx: number) {
    setEditorIdx(idx);
    setShipForm({ ...shipping[idx] });
    setEditorOpen(true);
  }
  function saveShipping() {
    const next = [...shipping];
    if (shipForm.isDefault) next.forEach((d) => (d.isDefault = false));
    if (editorIdx != null) {
      next[editorIdx] = { ...shipForm };
      setSelectedShipIdx(editorIdx);
    } else {
      next.push({ ...shipForm });
      setSelectedShipIdx(next.length - 1);
    }
    setShipping(next);
    setEditorOpen(false);
    setEditorIdx(null);
  }
  function removeShipping(idx: number) {
    const next = shipping.filter((_, i) => i !== idx);
    setShipping(next);
    if (selectedShipIdx === idx) setSelectedShipIdx(next.length > 0 ? 0 : null);
  }

  const selectedShipping = selectedShipIdx != null ? shipping[selectedShipIdx] : null;

  return (
    <section className="space-y-5">
      <RecordHeader
        shortName={shortName}
        company={company}
        nip={nip}
        rolesLabel={rolesLabel}
        extraTypes={extraTypes}
        opiekunLabel={opiekunLabel}
        paymentMethod={paymentMethod}
        paymentDays={paymentDays}
        ksefLabel={ksefLabel}
      />

      <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)_340px]">
        <aside className="xl:sticky xl:top-20 xl:self-start">
          <div className="rounded-lg border bg-card p-3 shadow-juz-sm">
            <p className="juz-label mb-2">Sekcje</p>
            <nav className="space-y-1" aria-label="Sekcje nowej firmy">
              {sections.map((s) => (
                <button
                  className={cn(
                    "relative flex w-full items-start justify-between gap-3 rounded-md px-3 py-3 text-left text-sm hover:bg-primary-soft",
                    activeSection === s.id &&
                      "bg-primary-soft text-primary before:absolute before:-left-3 before:top-3 before:h-8 before:w-1 before:rounded-r-full before:bg-primary"
                  )}
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  type="button"
                >
                  <span>
                    <span className="block font-bold">{s.label}</span>
                    <span className="block text-xs text-muted-foreground">{s.state}</span>
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 space-y-5">
          <div ref={(node) => { sectionRefs.current["sec-firma"] = node; }}>
            <InfoSection
              icon={Building2}
              title="Dane firmy"
              required
              toolbar={
                editingFirma ? (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={cancelEditFirma}>
                      Anuluj
                    </Button>
                    <Button size="sm" onClick={saveEditFirma}>
                      Zapisz
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={clearFirma}>
                      <Eraser />
                      Wyczyść
                    </Button>
                    <Button variant="outline" size="sm" onClick={startEditFirma}>
                      <Pencil />
                      Edytuj
                    </Button>
                  </div>
                )
              }
            >
              {editingFirma ? (
                <FirmaEditor
                  company={company}
                  setCompany={setCompany}
                  nip={nip}
                  setNip={setNip}
                  shortName={shortName}
                  setShortName={setShortName}
                  invoiceEmail={invoiceEmail}
                  setInvoiceEmail={setInvoiceEmail}
                />
              ) : (
                <FirmaSummary
                  company={company}
                  nip={nip}
                  shortName={shortName}
                  invoiceEmail={invoiceEmail}
                />
              )}
            </InfoSection>
          </div>

          <div ref={(node) => { sectionRefs.current["sec-wysylka"] = node; }}>
            <InfoSection
              icon={Truck}
              title="Dane do wysyłki"
              toolbar={
                editorOpen ? null : (
                  <div className="flex flex-wrap items-center gap-2">
                    {shipping.length > 0 ? (
                      <NativeSelect
                        aria-label="Adres wysyłki"
                        className="min-w-[220px]"
                        value={selectedShipIdx ?? ""}
                        onChange={(e) =>
                          setSelectedShipIdx(e.target.value === "" ? null : Number(e.target.value))
                        }
                      >
                        <option value="">Adres firmy</option>
                        {shipping.map((d, i) => (
                          <option key={`${d.label}-${i}`} value={i}>
                            {d.label || d.name || "Adres"} —{" "}
                            {[d.street, d.buildingNumber].filter(Boolean).join(" ")}
                            {d.city ? `, ${d.city}` : ""}
                            {d.isDefault ? " (domyślny)" : ""}
                          </option>
                        ))}
                      </NativeSelect>
                    ) : null}
                    {selectedShipping && selectedShipIdx != null ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEditShipping(selectedShipIdx!)}
                      >
                        <Pencil />
                        Edytuj
                      </Button>
                    ) : null}
                    <Button variant="outline" size="sm" onClick={startAddShipping}>
                      <Plus />
                      Dodaj adres
                    </Button>
                  </div>
                )
              }
            >
              {editorOpen ? (
                <ShippingEditor
                  value={shipForm}
                  onChange={setShipForm}
                  onCancel={() => {
                    setEditorOpen(false);
                    setEditorIdx(null);
                  }}
                  onSave={saveShipping}
                  onDelete={
                    editorIdx != null
                      ? () => {
                          removeShipping(editorIdx);
                          setEditorOpen(false);
                          setEditorIdx(null);
                        }
                      : undefined
                  }
                />
              ) : selectedShipping ? (
                <ShippingSummary value={selectedShipping} />
              ) : company.street ? (
                <p className="text-sm italic text-muted-foreground">
                  Adres wysyłki = adres firmy. Dodaj osobny, jeśli wysyłka idzie pod inny adres.
                </p>
              ) : (
                <p className="text-sm italic text-muted-foreground">
                  Najpierw uzupełnij sekcję „Dane firmy" lub dodaj osobny adres wysyłki.
                </p>
              )}
            </InfoSection>
          </div>

          <div ref={(node) => { sectionRefs.current["sec-handlowa"] = node; }}>
            <InfoSection icon={CreditCard} title="Sekcja handlowa">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <Field label="Sposób płatności">
                  <NativeSelect
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="">wybierz</option>
                    <option value="przelew">Przelew</option>
                    <option value="gotowka">Gotówka</option>
                    <option value="karta">Karta</option>
                    <option value="pobranie">Pobranie</option>
                  </NativeSelect>
                </Field>
                <Field label="Termin płatności (dni)">
                  <Input
                    type="number"
                    min={0}
                    max={999}
                    placeholder="np. 14"
                    value={paymentDays}
                    onChange={(e) => setPaymentDays(e.target.value)}
                  />
                </Field>
                <Field label="Cennik">
                  <Input
                    placeholder="np. STANDARD"
                    value={pricelist}
                    onChange={(e) => setPricelist(e.target.value)}
                  />
                </Field>
                <Field label="Opiekun handlowy">
                  <NativeSelect
                    value={assignedEmployee}
                    onChange={(e) => setAssignedEmployee(e.target.value)}
                  >
                    <option value="">— brak —</option>
                    <option value="monika">Opiekun handlowy</option>
                    <option value="kamil">Opiekun 2</option>
                  </NativeSelect>
                </Field>
                <Field label="Kategoria kosztowa (FZ)">
                  <NativeSelect
                    value={costCategory}
                    onChange={(e) => setCostCategory(e.target.value)}
                  >
                    <option value="">— brak —</option>
                    <option value="materialy">Materiały produkcyjne</option>
                    <option value="uslugi">Usługi obce</option>
                    <option value="transport">Transport</option>
                  </NativeSelect>
                </Field>
                <Field label="Sposób dostawy (można wybrać kilka)" className="md:col-span-2 xl:col-span-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <NativeSelect
                      aria-label="Dodaj sposób dostawy"
                      className="min-w-[220px] max-w-[280px]"
                      value=""
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v && !shippingMethods.includes(v)) {
                          setShippingMethods((prev) => [...prev, v]);
                        }
                      }}
                    >
                      <option value="">Dodaj sposób dostawy…</option>
                      {["Kurier", "Paleta", "Odbiór własny", "Transport firmowy"]
                        .filter((m) => !shippingMethods.includes(m))
                        .map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                    </NativeSelect>
                    <div className="flex flex-wrap gap-2">
                      {shippingMethods.map((m) => (
                        <Badge key={m} variant="neutral" className="gap-1.5 pr-1">
                          {m}
                          <button
                            aria-label={`Usuń ${m}`}
                            className="inline-flex size-4 items-center justify-center rounded-full hover:bg-muted"
                            onClick={() =>
                              setShippingMethods((prev) => prev.filter((x) => x !== m))
                            }
                            type="button"
                          >
                            <X className="size-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Field>
              </div>
            </InfoSection>
          </div>

          <div ref={(node) => { sectionRefs.current["sec-rejestrowe"] = node; }}>
            <InfoSection
              icon={ClipboardList}
              title="Dane rejestrowe"
              toolbar={
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    Pobierane z GUS / VIES po podaniu NIP
                  </span>
                  <Button variant="outline" size="sm">
                    <Download />
                    Pobierz z GUS
                  </Button>
                </div>
              }
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="REGON">
                  <Input disabled placeholder="—" value="200401234" readOnly />
                </Field>
                <Field label="KRS">
                  <Input disabled placeholder="—" value="0000123456" readOnly />
                </Field>
                <Field label="PKD (2511Z)" className="md:col-span-2">
                  <Input
                    disabled
                    placeholder="—"
                    value="Produkcja konstrukcji metalowych i ich części"
                    readOnly
                  />
                </Field>
                <Field label="Status VAT">
                  <Input disabled placeholder="—" value="Czynny" readOnly />
                </Field>
                <Field label="Data weryfikacji VAT">
                  <Input disabled placeholder="—" value="20.05.2026" readOnly />
                </Field>
                <Field label="Typ podmiotu">
                  <Input disabled placeholder="—" value="Prawna (sp. z o.o./S.A.)" readOnly />
                </Field>
                <Field label="Data rozpoczęcia działalności">
                  <Input disabled placeholder="—" value="04.07.2014" readOnly />
                </Field>
                <Field label="Rachunki bankowe (Biała Lista)" className="md:col-span-2">
                  <div className="space-y-1.5">
                    <code className="block rounded-md bg-muted px-3 py-2 font-mono text-xs">
                      PL 92 1090 1115 0000 0001 2345 6789
                    </code>
                    <code className="block rounded-md bg-muted px-3 py-2 font-mono text-xs">
                      PL 14 1140 2017 0000 4602 9876 5432
                    </code>
                  </div>
                </Field>
                <div className="md:col-span-2">
                  <Badge variant="success">VIES: Aktywny</Badge>
                </div>
              </div>
            </InfoSection>
          </div>

          <div ref={(node) => { sectionRefs.current["sec-ksef"] = node; }}>
            <InfoSection icon={FileText} title="Integracja z KSeF">
              <div className="space-y-3">
                <CheckRow
                  checked={ksefIssue}
                  onCheckedChange={setKsefIssue}
                  label="Wystawiaj e-faktury KSeF"
                  hint="faktury sprzedażowe trafiają do KSeF"
                />
                <CheckRow
                  checked={ksefReceive}
                  onCheckedChange={setKsefReceive}
                  label="Pobieraj e-faktury kosztowe z KSeF"
                  hint="faktury kosztowe pobierane automatycznie"
                />
              </div>
            </InfoSection>
          </div>

          <div ref={(node) => { sectionRefs.current["sec-typ"] = node; }}>
            <InfoSection icon={Tag} title="Typ firmy" required>
              <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                <CheckRow checked={isCustomer} onCheckedChange={setIsCustomer} label="Klient" />
                <CheckRow checked={isSupplier} onCheckedChange={setIsSupplier} label="Dostawca" />
                <CheckRow checked={isLab} onCheckedChange={setIsLab} label="Klient laboratorium" />
                {["Dystrybutor", "Sieć handlowa", "Eksport", "Współpraca marketingowa"].map((t) => (
                  <CheckRow
                    key={t}
                    label={t}
                    checked={extraTypes.includes(t)}
                    onCheckedChange={(v) =>
                      setExtraTypes((prev) =>
                        v ? (prev.includes(t) ? prev : [...prev, t]) : prev.filter((x) => x !== t)
                      )
                    }
                  />
                ))}
              </div>
            </InfoSection>
          </div>
        </main>

        <aside className="space-y-5 xl:sticky xl:top-20 xl:self-start">
          <MapPanel />
          <Card className="p-4">
            <p className="juz-label">Podsumowanie</p>
            <dl className="mt-3 space-y-2 text-sm">
              <SummaryRow label="Sekcje wymagane" value="2 z 2 wypełnione" tone="success" />
              <SummaryRow label="Sekcje opcjonalne" value="4 z 4 wypełnione" tone="muted" />
              <SummaryRow label="Adresy wysyłki" value={`${shipping.length} adresów`} tone="muted" />
              <SummaryRow label="Status walidacji" value="OK" tone="success" />
            </dl>
          </Card>
        </aside>
      </div>
    </section>
  );
}

function RecordHeader({
  shortName,
  company,
  nip,
  rolesLabel,
  extraTypes,
  opiekunLabel,
  paymentMethod,
  paymentDays,
  ksefLabel
}: {
  shortName: string;
  company: Company;
  nip: string;
  rolesLabel: string;
  extraTypes: string[];
  opiekunLabel: string;
  paymentMethod: string;
  paymentDays: string;
  ksefLabel: string;
}) {
  const addressLine = [company.street, company.buildingNumber].filter(Boolean).join(" ");
  const cityLine = [company.postalCode, company.city].filter(Boolean).join(" ");

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
              <h2 className="truncate text-xl font-extrabold">Nowa firma</h2>
              <Badge variant="warning">Szkic</Badge>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Uzupełnij wymagane sekcje i zapisz, aby utworzyć rekord klienta.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-stretch gap-2">
          <Button variant="outline">Anuluj</Button>
          <div className="inline-flex items-stretch overflow-hidden rounded-md">
            <Button className="rounded-r-none">Zapisz firmę</Button>
            <Button
              aria-label="Więcej opcji zapisu"
              className="rounded-l-none border-l border-primary-foreground/20 px-2"
            >
              <ChevronDown />
            </Button>
          </div>
        </div>
      </div>
      <div className="juz-record-meta-row">
        <HeaderMeta label="Nazwa">
          <strong>{shortName || company.name || "—"}</strong>
          {addressLine || cityLine ? (
            <span>
              {addressLine}
              {addressLine && cityLine ? ", " : ""}
              {cityLine}
            </span>
          ) : null}
          {opiekunLabel !== "—" ? <span>Opiekun: {opiekunLabel}</span> : null}
        </HeaderMeta>
        <HeaderMeta label="NIP">
          <strong>{nip || "—"}</strong>
        </HeaderMeta>
        <HeaderMeta label="Role">
          <strong>{rolesLabel || "—"}</strong>
          {extraTypes.length > 0 ? <span>{extraTypes.join(", ")}</span> : null}
        </HeaderMeta>
        <HeaderMeta label="Opiekun">
          <strong>{opiekunLabel}</strong>
        </HeaderMeta>
        <HeaderMeta label="Płatność">
          <strong>{paymentMethod || "—"}</strong>
          {paymentDays ? <span>Termin: {paymentDays} dni</span> : null}
        </HeaderMeta>
        <HeaderMeta label="KSeF">
          <strong>{ksefLabel || "—"}</strong>
        </HeaderMeta>
      </div>
    </Card>
  );
}

function HeaderMeta({
  label,
  className,
  children
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex min-h-28 min-w-0 flex-col gap-1 bg-card p-5 text-sm", className)}>
      <p className="juz-label">{label}</p>
      <div className="flex min-w-0 flex-col gap-1 text-foreground [&_strong]:wrap-break-word [&_span]:wrap-break-word [&_span]:text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

function InfoSection({
  icon: Icon,
  title,
  required,
  toolbar,
  children
}: {
  icon: React.ElementType;
  title: string;
  required?: boolean;
  toolbar?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-3 border-b px-5 py-3 lg:flex-row lg:items-center lg:justify-between">
        <h3 className="inline-flex items-center gap-2 font-extrabold">
          <span className="inline-flex size-7 items-center justify-center rounded-md bg-primary-soft text-primary">
            <Icon className="size-4" />
          </span>
          {title}
          {required ? (
            <Badge variant="destructive" className="ml-1">
              wymagane
            </Badge>
          ) : null}
        </h3>
        {toolbar ? <div className="flex flex-wrap items-center gap-2">{toolbar}</div> : null}
      </div>
      <div className="p-5">{children}</div>
    </Card>
  );
}

function FirmaSummary({
  company,
  nip,
  shortName,
  invoiceEmail
}: {
  company: Company;
  nip: string;
  shortName: string;
  invoiceEmail: string;
}) {
  return (
    <div className="space-y-5">
      <Field label="Pełna nazwa">
        <p className="text-base font-semibold">{company.name || "—"}</p>
      </Field>
      <dl className="grid gap-x-10 gap-y-5 md:grid-cols-2 xl:grid-cols-4">
        <SummaryField label="NIP" value={nip} />
        <SummaryField label="Skrót" value={shortName} />
        <SummaryField label="Telefon" value={company.phone} />
        <SummaryField label="Email" value={company.email} />
        <SummaryField label="Email do faktury" value={invoiceEmail} />
        <SummaryField
          label="Adres"
          value={[
            [company.street, company.buildingNumber].filter(Boolean).join(" "),
            company.apartmentNumber ? `/${company.apartmentNumber}` : ""
          ].join("")}
        />
        <SummaryField label="Kod pocztowy" value={company.postalCode} />
        <SummaryField label="Miasto" value={company.city} />
        <SummaryField label="Kraj" value={COUNTRY_LABEL[company.country] ?? company.country} />
      </dl>
    </div>
  );
}

function FirmaEditor({
  company,
  setCompany,
  nip,
  setNip,
  shortName,
  setShortName,
  invoiceEmail,
  setInvoiceEmail
}: {
  company: Company;
  setCompany: React.Dispatch<React.SetStateAction<Company>>;
  nip: string;
  setNip: (v: string) => void;
  shortName: string;
  setShortName: (v: string) => void;
  invoiceEmail: string;
  setInvoiceEmail: (v: string) => void;
}) {
  function update<K extends keyof Company>(key: K, value: Company[K]) {
    setCompany((prev) => ({ ...prev, [key]: value }));
  }
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-[200px_minmax(0,1fr)_auto]">
        <Field label="Kraj NIP">
          <NativeSelect defaultValue="PL">
            <option value="PL">PL — Polska</option>
            <option value="DE">DE — Niemcy</option>
            <option value="CZ">CZ — Czechy</option>
            <option value="SK">SK — Słowacja</option>
          </NativeSelect>
        </Field>
        <Field label="NIP" required>
          <Input value={nip} onChange={(e) => setNip(e.target.value)} placeholder="10 cyfr" />
        </Field>
        <div className="flex items-end">
          <Button variant="outline">
            <Download />
            Pobierz z GUS
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Pełna nazwa" required>
          <Input
            value={company.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Nazwa firmy"
          />
        </Field>
        <Field label="Skrót">
          <Input
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
            placeholder="np. FIRMA-TEST"
          />
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Email">
          <Input
            type="email"
            value={company.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="kontakt@firma.pl"
          />
        </Field>
        <Field label="Email do faktury">
          <Input
            type="email"
            value={invoiceEmail}
            onChange={(e) => setInvoiceEmail(e.target.value)}
            placeholder="faktury@firma.pl"
          />
        </Field>
        <Field label="Telefon" required>
          <Input
            value={company.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+48 ..."
          />
        </Field>
        <Field label="Kraj">
          <NativeSelect
            value={company.country}
            onChange={(e) => update("country", e.target.value)}
          >
            {Object.entries(COUNTRY_LABEL).map(([code, label]) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </NativeSelect>
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Field label="Ulica" required className="md:col-span-2">
          <Input
            value={company.street}
            onChange={(e) => update("street", e.target.value)}
            placeholder="np. Przemysłowa"
          />
        </Field>
        <Field label="Nr budynku" required>
          <Input
            value={company.buildingNumber}
            onChange={(e) => update("buildingNumber", e.target.value)}
            placeholder="np. 14"
          />
        </Field>
        <Field label="Nr lokalu">
          <Input
            value={company.apartmentNumber}
            onChange={(e) => update("apartmentNumber", e.target.value)}
            placeholder="opcjonalne"
          />
        </Field>
        <Field label="Kod pocztowy" required>
          <Input
            value={company.postalCode}
            onChange={(e) => update("postalCode", e.target.value)}
            placeholder="00-000"
          />
        </Field>
        <Field label="Miasto" required className="md:col-span-3">
          <Input
            value={company.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder="np. Białystok"
          />
        </Field>
      </div>
    </div>
  );
}

function ShippingSummary({ value }: { value: ShippingDraft }) {
  const addressLine =
    [value.street, value.buildingNumber].filter(Boolean).join(" ") +
    (value.apartmentNumber ? `/${value.apartmentNumber}` : "");
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-base font-semibold">{value.label || value.name || "Adres wysyłki"}</p>
        {value.isDefault ? <Badge variant="success">Domyślny</Badge> : null}
      </div>
      <dl className="grid gap-x-10 gap-y-5 md:grid-cols-2 xl:grid-cols-4">
        <SummaryField label="Odbiorca" value={value.name} />
        <SummaryField label="Adres" value={addressLine} />
        <SummaryField label="Kod pocztowy" value={value.postalCode} />
        <SummaryField label="Miasto" value={value.city} />
        <SummaryField label="Kraj" value={COUNTRY_LABEL[value.country] ?? value.country} />
        <SummaryField label="Telefon" value={value.phone} />
        <SummaryField label="Email" value={value.email} />
      </dl>
    </div>
  );
}

function ShippingEditor({
  value,
  onChange,
  onCancel,
  onSave,
  onDelete
}: {
  value: ShippingDraft;
  onChange: (v: ShippingDraft) => void;
  onCancel: () => void;
  onSave: () => void;
  onDelete?: () => void;
}) {
  function update<K extends keyof ShippingDraft>(key: K, v: ShippingDraft[K]) {
    onChange({ ...value, [key]: v });
  }
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Etykieta">
          <Input
            value={value.label}
            onChange={(e) => update("label", e.target.value)}
            placeholder="np. Magazyn główny (opcjonalne)"
          />
        </Field>
        <Field label="Nazwa odbiorcy">
          <Input
            value={value.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="opcjonalne"
          />
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Field label="Ulica" className="md:col-span-2">
          <Input value={value.street} onChange={(e) => update("street", e.target.value)} />
        </Field>
        <Field label="Nr budynku">
          <Input
            value={value.buildingNumber}
            onChange={(e) => update("buildingNumber", e.target.value)}
          />
        </Field>
        <Field label="Nr lokalu">
          <Input
            value={value.apartmentNumber}
            onChange={(e) => update("apartmentNumber", e.target.value)}
          />
        </Field>
        <Field label="Kod pocztowy">
          <Input value={value.postalCode} onChange={(e) => update("postalCode", e.target.value)} />
        </Field>
        <Field label="Miasto" className="md:col-span-2">
          <Input value={value.city} onChange={(e) => update("city", e.target.value)} />
        </Field>
        <Field label="Kraj">
          <NativeSelect value={value.country} onChange={(e) => update("country", e.target.value)}>
            {Object.entries(COUNTRY_LABEL).map(([code, label]) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </NativeSelect>
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Telefon">
          <Input value={value.phone} onChange={(e) => update("phone", e.target.value)} />
        </Field>
        <Field label="Email">
          <Input
            type="email"
            value={value.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </Field>
      </div>
      <CheckRow
        checked={value.isDefault}
        onCheckedChange={(v) => update("isDefault", v)}
        label="Ustaw jako adres domyślny"
      />
      <div className="flex flex-wrap items-center justify-end gap-2 border-t pt-4">
        {onDelete ? (
          <Button variant="ghost" onClick={onDelete} className="mr-auto text-destructive">
            Usuń adres
          </Button>
        ) : null}
        <Button variant="outline" onClick={onCancel}>
          Anuluj
        </Button>
        <Button onClick={onSave}>Zapisz adres</Button>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  className,
  children
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-sm font-semibold text-muted-foreground">
        {label}
        {required ? <span className="ml-1 text-destructive">*</span> : null}
      </span>
      {children}
    </label>
  );
}

function SummaryField({
  label,
  value
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  const v = value === null || value === undefined || value === "" ? "—" : String(value);
  const isEmpty = v === "—";
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          "wrap-break-word text-sm font-semibold",
          isEmpty && "font-normal text-muted-foreground"
        )}
      >
        {v}
      </dd>
    </div>
  );
}

function CheckRow({
  checked,
  onCheckedChange,
  label,
  hint
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-md border bg-muted/25 p-3 text-sm">
      <Checkbox
        checked={checked}
        onCheckedChange={(v) => onCheckedChange(v === true)}
        className="mt-0.5"
      />
      <span className="flex flex-col gap-0.5">
        <span className="font-semibold text-foreground">{label}</span>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </span>
    </label>
  );
}

function SummaryRow({
  label,
  value,
  tone
}: {
  label: string;
  value: string;
  tone: "success" | "muted";
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          "font-semibold",
          tone === "success" && "text-success",
          tone === "muted" && "text-foreground"
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function MapPanel() {
  return (
    <Card className="overflow-hidden">
      <div className="border-b p-4">
        <h3 className="font-extrabold">Lokalizacja</h3>
        <p className="mt-1 font-mono text-sm text-muted-foreground">53.12350, 23.16545</p>
      </div>
      <div className="relative h-72 bg-primary-soft">
        <div className="absolute inset-0 opacity-70 bg-[linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] bg-size-[32px_32px]" />
        <div className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-juz">
          <MapPin className="size-7" />
        </div>
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button className="inline-flex size-9 items-center justify-center rounded-md border bg-card font-bold shadow-juz-sm">
            +
          </button>
          <button className="inline-flex size-9 items-center justify-center rounded-md border bg-card font-bold shadow-juz-sm">
            -
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 p-4">
        <Button variant="outline" size="sm">
          <Copy />
          Kopiuj współrzędne
        </Button>
        <Button variant="ghost" size="sm">
          Geokoduj z adresu
        </Button>
      </div>
    </Card>
  );
}
