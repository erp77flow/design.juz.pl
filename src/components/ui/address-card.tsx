import * as React from "react";
import { Building2, Mail, MapPin, Phone, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";

interface AddressCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: React.ReactNode;
  street: React.ReactNode;
  city: React.ReactNode;
  postalCode: React.ReactNode;
  country?: React.ReactNode;
  tax?: React.ReactNode;
  phone?: React.ReactNode;
  email?: React.ReactNode;
  isPrimary?: boolean;
}

interface FieldRowProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

function FieldRow({ icon, label, value }: FieldRowProps) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-4">
        {icon}
      </span>
      <div className="flex min-w-0 flex-col">
        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {label}
        </span>
        <span className="truncate text-sm font-semibold text-foreground">
          {value}
        </span>
      </div>
    </div>
  );
}

const AddressCard = React.forwardRef<HTMLDivElement, AddressCardProps>(
  (
    {
      name,
      street,
      city,
      postalCode,
      country,
      tax,
      phone,
      email,
      isPrimary,
      className,
      ...props
    },
    ref
  ) => (
    <Card
      ref={ref}
      className={cn("flex flex-col gap-4 p-6", className)}
      {...props}
    >
      <div className="flex items-start gap-3">
        <IconTile tone="primary" icon={<MapPin />} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-base font-bold text-foreground">
              {name}
            </span>
            {isPrimary ? <Badge variant="success">Główny</Badge> : null}
          </div>
          <span className="text-sm text-muted-foreground">
            {street}
          </span>
          <span className="text-sm text-muted-foreground">
            {postalCode} {city}
            {country ? `, ${country}` : ""}
          </span>
        </div>
      </div>
      {tax || phone || email ? (
        <div className="grid grid-cols-1 gap-3 border-t border-border pt-4 sm:grid-cols-2">
          {tax ? (
            <FieldRow icon={<Receipt />} label="NIP" value={tax} />
          ) : null}
          {phone ? (
            <FieldRow icon={<Phone />} label="Telefon" value={phone} />
          ) : null}
          {email ? (
            <FieldRow icon={<Mail />} label="E-mail" value={email} />
          ) : null}
          {!tax && !phone && !email ? (
            <FieldRow icon={<Building2 />} label="Firma" value={name} />
          ) : null}
        </div>
      ) : null}
    </Card>
  )
);
AddressCard.displayName = "AddressCard";

export { AddressCard };
export type { AddressCardProps };
