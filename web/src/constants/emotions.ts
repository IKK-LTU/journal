import { BatteryLow, CircleDot, CloudRain, Flame, Frown, Sparkles, Sun, Zap, type LucideIcon } from "lucide-react";

export const MAX_EMOTIONS_PER_ENTRY = 5;
export const DEFAULT_INTENSITY = 5;

export type EmotionCategory = {
  /** Core feeling, also selectable on its own ("just fear"). */
  name: string;
  icon: LucideIcon;
  /** More specific feelings in this family. */
  feelings: string[];
};

/**
 * Based on the Feelings Wheel (Geoffrey Roberts): 7 core feelings, each with more precise ones.
 * Naming the precise feeling ("nesaugumas" instead of just "blogai") is the point of the exercise.
 * Order: difficult feelings first — that's what people usually come to write about.
 */
export const EMOTION_CATEGORIES: EmotionCategory[] = [
  {
    name: "Baimė",
    icon: Zap,
    feelings: ["Nerimas", "Išgąstis", "Nesaugumas", "Silpnumas", "Atstūmimas", "Grėsmė"],
  },
  {
    name: "Liūdesys",
    icon: CloudRain,
    feelings: ["Vienišumas", "Pažeidžiamumas", "Neviltis", "Kaltė", "Gėda", "Prislėgtumas", "Nuoskauda"],
  },
  {
    name: "Pyktis",
    icon: Flame,
    feelings: ["Apvylimas", "Pažeminimas", "Kartėlis", "Įniršis", "Agresija", "Frustracija", "Atšalimas", "Kritiškumas"],
  },
  {
    name: "Blogai",
    icon: BatteryLow,
    feelings: ["Nuobodulys", "Skubėjimas", "Stresas", "Nuovargis"],
  },
  {
    name: "Pasibjaurėjimas",
    icon: Frown,
    feelings: ["Nepritarimas", "Nusivylimas", "Pasišlykštėjimas", "Atgrasumas"],
  },
  {
    name: "Nustebimas",
    icon: Sparkles,
    feelings: ["Sukrėtimas", "Sumišimas", "Nuostaba", "Jaudulys"],
  },
  {
    name: "Džiaugsmas",
    icon: Sun,
    feelings: [
      "Ramybė",
      "Dėkingumas",
      "Pasitenkinimas",
      "Smalsumas",
      "Pasididžiavimas",
      "Pasitikėjimas",
      "Optimizmas",
      "Žaismingumas",
      "Stiprybė",
    ],
  },
];

export const isSameEmotion = (a: string, b: string): boolean => a.trim().toLowerCase() === b.trim().toLowerCase();

/** Which core feeling an emotion belongs to. Custom emotions the user typed → undefined. */
export const findEmotionCategory = (emotionName: string): EmotionCategory | undefined =>
  EMOTION_CATEGORIES.find(
    (category) =>
      isSameEmotion(category.name, emotionName) || category.feelings.some((feeling) => isSameEmotion(feeling, emotionName)),
  );

/** Icon of the emotion's core feeling; custom emotions get a neutral dot. */
export const getEmotionIcon = (emotionName: string): LucideIcon => findEmotionCategory(emotionName)?.icon ?? CircleDot;
