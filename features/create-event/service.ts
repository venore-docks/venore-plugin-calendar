import { beginOperation, endOperation } from "@venore/plugin-sdk/observability";
import { insertEvent } from "./store";
import type { CreateEventCommand, CreateEventResult } from "./types";

export async function createEvent(command: CreateEventCommand): Promise<CreateEventResult> {
  const handle = beginOperation({
    useCase: "calendar.create-event",
    actor: { id: command.actorId, type: "user" },
    kind: "write",
  });

  const record = await insertEvent(command);

  endOperation(handle, { success: true });
  return { success: true, data: record };
}
