/**
 * Formats a date as "YYYY-MM-DD" in the user's LOCAL timezone.
 *
 * Don't use `date.toISOString().slice(0, 10)` for this: toISOString is UTC,
 * so in Lithuania (UTC+2/+3) anything written between 00:00 and 03:00
 * would land on the previous day.
 */
export const toLocalDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getTodayDateString = (): string => toLocalDateString(new Date());
