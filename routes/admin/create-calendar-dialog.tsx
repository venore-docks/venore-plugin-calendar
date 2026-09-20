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
import { createCalendarAction, type CalendarActionState } from "./actions";
import { CalendarFields } from "./calendar-fields";

const initialState: CalendarActionState = { error: null };

export function CreateCalendarDialog() {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(createCalendarAction, initialState);
  useActionToast({ pending, error: state.error, successMessage: "Calendário cadastrado.", onSuccess: () => setOpen(false) });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="size-4" />
          Novo calendário
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo calendário</DialogTitle>
          <DialogDescription>Ex.: um calendário por unidade (Fidelis, Erasto, FEM).</DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-3">
          <CalendarFields showKey />
          <Button type="submit" disabled={pending} className="w-full">
            Cadastrar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
