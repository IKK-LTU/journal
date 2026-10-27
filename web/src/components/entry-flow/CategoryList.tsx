import { createElement } from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { Check } from "lucide-react";

import { EMOTION_CATEGORIES } from "@/constants/emotions";

type Props = {
  isPicked: (name: string) => boolean;
  onToggle: (name: string) => void;
};

/**
 * Every feeling visible at once, grouped by its core feeling (the wheel's center).
 * Each group: a quiet subtitle, then its words. The core word comes first, in bold,
 * for when the precise word doesn't come. Picked words stay in place with a ✓.
 */
const CategoryList = ({ isPicked, onToggle }: Props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {EMOTION_CATEGORIES.map((category) => (
        <Box component="section" key={category.name} aria-label={category.name} sx={{ px: 2, pt: 1.5, pb: 1, borderRadius: "12px", bgcolor: "background.paper" }}>
          <Typography
            component="h3"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "text.secondary",
            }}
          >
            <Box component="span" aria-hidden sx={{ display: "flex", color: "primary.main" }}>
              {createElement(category.icon, { size: 15, strokeWidth: 2 })}
            </Box>
            {category.name}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 2.25 }}>
            {[category.name, ...category.feelings].map((name, index) => {
              const picked = isPicked(name);
              const isCoreWord = index === 0;

              return (
                <ButtonBase
                  key={name}
                  aria-pressed={picked}
                  onClick={() => onToggle(name)}
                  sx={{
                    minHeight: 44,
                    gap: 0.5,
                    fontFamily: "inherit",
                    fontSize: 18,
                    fontWeight: picked || isCoreWord ? 600 : 400,
                    color: picked || isCoreWord ? "text.primary" : "text.secondary",
                    transition: "color .15s ease-out",
                  }}
                >
                  {picked && <Check size={16} strokeWidth={2.8} aria-hidden />}
                  {name}
                </ButtonBase>
              );
            })}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CategoryList;
