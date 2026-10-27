import { CheckInDto } from "@/api/services/types";

// Temporary: check-ins live in localStorage until the API lands (Phase 5).

const STORAGE_KEY = "checkins";

type StoredState = { checkinsList: CheckInDto[] };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

/**
 * Entries saved by older versions have a different shape:
 * - `autoThoughts` (string or string[]) instead of `autoThought: string`
 * - `id` built from the date (YYYYMMDD), so same-day entries share an id
 * This converts them to the current shape and drops anything unreadable.
 */
const normalizeCheckins = (rawList: unknown[]): CheckInDto[] => {
  const seenIds = new Set<string>();
  const result: CheckInDto[] = [];

  rawList.forEach((raw, index) => {
    if (!isRecord(raw)) return;
    if (typeof raw.date !== "string" || typeof raw.situation !== "string") return;

    let autoThought = "";
    if (typeof raw.autoThought === "string") autoThought = raw.autoThought;
    else if (typeof raw.autoThoughts === "string") autoThought = raw.autoThoughts;
    else if (Array.isArray(raw.autoThoughts)) autoThought = raw.autoThoughts.join("\n");

    // Make duplicate (date-based) ids unique, so React keys don't collide.
    let id = typeof raw.id === "string" ? raw.id : `legacy-${index}`;
    if (seenIds.has(id)) id = `${id}-${index}`;
    seenIds.add(id);

    result.push({
      id,
      date: raw.date,
      createdAt: typeof raw.createdAt === "string" ? raw.createdAt : "",
      situation: raw.situation,
      emotion: Array.isArray(raw.emotion) ? raw.emotion : [],
      autoThought,
      behavior: typeof raw.behavior === "string" ? raw.behavior : "",
    });
  });

  return result;
};

export const loadCheckins = (): StoredState => {
  const empty: StoredState = { checkinsList: [] };
  if (typeof window === "undefined") return empty;

  // Accessing localStorage itself can throw (blocked storage / some private modes).
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;

    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed) || !Array.isArray(parsed.checkinsList)) return empty;

    return { checkinsList: normalizeCheckins(parsed.checkinsList) };
  } catch (error) {
    console.error("Could not read saved check-ins", error);
    return empty;
  }
};

export const saveCheckins = (state: StoredState): void => {
  // Can throw when storage is full or blocked. Losing persistence is bad,
  // but crashing every dispatch (and the UI with it) is worse.
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Could not save check-ins", error);
  }
};
