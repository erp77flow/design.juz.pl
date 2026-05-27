import * as React from "react";
import { Calendar as CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Typography } from "@/components/ui/typography";

export interface CalendarEventParticipant {
  id: string | number;
  name: string;
  avatarUrl?: string;
}

export interface CalendarEventSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
  participants?: CalendarEventParticipant[];
  actions?: React.ReactNode;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

const CalendarEventSection = React.forwardRef<
  HTMLDivElement,
  CalendarEventSectionProps
>(
  (
    {
      title,
      date,
      time,
      location,
      description,
      participants,
      actions,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("juz-card overflow-hidden", className)}
        {...props}
      >
        <div className="space-y-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 space-y-1">
              <Typography variant="h4" className="truncate">
                {title}
              </Typography>
              {description ? (
                <Typography variant="muted" className="line-clamp-2">
                  {description}
                </Typography>
              ) : null}
            </div>
            {actions ? (
              <div className="flex shrink-0 items-center gap-2">{actions}</div>
            ) : null}
          </div>

          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <CalendarIcon className="size-4 shrink-0 text-primary" />
              <dt className="sr-only">Data</dt>
              <dd className="font-semibold text-foreground">{date}</dd>
            </div>
            {time ? (
              <div className="flex items-center gap-2">
                <Clock className="size-4 shrink-0 text-primary" />
                <dt className="sr-only">Godzina</dt>
                <dd className="font-semibold text-foreground">{time}</dd>
              </div>
            ) : null}
            {location ? (
              <div className="flex items-center gap-2 sm:col-span-2">
                <MapPin className="size-4 shrink-0 text-primary" />
                <dt className="sr-only">Lokalizacja</dt>
                <dd className="truncate font-medium text-muted-foreground">
                  {location}
                </dd>
              </div>
            ) : null}
          </dl>

          {participants && participants.length > 0 ? (
            <div className="flex items-center gap-3 border-t pt-4">
              <Users className="size-4 shrink-0 text-muted-foreground" />
              <span className="text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">
                Uczestnicy
              </span>
              <div className="flex -space-x-2">
                {participants.slice(0, 5).map((p) => (
                  <Avatar
                    key={p.id}
                    className="size-8 border-2 border-card"
                    title={p.name}
                  >
                    {p.avatarUrl ? (
                      <AvatarImage src={p.avatarUrl} alt={p.name} />
                    ) : null}
                    <AvatarFallback>{getInitials(p.name)}</AvatarFallback>
                  </Avatar>
                ))}
                {participants.length > 5 ? (
                  <Avatar className="size-8 border-2 border-card">
                    <AvatarFallback className="bg-muted text-muted-foreground">
                      +{participants.length - 5}
                    </AvatarFallback>
                  </Avatar>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
);
CalendarEventSection.displayName = "CalendarEventSection";

export { CalendarEventSection };
