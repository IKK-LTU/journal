import type { EmotionRating } from "@/api/services/types";
import { getTodayDateString } from "@/utils/date";
import type { QuickStepId } from "./steps";
import type { EntryDraft } from "./types";

// Small rules, one per answer, shared by the quick flow and the deeper flow.
// Each returns an error message to show, or null when the answer is OK.

export const SITUATION_MIN_LENGTH = 3;
export const THOUGHT_MIN_LENGTH = 2;
export const TEXT_MAX_LENGTH = 1000;

const TOO_LONG = `Per ilga, iki ${TEXT_MAX_LENGTH} simbolių`;

export const validateEmotions = (emotions: EmotionRating[]): string | null =>
  emotions.length === 0 ? "Pasirink bent vieną jausmą" : null;

export const validateSituation = (situation: string, date: string): string | null => {
  const length = situation.trim().length;
  if (length < SITUATION_MIN_LENGTH) return "Parašyk bent kelis žodžius apie tai, kas vyko";
  if (length > TEXT_MAX_LENGTH) return TOO_LONG;
  if (date > getTodayDateString()) return "Data negali būti ateityje";
  return null;
};

/** The deeper flow is about a thought — without one there is nothing to look at again. */
export const validateThought = (thought: string): string | null => {
  const length = thought.trim().length;
  if (length < THOUGHT_MIN_LENGTH) return "Užrašyk mintį – bent kelis žodžius";
  if (length > TEXT_MAX_LENGTH) return TOO_LONG;
  return null;
};

export const validateBalancedThought = (text: string): string | null => (text.trim().length > TEXT_MAX_LENGTH ? TOO_LONG : null);

/** Checks only the current quick step, so "Toliau" can explain exactly what's missing. */
export const validateQuickStep = (step: QuickStepId, draft: EntryDraft): string | null =>
  step === "emotions" ? validateEmotions(draft.emotions) : validateSituation(draft.situation, draft.date);
