import type { PluginManifest } from "@venore/plugin-sdk";

// Faixa escrita à mão, não importada de platform/plugin-engine/core-version.ts — mesmo motivo do
// vagasManifest/birthdaysManifest: importar o CORE_VERSION corrente tornaria a checagem de
// compatibilidade sempre trivialmente satisfeita.
export const calendarManifest: PluginManifest = {
  manifestVersion: "1.0.0",
  key: "calendar",
  name: "Calendário",
  version: "1.0.0",
  description: "Vários calendários nomeados (ex.: Fidelis, Erasto, FEM) com eventos e listagem pública.",
  compatibility: { coreVersion: ">=2.0.0 <3.0.0" },
  // Schema próprio do plugin — aplicado no install (run-plugin-migrations.ts), não no
  // vercel-build. Default de migrationsSchema ("calendar_migrations") já bate com
  // venore-plugin-calendar/drizzle.config.ts.
  migrationsPath: "./migrations",
  // Uma permissão só cobrindo os três calendários (RH central administra tudo) — decisão
  // explícita de placeholder (PORTAL-COLABORADOR-FEM.md §12, item 2). Cada evento já é escopado
  // por calendarId, então dividir em permissão por calendário no futuro não exige mudar schema,
  // só adicionar checagem de RBAC mais granular.
  permissions: [
    { key: "calendar.read", label: "Ver calendários e eventos" },
    { key: "calendar.manage", label: "Cadastrar, editar e remover calendários e eventos" },
  ],
  navigation: [
    {
      key: "calendar.admin",
      label: "Calendário",
      href: "/admin/calendar",
      icon: "calendar",
      groupKey: "plugins",
      groupLabel: "Plugins",
      groupOrder: 30,
      order: 40,
      requiredPermission: "calendar.read",
    },
  ],
  seeds: [
    {
      key: "example",
      label: "Dados de exemplo",
      description: "Três calendários (Fidelis, Erasto, FEM) com dois eventos de exemplo cada.",
    },
  ],
  blocks: [{ key: "calendar.upcoming-events", label: "Calendário — Próximos eventos" }],
};
