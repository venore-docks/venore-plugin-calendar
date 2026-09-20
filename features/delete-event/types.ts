import type { OperationResult } from "@venore/plugin-sdk";

export type DeleteEventCommand = { eventId: string; actorId: string };
export type DeleteEventInput = Omit<DeleteEventCommand, "actorId">;
export type DeleteEventResult = OperationResult<{ eventId: string }>;
