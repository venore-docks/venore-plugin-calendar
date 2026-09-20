import type { OperationResult } from "@venore/plugin-sdk";
import type { CalendarColorToken, CalendarRecord } from "../../contracts/types";

export type CreateCalendarCommand = {
  key: string;
  label: string;
  colorToken?: CalendarColorToken;
  order?: number;
  actorId: string;
};

export type CreateCalendarInput = Omit<CreateCalendarCommand, "actorId">;
export type CreateCalendarResult = OperationResult<CalendarRecord>;
