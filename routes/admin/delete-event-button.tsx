"use client";

import { useActionState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@venore/plugin-sdk/ui";
import { useActionToast } from "@venore/plugin-sdk/ui";
import { deleteEventAction, type CalendarActionState } from "./actions";

const initialState: CalendarActionState = { error: null };

export function DeleteEventButton({ eventId, title }: { eventId: string; title: string }) {
  const [state, formAction, pending] = useActionState(deleteEventAction, initialState);
  useActionToast({ pending, error: state.error, successMessage: `${title} removido.` });

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!window.confirm(`Remover o evento "${title}"?`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="eventId" value={eventId} />
      <Button type="submit" variant="ghost" size="icon" disabled={pending} aria-label={`Remover ${title}`}>
        <Trash2 className="size-4" />
      </Button>
    </form>
  );
}
