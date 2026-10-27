import { Box, ButtonBase, Typography } from "@mui/material";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ShareBars from "@/components/insights/ShareBars";
import { ROUTES } from "@/router/routes";
import { checkinsSelectors } from "@/store/features/checkins";
import { useAppSelector } from "@/store/hooks";
import { coreFeelingShares, describeTopPattern, filterByPeriod } from "@/utils/insights";

const ENTRIES_NEEDED = 3;

/** "Tavo savaitė": dominant feelings of the last 7 days + one pattern. A teaser until there's enough data. */
const WeekInsightCard = () => {
  const navigate = useNavigate();
  const allEntries = useAppSelector(checkinsSelectors.selectCheckinsList);
  const weekEntries = filterByPeriod(allEntries, 7);

  // Brand new users see the feed's empty state instead; no stats card yet.
  if (allEntries.length === 0) return null;

  const hasEnoughData = weekEntries.length >= ENTRIES_NEEDED;
  const pattern = hasEnoughData ? describeTopPattern(weekEntries) : null;

  return (
    <ButtonBase
      onClick={() => navigate(ROUTES.INSIGHTS.path)}
      sx={{ display: "block", width: "100%", mb: 4, p: 2, borderRadius: "12px", bgcolor: "background.paper", textAlign: "left", fontFamily: "inherit" }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: hasEnoughData ? 2 : 0.5 }}>
        <Typography component="h2" sx={{ fontSize: 17, fontWeight: 600 }}>
          Tavo savaitė
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", fontSize: 14, color: "text.secondary" }}>
          Įžvalgos <ChevronRight size={16} aria-hidden />
        </Box>
      </Box>

      {hasEnoughData ? (
        <>
          <ShareBars shares={coreFeelingShares(weekEntries).slice(0, 3)} withIcons />
          {pattern && <Typography sx={{ mt: 2, fontSize: 15, color: "text.secondary" }}>{pattern}</Typography>}
        </>
      ) : (
        <Typography sx={{ fontSize: 15, color: "text.secondary" }}>
          Po {ENTRIES_NEEDED} įrašų per savaitę čia pamatysi, kokie jausmai vyrauja · {weekEntries.length} iš {ENTRIES_NEEDED}
        </Typography>
      )}
    </ButtonBase>
  );
};

export default WeekInsightCard;
