import * as React from "react";
import { Building2, MapPin, Phone, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface DocumentParty {
  name: string;
  taxId?: string;
  addressLines?: string[];
  email?: string;
  phone?: string;
  notes?: string;
}

export interface DocumentPartiesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  seller: DocumentParty;
  buyer: DocumentParty;
  sellerLabel?: string;
  buyerLabel?: string;
}

function PartyCard({
  party,
  label,
  tone,
}: {
  party: DocumentParty;
  label: string;
  tone: "primary" | "neutral";
}) {
  return (
    <article className="rounded-lg border border-border bg-background p-4">
      <header className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </span>
        <Badge variant={tone === "primary" ? "default" : "neutral"}>
          <Building2 className="mr-1 size-3" />
          Strona
        </Badge>
      </header>
      <h3 className="mt-2 text-lg font-extrabold leading-tight text-foreground">
        {party.name}
      </h3>
      {party.taxId ? (
        <p className="mt-1 font-mono text-sm font-semibold text-muted-foreground">
          NIP: {party.taxId}
        </p>
      ) : null}
      {party.addressLines?.length ? (
        <div className="mt-3 flex items-start gap-2 text-sm text-foreground">
          <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
          <div>
            {party.addressLines.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      ) : null}
      {party.email || party.phone ? (
        <div className="mt-3 flex flex-col gap-1 text-sm text-muted-foreground">
          {party.email ? (
            <p className="flex items-center gap-2">
              <Mail className="size-4" />
              {party.email}
            </p>
          ) : null}
          {party.phone ? (
            <p className="flex items-center gap-2">
              <Phone className="size-4" />
              {party.phone}
            </p>
          ) : null}
        </div>
      ) : null}
      {party.notes ? (
        <p className="mt-3 rounded-md bg-muted/50 p-2 text-xs text-muted-foreground">
          {party.notes}
        </p>
      ) : null}
    </article>
  );
}

const DocumentParties = React.forwardRef<HTMLDivElement, DocumentPartiesProps>(
  (
    {
      className,
      seller,
      buyer,
      sellerLabel = "Sprzedawca",
      buyerLabel = "Nabywca",
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn("grid gap-4 md:grid-cols-2", className)}
        ref={ref}
        {...props}
      >
        <PartyCard label={sellerLabel} party={seller} tone="primary" />
        <PartyCard label={buyerLabel} party={buyer} tone="neutral" />
      </div>
    );
  }
);
DocumentParties.displayName = "DocumentParties";

export { DocumentParties };
