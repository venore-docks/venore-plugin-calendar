import { authorizeActor } from "@venore/plugin-sdk/rbac";
import { createEvent } from "./service";
import { validateCreateEventInput } from "./validation";
import type { CreateEventInput, CreateEventResult } from "./types";

export async function createEventHandler(input: CreateEventInput): Promise<CreateEventResult> {
  const validationError = validateCreateEventInput(input);
  if (validationError) {
    return { success: false, error: validationError };
  }

  const authz = await authorizeActor("calendar.manage");
  if (!authz.authorized) {
    return { success: false, error: authz.error };
  }

  return createEvent({ ...input, actorId: authz.actorId });
}
