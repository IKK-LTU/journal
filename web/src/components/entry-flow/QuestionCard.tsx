import type { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

import SurfaceCard from "@/components/ui/SurfaceCard";

type Props = {
  label: string;
  isOptional?: boolean;
  children: ReactNode;
};

/** One question on its own soft card, so a screen with several questions has clear structure. */
const QuestionCard = ({ label, isOptional = false, children }: Props) => {
  return (
    <SurfaceCard component="section" ariaLabel={label} sx={{ mb: 1.5 }}>
      <Typography component="h2" sx={{ mb: 0.5, fontSize: 16, fontWeight: 600 }}>
        {label}
        {isOptional && (
          <Box component="span" sx={{ ml: 1, fontSize: 13, fontWeight: 400, color: "text.secondary" }}>
            nebūtina
          </Box>
        )}
      </Typography>
      {children}
    </SurfaceCard>
  );
};

export default QuestionCard;
