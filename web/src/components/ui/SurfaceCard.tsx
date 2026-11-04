import type { ElementType, ReactNode } from "react";
import { Box, type SxProps, type Theme } from "@mui/material";

type Props = {
  children: ReactNode;
  /** "paper": the default card. "soft": sage tint — only for the one positive moment on a screen. */
  tone?: "paper" | "soft";
  /** Rendered element, e.g. "section" so screen readers see a landmark. */
  component?: ElementType;
  /** Accessible name when rendered as a section. */
  ariaLabel?: string;
  sx?: SxProps<Theme>;
};

/** The app's one card style: a slightly different background, rounded, no border, no shadow. */
const SurfaceCard = ({ children, tone = "paper", component = "div", ariaLabel, sx }: Props) => {
  return (
    <Box
      component={component}
      aria-label={ariaLabel}
      sx={[{ p: 2, borderRadius: "12px", bgcolor: tone === "soft" ? "accentSoft" : "background.paper" }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {children}
    </Box>
  );
};

export default SurfaceCard;
