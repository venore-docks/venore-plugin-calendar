// Formata um Date pro valor esperado por <input type="datetime-local"> (hora LOCAL do navegador,
// sem timezone) — usado só pra preencher defaultValue no form de edição.
export function formatDateTimeLocal(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
