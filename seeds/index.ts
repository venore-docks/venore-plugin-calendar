import type { PluginSeedFn } from "@venore/plugin-sdk";
import { seedCalendarExample } from "./example";

// Ponto de extensão "seeds" do plugin engine — a chave bate com a `key` declarada em
// manifest.seeds. Mesmo padrão de venore-plugin-birthdays/seeds/index.ts.
export const calendarSeeds: Record<string, PluginSeedFn> = {
  example: seedCalendarExample,
};
