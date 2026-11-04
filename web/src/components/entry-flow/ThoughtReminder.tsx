import { Typography } from "@mui/material";

import { SERIF_FONT } from "../../../theme";

/** The thought being examined, quoted quietly above the reframe questions. */
const ThoughtReminder = ({ thought }: { thought: string }) => {
  if (!thought.trim()) return null;

  return (
    <Typography
      sx={{
        mb: 1,
        fontFamily: SERIF_FONT,
        fontStyle: "italic",
        fontSize: 16,
        color: "text.secondary",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}
    >
      „{thought.trim()}“
    </Typography>
  );
};

export default ThoughtReminder;
