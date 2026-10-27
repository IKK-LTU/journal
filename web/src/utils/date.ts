// All dates in the app are "YYYY-MM-DD" strings in the user's LOCAL timezone.

const WEEKDAYS = [
  "Sekmadienis",
  "Pirmadienis",
  "Antradienis",
  "Trečiadienis",
  "Ketvirtadienis",
  "Penktadienis",
  "Šeštadienis",
];

// Genitive form, as used with a day number: "spalio 29 d."
const MONTHS_GENITIVE = [
  "sausio",
  "vasario",
  "kovo",
  "balandžio",
  "gegužės",
  "birželio",
  "liepos",
  "rugpjūčio",
  "rugsėjo",
  "spalio",
  "lapkričio",
  "gruodžio",
];

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

/** "2026-10-29" → Date at local midnight. (new Date("2026-10-29") would be UTC midnight.) */
export const parseLocalDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

/** Whole days from `from` to `to`. Rounding absorbs the 1-hour daylight-saving shift. */
export const daysBetween = (from: string, to: string): number =>
  Math.round((parseLocalDate(to).getTime() - parseLocalDate(from).getTime()) / 86_400_000);

/** "spalio 29 d." */
export const formatMonthDay = (dateString: string): string => {
  const date = parseLocalDate(dateString);
  return `${MONTHS_GENITIVE[date.getMonth()]} ${date.getDate()} d.`;
};

/** Šiandien / Vakar / weekday (last 7 days) / "spalio 12 d." */
export const formatDayHeading = (dateString: string, today: string = getTodayDateString()): string => {
  const daysAgo = daysBetween(dateString, today);

  if (daysAgo === 0) return "Šiandien";
  if (daysAgo === 1) return "Vakar";
  if (daysAgo > 1 && daysAgo < 7) return WEEKDAYS[parseLocalDate(dateString).getDay()];
  return formatMonthDay(dateString);
};

/** "Ketvirtadienis, spalio 29 d." */
export const formatLongDate = (date: Date): string => {
  const dateString = toLocalDateString(date);
  return `${WEEKDAYS[date.getDay()]}, ${formatMonthDay(dateString)}`;
};

/** "21:40" from an ISO timestamp. Old entries may have no timestamp → "". */
export const formatTime = (isoTimestamp: string): string => {
  const date = new Date(isoTimestamp);
  if (!isoTimestamp || Number.isNaN(date.getTime())) return "";

  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};

export const getGreeting = (date: Date): string => {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "Labas rytas";
  if (hour >= 12 && hour < 18) return "Laba diena";
  return "Labas vakaras";
};

/** The 7 dates (Monday → Sunday) of the week that contains `today`. */
export const getWeekDates = (today: Date): string[] => {
  // getDay(): Sunday = 0, so Monday-first offset is (day + 6) % 7.
  const daysSinceMonday = (today.getDay() + 6) % 7;

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - daysSinceMonday + index);
    return toLocalDateString(date);
  });
};
