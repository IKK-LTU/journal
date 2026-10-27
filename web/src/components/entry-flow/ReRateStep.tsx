import { Box, Typography } from "@mui/material";

import IntensityPicker from "./IntensityPicker";
import type { EmotionRating } from "./types";

type Props = {
  /** Ratings from step 1, to show "buvo 7". */
  before: EmotionRating[];
  /** Same emotions, prefilled with the "before" values. */
  after: EmotionRating[];
  onChange: (after: EmotionRating[]) => void;
};

/** Re-rate the same feelings after writing. Seeing "7 → 4" is the most rewarding moment of the exercise. */
const ReRateStep = ({ before, after, onChange }: Props) => {
  const setIntensity = (name: string, intensity: number) => {
    onChange(after.map((emotion) => (emotion.name === name ? { ...emotion, intensity } : emotion)));
  };

  return (
    <>
      {after.map((emotion) => {
        const previous = before.find((item) => item.name === emotion.name)?.intensity;
        return (
          <Box key={emotion.name} sx={{ mb: 1.5, pt: 1.5, pr: 2, pb: 0.5, pl: 2, borderRadius: "12px", bgcolor: "background.paper" }}>
            <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <Typography sx={{ fontSize: 22, fontWeight: 500 }}>{emotion.name}</Typography>
              {previous !== undefined && <Typography sx={{ fontSize: 15, color: "text.secondary" }}>buvo {previous}</Typography>}
            </Box>
            <IntensityPicker emotionName={emotion.name} value={emotion.intensity} onChange={(value) => setIntensity(emotion.name, value)} />
          </Box>
        );
      })}
    </>
  );
};

export default ReRateStep;
