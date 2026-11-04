import { Box, Button, Typography } from "@mui/material";

import type { CheckInDto } from "@/api/services/types";
import SectionLabel from "@/components/ui/SectionLabel";
import SurfaceCard from "@/components/ui/SurfaceCard";
import { findTrap } from "@/constants/thinking-traps";
import { SERIF_FONT } from "../../../theme";

type Props = {
  entry: CheckInDto;
  onEdit: () => void;
};

/** "Pažvelk kitaip": the traps recognised and the friend's view — the one sage (positive) card on the page. */
const ReframeSection = ({ entry, onEdit }: Props) => {
  const hasTraps = entry.thinkingTraps.length > 0;
  if (!hasTraps && !entry.balancedThought) return null;

  const trapNames = entry.thinkingTraps.map((trapId) => findTrap(trapId)?.name ?? trapId).join(", ");

  return (
    <SurfaceCard component="section" ariaLabel="Pažvelk kitaip" tone="soft">
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <SectionLabel isAccent>Pažvelk kitaip</SectionLabel>
        {entry.balancedThought && (
          <Button variant="text" onClick={onEdit} sx={{ minHeight: 36, px: 1, mr: -1, mt: -0.75, fontSize: 14, color: "primary.main" }}>
            Keisti
          </Button>
        )}
      </Box>
      {hasTraps && <Typography sx={{ mb: entry.balancedThought ? 1 : 0, fontSize: 15, color: "text.secondary" }}>Spąstai: {trapNames}</Typography>}
      {entry.balancedThought && (
        <Typography sx={{ fontFamily: SERIF_FONT, fontStyle: "italic", fontSize: 21, lineHeight: 1.45, whiteSpace: "pre-wrap" }}>
          „{entry.balancedThought}“
        </Typography>
      )}
    </SurfaceCard>
  );
};

export default ReframeSection;
