import type { EmotionRating } from "@/api/services/types";

export type { EmotionRating };

/** The quick entry the user is writing. Saved to localStorage as they type. */
export type EntryDraft = {
  date: string;
  emotions: EmotionRating[];
  place: string;
  people: string[];
  situation: string;
  /**
   * Text written in the older one-long-flow version (thought, friend's view…) before the user stopped.
   * Not editable in the quick flow, but saved with the entry so nothing the user wrote is lost.
   */
  carriedOver?: CarriedOverText;
};

export type CarriedOverText = {
  autoThought: string;
  thinkingTraps: string[];
  balancedThought: string;
  reactions: string[];
  behavior: string;
};
