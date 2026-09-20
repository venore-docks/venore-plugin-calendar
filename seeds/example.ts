import type { OperationResult } from "@venore/plugin-sdk";
import { createCalendar } from "../features/create-calendar/service";
import { listCalendars } from "../features/list-calendars/service";
import { createEvent } from "../features/create-event/service";
import { listEvents } from "../features/list-events/service";

// Seed de dados de exemplo (platform/plugin-engine/plugin-seed-registry.ts) — rodado via
// /admin/plugins. Chama service.ts direto (sem sessão/ator autenticado), mesmo racional de
// venore-plugin-birthdays/seeds/example.ts e venore-plugin-vagas/seeds/example.ts. Os três
// calendários (Fidelis/Erasto/FEM) são exatamente os exemplos citados pelo cliente em
// PORTAL-COLABORADOR-FEM.md §6.4 — não são hardcoded como as ÚNICAS opções possíveis, o admin
// pode criar mais depois.
const SEED_ACTOR_ID = "system-seed";

const EXAMPLE_CALENDARS = [
  { key: "fem", label: "FEM", colorToken: "primary" as const, order: 0 },
  { key: "erasto", label: "Colégio Erasto Gaertner", colorToken: "accent" as const, order: 10 },
  { key: "fidelis", label: "Faculdade Fidelis", colorToken: "info" as const, order: 20 },
];

function daysFromNow(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

export async function seedCalendarExample(): Promise<OperationResult<void>> {
  const existingCalendars = await listCalendars();
  if (!existingCalendars.success) {
    return { success: false, error: existingCalendars.error };
  }
  const calendarsByKey = new Map(existingCalendars.data.map((calendar) => [calendar.key, calendar]));

  for (const entry of EXAMPLE_CALENDARS) {
    if (calendarsByKey.has(entry.key)) continue;
    const created = await createCalendar({ ...entry, actorId: SEED_ACTOR_ID });
    if (!created.success) {
      return { success: false, error: created.error };
    }
    calendarsByKey.set(entry.key, created.data);
  }

  const existingEvents = await listEvents();
  if (!existingEvents.success) {
    return { success: false, error: existingEvents.error };
  }
  const existingTitles = new Set(existingEvents.data.map((event) => event.title));

  const exampleEvents = [
    { calendarKey: "fem", title: "Reunião geral de RH", daysAhead: 7 },
    { calendarKey: "fem", title: "Campanha de vacinação interna", daysAhead: 21 },
    { calendarKey: "erasto", title: "Conselho de classe — 1º trimestre", daysAhead: 10 },
    { calendarKey: "erasto", title: "Feira de ciências", daysAhead: 30 },
    { calendarKey: "fidelis", title: "Início do semestre letivo", daysAhead: 14 },
    { calendarKey: "fidelis", title: "Semana acadêmica", daysAhead: 45 },
  ];

  for (const entry of exampleEvents) {
    if (existingTitles.has(entry.title)) continue;
    const calendar = calendarsByKey.get(entry.calendarKey);
    if (!calendar) continue;

    const created = await createEvent({
      calendarId: calendar.id,
      title: entry.title,
      startAt: daysFromNow(entry.daysAhead),
      allDay: true,
      actorId: SEED_ACTOR_ID,
    });
    if (!created.success) {
      return { success: false, error: created.error };
    }
  }

  return { success: true, data: undefined };
}
