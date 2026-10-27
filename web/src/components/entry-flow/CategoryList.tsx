import { createElement, useState } from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { ChevronDown } from "lucide-react";

import { EMOTION_CATEGORIES, isSameEmotion, type EmotionCategory } from "@/constants/emotions";

type Props = {
  isPicked: (name: string) => boolean;
  onPick: (name: string) => void;
};

const wordButtonSx = { minHeight: 44, fontSize: 19, color: "text.secondary", fontFamily: "inherit" } as const;

/** Core feelings as rows; tap one to see the more precise feelings inside it. One open at a time. */
const CategoryList = ({ isPicked, onPick }: Props) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const countPicked = (category: EmotionCategory) =>
    [category.name, ...category.feelings].filter((name) => isPicked(name)).length;

  return (
    <Box sx={{ borderRadius: "12px", bgcolor: "background.paper", overflow: "hidden" }}>
      {EMOTION_CATEGORIES.map((category) => {
        const isOpen = openCategory === category.name;
        const pickedCount = countPicked(category);
        const panelId = `feelings-${category.name}`;
        // The core feeling itself comes first ("just Baimė"), then the precise ones. Picked ones move up to the intensity rows.
        const options = [category.name, ...category.feelings].filter((name) => !isPicked(name));

        return (
          <Box key={category.name}>
            <ButtonBase
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenCategory(isOpen ? null : category.name)}
              sx={{ width: "100%", minHeight: 56, px: 2, gap: 1.5, justifyContent: "flex-start", fontFamily: "inherit" }}
            >
              <Box
                aria-hidden
                sx={{
                  flex: "none",
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  bgcolor: "accentSoft",
                  color: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {createElement(category.icon, { size: 17, strokeWidth: 1.8 })}
              </Box>
              <Typography sx={{ flex: 1, textAlign: "left", fontSize: 17, fontWeight: 500 }}>{category.name}</Typography>
              {pickedCount > 0 && (
                <Box
                  aria-label={`pasirinkta: ${pickedCount}`}
                  sx={{
                    minWidth: 22,
                    height: 22,
                    px: 0.75,
                    borderRadius: "11px",
                    bgcolor: "text.primary",
                    color: "background.default",
                    fontSize: 12,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {pickedCount}
                </Box>
              )}
              <Box sx={{ display: "flex", color: "text.secondary", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s ease-out" }}>
                <ChevronDown size={18} aria-hidden />
              </Box>
            </ButtonBase>

            {isOpen && (
              <Box id={panelId} sx={{ display: "flex", flexWrap: "wrap", columnGap: 2.5, px: 2, pb: 1.5 }}>
                {options.map((name) => (
                  <ButtonBase
                    key={name}
                    onClick={() => onPick(name)}
                    sx={{ ...wordButtonSx, ...(isSameEmotion(name, category.name) && { color: "text.primary", fontWeight: 500 }) }}
                  >
                    {name}
                  </ButtonBase>
                ))}
                {options.length === 0 && (
                  <Typography sx={{ minHeight: 44, display: "flex", alignItems: "center", fontSize: 15, color: "text.secondary" }}>
                    Visos šios grupės emocijos jau pasirinktos
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default CategoryList;
