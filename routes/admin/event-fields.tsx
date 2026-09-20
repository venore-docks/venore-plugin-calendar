"use client";

import { useState } from "react";
import { Input } from "@venore/plugin-sdk/ui";
import { Textarea } from "@venore/plugin-sdk/ui";
import { Checkbox } from "@venore/plugin-sdk/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@venore/plugin-sdk/ui";
import type { CalendarRecord } from "../../index";

export function EventFields({
  calendars,
  defaultCalendarId,
  defaultTitle = "",
  defaultDescription = "",
  defaultLocation = "",
  defaultStartAt = "",
  defaultEndAt = "",
  defaultAllDay = false,
}: {
  calendars: CalendarRecord[];
  defaultCalendarId?: string;
  defaultTitle?: string;
  defaultDescription?: string;
  defaultLocation?: string;
  defaultStartAt?: string;
  defaultEndAt?: string;
  defaultAllDay?: boolean;
}) {
  const [allDay, setAllDay] = useState(defaultAllDay);

  return (
    <>
      <label className="flex flex-col gap-1 text-sm text-muted-foreground">
        Calendário
        <Select name="calendarId" defaultValue={defaultCalendarId} required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="selecione..." />
          </SelectTrigger>
          <SelectContent>
            {calendars.map((calendar) => (
              <SelectItem key={calendar.id} value={calendar.id}>
                {calendar.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>

      <label className="flex flex-col gap-1 text-sm text-muted-foreground">
        Título
        <Input name="title" defaultValue={defaultTitle} placeholder="ex.: Conselho de classe" required />
      </label>

      <label className="flex flex-col gap-1 text-sm text-muted-foreground">
        Descrição (opcional)
        <Textarea name="description" defaultValue={defaultDescription} rows={3} />
      </label>

      <label className="flex flex-col gap-1 text-sm text-muted-foreground">
        Local (opcional)
        <Input name="location" defaultValue={defaultLocation} />
      </label>

      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        <Checkbox
          name="allDayCheckbox"
          checked={allDay}
          onCheckedChange={(checked) => setAllDay(checked === true)}
        />
        Dia inteiro (sem horário)
        <input type="hidden" name="allDay" value={allDay ? "true" : "false"} />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-sm text-muted-foreground">
          Início
          <Input name="startAt" type={allDay ? "date" : "datetime-local"} defaultValue={defaultStartAt} required />
        </label>
        <label className="flex flex-col gap-1 text-sm text-muted-foreground">
          Término (opcional)
          <Input name="endAt" type={allDay ? "date" : "datetime-local"} defaultValue={defaultEndAt} />
        </label>
      </div>
    </>
  );
}
