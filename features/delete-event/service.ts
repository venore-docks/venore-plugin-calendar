import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { deleteEventById } from "./store";
import type { DeleteEventCommand, DeleteEventResult } from "./types";

export async function deleteEvent(command: DeleteEventCommand): Promise<DeleteEventResult> {
  const handle = beginOperation({
    useCase: "calendar.delete-event",
    actor: { id: command.actorId, type: "user" },
    kind: "write",
  });

  const deleted = await deleteEventById(command.eventId);
  if (!deleted) {
    const error = { code: "calendar.not_found", message: `Evento "${command.eventId}" não encontrado.` };
    endOperation(handle, { success: false, error });
    return { success: false, error };
  }

  endOperation(handle, { success: true });
  return { success: true, data: { eventId: command.eventId } };
}
