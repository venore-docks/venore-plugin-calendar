CREATE SCHEMA "calendar";
--> statement-breakpoint
CREATE TABLE "calendar"."events" (
	"id" text PRIMARY KEY NOT NULL,
	"calendar_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"location" text,
	"start_at" timestamp with time zone NOT NULL,
	"end_at" timestamp with time zone,
	"all_day" boolean DEFAULT false NOT NULL,
	"created_by_user_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "calendar"."calendars" (
	"id" text PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"label" text NOT NULL,
	"color_token" text DEFAULT 'primary' NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "calendars_key_unique" UNIQUE("key"),
	CONSTRAINT "calendars_color_token_check" CHECK ("calendar"."calendars"."color_token" in ('primary', 'accent', 'success', 'warning', 'info'))
);
--> statement-breakpoint
ALTER TABLE "calendar"."events" ADD CONSTRAINT "events_calendar_id_calendars_id_fk" FOREIGN KEY ("calendar_id") REFERENCES "calendar"."calendars"("id") ON DELETE cascade ON UPDATE no action;