import { asc } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import { calendars } from "../../database/schema";
import type { CalendarRecord } from "../../contracts/types";

export async function findAllCalendars(): Promise<CalendarRecord[]> {
  const rows = await db.select().from(calendars).orderBy(asc(calendars.order), asc(calendars.label));
  return rows as CalendarRecord[];
}
