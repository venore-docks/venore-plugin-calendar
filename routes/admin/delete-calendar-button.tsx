"use client";

import { useActionState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@venore/plugin-sdk/ui";
import { useActionToast } from "@venore/plugin-sdk/ui";
import { deleteCalendarAction, type CalendarActionState } from "./actions";

const initialState: CalendarActionState = { error: null };

export function DeleteCalendarButton({ calendarId, label }: { calendarId: string; label: string }) {
  const [state, formAction, pending] = useActionState(deleteCalendarAction, initialState);
  useActionToast({ pending, error: state.error, successMessage: `${label} removido.` });

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!window.confirm(`Remover o calendário "${label}"? Todos os eventos dele também serão removidos.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="calendarId" value={calendarId} />
      <Button type="submit" variant="ghost" size="icon" disabled={pending} aria-label={`Remover ${label}`}>
        <Trash2 className="size-4" />
      </Button>
    </form>
  );
}
