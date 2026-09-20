import { findUpcomingEvents } from "./store";
import type { ListPublicEventsQuery, ListPublicEventsResult } from "./types";

export async function listPublicEvents(query: ListPublicEventsQuery = {}): Promise<ListPublicEventsResult> {
  const events = await findUpcomingEvents(query.calendarKey);
  const limited = query.limit ? events.slice(0, query.limit) : events;
  return { success: true, data: limited };
}
