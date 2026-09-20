import type { OperationResult } from "@venore/plugin-sdk";
import type { CalendarEventRecord } from "../../contracts/types";

export type CreateEventCommand = {
  calendarId: string;
  title: string;
  description?: string | null;
  location?: string | null;
  startAt: Date;
  endAt?: Date | null;
  allDay?: boolean;
  actorId: string;
};

export type CreateEventInput = Omit<CreateEventCommand, "actorId">;
export type CreateEventResult = OperationResult<CalendarEventRecord>;
