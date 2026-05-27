import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ProcessStepper } from "@/components/ds/enterprise-screens";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Filter, Plus, Search, SlidersHorizontal, X } from "lucide-react";

function RecordToolbarExample() {
  const [filtersOpen, setFiltersOpen] = React.useState(true);
  const [columnsOpen, setColumnsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState("Wszystkie");
  const [visible, setVisible] = React.useState({
    number: true,
    status: true,
    product: true,
    deadline: true
  });
  const rows = [
    ["ZP/00042/05/26", "W toku", "Długopis Classic 0.7", "28.05.2026"],
    ["ZP/00043/05/26", "Planowane", "Flamaster Neon Mix", "29.05.2026"],
    ["ZP/00044/05/26", "Wymaga uwagi", "Mazak Pro B2B", "30.05.2026"]
  ];
  const filtered = rows.filter((row) => {
    const matchesQuery = row.join(" ").toLowerCase().includes(query.toLowerCase());
    const matchesStatus = status === "Wszystkie" || row[1] === status;
    return matchesQuery && matchesStatus;
  });
  const visibleCount = Object.values(visible).filter(Boolean).length;

  return (
    <Card className="w-full overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 border-b p-4">
        <h3 className="mr-auto text-lg font-extrabold">Lista w rekordzie</h3>
        <div className="flex h-10 min-w-[280px] items-center gap-2 rounded-md border bg-background px-3">
          <Search className="size-4 text-muted-foreground" />
          <Input
            className="h-auto border-0 p-0 shadow-none focus-visible:ring-0"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Szukaj..."
            value={query}
          />
        </div>
        <Button onClick={() => setFiltersOpen((value) => !value)} variant={filtersOpen ? "default" : "outline"}>
          <Filter /> {filtersOpen ? "Ukryj filtry" : "Pokaż filtry"} <Badge variant="default">{status === "Wszystkie" ? 0 : 1}</Badge>
        </Button>
        <Button onClick={() => setColumnsOpen((value) => !value)} variant={columnsOpen ? "default" : "outline"}>
          <SlidersHorizontal /> {columnsOpen ? "Ukryj kolumny" : "Pokaż kolumny"} <Badge variant="default">{visibleCount}</Badge>
        </Button>
        <Button><Plus /> Nowy rekord</Button>
      </div>
      {filtersOpen ? (
        <div className="grid gap-4 border-b bg-muted/25 p-4 lg:grid-cols-[1fr_1fr_auto] lg:items-end">
          <label className="space-y-2">
            <span className="block text-sm font-bold text-muted-foreground">Status</span>
            <select
              className="h-11 w-full rounded-md border bg-card px-3 font-semibold shadow-juz-sm"
              onChange={(event) => setStatus(event.target.value)}
              value={status}
            >
              {["Wszystkie", "W toku", "Planowane", "Wymaga uwagi"].map((option) => <option key={option}>{option}</option>)}
            </select>
          </label>
          <label className="space-y-2">
            <span className="block text-sm font-bold text-muted-foreground">Produkt</span>
            <Input onChange={(event) => setQuery(event.target.value)} placeholder="Zawiera..." value={query} />
          </label>
          <Button
            variant="ghost"
            onClick={() => {
              setQuery("");
              setStatus("Wszystkie");
            }}
          >
            <X /> Wyczyść
          </Button>
        </div>
      ) : null}
      <div className={columnsOpen ? "grid lg:grid-cols-[minmax(0,1fr)_300px]" : "block"}>
        <div className="min-w-0 p-4">
          <ProcessStepper current={4} />
          <div className="mt-5 w-full overflow-hidden rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  {visible.number ? <TableHead>Numer</TableHead> : null}
                  {visible.status ? <TableHead>Status</TableHead> : null}
                  {visible.product ? <TableHead>Produkt</TableHead> : null}
                  {visible.deadline ? <TableHead>Termin</TableHead> : null}
                  <TableHead className="text-right">Akcje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((row) => (
                  <TableRow key={row[0]}>
                    {visible.number ? <TableCell className="font-mono font-bold text-primary">{row[0]}</TableCell> : null}
                    {visible.status ? <TableCell><Badge variant={row[1] === "Wymaga uwagi" ? "destructive" : row[1] === "Planowane" ? "neutral" : "default"}>{row[1]}</Badge></TableCell> : null}
                    {visible.product ? <TableCell>{row[2]}</TableCell> : null}
                    {visible.deadline ? <TableCell>{row[3]}</TableCell> : null}
                    <TableCell className="text-right"><Button variant="ghost">Podgląd</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        {columnsOpen ? (
          <aside className="border-l p-4">
            <h4 className="mb-3 font-extrabold">Kolumny</h4>
            {[
              ["number", "Numer"],
              ["status", "Status"],
              ["product", "Produkt"],
              ["deadline", "Termin"]
            ].map(([key, label]) => (
              <label className="mb-2 flex items-center justify-between rounded-md border bg-card px-3 py-2" key={key}>
                <span className="font-semibold">{label}</span>
                <input
                  checked={visible[key as keyof typeof visible]}
                  className="h-5 w-5 accent-[hsl(var(--primary))]"
                  onChange={(event) => setVisible((current) => ({ ...current, [key]: event.target.checked }))}
                  type="checkbox"
                />
              </label>
            ))}
          </aside>
        ) : null}
      </div>
    </Card>
  );
}

const meta = {
  title: "Molecules/RecordParts",
  component: RecordToolbarExample,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Małe części ekranów rekordów: toolbar listy, aktywne filtry, ukrywanie kolumn i stepper procesowy."
      }
    }
  }
} satisfies Meta<typeof RecordToolbarExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToolbarAndStepper: Story = {
  render: () => <RecordToolbarExample />
};
