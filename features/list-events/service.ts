import { findAllEventsWithCalendar } from "./store";
import type { ListEventsResult } from "./types";

export async function listEvents(): Promise<ListEventsResult> {
  return { success: true, data: await findAllEventsWithCalendar() };
}
