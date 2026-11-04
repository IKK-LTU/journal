import { Box, Typography } from "@mui/material";

import type { CheckInDto } from "@/api/services/types";
import SectionLabel from "@/components/ui/SectionLabel";
import SurfaceCard from "@/components/ui/SurfaceCard";

/** "Po įrašo": each feeling before → after. A drop is shown in sage — the reward of the exercise. */
const AfterRatingsSection = ({ entry }: { entry: CheckInDto }) => {
  if (entry.emotionAfter.length === 0) return null;

  return (
    <SurfaceCard component="section" ariaLabel="Po įrašo">
      <SectionLabel>Po įrašo</SectionLabel>
      {entry.emotionAfter.map((afterRating) => {
        const intensityBefore = entry.emotion.find((emotion) => emotion.name === afterRating.name)?.intensity;
        const hasDropped = intensityBefore !== undefined && afterRating.intensity < intensityBefore;
        return (
          <Typography key={afterRating.name} sx={{ fontSize: 18 }}>
            <Box component="span" sx={{ fontWeight: 500 }}>
              {afterRating.name}
            </Box>{" "}
            <Box component="span" sx={{ color: hasDropped ? "primary.main" : "text.secondary", fontWeight: hasDropped ? 600 : 400 }}>
              {intensityBefore !== undefined ? `${intensityBefore} → ${afterRating.intensity}` : afterRating.intensity}
            </Box>
          </Typography>
        );
      })}
    </SurfaceCard>
  );
};

export default AfterRatingsSection;
