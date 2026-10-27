import type { CheckInDto } from "@/api/services/types";

export type EmotionRating = CheckInDto["emotion"][number];

/** What the user has filled in so far. Saved to localStorage as they type. */
export type EntryDraft = {
  date: string;
  emotions: EmotionRating[];
  situation: string;
  autoThought: string;
  behavior: string;
};

export const FLOW_STEPS = [1, 2, 3, 4] as const;
export type FlowStep = (typeof FLOW_STEPS)[number];
export const LAST_STEP: FlowStep = 4;
