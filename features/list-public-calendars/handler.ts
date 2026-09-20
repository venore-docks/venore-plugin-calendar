import { listPublicCalendars } from "./service";
import type { ListPublicCalendarsResult } from "./types";

// Sem authorizeActor de propósito — a LISTA de calendários (nomes/cores, pra filtro na página
// pública) é pública, mesmo quando os eventos em si não fossem. Mesmo espírito de
// list-public-jobs no venore-plugin-vagas.
export async function listPublicCalendarsHandler(): Promise<ListPublicCalendarsResult> {
  return listPublicCalendars();
}
