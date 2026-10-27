import { useEffect, useState } from "react";

import { getTodayDateString } from "@/utils/date";
import type { EntryDraft } from "./types";

const DRAFT_STORAGE_KEY = "entry-draft";
const SAVE_DELAY_MS = 500;

const createEmptyDraft = (date: string): EntryDraft => ({
  date,
  emotions: [],
  place: "",
  people: [],
  situation: "",
  autoThought: "",
  reactions: [],
  behavior: "",
  emotionAfter: [],
});

const hasContent = (draft: EntryDraft): boolean =>
  draft.emotions.length > 0 ||
  draft.people.length > 0 ||
  draft.reactions.length > 0 ||
  [draft.place, draft.situation, draft.autoThought, draft.behavior].some((text) => text.trim() !== "");

const asString = (value: unknown): string => (typeof value === "string" ? value : "");
const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

/**
 * Turns whatever is in storage into a valid draft. Fields added later (place, people, …)
 * get empty defaults, so a draft from an older app version keeps the text the user already wrote.
 */
const toEntryDraft = (value: unknown): EntryDraft | null => {
  if (typeof value !== "object" || value === null) return null;
  const raw = value as Record<string, unknown>;
  if (typeof raw.date !== "string") return null;

  return {
    date: raw.date,
    emotions: asArray(raw.emotions),
    place: asString(raw.place),
    people: asArray(raw.people),
    situation: asString(raw.situation),
    autoThought: asString(raw.autoThought),
    reactions: asArray(raw.reactions),
    behavior: asString(raw.behavior),
    emotionAfter: asArray(raw.emotionAfter),
  };
};

// localStorage can throw (private mode, blocked storage). A lost draft is acceptable; a crash isn't.
const loadDraft = (): EntryDraft | null => {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    const draft = toEntryDraft(raw ? JSON.parse(raw) : null);
    return draft && hasContent(draft) ? draft : null;
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
