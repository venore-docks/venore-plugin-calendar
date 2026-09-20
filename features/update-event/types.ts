import type { OperationResult } from "@venore/plugin-sdk";
import type { CalendarEventRecord } from "../../contracts/types";

export type UpdateEventCommand = {
  eventId: string;
  calendarId: string;
  title: string;
  description?: string | null;
  location?: string | null;
  startAt: Date;
  endAt?: Date | null;
  allDay?: boolean;
  actorId: string;
};

export type UpdateEventInput = Omit<UpdateEventCommand, "actorId">;
export type UpdateEventResult = OperationResult<CalendarEventRecord>;
