import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@venore/plugin-sdk/ui";
import { Badge } from "@venore/plugin-sdk/ui";
import type { CalendarRecord } from "../../index";
import { EditCalendarDialog } from "./edit-calendar-dialog";
import { DeleteCalendarButton } from "./delete-calendar-button";

export function CalendarTable({ calendars }: { calendars: CalendarRecord[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead className="hidden sm:table-cell">Chave</TableHead>
          <TableHead className="w-24 text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {calendars.map((calendar) => (
          <TableRow key={calendar.id}>
            <TableCell className="font-medium text-foreground">
              <Badge variant="outline">{calendar.label}</Badge>
            </TableCell>
            <TableCell className="hidden text-muted-foreground sm:table-cell">{calendar.key}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-1">
                <EditCalendarDialog calendar={calendar} />
                <DeleteCalendarButton calendarId={calendar.id} label={calendar.label} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
