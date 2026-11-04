import type { EmotionRating } from "@/api/services/types";

export type { EmotionRating };

/** The quick entry the user is writing. Saved to localStorage as they type. */
export type EntryDraft = {
  date: string;
  emotions: EmotionRating[];
  place: string;
  people: string[];
  situation: string;
};
