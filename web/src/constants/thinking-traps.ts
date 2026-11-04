// Thinking traps (CBT "cognitive distortions"), in plain words for people without CBT background.
// Stored by `id`, so names and explanations can be reworded later without touching saved entries.

export type ThinkingTrap = {
  id: string;
  name: string;
  /** One line, first person — the user should recognise themselves in it. */
  explanation: string;
};

export const MAX_TRAPS_PER_ENTRY = 3;

export const THINKING_TRAPS: ThinkingTrap[] = [
  { id: "mind-reading", name: "Minčių skaitymas", explanation: "Atrodo, kad žinai, ką kiti galvoja." },
  { id: "catastrophizing", name: "Katastrofizavimas", explanation: "Laukiu blogiausio, lyg jis tikrai įvyks." },
  { id: "all-or-nothing", name: "Viskas arba nieko", explanation: "Jei ne tobulai – vadinasi, nesėkmė." },
  { id: "overgeneralizing", name: "Visada / niekada", explanation: "Vienas atvejis tampa taisykle." },
  { id: "should", name: "Turėčiau / privalau", explanation: "Griežtos taisyklės sau ar kitiems." },
  { id: "labeling", name: "Etiketės", explanation: "„Aš nevykėlis“ vietoj „man nepavyko“." },
  { id: "emotional-reasoning", name: "Jausmas = faktas", explanation: "Jaučiu, vadinasi, taip ir yra." },
  { id: "personalizing", name: "Viskas dėl manęs", explanation: "Prisiimu kaltę už tai, kas ne mano rankose." },
  { id: "mental-filter", name: "Matau tik blogą", explanation: "Gera praslysta, bloga įstringa." },
];

export const findTrap = (id: string): ThinkingTrap | undefined => THINKING_TRAPS.find((trap) => trap.id === id);
