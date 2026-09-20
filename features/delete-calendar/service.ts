import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { deleteCalendarById } from "./store";
import type { DeleteCalendarCommand, DeleteCalendarResult } from "./types";

export async function deleteCalendar(command: DeleteCalendarCommand): Promise<DeleteCalendarResult> {
  const handle = beginOperation({
    useCase: "calendar.delete-calendar",
    actor: { id: command.actorId, type: "user" },
    kind: "write",
  });

  const deleted = await deleteCalendarById(command.calendarId);
  if (!deleted) {
    const error = { code: "calendar.not_found", message: `Calendário "${command.calendarId}" não encontrado.` };
    endOperation(handle, { success: false, error });
    return { success: false, error };
  }

  endOperation(handle, { success: true });
  return { success: true, data: { calendarId: command.calendarId } };
}
