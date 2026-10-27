// Default one-tap answers. The user's own most used answers are shown before these.

export const DEFAULT_PLACES = ["Namie", "Darbe", "Kelyje", "Lauke", "Parduotuvėje", "Svečiuose", "Internete"];

/** "Niekas" means alone — picking it clears the others, and the other way around. */
export const NOBODY = "Niekas";
export const DEFAULT_PEOPLE = [NOBODY, "Antroji pusė", "Šeima", "Vaikai", "Draugai", "Kolegos", "Nepažįstami"];

export const DEFAULT_REACTIONS = [
  "Pasikalbėjau su kuo nors",
  "Išėjau pasivaikščioti",
  "Pailsėjau",
  "Užsiėmiau kuo nors kitu",
  "Naršiau telefone",
  "Valgiau",
  "Verkiau",
  "Užsidariau savyje",
  "Atidėjau reikalus",
];

/** User's answers (most used first), then defaults they haven't used. No duplicates. */
export const orderByUsage = (usage: Record<string, number>, defaults: string[]): string[] => {
  const used = Object.keys(usage).sort((a, b) => usage[b] - usage[a]);
  return [...new Set([...used, ...defaults])];
};
