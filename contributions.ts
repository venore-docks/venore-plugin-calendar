import type { PluginContributions } from "@venore/plugin-sdk";
import { calendarBreadcrumbSegments } from "./breadcrumbs";
import { blockDefinitions } from "./blocks/definitions";
import { calendarSeeds } from "./seeds";

// O que o calendar contribui pro core. Mesmo padrão de venore-plugin-birthdays/contributions.ts.
export const calendarContributions: PluginContributions = {
  breadcrumbSegments: calendarBreadcrumbSegments,
  blockDefinitions,
  blockRenderers: async () => (await import("./blocks/renderers")).blockRenderers,
  seeds: calendarSeeds,
};
