// Dois arquivos separados — mesmo motivo de venore-plugin-birthdays: definitions.ts é dado puro,
// renderers.ts importa o componente de render (que puxa handler -> service -> store -> db).
export { blockDefinitions } from "./definitions";
export { blockRenderers } from "./renderers";
