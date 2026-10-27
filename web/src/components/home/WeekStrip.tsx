import { Box, ButtonBase, Typography } from "@mui/material";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ROUTES, type NewEntryRouteState } from "@/router/routes";
import { checkinsSelectors } from "@/store/features/checkins";
import { useAppSelector } from "@/store/hooks";
import { formatDayHeading, getWeekDates, toLocalDateString } from "@/utils/date";
import { DAY_FORMS, pluralizeLt } from "@/utils/plural";
import { countStreakDays } from "@/utils/streak";

const WEEKDAY_LETTERS = ["P", "A", "T", "K", "P", "Š", "S"];

type Props = {
  now: Date;
};

/** This week at a glance: ✓ on days with an entry. Tap a ✓ to jump to that day, an empty past day to write for it. */
const WeekStrip = ({ now }: Props) => {
  const navigate = useNavigate();
  const datesWithEntries = useAppSelector(checkinsSelectors.selectDatesWithEntries);

  const today = toLocalDateString(now);
  const weekDates = getWeekDates(now);
  const writtenThisWeek = weekDates.filter((date) => datesWithEntries.includes(date)).length;
  const streak = countStreakDays(datesWithEntries, today);

  const scrollToDay = (date: string) => {
    document.getElementById(`day-${date}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openNewEntry = (date: string) => {
    const state: NewEntryRouteState = { date };
    navigate(ROUTES.NEW_ENTRY.path, { state });
  };

  const streakText = streak > 1 ? `${streak} ${pluralizeLt(streak, DAY_FORMS)} iš eilės · ` : "";

  return (
    <Box component="nav" aria-label="Ši savaitė" sx={{ mt: 3, mb: 4 }}>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 0.5 }}>
        {weekDates.map((date, index) => {
          const isWritten = datesWithEntries.includes(date);
          const isToday = date === today;
          const isFuture = date > today;
          const label = `${formatDayHeading(date, today)}${isWritten ? ": parašyta, rodyti" : isFuture ? "" : ": pridėti įrašą"}`;

          return (
            <Box key={date} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.75 }}>
              <Typography
                aria-hidden
                sx={{ fontSize: 12, fontWeight: isToday ? 600 : 400, color: isToday ? "text.primary" : "text.secondary" }}
              >
                {WEEKDAY_LETTERS[index]}
              </Typography>

              <ButtonBase
                aria-label={label}
                disabled={isFuture}
                onClick={() => (isWritten ? scrollToDay(date) : openNewEntry(date))}
                sx={{ width: 44, height: 44, borderRadius: "50%" }}
              >
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: isWritten ? "primary.main" : isToday ? "transparent" : "track",
                    color: "primary.contrastText",
                    boxShadow: isToday && !isWritten ? "inset 0 0 0 2px var(--mui-palette-primary-main)" : "none",
                    opacity: isFuture ? 0.5 : 1,
                  }}
                >
                  {isWritten && <Check size={16} strokeWidth={3} aria-hidden />}
                </Box>
              </ButtonBase>
            </Box>
          );
        })}
      </Box>

      <Typography sx={{ mt: 1, textAlign: "center", fontSize: 14, color: "text.secondary" }}>
        {streakText}
        {writtenThisWeek} iš 7 šią savaitę
      </Typography>
    </Box>
  );
};

export default WeekStrip;
