import type { CheckInDto } from "@/api/services/types";
import { formatDayHeading, formatTime } from "./date";
import { isDifficultEmotion } from "./insights";

/** "Šiandien, 21:40 · Darbe · Šalia: Kolegos" — only the parts the entry has. */
export const describeEntryContext = (entry: CheckInDto, today?: string): string => {
  const time = formatTime(entry.createdAt);
  const when = formatDayHeading(entry.date, today) + (time ? `, ${time}` : "");
  const withWhom = entry.people.length > 0 ? `Šalia: ${entry.people.join(", ")}` : "";
  return [when, entry.place, withWhom].filter((part) => part !== "").join(" · ");
};

/**
 * Offer "Pažvelk giliau" when it can still help: no friend's view yet, and either a thought is
 * already written (to finish it) or the feelings were hard. Good moments don't need reframing.
 */
export const canGoDeeper = (entry: CheckInDto): boolean =>
  entry.balancedThought === "" && (entry.autoThought !== "" || entry.emotion.some((emotion) => isDifficultEmotion(emotion.name)));
