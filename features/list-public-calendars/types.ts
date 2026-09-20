import type { OperationResult } from "@venore/plugin-sdk";
import type { CalendarRecord } from "../../contracts/types";

export type ListPublicCalendarsResult = OperationResult<CalendarRecord[]>;
