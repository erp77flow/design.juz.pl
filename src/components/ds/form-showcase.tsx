import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function FormShowcase() {
  return (
    <Card className="p-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <label className="space-y-2">
          <span className="text-sm font-semibold">Nazwa zlecenia</span>
          <Input defaultValue="Długopis Classic 0.7" />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold">Klient</span>
          <select className="h-11 w-full rounded-md border border-input bg-card px-3 text-sm shadow-juz-sm">
            <option>MarkerPro</option>
            <option>PaperLine</option>
            <option>KolorMix</option>
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-semibold">Wyszukaj</span>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Szukaj złeceń, produktów, klientów..." />
          </div>
        </label>
        <label className="space-y-2 lg:col-span-2">
          <span className="text-sm font-semibold">Opis zlecenia</span>
          <Textarea placeholder="Wpisz wymagania produkcyjne..." />
        </label>
        <div className="space-y-4">
          <span className="block text-sm font-semibold">Statusy i opcje</span>
          <label className="flex items-center gap-3">
            <input className="size-5 accent-primary" type="checkbox" defaultChecked />
            <span>Uruchom automatyzacje</span>
          </label>
          <label className="flex items-center gap-3">
            <input className="size-5 accent-primary" type="radio" name="mode" defaultChecked />
            <span>Standardowy termin</span>
          </label>
          <div className="flex flex-wrap gap-2">
            <Badge>Linia A</Badge>
            <Badge variant="success">Aktywny</Badge>
            <Badge variant="warning">Wymaga kontroli</Badge>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline">Anuluj</Button>
        <Button>Zapisz</Button>
      </div>
    </Card>
  );
}
