import { CircleDot, CloudRain, Flame, Leaf, Mountain, Sun, Zap, type LucideIcon } from "lucide-react";

export const MAX_EMOTIONS_PER_ENTRY = 5;
export const DEFAULT_INTENSITY = 5;

export type EmotionCategory = {
  /** Core feeling, also selectable on its own. */
  name: string;
  icon: LucideIcon;
  /** Precise feelings: the wheel's inner ring first, then the outer ring. */
  feelings: string[];
  /** Words used by earlier app versions, so old entries still get this category's icon. Not shown in the picker. */
  legacyNames: string[];
};

/**
 * "Jausmų ratas" — the Lithuanian Feelings Wheel (based on Gloria Willcox): 6 core feelings, 2 rings around each.
 * Words are kept exactly as on the wheel (masculine form) — a product decision.
 * Order: difficult feelings first, since that's what people usually come to write about.
 */
export const EMOTION_CATEGORIES: EmotionCategory[] = [
  {
    name: "Išsigandęs",
    icon: Zap,
    feelings: [
      "Neramus", "Nesaugus", "Paklusnus", "Bejėgis", "Atstumtas", "Sumišęs",
      "Priblokštas", "Nuliūdęs", "Nepilnavertis", "Nereikšmingas", "Atgrasus", "Pasipiktinęs",
    ],
    legacyNames: ["Nerimas", "Baimė"],
  },
  {
    name: "Liūdnas",
    icon: CloudRain,
    feelings: [
      "Pavargęs", "Nuobodus", "Vienišas", "Prislėgtas", "Sugėdintas", "Kaltas",
      "Mieguistas", "Apatiškas", "Izoliuotas", "Menkesnis", "Kvailas", "Atgailaujantis",
    ],
    legacyNames: ["Liūdesys", "Gėda", "Kaltė", "Nuovargis", "Vienišumas"],
  },
  {
    name: "Piktas",
    icon: Flame,
    feelings: [
      "Sužeistas", "Priešiškas", "Įniršęs", "Savanaudis", "Žiaurus", "Kritiškas",
      "Atitolęs", "Sarkastiškas", "Nusivylęs", "Šėlęs", "Pavydus", "Sudirgęs", "Skeptiškas",
    ],
    legacyNames: ["Pyktis", "Nusivylimas"],
  },
  {
    name: "Laimingas",
    icon: Sun,
    feelings: [
      "Susijaudinęs", "Jausmingas", "Energingas", "Linksmas", "Kūrybingas", "Viltingas",
      "Patrauklus", "Skatinantis", "Linksminantis", "Žaismingas", "Optimistiškas", "Stebinantis",
    ],
    legacyNames: ["Džiaugsmas"],
  },
  {
    name: "Drąsus",
    icon: Mountain,
    feelings: [
      "Užtikrintas", "Išdidus", "Gerbiamas", "Vertinamas", "Svarbus", "Ištikimas",
      "Įsitikinęs", "Vertingas", "Nusipelnęs", "Sėkmingas",
    ],
    legacyNames: [],
  },
  {
    name: "Ramus",
    icon: Leaf,
    feelings: [
      "Puoselėjantis", "Pasitikintis", "Mylintis", "Artimas", "Sąmoningas", "Pasitikintis savimi",
      "Dėkingas", "Saugus", "Reaguojantis", "Mąstantis", "Atsipalaidavęs",
    ],
    legacyNames: ["Ramybė", "Dėkingumas"],
  },
];

export const isSameEmotion = (a: string, b: string): boolean => a.trim().toLowerCase() === b.trim().toLowerCase();

/** Which core feeling an emotion belongs to. Custom emotions the user typed → undefined. */
export const findEmotionCategory = (emotionName: string): EmotionCategory | undefined =>
  EMOTION_CATEGORIES.find((category) =>
    [category.name, ...category.feelings, ...category.legacyNames].some((name) => isSameEmotion(name, emotionName)),
  );

/** Icon of the emotion's core feeling; custom emotions get a neutral dot. */
export const getEmotionIcon = (emotionName: string): LucideIcon => findEmotionCategory(emotionName)?.icon ?? CircleDot;
