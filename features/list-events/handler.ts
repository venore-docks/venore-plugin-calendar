import { authorizeActor } from "@venore/plugin-sdk/rbac";
import { listEvents } from "./service";
import type { ListEventsResult } from "./types";

export async function listEventsHandler(): Promise<ListEventsResult> {
  const authz = await authorizeActor("calendar.read");
  if (!authz.authorized) {
    return { success: false, error: authz.error };
  }

  return listEvents();
}
