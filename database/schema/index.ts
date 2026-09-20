import { sql } from "drizzle-orm";
import { boolean, check, integer, pgSchema, text, timestamp } from "drizzle-orm/pg-core";

export const calendarSchema = pgSchema("calendar");

// colorToken é um enum fechado de tokens semânticos (nunca hex/rgb — regra de ouro do
// VENORE-DOCKS.md §4), consumido pela UI como variante de Badge/dot, não como valor de cor direto.
export const CALENDAR_COLOR_TOKENS = ["primary", "accent", "success", "warning", "info"] as const;

// order é a posição de exibição entre os calendários (menor primeiro) — não é a ordem dos
// eventos dentro de um calendário.
export const calendars = calendarSchema.table(
  "calendars",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    key: text("key").notNull().unique(),
    label: text("label").notNull(),
    colorToken: text("color_token").notNull().default("primary"),
    order: integer("order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    check(
      "calendars_color_token_check",
      sql`${table.colorToken} in ('primary', 'accent', 'success', 'warning', 'info')`,
    ),
  ],
);

// createdByUserId é texto solto, sem FK pra auth.users — mesmo tratamento de
// venore-plugin-birthdays.birthdays.createdByUserId (regra 7, um plugin não importa
// contexts/auth/database/schema). calendarId TEM FK pra calendars: as duas tabelas são do mesmo
// plugin/schema, então referenciar é seguro (não cruza fronteira de plugin).
export const calendarEvents = calendarSchema.table(
  "events",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    calendarId: text("calendar_id")
      .notNull()
      .references(() => calendars.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    location: text("location"),
    startAt: timestamp("start_at", { withTimezone: true }).notNull(),
    endAt: timestamp("end_at", { withTimezone: true }),
    allDay: boolean("all_day").notNull().default(false),
    createdByUserId: text("created_by_user_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
);
