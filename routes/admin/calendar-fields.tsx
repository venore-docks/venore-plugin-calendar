import { Input } from "@venore/plugin-sdk/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@venore/plugin-sdk/ui";

const COLOR_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "primary", label: "Primária" },
  { value: "accent", label: "Destaque" },
  { value: "success", label: "Sucesso (verde)" },
  { value: "warning", label: "Alerta (amarelo)" },
  { value: "info", label: "Informativo (azul)" },
];

export function CalendarFields({
  showKey,
  defaultKey = "",
  defaultLabel = "",
  defaultColorToken = "primary",
  defaultOrder = 0,
}: {
  showKey: boolean;
  defaultKey?: string;
  defaultLabel?: string;
  defaultColorToken?: string;
  defaultOrder?: number;
}) {
  return (
    <>
      {showKey && (
        <label className="flex flex-col gap-1 text-sm text-muted-foreground">
          Chave (usada em URLs e filtros — sem espaços)
          <Input name="key" defaultValue={defaultKey} placeholder="ex.: erasto" required />
        </label>
      )}

      <label className="flex flex-col gap-1 text-sm text-muted-foreground">
        Nome
        <Input name="label" defaultValue={defaultLabel} placeholder="ex.: Colégio Erasto Gaertner" required />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-sm text-muted-foreground">
          Cor
          <Select name="colorToken" defaultValue={defaultColorToken}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COLOR_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
        <label className="flex flex-col gap-1 text-sm text-muted-foreground">
          Ordem de exibição
          <Input name="order" type="number" defaultValue={defaultOrder} />
        </label>
      </div>
    </>
  );
}
