"use server";

import { revalidatePath } from "next/cache";
import { createCalendar, deleteCalendar, updateCalendar, createEvent, deleteEvent, updateEvent } from "../../index";
import { isPluginActive } from "@venore/plugin-sdk";
import type { CalendarColorToken } from "../../contracts/types";

export type CalendarActionState = { error: string | null };

const returnTo = "/admin/calendar";
const PLUGIN_DISABLED_ERROR = "O plugin Calendário está desabilitado.";

function readColorToken(formData: FormData): CalendarColorToken {
  const value = String(formData.get("colorToken") ?? "primary");
  return (["primary", "accent", "success", "warning", "info"] as const).includes(value as CalendarColorToken)
    ? (value as CalendarColorToken)
    : "primary";
}

function readDate(formData: FormData, key: string): Date | null {
  const value = formData.get(key);
  if (typeof value !== "string" || value.trim().length === 0) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function createCalendarAction(
  _prevState: CalendarActionState,
  formData: FormData,
): Promise<CalendarActionState> {
  if (!(await isPluginActive("calendar"))) {
    return { error: PLUGIN_DISABLED_ERROR };
  }

  const result = await createCalendar({
    key: String(formData.get("key") ?? ""),
    label: String(formData.get("label") ?? ""),
    colorToken: readColorToken(formData),
    order: Number(formData.get("order") ?? 0),
  });

  if (!result.success) return { error: result.error.message };
  revalidatePath(returnTo);
  return { error: null };
}

export async function updateCalendarAction(
  _prevState: CalendarActionState,
  formData: FormData,
): Promise<CalendarActionState> {
  if (!(await isPluginActive("calendar"))) {
    return { error: PLUGIN_DISABLED_ERROR };
  }

  const result = await updateCalendar({
    calendarId: String(formData.get("calendarId") ?? ""),
    label: String(formData.get("label") ?? ""),
    colorToken: readColorToken(formData),
    order: Number(formData.get("order") ?? 0),
  });

  if (!result.success) return { error: result.error.message };
  revalidatePath(returnTo);
  return { error: null };
}

export async function deleteCalendarAction(
  _prevState: CalendarActionState,
  formData: FormData,
): Promise<CalendarActionState> {
  if (!(await isPluginActive("calendar"))) {
    return { error: PLUGIN_DISABLED_ERROR };
  }

  const result = await deleteCalendar({ calendarId: String(formData.get("calendarId") ?? "") });
  if (!result.success) return { error: result.error.message };
  revalidatePath(returnTo);
  return { error: null };
}

export async function createEventAction(
  _prevState: CalendarActionState,
  formData: FormData,
): Promise<CalendarActionState> {
  if (!(await isPluginActive("calendar"))) {
    return { error: PLUGIN_DISABLED_ERROR };
  }

  const startAt = readDate(formData, "startAt");
  if (!startAt) {
    return { error: "Informe uma data de início válida." };
  }

  const result = await createEvent({
    calendarId: String(formData.get("calendarId") ?? ""),
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? "") || undefined,
    location: String(formData.get("location") ?? "") || undefined,
    startAt,
    endAt: readDate(formData, "endAt") ?? undefined,
    allDay: formData.get("allDay") === "true",
  });

  if (!result.success) return { error: result.error.message };
  revalidatePath(returnTo);
  return { error: null };
}

export async function updateEventAction(
  _prevState: CalendarActionState,
  formData: FormData,
): Promise<CalendarActionState> {
  if (!(await isPluginActive("calendar"))) {
    return { error: PLUGIN_DISABLED_ERROR };
  }

  const startAt = readDate(formData, "startAt");
  if (!startAt) {
    return { error: "Informe uma data de início válida." };
  }

  const result = await updateEvent({
    eventId: String(formData.get("eventId") ?? ""),
    calendarId: String(formData.get("calendarId") ?? ""),
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? "") || undefined,
    location: String(formData.get("location") ?? "") || undefined,
    startAt,
    endAt: readDate(formData, "endAt") ?? undefined,
    allDay: formData.get("allDay") === "true",
  });

  if (!result.success) return { error: result.error.message };
  revalidatePath(returnTo);
  return { error: null };
}

export async function deleteEventAction(
  _prevState: CalendarActionState,
  formData: FormData,
): Promise<CalendarActionState> {
  if (!(await isPluginActive("calendar"))) {
    return { error: PLUGIN_DISABLED_ERROR };
  }

  const result = await deleteEvent({ eventId: String(formData.get("eventId") ?? "") });
  if (!result.success) return { error: result.error.message };
  revalidatePath(returnTo);
  return { error: null };
}
