"use client";

import { useActionState, useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@venore/plugin-sdk/ui";
import { useActionToast } from "@venore/plugin-sdk/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@venore/plugin-sdk/ui";
import { updateEventAction, type CalendarActionState } from "./actions";
import { EventFields } from "./event-fields";
import { formatDateTimeLocal } from "./format-datetime-local";
import type { CalendarRecord, EventAdminView } from "../../index";

const initialState: CalendarActionState = { error: null };

export function EditEventDialog({ event, calendars }: { event: EventAdminView; calendars: CalendarRecord[] }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(updateEventAction, initialState);
  useActionToast({ pending, error: state.error, successMessage: "Evento atualizado.", onSuccess: () => setOpen(false) });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={`Editar ${event.title}`}>
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar evento</DialogTitle>
          <DialogDescription>{event.title}</DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-3">
          <input type="hidden" name="eventId" value={event.id} />
          <EventFields
            calendars={calendars}
            defaultCalendarId={event.calendarId}
            defaultTitle={event.title}
            defaultDescription={event.description ?? ""}
            defaultLocation={event.location ?? ""}
            defaultStartAt={formatDateTimeLocal(event.startAt)}
            defaultEndAt={event.endAt ? formatDateTimeLocal(event.endAt) : ""}
            defaultAllDay={event.allDay}
          />
          <Button type="submit" disabled={pending} className="w-full">
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
