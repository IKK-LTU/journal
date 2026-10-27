import { getTodayDateString } from "@/utils/date";
import type { EntryDraft, FlowStep } from "./types";

export const SITUATION_MIN_LENGTH = 3;
export const TEXT_MAX_LENGTH = 1000;

const TOO_LONG = `Per ilga, iki ${TEXT_MAX_LENGTH} simbolių`;

/**
 * Checks only the current step, so "Toliau" can explain exactly what's missing.
 * Returns an error message to show, or null when the step is OK.
 */
export const validateStep = (step: FlowStep, draft: EntryDraft): string | null => {
  switch (step) {
    case 1:
      return draft.emotions.length === 0 ? "Pasirink bent vieną emociją" : null;

    case 2: {
      const length = draft.situation.trim().length;
      if (length < SITUATION_MIN_LENGTH) return "Parašyk bent kelis žodžius";
      if (length > TEXT_MAX_LENGTH) return TOO_LONG;
      if (draft.date > getTodayDateString()) return "Data negali būti ateityje";
      return null;
    }

    // Thought and behavior are optional — only the length is limited.
    case 3:
      return draft.autoThought.trim().length > TEXT_MAX_LENGTH ? TOO_LONG : null;

    case 4:
      return draft.behavior.trim().length > TEXT_MAX_LENGTH ? TOO_LONG : null;
  }
};
