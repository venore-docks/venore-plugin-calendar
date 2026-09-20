import { authorizeActor } from "@venore/plugin-sdk/rbac";
import { updateEvent } from "./service";
import { validateUpdateEventInput } from "./validation";
import type { UpdateEventInput, UpdateEventResult } from "./types";

export async function updateEventHandler(input: UpdateEventInput): Promise<UpdateEventResult> {
  const validationError = validateUpdateEventInput(input);
  if (validationError) {
    return { success: false, error: validationError };
  }

  const authz = await authorizeActor("calendar.manage");
  if (!authz.authorized) {
    return { success: false, error: authz.error };
  }

  return updateEvent({ ...input, actorId: authz.actorId });
}
