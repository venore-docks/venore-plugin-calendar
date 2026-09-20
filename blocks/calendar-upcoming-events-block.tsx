import { CalendarDays } from "lucide-react";
import { listPublicEventsHandler as listPublicEvents } from "../features/list-public-events/handler";
import type { BlockRendererProps } from "@venore/plugin-sdk";
import { hasRichTextContent, renderRichTextContent, RICH_TEXT_INLINE_CLASSES } from "@venore/plugin-sdk/page-builder";
import { cn } from "@venore/plugin-sdk/ui";
import { Badge } from "@venore/plugin-sdk/ui";

function readString(data: Record<string, unknown>, key: string, fallback: string): string {
  const value = data[key];
  return typeof value === "string" && value.trim() ? value : fallback;
}

function readLimit(data: Record<string, unknown>, fallback: number): number {
  const value = data.limit;
  return typeof value === "number" && value > 0 ? value : fallback;
}

function formatEventDate(startAt: Date, endAt: Date | null, allDay: boolean): string {
  const dateFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" });
  const timeFormatter = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" });

  const startLabel = dateFormatter.format(startAt);
  if (allDay) return startLabel;

  const endsSameDay = endAt && endAt.toDateString() === startAt.toDateString();
  if (endsSameDay) return `${startLabel} · ${timeFormatter.format(startAt)}–${timeFormatter.format(endAt)}`;
  return `${startLabel} · ${timeFormatter.format(startAt)}`;
}

// Bloco de page-builder pra "próximos eventos" — mesmo padrão de leitura pública sem auth de
// BirthdaysMonthListBlock/VagasOpenPositionsBlock. calendarKey vazio mostra todos os calendários.
export async function CalendarUpcomingEventsBlock({ block }: BlockRendererProps) {
  const title = readString(block.data, "title", "Próximos eventos");
  const description = block.data.description;
  const emptyMessage = hasRichTextContent(block.data.emptyMessage)
    ? block.data.emptyMessage
    : "Não há eventos programados no momento.";
  const limit = readLimit(block.data, 6);
  const calendarKey = readString(block.data, "calendarKey", "");

  const result = await listPublicEvents({ calendarKey: calendarKey || undefined, limit });
  if (!result.success) {
    return null;
  }

  const events = result.data;

  return (
    <div className="rounded-panel border border-border bg-card p-4 sm:p-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {hasRichTextContent(description) && (
          <div className={cn("mt-1 text-sm text-muted-foreground", RICH_TEXT_INLINE_CLASSES)}>{renderRichTextContent(description)}</div>
        )}
      </div>

      {events.length === 0 ? (
        <div className={cn("mt-4 text-sm text-muted-foreground", RICH_TEXT_INLINE_CLASSES)}>{renderRichTextContent(emptyMessage)}</div>
      ) : (
        <ul className="mt-4 space-y-2">
          {events.map((event) => (
            <li key={event.id} className="flex items-center gap-3 rounded-panel p-2.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
                <CalendarDays className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{event.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {formatEventDate(event.startAt, event.endAt, event.allDay)}
                  {event.location ? ` · ${event.location}` : ""}
                </p>
              </div>
              <Badge variant="outline" className="shrink-0">
                {event.calendarLabel}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
