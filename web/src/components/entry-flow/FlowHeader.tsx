import { Box, IconButton } from "@mui/material";
import { X } from "lucide-react";

import BackButton from "@/components/ui/BackButton";

type Props = {
  /** 1-based, for display. */
  stepNumber: number;
  totalSteps: number;
  onBack: () => void;
  onClose: () => void;
};

const FlowHeader = ({ stepNumber, totalSteps, onBack, onClose }: Props) => {
  return (
    <Box component="header">
      <Box
        role="progressbar"
        aria-label={`Žingsnis ${stepNumber} iš ${totalSteps}`}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-valuenow={stepNumber}
        sx={{ height: 3, bgcolor: "track" }}
      >
        <Box sx={{ height: "100%", width: `${(stepNumber / totalSteps) * 100}%`, bgcolor: "text.primary", transition: "width .3s ease-out" }} />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", px: 1, pt: 1 }}>
        {/* Hidden (not removed) on step 1 so the close button doesn't jump. */}
        <Box sx={{ visibility: stepNumber > 1 ? "visible" : "hidden", ml: 1 }}>
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
