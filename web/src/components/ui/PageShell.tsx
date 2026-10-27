import { Box } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Extra space at the bottom, e.g. so a floating button doesn't cover the last card. */
  bottomSpace?: number;
};

/** Centered mobile-width column with the app's 16px side gutters. */
const PageShell = ({ children, bottomSpace = 6 }: Props) => {
  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        maxWidth: 600,
        minHeight: "100dvh",
        mx: "auto",
        px: 2,
        pt: 2,
        pb: bottomSpace,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Box>
  );
};

export default PageShell;
