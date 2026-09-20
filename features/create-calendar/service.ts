import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { insertCalendar } from "./store";
import type { CreateCalendarCommand, CreateCalendarResult } from "./types";

export async function createCalendar(command: CreateCalendarCommand): Promise<CreateCalendarResult> {
  const handle = beginOperation({
    useCase: "calendar.create-calendar",
    actor: { id: command.actorId, type: "user" },
    kind: "write",
  });

  const record = await insertCalendar(command);

  endOperation(handle, { success: true });
  return { success: true, data: record };
}
