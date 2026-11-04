import type { ReactNode } from "react";
import { Typography } from "@mui/material";

type Props = {
  children: ReactNode;
  /** Sage instead of grey — used on the soft (positive) card. */
  isAccent?: boolean;
};

/** Small uppercase heading above a block of content ("MINTIS", "PO ĮRAŠO"). */
const SectionLabel = ({ children, isAccent = false }: Props) => {
  return (
    <Typography
      component="h2"
      sx={{
        mb: 0.75,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: isAccent ? "primary.main" : "text.secondary",
      }}
    >
      {children}
    </Typography>
  );
};

export default SectionLabel;
