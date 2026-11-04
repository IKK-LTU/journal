import { Box, ButtonBase, Typography } from "@mui/material";
import { Check } from "lucide-react";

import IconBadge from "@/components/ui/IconBadge";
import { EMOTION_CATEGORIES } from "@/constants/emotions";

type Props = {
  /** Core feelings that have at least one picked emotion. */
  pickedCores: string[];
  onTap: (core: string) => void;
};

/** The 6 core feelings of the wheel as big, calm tiles — the whole first decision, one tap. */
const FeelingTiles = ({ pickedCores, onTap }: Props) => {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 1 }}>
      {EMOTION_CATEGORIES.map((category) => {
        const isPicked = pickedCores.includes(category.name);
        return (
          <ButtonBase
            key={category.name}
            aria-pressed={isPicked}
            onClick={() => onTap(category.name)}
            sx={{
              minHeight: 64,
              px: 1.5,
              gap: 1.25,
              justifyContent: "flex-start",
              borderRadius: "12px",
              bgcolor: isPicked ? "accentSoft" : "background.paper",
              fontFamily: "inherit",
              transition: "background-color .15s ease-out",
            }}
          >
            <IconBadge icon={isPicked ? Check : category.icon} size={36} isFilled={isPicked} />
            <Typography sx={{ fontSize: 17, fontWeight: isPicked ? 600 : 500, textAlign: "left" }}>{category.name}</Typography>
          </ButtonBase>
        );
      })}
    </Box>
  );
};

export default FeelingTiles;
