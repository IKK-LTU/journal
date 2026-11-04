import { useEffect, useRef, useState } from "react";

import { getTodayDateString } from "@/utils/date";
import type { CarriedOverText, EntryDraft } from "./types";

const DRAFT_STORAGE_KEY = "entry-draft";
const SAVE_DELAY_MS = 500;

const createEmptyDraft = (date: string): EntryDraft => ({
  date,
  emotions: [],
  place: "",
  people: [],
  situation: "",
});

const hasContent = (draft: EntryDraft): boolean =>
  draft.emotions.length > 0 ||
  draft.people.length > 0 ||
  draft.place.trim() !== "" ||
  draft.situation.trim() !== "" ||
  draft.carriedOver !== undefined;

/** Fields from the older long flow; undefined when the stored draft had none of them. */
const toCarriedOver = (raw: Record<string, unknown>): CarriedOverText | undefined => {
  const carried: CarriedOverText = {
    autoThought: asString(raw.autoThought),
    thinkingTraps: asArray(raw.thinkingTraps),
    balancedThought: asString(raw.balancedThought),
    reactions: asArray(raw.reactions),
    behavior: asString(raw.behavior),
  };
  const hasAny =
    [carried.autoThought, carried.balancedThought, carried.behavior].some((text) => text.trim() !== "") ||
    carried.thinkingTraps.length > 0 ||
    carried.reactions.length > 0;
  return hasAny ? carried : (raw.carriedOver as CarriedOverText | undefined);
};

const asString = (value: unknown): string => (typeof value === "string" ? value : "");
const asArray = <T,>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

/**
 * Turns whatever is in storage into a valid draft. Missing fields get empty defaults and fields
 * from older flow versions are ignored, so a draft from an older app version keeps what fits.
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
    carriedOver: toCarriedOver(raw),
  };
};

// localStorage can throw (private mode, blocked storage). A lost draft is acceptable; a crash isn't.
export const loadDraft = (): EntryDraft | null => {
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
  // Set once the entry is saved: a write still waiting in the debounce must not bring the draft back.
  const isDiscarded = useRef(false);

  // Debounced: write at most every 500ms while typing.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDiscarded.current) storeDraft(draft);
    }, SAVE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [draft]);

  const updateDraft = (changes: Partial<EntryDraft>) => setDraft((previous) => ({ ...previous, ...changes }));

  const resetDraft = () => {
    removeDraft();
    setDraft(createEmptyDraft(requestedDate ?? getTodayDateString()));
    setWasRestored(false);
  };

  const discardSavedDraft = () => {
    isDiscarded.current = true;
    removeDraft();
  };

  return { draft, updateDraft, wasRestored, resetDraft, discardSavedDraft };
};
