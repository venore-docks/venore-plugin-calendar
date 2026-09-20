import type { OperationResult } from "@venore/plugin-sdk";
import type { CalendarColorToken, CalendarRecord } from "../../contracts/types";

export type UpdateCalendarCommand = {
  calendarId: string;
  label: string;
  colorToken: CalendarColorToken;
  order: number;
  actorId: string;
};

export type UpdateCalendarInput = Omit<UpdateCalendarCommand, "actorId">;
export type UpdateCalendarResult = OperationResult<CalendarRecord>;
