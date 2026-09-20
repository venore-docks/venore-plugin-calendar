import { findAllCalendars } from "./store";
import type { ListCalendarsResult } from "./types";

export async function listCalendars(): Promise<ListCalendarsResult> {
  return { success: true, data: await findAllCalendars() };
}
