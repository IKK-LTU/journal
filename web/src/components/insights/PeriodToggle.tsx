import { Box, ButtonBase } from "@mui/material";

export type Period = 7 | 30 | null; // null = all time

const PERIODS: { value: Period; label: string }[] = [
  { value: 7, label: "7 d." },
  { value: 30, label: "30 d." },
  { value: null, label: "Visi" },
];

type Props = {
  value: Period;
  onChange: (period: Period) => void;
};

/** Segmented control: soft track, the selected option on a raised paper pill. */
const PeriodToggle = ({ value, onChange }: Props) => {
  return (
    <Box role="radiogroup" aria-label="Laikotarpis" sx={{ display: "flex", p: 0.5, borderRadius: "12px", bgcolor: "track" }}>
      {PERIODS.map((period) => {
        const isSelected = period.value === value;
        return (
          <ButtonBase
            key={period.label}
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(period.value)}
            sx={{
              flex: 1,
              minHeight: 40,
              borderRadius: "9px",
              fontFamily: "inherit",
              fontSize: 15,
              fontWeight: isSelected ? 600 : 400,
              color: isSelected ? "text.primary" : "text.secondary",
              bgcolor: isSelected ? "background.paper" : "transparent",
              transition: "background-color .15s ease-out",
            }}
          >
            {period.label}
          </ButtonBase>
        );
      })}
    </Box>
  );
};

export default PeriodToggle;
