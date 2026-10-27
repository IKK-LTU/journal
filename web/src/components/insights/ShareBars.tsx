import { Box, Typography } from "@mui/material";

import EmotionIcon from "@/components/ui/EmotionIcon";
import type { Share } from "@/utils/insights";

type Props = {
  shares: Share[];
  /** Show the core feeling's icon (for core feelings, not for precise words). */
  withIcons?: boolean;
};

/** Horizontal bars, one per item, with the % in text (readable without seeing the bar). */
const ShareBars = ({ shares, withIcons = false }: Props) => {
  return (
    <Box component="ul" sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
      {shares.map((share) => (
        <Box component="li" key={share.name} sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          {withIcons && <EmotionIcon emotionName={share.name} size={30} />}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, mb: 0.5 }}>
              <Typography sx={{ fontSize: 15, fontWeight: 500 }}>{share.name}</Typography>
              <Typography sx={{ fontSize: 14, color: "text.secondary" }}>{share.percent}%</Typography>
            </Box>
            <Box aria-hidden sx={{ height: 6, borderRadius: 3, bgcolor: "track", overflow: "hidden" }}>
              <Box sx={{ height: "100%", width: `${share.percent}%`, borderRadius: 3, bgcolor: "text.primary", opacity: 0.8 }} />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ShareBars;
