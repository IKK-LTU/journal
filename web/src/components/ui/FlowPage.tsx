import type { ReactNode } from "react";
import { Box } from "@mui/material";

/** Full-height mobile column for the step-by-step flows: header on top, footer pushed to the bottom. */
const FlowPage = ({ children }: { children: ReactNode }) => {
  return <Box sx={{ width: "100%", maxWidth: 600, minHeight: "100dvh", mx: "auto", display: "flex", flexDirection: "column" }}>{children}</Box>;
};

export default FlowPage;
