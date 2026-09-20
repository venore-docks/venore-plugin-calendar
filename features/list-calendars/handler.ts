import { authorizeActor } from "@venore/plugin-sdk/rbac";
import { listCalendars } from "./service";
import type { ListCalendarsResult } from "./types";

export async function listCalendarsHandler(): Promise<ListCalendarsResult> {
  const authz = await authorizeActor("calendar.read");
  if (!authz.authorized) {
    return { success: false, error: authz.error };
  }

  return listCalendars();
}
