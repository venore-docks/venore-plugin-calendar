import { CalendarDays } from "lucide-react";
import { listCalendars, listEvents } from "../../index";
import { getPluginAdminPageData } from "@venore/plugin-sdk/admin";
import { AdminAccessDenied } from "@venore/plugin-sdk/ui";
import { AdminPageHeader } from "@venore/plugin-sdk/ui";
import { EmptyState } from "@venore/plugin-sdk/ui";
import { CreateCalendarDialog } from "./create-calendar-dialog";
import { CalendarTable } from "./calendar-table";
import { CreateEventDialog } from "./create-event-dialog";
import { EventTable } from "./event-table";

export default async function CalendarAdminPage() {
  const gate = await getPluginAdminPageData("calendar");

  if (!gate.granted) {
    return <AdminAccessDenied message="Você não tem permissão para ver o calendário." />;
  }

  const [calendarsResult, eventsResult] = await Promise.all([listCalendars(), listEvents()]);

  if (!calendarsResult.success) {
    return <p className="text-sm text-destructive">Erro ao carregar calendários: {calendarsResult.error.message}</p>;
  }
  if (!eventsResult.success) {
    return <p className="text-sm text-destructive">Erro ao carregar eventos: {eventsResult.error.message}</p>;
  }

  const calendars = calendarsResult.data;
  const events = eventsResult.data;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Calendário"
        description="Vários calendários nomeados (ex.: Fidelis, Erasto, FEM) com eventos publicados em /calendario."
      />

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-caps text-muted-foreground">Calendários</h2>
          <CreateCalendarDialog />
        </div>
        {calendars.length === 0 ? (
          <EmptyState
            icon={<CalendarDays className="size-8" strokeWidth={1.5} />}
            title="Nenhum calendário cadastrado"
            description="Cadastre o primeiro calendário (ex.: Fidelis, Erasto ou FEM) para começar a adicionar eventos."
            action={<CreateCalendarDialog />}
          />
        ) : (
          <div className="rounded-panel border border-border bg-card">
            <CalendarTable calendars={calendars} />
          </div>
        )}
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-caps text-muted-foreground">Eventos</h2>
          <CreateEventDialog calendars={calendars} />
        </div>
        {events.length === 0 ? (
          <EmptyState
            icon={<CalendarDays className="size-8" strokeWidth={1.5} />}
            title="Nenhum evento cadastrado"
            description="Cadastre o primeiro evento em um dos calendários acima."
          />
        ) : (
          <div className="rounded-panel border border-border bg-card">
            <EventTable events={events} calendars={calendars} />
          </div>
        )}
      </section>
    </div>
  );
}
