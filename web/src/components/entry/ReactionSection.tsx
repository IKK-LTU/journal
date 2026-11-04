import { Typography } from "@mui/material";

import type { CheckInDto } from "@/api/services/types";
import SectionLabel from "@/components/ui/SectionLabel";
import SurfaceCard from "@/components/ui/SurfaceCard";

/** "Kaip sureagavai" — only entries made with the older long flow have this. */
const ReactionSection = ({ entry }: { entry: CheckInDto }) => {
  const hasReactions = entry.reactions.length > 0;
  if (!hasReactions && !entry.behavior) return null;

  return (
    <SurfaceCard component="section" ariaLabel="Kaip sureagavai">
      <SectionLabel>Kaip sureagavai</SectionLabel>
      {hasReactions && <Typography sx={{ fontSize: 18, fontWeight: 500 }}>{entry.reactions.join(", ")}</Typography>}
      {entry.behavior && <Typography sx={{ mt: hasReactions ? 0.75 : 0, fontSize: 18, whiteSpace: "pre-wrap" }}>{entry.behavior}</Typography>}
    </SurfaceCard>
  );
};

export default ReactionSection;
