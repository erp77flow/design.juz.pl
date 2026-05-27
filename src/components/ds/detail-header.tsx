import type * as React from "react";
import { ArrowLeft, Copy, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type DetailHeaderAction = {
  label: string;
  icon?: React.ElementType;
  variant?: React.ComponentProps<typeof Button>["variant"];
};

type DetailHeaderMetaItem = {
  label: string;
  value: string;
};

export type DetailHeaderProps = {
  title?: string;
  subtitle?: string;
  status?: string;
  statusVariant?: React.ComponentProps<typeof Badge>["variant"];
  backLabel?: string;
  actions?: DetailHeaderAction[];
  metaItems?: DetailHeaderMetaItem[];
};

const defaultActions: DetailHeaderAction[] = [
  { label: "Edytuj", icon: Pencil, variant: "default" },
  { label: "Anuluj złeceńie", icon: Trash2, variant: "destructive" }
];

const defaultMetaItems: DetailHeaderMetaItem[] = [
  { label: "Klient", value: "Klient testowy S.A." },
  { label: "Termin", value: "28.05.2026" },
  { label: "Postep", value: "68%" },
  { label: "Opiekun", value: "Opiekun 1" }
];

export function DetailHeader({
  title = "ZP/00042/05/26",
  subtitle = "Długopis Classic 0.7 / seria niebieska / linia A",
  status = "W produkcji",
  statusVariant = "success",
  backLabel = "Wróć",
  actions = defaultActions,
  metaItems = defaultMetaItems
}: DetailHeaderProps) {
  return (
    <Card className="overflow-hidden shadow-none">
      <div className="flex flex-col gap-4 border-b p-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <Button variant="outline" size="sm">
            <ArrowLeft />
            {backLabel}
          </Button>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-2xl font-extrabold">{title}</h2>
              <Button variant="ghost" size="icon" aria-label="Kopiuj">
                <Copy />
              </Button>
              <Badge variant={statusVariant}>{status}</Badge>
            </div>
            {subtitle ? <p className="mt-1 text-muted-foreground">{subtitle}</p> : null}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Button variant={action.variant ?? "outline"} key={action.label}>
                {Icon ? <Icon /> : null}
                {action.label}
              </Button>
            );
          })}
        </div>
      </div>
      {metaItems.length > 0 ? (
        <dl className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {metaItems.map(({ label, value }) => (
            <div className="bg-card p-5" key={label}>
              <dt className="text-sm text-muted-foreground">{label}</dt>
              <dd className="mt-1 text-lg font-bold">{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </Card>
  );
}
