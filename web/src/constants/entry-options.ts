import { descendingBy } from "@/utils/sort";

// Default one-tap answers. The user's own most used answers are shown before these.

export const DEFAULT_PLACES = ["Namie", "Darbe", "Kelyje", "Lauke", "Parduotuvėje", "Svečiuose", "Internete"];

/** "Niekas" means alone — picking it clears the others, and the other way around. */
export const NOBODY = "Niekas";
export const DEFAULT_PEOPLE = [NOBODY, "Antroji pusė", "Šeima", "Vaikai", "Draugai", "Kolegos", "Nepažįstami"];

/** User's answers (most used first), then defaults they haven't used. No duplicates. */
export const orderByUsage = (usage: Record<string, number>, defaults: string[]): string[] => {
  const used = Object.keys(usage).sort(descendingBy((answer) => usage[answer]));
  return [...new Set([...used, ...defaults])];
};
