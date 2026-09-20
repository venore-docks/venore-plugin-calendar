import { CalendarDays } from "lucide-react";
import { Badge } from "@venore/plugin-sdk/ui";
import type { PublicEventView } from "../../index";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
const timeFormatter = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" });

function formatRange(event: PublicEventView): string {
  const start = event.allDay ? dateFormatter.format(event.startAt) : `${dateFormatter.format(event.startAt)} às ${timeFormatter.format(event.startAt)}`;
  if (!event.endAt) return start;
  return `${start} até ${event.allDay ? dateFormatter.format(event.endAt) : timeFormatter.format(event.endAt)}`;
}

export function CalendarPublicList({ events }: { events: PublicEventView[] }) {
  if (events.length === 0) {
    return <p className="text-sm text-muted-foreground">Não há eventos programados no momento.</p>;
  }

  return (
    <ul className="space-y-3">
      {events.map((event) => (
        <li key={event.id} className="flex items-start gap-3 rounded-panel border border-border bg-card p-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
            <CalendarDays className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-foreground">{event.title}</p>
              <Badge variant="outline">{event.calendarLabel}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {formatRange(event)}
              {event.location ? ` · ${event.location}` : ""}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
