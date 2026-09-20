import type { BlockDefinition } from "@venore/plugin-sdk/cms";

export const calendarUpcomingEventsBlockDefinition: BlockDefinition = {
  key: "calendar.upcoming-events",
  label: "Calendário — Próximos eventos",
  category: "calendar",
  structure: "leaf",
  allowedInRoot: true,
  defaultData: {
    title: "Próximos eventos",
    description: "",
    emptyMessage: "Não há eventos programados no momento.",
    calendarKey: "",
    limit: 6,
  },
  editorFields: [
    { name: "title", type: "text", label: "Título" },
    { name: "description", type: "richtext", label: "Descrição (opcional)" },
    { name: "emptyMessage", type: "richtext", label: "Mensagem quando não há eventos" },
    {
      name: "calendarKey",
      type: "text",
      label: "Filtrar por calendário (chave, opcional — vazio mostra todos)",
    },
    { name: "limit", type: "number", label: "Quantidade máxima exibida" },
  ],
};
