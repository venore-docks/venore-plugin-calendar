import { authorizeActor } from "@venore/plugin-sdk/rbac";
import { deleteCalendar } from "./service";
import type { DeleteCalendarInput, DeleteCalendarResult } from "./types";

export async function deleteCalendarHandler(input: DeleteCalendarInput): Promise<DeleteCalendarResult> {
  if (input.calendarId.trim().length === 0) {
    return { success: false, error: { code: "calendar.invalid_id", message: "calendarId não pode ser vazio." } };
  }

  const authz = await authorizeActor("calendar.manage");
  if (!authz.authorized) {
    return { success: false, error: authz.error };
  }

  return deleteCalendar({ calendarId: input.calendarId, actorId: authz.actorId });
}
