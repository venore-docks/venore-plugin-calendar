import type { BlockRendererComponent } from "@venore/plugin-sdk";
import { CalendarUpcomingEventsBlock } from "./calendar-upcoming-events-block";

export const blockRenderers: Record<string, BlockRendererComponent> = {
  "calendar.upcoming-events": CalendarUpcomingEventsBlock,
};
