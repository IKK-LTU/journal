import type { EmotionRating } from "@/api/services/types";

export type { EmotionRating };

/** What the user has filled in so far. Saved to localStorage as they type. */
export type EntryDraft = {
  date: string;
  emotions: EmotionRating[];
  place: string;
  people: string[];
  situation: string;
  autoThought: string;
  reactions: string[];
  behavior: string;
  emotionAfter: EmotionRating[];
};
