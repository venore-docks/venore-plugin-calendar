import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { applyCalendarUpdate, findCalendarById } from "./store";
import type { UpdateCalendarCommand, UpdateCalendarResult } from "./types";

export async function updateCalendar(command: UpdateCalendarCommand): Promise<UpdateCalendarResult> {
  const handle = beginOperation({
    useCase: "calendar.update-calendar",
    actor: { id: command.actorId, type: "user" },
    kind: "write",
  });

  const existing = await findCalendarById(command.calendarId);
  if (!existing) {
    const error = { code: "calendar.not_found", message: `Calendário "${command.calendarId}" não encontrado.` };
    endOperation(handle, { success: false, error });
    return { success: false, error };
  }

  const record = await applyCalendarUpdate({
    id: command.calendarId,
    label: command.label.trim(),
    colorToken: command.colorToken,
    order: command.order,
  });

  endOperation(handle, { success: true });
  return { success: true, data: record };
}
