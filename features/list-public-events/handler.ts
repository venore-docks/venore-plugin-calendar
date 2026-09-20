import { listPublicEvents } from "./service";
import type { ListPublicEventsQuery, ListPublicEventsResult } from "./types";

// Sem authorizeActor de propósito — "próximos eventos" é público, mesmo espírito de
// list-public-jobs no venore-plugin-vagas.
export async function listPublicEventsHandler(query: ListPublicEventsQuery = {}): Promise<ListPublicEventsResult> {
  return listPublicEvents(query);
}
