import { useRef } from "react";
import { Box, ButtonBase } from "@mui/material";
import { ChevronDown } from "lucide-react";

import { daysBetween, formatMonthDay, getTodayDateString } from "@/utils/date";

type Props = {
  date: string;
  onChange: (date: string) => void;
};

const formatDateLabel = (date: string, today: string) => {
  const daysAgo = daysBetween(date, today);
  if (daysAgo === 0) return "Šiandien";
  if (daysAgo === 1) return "Vakar";
  return formatMonthDay(date);
};

/** Shows "Šiandien ▾"; tapping opens the phone's native date picker. */
const DateButton = ({ date, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const today = getTodayDateString();

  const openPicker = () => {
    const input = inputRef.current;
    if (!input) return;
    try {
      input.showPicker(); // modern browsers
    } catch {
      input.focus(); // older Safari: focusing the input opens its picker
    }
  };

  return (
    <Box sx={{ position: "relative", mb: 2.5, mt: -0.5 }}>
      <ButtonBase onClick={openPicker} sx={{ minHeight: 36, gap: 0.5, fontSize: 15, color: "text.secondary", fontFamily: "inherit" }}>
        {formatDateLabel(date, today)}
        <ChevronDown size={16} aria-hidden />
      </ButtonBase>
      <input
        ref={inputRef}
        type="date"
        aria-label="Įrašo data"
        value={date}
        max={today}
        onChange={(event) => event.target.value && onChange(event.target.value)}
        // Visually hidden but still focusable / openable.
        style={{ position: "absolute", left: 0, bottom: 0, width: 1, height: 1, opacity: 0 }}
      />
    </Box>
  );
};

export default DateButton;
