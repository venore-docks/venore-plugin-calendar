"use client";

import { useActionState, useState } from "react";
import { Plus } from "lucide-react";
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
import { createEventAction, type CalendarActionState } from "./actions";
import { EventFields } from "./event-fields";
import type { CalendarRecord } from "../../index";

const initialState: CalendarActionState = { error: null };

export function CreateEventDialog({ calendars }: { calendars: CalendarRecord[] }) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(createEventAction, initialState);
  useActionToast({ pending, error: state.error, successMessage: "Evento cadastrado.", onSuccess: () => setOpen(false) });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={calendars.length === 0}>
          <Plus className="size-4" />
          Novo evento
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo evento</DialogTitle>
          <DialogDescription>Escolha o calendário e as datas do evento.</DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-3">
          <EventFields calendars={calendars} />
          <Button type="submit" disabled={pending} className="w-full">
            Cadastrar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
