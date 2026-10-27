import { Box, Typography } from "@mui/material";

import EmotionIcon from "@/components/ui/EmotionIcon";
import type { Pattern } from "@/utils/insights";

/** "Darbe → Išsigandęs (4)": where / with whom, and which core feeling dominates there. */
const PatternList = ({ patterns }: { patterns: Pattern[] }) => {
  return (
    <Box component="ul" sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {patterns.map((pattern) => (
        <Box component="li" key={pattern.context} sx={{ display: "flex", alignItems: "center", gap: 1.25, minHeight: 36 }}>
          <EmotionIcon emotionName={pattern.core} size={28} />
          <Typography sx={{ flex: 1, fontSize: 16 }}>
            <Box component="span" sx={{ fontWeight: 500 }}>
              {pattern.context}
            </Box>{" "}
            → {pattern.core}
          </Typography>
          <Typography sx={{ fontSize: 14, color: "text.secondary" }}>{pattern.count} k.</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PatternList;
