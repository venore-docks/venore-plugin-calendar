import { authorizeActor } from "@venore/plugin-sdk/rbac";
import { createCalendar } from "./service";
import { validateCreateCalendarInput } from "./validation";
import type { CreateCalendarInput, CreateCalendarResult } from "./types";

export async function createCalendarHandler(input: CreateCalendarInput): Promise<CreateCalendarResult> {
  const validationError = validateCreateCalendarInput(input);
  if (validationError) {
    return { success: false, error: validationError };
  }

  const authz = await authorizeActor("calendar.manage");
  if (!authz.authorized) {
    return { success: false, error: authz.error };
  }

  return createCalendar({ ...input, actorId: authz.actorId });
}
