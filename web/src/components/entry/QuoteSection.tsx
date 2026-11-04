import { Typography } from "@mui/material";

import SectionLabel from "@/components/ui/SectionLabel";
import SurfaceCard from "@/components/ui/SurfaceCard";
import { SERIF_FONT } from "../../../theme";

type Props = {
  label: string;
  quote: string;
};

/** A labelled card with the user's own words as a serif quote (e.g. the automatic thought). */
const QuoteSection = ({ label, quote }: Props) => {
  return (
    <SurfaceCard component="section" ariaLabel={label}>
      <SectionLabel>{label}</SectionLabel>
      <Typography sx={{ fontFamily: SERIF_FONT, fontStyle: "italic", fontSize: 21, lineHeight: 1.45, whiteSpace: "pre-wrap" }}>„{quote}“</Typography>
    </SurfaceCard>
  );
};

export default QuoteSection;
