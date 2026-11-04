import { Typography } from "@mui/material";

import SurfaceCard from "@/components/ui/SurfaceCard";

import { SERIF_FONT } from "../../../theme";

type Props = {
  label: string;
  text: string;
  /** A thought is shown as a serif quote; plain text otherwise. */
  isQuote?: boolean;
};

/** What the current question is about (the thought, or what happened), on a soft sage card under the question. */
const ContextCard = ({ label, text, isQuote = false }: Props) => {
  if (!text.trim()) return null;

  return (
    <SurfaceCard tone="soft" sx={{ mb: 2, py: 1.5 }}>
      <Typography sx={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "primary.main" }}>
        {label}
      </Typography>
      <Typography
        sx={{
          mt: 0.5,
          fontSize: isQuote ? 18 : 16,
          lineHeight: 1.45,
          ...(isQuote && { fontFamily: SERIF_FONT, fontStyle: "italic" }),
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {isQuote ? `„${text.trim()}“` : text.trim()}
      </Typography>
    </SurfaceCard>
  );
};

export default ContextCard;
