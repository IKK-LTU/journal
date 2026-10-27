import { Box } from "@mui/material";

const LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

type Props = {
  emotionName: string;
  value: number;
  onChange: (value: number) => void;
};

/**
 * 1–10 as tappable numbers. Built on real radio inputs (visually hidden),
 * so arrow keys and screen readers work without custom keyboard code.
 */
const IntensityPicker = ({ emotionName, value, onChange }: Props) => {
  return (
    <Box
      role="radiogroup"
      aria-label={`${emotionName}: stiprumas nuo 1 iki 10`}
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(10, minmax(0, 1fr))",
        "& input:focus-visible + span": { outline: "2px solid", outlineColor: "primary.main", outlineOffset: 2 },
      }}
    >
      {LEVELS.map((level) => {
        const isSelected = level === value;

        return (
          <Box
            component="label"
            key={level}
            sx={{ position: "relative", height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <input
              type="radio"
              name={`intensity-${emotionName}`}
              value={level}
              checked={isSelected}
              onChange={() => onChange(level)}
              style={{ position: "absolute", opacity: 0, width: 1, height: 1 }}
            />
            <Box
              component="span"
              sx={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                fontWeight: isSelected ? 600 : 400,
                bgcolor: isSelected ? "text.primary" : "transparent",
                // Numbers below the chosen one get darker, so the scale visibly "fills up".
                color: isSelected ? "background.default" : level < value ? "text.primary" : "text.secondary",
                transition: "background-color .15s ease-out, color .15s ease-out",
              }}
            >
              {level}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default IntensityPicker;
