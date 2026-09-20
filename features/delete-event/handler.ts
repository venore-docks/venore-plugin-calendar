import { authorizeActor } from "@venore/plugin-sdk/rbac";
import { deleteEvent } from "./service";
import type { DeleteEventInput, DeleteEventResult } from "./types";

export async function deleteEventHandler(input: DeleteEventInput): Promise<DeleteEventResult> {
  if (input.eventId.trim().length === 0) {
    return { success: false, error: { code: "calendar.invalid_id", message: "eventId não pode ser vazio." } };
  }

  const authz = await authorizeActor("calendar.manage");
  if (!authz.authorized) {
    return { success: false, error: authz.error };
  }

  return deleteEvent({ eventId: input.eventId, actorId: authz.actorId });
}
