import type { ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";

const popIn = keyframes`
  from { transform: scale(0.6); opacity: 0; }
  to   { transform: scale(1);   opacity: 1; }
`;

const drawCheck = keyframes`
  to { stroke-dashoffset: 0; }
`;

type Props = {
  title: string;
  message: string;
  /** Extra line under the message (e.g. a streak or "Neramus 7 → 4"). */
  highlight?: string;
  children: ReactNode;
};

/** The moment after saving: an animated ✓, a kind sentence, then what to do next. */
const DoneScreen = ({ title, message, highlight, children }: Props) => {
  return (
    <Box sx={{ flex: 1, px: 2, pt: 8, pb: 3, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <Box
        aria-hidden
        sx={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          bgcolor: "accentSoft",
          color: "primary.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: `${popIn} .35s ease-out both`,
        }}
      >
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          {/* dasharray = path length, so the line "draws" itself */}
          <Box component="path" d="M20 6 9 17l-5-5" sx={{ strokeDasharray: 24, strokeDashoffset: 24, animation: `${drawCheck} .4s .25s ease-out forwards` }} />
        </svg>
      </Box>

      <Typography variant="display" sx={{ mt: 3, fontSize: 32 }}>
        {title}
      </Typography>
      <Typography sx={{ mt: 1, maxWidth: 340, fontSize: 17, color: "text.secondary" }}>{message}</Typography>
      {highlight && <Typography sx={{ mt: 1.5, fontSize: 17, fontWeight: 600, color: "primary.main" }}>{highlight}</Typography>}

      <Box sx={{ mt: 5, width: "100%", maxWidth: 420 }}>{children}</Box>
    </Box>
  );
};

export default DoneScreen;
