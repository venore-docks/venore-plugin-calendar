import type { CreateCalendarInput } from "./types";

export type CalendarValidationError = { code: string; message: string };

export function validateCreateCalendarInput(input: CreateCalendarInput): CalendarValidationError | null {
  if (input.key.trim().length === 0) {
    return { code: "calendar.invalid_key", message: "A chave do calendário não pode ser vazia." };
  }
  if (input.label.trim().length === 0) {
    return { code: "calendar.invalid_label", message: "O nome do calendário não pode ser vazio." };
  }
  return null;
}
