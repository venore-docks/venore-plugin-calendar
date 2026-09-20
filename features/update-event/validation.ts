import type { EventValidationError } from "../create-event/validation";
import type { UpdateEventInput } from "./types";

export function validateUpdateEventInput(input: UpdateEventInput): EventValidationError | null {
  if (input.eventId.trim().length === 0) {
    return { code: "calendar.invalid_id", message: "eventId não pode ser vazio." };
  }
  if (input.calendarId.trim().length === 0) {
    return { code: "calendar.invalid_calendar_id", message: "Selecione um calendário." };
  }
  if (input.title.trim().length === 0) {
    return { code: "calendar.invalid_title", message: "O título do evento não pode ser vazio." };
  }
  if (Number.isNaN(input.startAt.getTime())) {
    return { code: "calendar.invalid_start_at", message: "Data de início inválida." };
  }
  if (input.endAt && !Number.isNaN(input.endAt.getTime()) && input.endAt < input.startAt) {
    return { code: "calendar.invalid_end_at", message: "A data de término não pode ser antes do início." };
  }
  return null;
}
