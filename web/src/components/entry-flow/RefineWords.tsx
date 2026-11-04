import { Box, ButtonBase, Typography } from "@mui/material";
import { Check } from "lucide-react";

import type { EmotionCategory } from "@/constants/emotions";

type Props = {
  category: EmotionCategory;
  isPicked: (name: string) => boolean;
  onToggle: (name: string) => void;
};

/**
 * Optional second level: the precise feelings of the tapped core feeling.
 * Naming it precisely helps later (insights, reframing), but the core word alone is fine.
 */
const RefineWords = ({ category, isPicked, onToggle }: Props) => {
  return (
    <Box component="section" aria-label={`Tiksliau: ${category.name}`} sx={{ mt: 1.5, px: 2, pt: 1.5, pb: 1, borderRadius: "12px", bgcolor: "background.paper" }}>
      <Typography component="h2" sx={{ fontSize: 16, fontWeight: 600 }}>
        Gal tiksliau?
        <Box component="span" sx={{ ml: 1, fontSize: 13, fontWeight: 400, color: "text.secondary" }}>
          nebūtina – tinka ir „{category.name.toLowerCase()}“
        </Box>
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 2.25 }}>
        {category.feelings.map((name) => {
          const picked = isPicked(name);
          return (
            <ButtonBase
              key={name}
              aria-pressed={picked}
              onClick={() => onToggle(name)}
              sx={{
                minHeight: 44,
                gap: 0.5,
                fontFamily: "inherit",
                fontSize: 17,
                fontWeight: picked ? 600 : 400,
                color: picked ? "text.primary" : "text.secondary",
              }}
            >
              {picked && <Check size={16} strokeWidth={2.8} aria-hidden />}
              {name}
            </ButtonBase>
          );
        })}
      </Box>
    </Box>
  );
};

export default RefineWords;
