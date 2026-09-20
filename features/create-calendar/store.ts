import { db } from "@venore/plugin-sdk";
import { calendars } from "../../database/schema";
import type { CalendarRecord } from "../../contracts/types";
import type { CreateCalendarCommand } from "./types";

export async function insertCalendar(command: CreateCalendarCommand): Promise<CalendarRecord> {
  const [row] = await db
    .insert(calendars)
    .values({
      key: command.key.trim(),
      label: command.label.trim(),
      colorToken: command.colorToken ?? "primary",
      order: command.order ?? 0,
    })
    .returning();
  return row as CalendarRecord;
}
