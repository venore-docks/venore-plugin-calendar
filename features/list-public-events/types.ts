import type { OperationResult } from "@venore/plugin-sdk";
import type { CalendarColorToken } from "../../contracts/types";

export type PublicEventView = {
  id: string;
  calendarKey: string;
  calendarLabel: string;
  calendarColorToken: CalendarColorToken;
  title: string;
  location: string | null;
  startAt: Date;
  endAt: Date | null;
  allDay: boolean;
};

export type ListPublicEventsQuery = { calendarKey?: string; limit?: number };
export type ListPublicEventsResult = OperationResult<PublicEventView[]>;
