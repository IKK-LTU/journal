import type { EmotionRating } from "@/api/services/types";
import { descendingBy } from "./sort";

/** How one feeling's intensity changed between the entry and the re-rating. */
export type IntensityChange = {
  name: string;
  before: number;
  after: number;
  /** Positive = the feeling got weaker. */
  drop: number;
};

/** Same values, order doesn't matter (trap ids). */
export const haveSameItems = (first: string[], second: string[]): boolean =>
  first.length === second.length && first.every((item) => second.includes(item));

/** Same feelings with the same intensities, order doesn't matter. */
export const haveSameRatings = (first: EmotionRating[], second: EmotionRating[]): boolean =>
  first.length === second.length &&
  first.every((rating) => second.some((other) => other.name === rating.name && other.intensity === rating.intensity));

/**
 * Starting point for re-rating: the entry's feelings, each with its earlier re-rating if there is one,
 * otherwise its original intensity. Feelings removed from the entry are dropped.
 */
export const startingAfterRatings = (before: EmotionRating[], earlierAfter: EmotionRating[]): EmotionRating[] =>
  before.map((rating) => earlierAfter.find((earlier) => earlier.name === rating.name) ?? rating);

/** The feeling that got weakest after writing — or undefined if none got weaker. */
export const findBiggestDrop = (before: EmotionRating[], after: EmotionRating[]): IntensityChange | undefined => {
  const changes = after.map((rating): IntensityChange => {
    const original = before.find((emotion) => emotion.name === rating.name)?.intensity ?? rating.intensity;
    return { name: rating.name, before: original, after: rating.intensity, drop: original - rating.intensity };
  });
  const [biggest] = changes.sort(descendingBy((change) => change.drop));
  return biggest && biggest.drop > 0 ? biggest : undefined;
};

/** "Neramus 7 → 4" */
export const formatIntensityChange = (change: IntensityChange): string => `${change.name} ${change.before} → ${change.after}`;
