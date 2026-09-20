import { notFound } from "next/navigation";
import { isPluginActive } from "@venore/plugin-sdk";
import { listPublicEvents } from "../../index";
import { CalendarPublicList } from "./calendar-public-list";

// Sem gate de autenticação — decisão do cliente é o Portal do Colaborador exigir login pra quase
// tudo, mas o calendário institucional não tem essa exigência declarada (PORTAL-COLABORADOR-FEM.md
// §6.4); mesmo padrão de "só o plugin ativo importa" de venore-plugin-birthdays/routes/public/page.tsx.
export default async function CalendarPublicPage() {
  if (!(await isPluginActive("calendar"))) {
    notFound();
  }

  const result = await listPublicEvents();
  const events = result.success ? result.data : [];

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Calendário</h1>
        <p className="text-sm text-muted-foreground">
          Datas e eventos da Fundação Educacional Menonita, do Colégio Erasto Gaertner e da Faculdade Fidelis.
        </p>
      </div>
      <CalendarPublicList events={events} />
    </div>
  );
}
