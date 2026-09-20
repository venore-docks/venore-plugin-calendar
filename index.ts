export { calendarBreadcrumbSegments } from "./breadcrumbs";

export { createCalendarHandler as createCalendar } from "./features/create-calendar/handler";
export { updateCalendarHandler as updateCalendar } from "./features/update-calendar/handler";
export { deleteCalendarHandler as deleteCalendar } from "./features/delete-calendar/handler";
export { listCalendarsHandler as listCalendars } from "./features/list-calendars/handler";
export { listPublicCalendarsHandler as listPublicCalendars } from "./features/list-public-calendars/handler";

export { createEventHandler as createEvent } from "./features/create-event/handler";
export { updateEventHandler as updateEvent } from "./features/update-event/handler";
export { deleteEventHandler as deleteEvent } from "./features/delete-event/handler";
export { listEventsHandler as listEvents } from "./features/list-events/handler";
export { listPublicEventsHandler as listPublicEvents } from "./features/list-public-events/handler";

// Ponto de extensão "blocks" do plugin engine, mesmo padrão do birthdays/vagas: dois registries
// paralelos (dado serializável vs. componente), nunca misturados.
export { blockDefinitions, blockRenderers } from "./blocks";

// Ponto de extensão "seeds" do plugin engine (platform/plugin-engine/plugin-seed-registry.ts).
export { calendarSeeds } from "./seeds";

export { CALENDAR_COLOR_TOKENS } from "./database/schema";
export type { CalendarColorToken, CalendarRecord, CalendarEventRecord } from "./contracts/types";

export type { CreateCalendarInput, CreateCalendarResult } from "./features/create-calendar/types";
export type { UpdateCalendarInput, UpdateCalendarResult } from "./features/update-calendar/types";
export type { DeleteCalendarInput, DeleteCalendarResult } from "./features/delete-calendar/types";
export type { ListCalendarsResult } from "./features/list-calendars/types";
export type { ListPublicCalendarsResult } from "./features/list-public-calendars/types";

export type { CreateEventInput, CreateEventResult } from "./features/create-event/types";
export type { UpdateEventInput, UpdateEventResult } from "./features/update-event/types";
export type { DeleteEventInput, DeleteEventResult } from "./features/delete-event/types";
export type { EventAdminView, ListEventsResult } from "./features/list-events/types";
export type {
  PublicEventView,
  ListPublicEventsQuery,
  ListPublicEventsResult,
} from "./features/list-public-events/types";
