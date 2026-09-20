import { eq, sql } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import { calendars } from "../../database/schema";
import type { CalendarRecord } from "../../contracts/types";

export async function findCalendarById(id: string): Promise<CalendarRecord | null> {
  const [row] = await db.select().from(calendars).where(eq(calendars.id, id)).limit(1);
  return (row as CalendarRecord) ?? null;
}

export async function applyCalendarUpdate(input: {
  id: string;
  label: string;
  colorToken: CalendarRecord["colorToken"];
  order: number;
}): Promise<CalendarRecord> {
  const [row] = await db
    .update(calendars)
    .set({ label: input.label, colorToken: input.colorToken, order: input.order, updatedAt: sql`now()` })
    .where(eq(calendars.id, input.id))
    .returning();
  return row as CalendarRecord;
}
