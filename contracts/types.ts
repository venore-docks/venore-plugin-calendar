export type CalendarColorToken = "primary" | "accent" | "success" | "warning" | "info";

export type CalendarRecord = {
  id: string;
  key: string;
  label: string;
  colorToken: CalendarColorToken;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CalendarEventRecord = {
  id: string;
  calendarId: string;
  title: string;
  description: string | null;
  location: string | null;
  startAt: Date;
  endAt: Date | null;
  allDay: boolean;
  createdByUserId: string | null;
  createdAt: Date;
  updatedAt: Date;
};
