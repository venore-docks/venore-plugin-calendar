import type { OperationResult } from "@venore/plugin-sdk";
import type { CalendarColorToken } from "../../contracts/types";

// View "achatada" (join com calendars) — evita o admin ter que resolver calendarId -> label toda
// vez que renderiza a tabela de eventos.
export type EventAdminView = {
  id: string;
  calendarId: string;
  calendarLabel: string;
  calendarColorToken: CalendarColorToken;
  title: string;
  description: string | null;
  location: string | null;
  startAt: Date;
  endAt: Date | null;
  allDay: boolean;
};

export type ListEventsResult = OperationResult<EventAdminView[]>;
