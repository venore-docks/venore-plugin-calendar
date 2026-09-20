import { findAllCalendars } from "../list-calendars/store";
import type { ListPublicCalendarsResult } from "./types";

export async function listPublicCalendars(): Promise<ListPublicCalendarsResult> {
  return { success: true, data: await findAllCalendars() };
}
