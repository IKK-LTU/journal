import { parseLocalDate, toLocalDateString } from "./date";

/**
 * How many days in a row (ending today) have at least one entry.
 * Today without an entry yet → 0, even if yesterday had one.
 */
export const countStreakDays = (datesWithEntries: string[], today: string): number => {
  const writtenDays = new Set(datesWithEntries);
  const cursor = parseLocalDate(today);
  let streak = 0;

  while (writtenDays.has(toLocalDateString(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
};
