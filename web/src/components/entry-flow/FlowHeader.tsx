import { Box, IconButton } from "@mui/material";
import { X } from "lucide-react";

import BackButton from "@/components/ui/BackButton";
import { LAST_STEP, type FlowStep } from "./types";

type Props = {
  step: FlowStep;
  onBack: () => void;
  onClose: () => void;
};

const FlowHeader = ({ step, onBack, onClose }: Props) => {
  return (
    <Box component="header">
      <Box
        role="progressbar"
        aria-label={`Žingsnis ${step} iš ${LAST_STEP}`}
        aria-valuemin={1}
        aria-valuemax={LAST_STEP}
        aria-valuenow={step}
        sx={{ height: 3, bgcolor: "track" }}
      >
        <Box sx={{ height: "100%", width: `${(step / LAST_STEP) * 100}%`, bgcolor: "text.primary", transition: "width .3s ease-out" }} />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", px: 1, pt: 1 }}>
        {/* Hidden (not removed) on step 1 so the close button doesn't jump. */}
        <Box sx={{ visibility: step > 1 ? "visible" : "hidden", ml: 1 }}>
          <BackButton onClick={onBack} />
        </Box>
        <IconButton aria-label="Uždaryti, juodraštis išsaugomas" onClick={onClose} sx={{ width: 44, height: 44, color: "text.primary" }}>
          <X size={22} strokeWidth={1.8} aria-hidden />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FlowHeader;
