import { and, asc, eq, gte } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import { calendarEvents, calendars } from "../../database/schema";
import type { PublicEventView } from "./types";

// "Próximo" = ainda não terminou: usa endAt quando existe, senão startAt (evento de dia único).
export async function findUpcomingEvents(calendarKey?: string): Promise<PublicEventView[]> {
  const now = new Date();
  const conditions = calendarKey
    ? and(gte(calendarEvents.startAt, now), eq(calendars.key, calendarKey))
    : gte(calendarEvents.startAt, now);

  const rows = await db
    .select({
      id: calendarEvents.id,
      calendarKey: calendars.key,
      calendarLabel: calendars.label,
      calendarColorToken: calendars.colorToken,
      title: calendarEvents.title,
      location: calendarEvents.location,
      startAt: calendarEvents.startAt,
      endAt: calendarEvents.endAt,
      allDay: calendarEvents.allDay,
    })
    .from(calendarEvents)
    .innerJoin(calendars, eq(calendarEvents.calendarId, calendars.id))
    .where(conditions)
    .orderBy(asc(calendarEvents.startAt));

  return rows as PublicEventView[];
}
