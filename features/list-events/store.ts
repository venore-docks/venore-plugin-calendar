import { asc, eq } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import { calendarEvents, calendars } from "../../database/schema";
import type { EventAdminView } from "./types";

export async function findAllEventsWithCalendar(): Promise<EventAdminView[]> {
  const rows = await db
    .select({
      id: calendarEvents.id,
      calendarId: calendarEvents.calendarId,
      calendarLabel: calendars.label,
      calendarColorToken: calendars.colorToken,
      title: calendarEvents.title,
      description: calendarEvents.description,
      location: calendarEvents.location,
      startAt: calendarEvents.startAt,
      endAt: calendarEvents.endAt,
      allDay: calendarEvents.allDay,
    })
    .from(calendarEvents)
    .innerJoin(calendars, eq(calendarEvents.calendarId, calendars.id))
    .orderBy(asc(calendarEvents.startAt));

  return rows as EventAdminView[];
}
