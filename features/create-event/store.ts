import { db } from "@venore/plugin-sdk";
import { calendarEvents } from "../../database/schema";
import type { CalendarEventRecord } from "../../contracts/types";
import type { CreateEventCommand } from "./types";

export async function insertEvent(command: CreateEventCommand): Promise<CalendarEventRecord> {
  const [row] = await db
    .insert(calendarEvents)
    .values({
      calendarId: command.calendarId,
      title: command.title.trim(),
      description: command.description?.trim() || null,
      location: command.location?.trim() || null,
      startAt: command.startAt,
      endAt: command.endAt ?? null,
      allDay: command.allDay ?? false,
      createdByUserId: command.actorId,
    })
    .returning();
  return row as CalendarEventRecord;
}
