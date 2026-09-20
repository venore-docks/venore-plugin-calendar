import type { OperationResult } from "@venore/plugin-sdk";

export type DeleteCalendarCommand = { calendarId: string; actorId: string };
export type DeleteCalendarInput = Omit<DeleteCalendarCommand, "actorId">;
export type DeleteCalendarResult = OperationResult<{ calendarId: string }>;
