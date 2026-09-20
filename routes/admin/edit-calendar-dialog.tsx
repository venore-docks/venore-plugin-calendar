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
import { updateCalendarAction, type CalendarActionState } from "./actions";
import { CalendarFields } from "./calendar-fields";
import type { CalendarRecord } from "../../index";

const initialState: CalendarActionState = { error: null };

export function EditCalendarDialog({ calendar }: { calendar: CalendarRecord }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(updateCalendarAction, initialState);
  useActionToast({ pending, error: state.error, successMessage: "Calendário atualizado.", onSuccess: () => setOpen(false) });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={`Editar ${calendar.label}`}>
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar calendário</DialogTitle>
          <DialogDescription>{calendar.label}</DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-3">
          <input type="hidden" name="calendarId" value={calendar.id} />
          <CalendarFields
            showKey={false}
            defaultLabel={calendar.label}
            defaultColorToken={calendar.colorToken}
            defaultOrder={calendar.order}
          />
          <Button type="submit" disabled={pending} className="w-full">
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
