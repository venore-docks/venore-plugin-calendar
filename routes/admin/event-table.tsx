import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@venore/plugin-sdk/ui";
import { Badge } from "@venore/plugin-sdk/ui";
import type { CalendarRecord, EventAdminView } from "../../index";
import { EditEventDialog } from "./edit-event-dialog";
import { DeleteEventButton } from "./delete-event-button";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
const timeFormatter = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" });

function formatRange(event: EventAdminView): string {
  const start = event.allDay ? dateFormatter.format(event.startAt) : `${dateFormatter.format(event.startAt)} ${timeFormatter.format(event.startAt)}`;
  if (!event.endAt) return start;
  return `${start} — ${event.allDay ? dateFormatter.format(event.endAt) : timeFormatter.format(event.endAt)}`;
}

export function EventTable({ events, calendars }: { events: EventAdminView[]; calendars: CalendarRecord[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Evento</TableHead>
          <TableHead className="hidden sm:table-cell">Calendário</TableHead>
          <TableHead>Data</TableHead>
          <TableHead className="w-24 text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell className="font-medium text-foreground">
              {event.title}
              {event.location && <p className="text-xs text-muted-foreground">{event.location}</p>}
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <Badge variant="outline">{event.calendarLabel}</Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">{formatRange(event)}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-1">
                <EditEventDialog event={event} calendars={calendars} />
                <DeleteEventButton eventId={event.id} title={event.title} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
