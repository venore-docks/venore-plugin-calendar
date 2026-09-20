import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { applyEventUpdate, findEventById } from "./store";
import type { UpdateEventCommand, UpdateEventResult } from "./types";

export async function updateEvent(command: UpdateEventCommand): Promise<UpdateEventResult> {
  const handle = beginOperation({
    useCase: "calendar.update-event",
    actor: { id: command.actorId, type: "user" },
    kind: "write",
  });

  const existing = await findEventById(command.eventId);
  if (!existing) {
    const error = { code: "calendar.not_found", message: `Evento "${command.eventId}" não encontrado.` };
    endOperation(handle, { success: false, error });
    return { success: false, error };
  }

  const record = await applyEventUpdate({
    id: command.eventId,
    calendarId: command.calendarId,
    title: command.title.trim(),
    description: command.description?.trim() || null,
    location: command.location?.trim() || null,
    startAt: command.startAt,
    endAt: command.endAt ?? null,
    allDay: command.allDay ?? false,
  });

  endOperation(handle, { success: true });
  return { success: true, data: record };
}
