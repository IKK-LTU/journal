import {
  BatteryLow,
  CircleDot,
  Cloud,
  CloudRain,
  EyeOff,
  Flame,
  Heart,
  Leaf,
  Scale,
  Sun,
  User,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const MAX_EMOTIONS_PER_ENTRY = 5;
export const DEFAULT_INTENSITY = 5;

// The emotions people name most often, shown as one-tap suggestions.
// Order here is the fallback; the picker shows the user's most used first.
export const COMMON_EMOTIONS = [
  "Nerimas",
  "Liūdesys",
  "Pyktis",
  "Baimė",
  "Gėda",
  "Kaltė",
  "Nuovargis",
  "Vienišumas",
  "Nusivylimas",
  "Ramybė",
  "Džiaugsmas",
  "Dėkingumas",
];

const EMOTION_ICONS: Record<string, LucideIcon> = {
  nerimas: Wind,
  liūdesys: CloudRain,
  pyktis: Flame,
  baimė: Zap,
  gėda: EyeOff,
  kaltė: Scale,
  nuovargis: BatteryLow,
  vienišumas: User,
  nusivylimas: Cloud,
  ramybė: Leaf,
  džiaugsmas: Sun,
  dėkingumas: Heart,
};

/** Custom emotions the user typed themselves get a neutral icon. */
export const getEmotionIcon = (emotionName: string): LucideIcon =>
  EMOTION_ICONS[emotionName.trim().toLowerCase()] ?? CircleDot;

export const isSameEmotion = (a: string, b: string): boolean =>
  a.trim().toLowerCase() === b.trim().toLowerCase();
