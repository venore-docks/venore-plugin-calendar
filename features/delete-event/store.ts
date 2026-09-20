import { eq } from "drizzle-orm";
import { db } from "@venore/plugin-sdk";
import { calendarEvents } from "../../database/schema";

export async function deleteEventById(id: string): Promise<boolean> {
  const rows = await db.delete(calendarEvents).where(eq(calendarEvents.id, id)).returning({ id: calendarEvents.id });
  return rows.length > 0;
}
