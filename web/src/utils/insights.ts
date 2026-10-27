// Pure insight calculations (no React) — easy to read and to unit test.

import type { CheckInDto, EmotionRating } from "@/api/services/types";
import { findEmotionCategory } from "@/constants/emotions";
import { NOBODY } from "@/constants/entry-options";
import { daysBetween, getTodayDateString, parseLocalDate, toLocalDateString } from "./date";

/** Core feelings that are hard to sit with. The other three wheel cores are the pleasant ones. */
const DIFFICULT_CORES = ["Išsigandęs", "Liūdnas", "Piktas"];
/** Custom emotions the user typed don't belong to a wheel core. */
export const OTHER_CORE = "Kita";
/** Below this, a "pattern" is just one coincidence. */
const MIN_ENTRIES_FOR_PATTERN = 2;

export type Share = { name: string; count: number; percent: number };
export type Pattern = { context: string; core: string; count: number };

const coreOf = (emotionName: string): string => findEmotionCategory(emotionName)?.name ?? OTHER_CORE;

const strongestEmotion = (emotions: EmotionRating[]): EmotionRating | undefined =>
  emotions.reduce<EmotionRating | undefined>((strongest, emotion) => (!strongest || emotion.intensity > strongest.intensity ? emotion : strongest), undefined);

const countBy = (values: string[]): Map<string, number> => {
  const counts = new Map<string, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);
  return counts;
};

const toShares = (counts: Map<string, number>): Share[] => {
  const total = [...counts.values()].reduce((sum, count) => sum + count, 0);
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count, percent: total ? Math.round((count / total) * 100) : 0 }))
    .sort((a, b) => b.count - a.count);
};

/** Entries from the last `days` days including today. `null` = all time. */
export const filterByPeriod = (entries: CheckInDto[], days: number | null, today: string = getTodayDateString()): CheckInDto[] =>
  days === null
    ? entries
    : entries.filter((entry) => {
        const daysAgo = daysBetween(entry.date, today);
        return daysAgo >= 0 && daysAgo < days;
      });

/** Which core feelings show up most, counting every emotion mentioned. */
export const coreFeelingShares = (entries: CheckInDto[]): Share[] =>
  toShares(countBy(entries.flatMap((entry) => entry.emotion.map((emotion) => coreOf(emotion.name)))));

/** % difficult vs pleasant mentions; custom emotions are left out. null when there's nothing to compare. */
export const difficultVsPleasant = (entries: CheckInDto[]): { difficultPercent: number; pleasantPercent: number } | null => {
  const cores = entries.flatMap((entry) => entry.emotion.map((emotion) => coreOf(emotion.name))).filter((core) => core !== OTHER_CORE);
  if (cores.length === 0) return null;

  const difficultPercent = Math.round((cores.filter((core) => DIFFICULT_CORES.includes(core)).length / cores.length) * 100);
  return { difficultPercent, pleasantPercent: 100 - difficultPercent };
};

/** The precise feelings named most often. */
export const topFeelings = (entries: CheckInDto[], limit = 5): Share[] =>
  toShares(countBy(entries.flatMap((entry) => entry.emotion.map((emotion) => emotion.name)))).slice(0, limit);

/**
 * For each context (a place, or a person), the core of the entry's strongest emotion that occurs most.
 * Only contexts with enough entries — one entry is not a pattern.
 */
const dominantCoreByContext = (entries: CheckInDto[], getContexts: (entry: CheckInDto) => string[]): Pattern[] => {
  const coresByContext = new Map<string, string[]>();
  for (const entry of entries) {
    const strongest = strongestEmotion(entry.emotion);
    if (!strongest) continue;
    for (const context of getContexts(entry)) {
      coresByContext.set(context, [...(coresByContext.get(context) ?? []), coreOf(strongest.name)]);
    }
  }

  return [...coresByContext.entries()]
    .filter(([, cores]) => cores.length >= MIN_ENTRIES_FOR_PATTERN)
    .map(([context, cores]) => {
      const [top] = toShares(countBy(cores));
      return { context, core: top.name, count: top.count };
    })
    .sort((a, b) => b.count - a.count);
};

export const placePatterns = (entries: CheckInDto[]): Pattern[] =>
  dominantCoreByContext(entries, (entry) => (entry.place ? [entry.place] : []));

export const peoplePatterns = (entries: CheckInDto[]): Pattern[] => dominantCoreByContext(entries, (entry) => entry.people);

/** One readable sentence for the strongest pattern, or null. Places are written in the locative ("Darbe"). */
export const describeTopPattern = (entries: CheckInDto[]): string | null => {
  const [place] = placePatterns(entries);
  if (place) return `${place.context} dažniausiai jauti: ${place.core}`;

  const [people] = peoplePatterns(entries);
  if (!people) return null;
  const who = people.context === NOBODY ? "Kai šalia nieko nėra" : `Kai šalia ${people.context.toLowerCase()}`;
  return `${who}, dažniausiai jauti: ${people.core}`;
};

/** How much intensity drops after writing (mean over re-rated entries). null below 2 re-rated entries. */
export const averageIntensityDrop = (entries: CheckInDto[]): { average: number; entryCount: number } | null => {
  const dropsPerEntry = entries
    .filter((entry) => entry.emotionAfter.length > 0)
    .map((entry) => {
      const drops = entry.emotionAfter.flatMap((after) => {
        const before = entry.emotion.find((emotion) => emotion.name === after.name);
        return before ? [before.intensity - after.intensity] : [];
      });
      return drops.length ? drops.reduce((sum, drop) => sum + drop, 0) / drops.length : null;
    })
    .filter((drop): drop is number => drop !== null);

  if (dropsPerEntry.length < 2) return null;
  return {
    average: dropsPerEntry.reduce((sum, drop) => sum + drop, 0) / dropsPerEntry.length,
    entryCount: dropsPerEntry.length,
  };
};

/** Average intensity per day for the last `days` days (oldest first). null = no entry that day. */
export const dailyAverageIntensity = (
  entries: CheckInDto[],
  days: number,
  today: string = getTodayDateString(),
): { date: string; average: number | null }[] => {
  const end = parseLocalDate(today);

  return Array.from({ length: days }, (_, index) => {
    const day = new Date(end);
    day.setDate(end.getDate() - (days - 1 - index));
    const date = toLocalDateString(day);

    const intensities = entries.filter((entry) => entry.date === date).flatMap((entry) => entry.emotion.map((emotion) => emotion.intensity));
    const average = intensities.length ? intensities.reduce((sum, value) => sum + value, 0) / intensities.length : null;
    return { date, average };
  });
};
