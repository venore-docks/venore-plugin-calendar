import type { BreadcrumbSegmentDefinition } from "@venore/plugin-sdk";
import { staticBreadcrumbSegment } from "@venore/plugin-sdk";

export const calendarBreadcrumbSegments: BreadcrumbSegmentDefinition[] = [
  staticBreadcrumbSegment({ key: "calendar.public", segments: ["calendario"], label: "Calendário" }),
  staticBreadcrumbSegment({ key: "calendar.admin", segments: ["admin", "calendar"], label: "Calendário" }),
];
