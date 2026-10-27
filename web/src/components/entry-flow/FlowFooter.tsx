import { Box, Button, Typography } from "@mui/material";

type Props = {
  error: string | null;
  primaryLabel: string;
  onPrimary: () => void;
  /** Only optional steps can be skipped. */
  onSkip?: () => void;
};

export const FLOW_ERROR_ID = "entry-flow-error";

const FlowFooter = ({ error, primaryLabel, onPrimary, onSkip }: Props) => {
  return (
    <Box component="footer" sx={{ px: 2, pt: 1, pb: 3 }}>
      {/* Always rendered so screen readers announce new errors; min height keeps the button still. */}
      <Typography id={FLOW_ERROR_ID} role="alert" sx={{ minHeight: 22, mb: 1, fontSize: 15, color: "error.main" }}>
        {error}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
        {onSkip ? (
          <Button variant="text" onClick={onSkip} sx={{ color: "text.secondary", px: 1, ml: -1 }}>
            Praleisti
          </Button>
        ) : (
          <span />
        )}
        <Button variant="contained" onClick={onPrimary} sx={{ minHeight: 56, px: 4 }}>
          {primaryLabel}
        </Button>
      </Box>
    </Box>
  );
};

export default FlowFooter;
