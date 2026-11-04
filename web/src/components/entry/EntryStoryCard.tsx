import { Box, Typography } from "@mui/material";

import type { CheckInDto } from "@/api/services/types";
import SurfaceCard from "@/components/ui/SurfaceCard";
import { SERIF_FONT } from "../../../theme";

/** The core of an entry: the feelings with their intensity, then what happened (serif, like a journal). */
const EntryStoryCard = ({ entry }: { entry: CheckInDto }) => {
  return (
    <SurfaceCard sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography component="h1" sx={{ display: "flex", flexWrap: "wrap", columnGap: 2, fontSize: 20 }}>
        {entry.emotion.map((emotion) => (
          <span key={emotion.name}>
            <Box component="span" sx={{ fontWeight: 500 }}>
              {emotion.name}
            </Box>{" "}
            <Box component="span" sx={{ color: "text.secondary" }}>
              {emotion.intensity}
            </Box>
          </span>
        ))}
      </Typography>
      <Typography sx={{ fontFamily: SERIF_FONT, fontSize: 23, lineHeight: 1.45, whiteSpace: "pre-wrap" }}>{entry.situation}</Typography>
    </SurfaceCard>
  );
};

export default EntryStoryCard;
