import { eq, sql } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import { calendarEvents } from "../../database/schema";
import type { CalendarEventRecord } from "../../contracts/types";

export async function findEventById(id: string): Promise<CalendarEventRecord | null> {
  const [row] = await db.select().from(calendarEvents).where(eq(calendarEvents.id, id)).limit(1);
  return (row as CalendarEventRecord) ?? null;
}

export async function applyEventUpdate(input: {
  id: string;
  calendarId: string;
  title: string;
  description: string | null;
  location: string | null;
  startAt: Date;
  endAt: Date | null;
  allDay: boolean;
}): Promise<CalendarEventRecord> {
  const [row] = await db
    .update(calendarEvents)
    .set({
      calendarId: input.calendarId,
      title: input.title,
      description: input.description,
      location: input.location,
      startAt: input.startAt,
      endAt: input.endAt,
      allDay: input.allDay,
      updatedAt: sql`now()`,
    })
    .where(eq(calendarEvents.id, input.id))
    .returning();

  return row as CalendarEventRecord;
}
