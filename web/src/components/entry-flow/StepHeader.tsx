import { createElement } from "react";
import { Box, Typography } from "@mui/material";
import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  stepNumber: number;
  totalSteps: number;
  title: string;
  hint: string;
};

/** Warm opening of every step: icon on a soft sage circle, where you are, the question, a kind line. */
const StepHeader = ({ icon, stepNumber, totalSteps, title, hint }: Props) => {
  return (
    <Box component="header" sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <Box
          aria-hidden
          sx={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            bgcolor: "accentSoft",
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {createElement(icon, { size: 24, strokeWidth: 1.8 })}
        </Box>
        <Typography sx={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "text.secondary" }}>
          {stepNumber} iš {totalSteps}
        </Typography>
      </Box>

      <Typography variant="display" sx={{ fontSize: 30, lineHeight: 1.2 }}>
        {title}
      </Typography>
      <Typography sx={{ mt: 1, fontSize: 15, color: "text.secondary" }}>{hint}</Typography>
    </Box>
  );
};

export default StepHeader;
