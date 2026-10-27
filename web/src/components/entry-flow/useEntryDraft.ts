import { useEffect, useState } from "react";

import { getTodayDateString } from "@/utils/date";
import type { EntryDraft } from "./types";

const DRAFT_STORAGE_KEY = "entry-draft";
const SAVE_DELAY_MS = 500;

const createEmptyDraft = (date: string): EntryDraft => ({
  date,
  emotions: [],
  situation: "",
  autoThought: "",
  behavior: "",
});

const hasContent = (draft: EntryDraft): boolean =>
  draft.emotions.length > 0 || [draft.situation, draft.autoThought, draft.behavior].some((text) => text.trim() !== "");

const isEntryDraft = (value: unknown): value is EntryDraft => {
  if (typeof value !== "object" || value === null) return false;
  const draft = value as Record<string, unknown>;
  return (
    typeof draft.date === "string" &&
    Array.isArray(draft.emotions) &&
    typeof draft.situation === "string" &&
    typeof draft.autoThought === "string" &&
    typeof draft.behavior === "string"
  );
};

// localStorage can throw (private mode, blocked storage). A lost draft is acceptable; a crash isn't.
const loadDraft = (): EntryDraft | null => {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return isEntryDraft(parsed) && hasContent(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const removeDraft = () => {
  try {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch {
    // ignore — see loadDraft
  }
};

const storeDraft = (draft: EntryDraft) => {
  try {
    if (hasContent(draft)) localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    else localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch {
    // ignore — see loadDraft
  }
};

/**
 * Keeps the half-written entry safe: restored when the flow reopens, saved while typing.
 * @param requestedDate date picked on the week strip; overrides the draft's date.
 */
export const useEntryDraft = (requestedDate?: string) => {
  const [savedDraft] = useState(loadDraft);
  const [draft, setDraft] = useState<EntryDraft>(() => {
    const base = savedDraft ?? createEmptyDraft(getTodayDateString());
    return requestedDate ? { ...base, date: requestedDate } : base;
  });
  const [wasRestored, setWasRestored] = useState(savedDraft !== null);

  // Debounced: write at most every 500ms while typing.
  useEffect(() => {
    const timer = setTimeout(() => storeDraft(draft), SAVE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [draft]);

  const updateDraft = (changes: Partial<EntryDraft>) => setDraft((previous) => ({ ...previous, ...changes }));

  const resetDraft = () => {
    removeDraft();
    setDraft(createEmptyDraft(requestedDate ?? getTodayDateString()));
    setWasRestored(false);
  };

  return { draft, updateDraft, wasRestored, resetDraft, discardSavedDraft: removeDraft };
};
