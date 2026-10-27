import { Typography } from "@mui/material";

import type { EmotionRating } from "./types";

/** Quiet line above later questions ("Neramus 7 · Vienišas 5"), so "šiuos jausmus" stays concrete. */
const EmotionReminder = ({ emotions }: { emotions: EmotionRating[] }) => {
  if (emotions.length === 0) return null;

  return (
    <Typography sx={{ mb: 1, fontSize: 14, color: "text.secondary" }}>
      {emotions.map((emotion) => `${emotion.name} ${emotion.intensity}`).join(" · ")}
    </Typography>
  );
};

export default EmotionReminder;
