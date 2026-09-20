import { authorizeActor } from "@venore/plugin-sdk/rbac";
import { updateCalendar } from "./service";
import type { UpdateCalendarInput, UpdateCalendarResult } from "./types";

export async function updateCalendarHandler(input: UpdateCalendarInput): Promise<UpdateCalendarResult> {
  if (input.calendarId.trim().length === 0) {
    return { success: false, error: { code: "calendar.invalid_id", message: "calendarId não pode ser vazio." } };
  }
  if (input.label.trim().length === 0) {
    return { success: false, error: { code: "calendar.invalid_label", message: "O nome do calendário não pode ser vazio." } };
  }

  const authz = await authorizeActor("calendar.manage");
  if (!authz.authorized) {
    return { success: false, error: authz.error };
  }

  return updateCalendar({ ...input, actorId: authz.actorId });
}
