import { eq } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import { calendars } from "../../database/schema";

// ON DELETE CASCADE na FK de calendarEvents.calendarId (database/schema/index.ts) já remove os
// eventos do calendário junto — sem passo extra aqui.
export async function deleteCalendarById(id: string): Promise<boolean> {
  const rows = await db.delete(calendars).where(eq(calendars.id, id)).returning({ id: calendars.id });
  return rows.length > 0;
}
