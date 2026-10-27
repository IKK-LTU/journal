import { Box, Typography } from "@mui/material";

import type { DayGroup as DayGroupData } from "@/store/features/checkins";
import { formatDayHeading } from "@/utils/date";
import { ENTRY_FORMS, pluralizeLt } from "@/utils/plural";
import EntryCard from "./EntryCard";

type Props = {
  group: DayGroupData;
};

/** One day: heading + its entries. Several entries scroll sideways instead of stacking. */
const DayGroup = ({ group }: Props) => {
  const count = group.entries.length;
  const hasSeveral = count > 1;

  return (
    <Box component="section" id={`day-${group.date}`} aria-label={formatDayHeading(group.date)} sx={{ mb: 3.5, scrollMarginTop: 16 }}>
      <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", mb: 1.25 }}>
        <Typography component="h2" sx={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em" }}>
          {formatDayHeading(group.date)}
        </Typography>
        {hasSeveral && (
          <Typography sx={{ fontSize: 15, color: "text.secondary" }}>
            {count} {pluralizeLt(count, ENTRY_FORMS)}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1.25,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          // Bleed to the screen edges so cards scroll under the gutters, but snap aligned with them.
          mx: -2,
          px: 2,
          scrollPaddingInline: "16px",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {group.entries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} width={hasSeveral ? "84%" : "100%"} />
        ))}
      </Box>
    </Box>
  );
};

export default DayGroup;
