import { useState, type ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import BalanceBar from "@/components/insights/BalanceBar";
import PatternList from "@/components/insights/PatternList";
import PeriodToggle, { type Period } from "@/components/insights/PeriodToggle";
import ShareBars from "@/components/insights/ShareBars";
import TrendLine from "@/components/insights/TrendLine";
import BackButton from "@/components/ui/BackButton";
import PageShell from "@/components/ui/PageShell";
import { ROUTES } from "@/router/routes";
import { checkinsSelectors } from "@/store/features/checkins";
import { useAppSelector } from "@/store/hooks";
import {
  averageIntensityDrop,
  coreFeelingShares,
  dailyAverageIntensity,
  difficultVsPleasant,
  filterByPeriod,
  peoplePatterns,
  placePatterns,
  topFeelings,
} from "@/utils/insights";
import { ENTRY_FORMS, pluralizeLt } from "@/utils/plural";

/** "Visi" still draws the trend over a readable window. */
const ALL_TIME_TREND_DAYS = 30;

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <Box component="section" sx={{ p: 2, borderRadius: "12px", bgcolor: "background.paper" }}>
    <Typography component="h2" sx={{ mb: 1.75, fontSize: 17, fontWeight: 600 }}>
      {title}
    </Typography>
    {children}
  </Box>
);

const Insights = () => {
  const navigate = useNavigate();
  const allEntries = useAppSelector(checkinsSelectors.selectCheckinsList);
  const [period, setPeriod] = useState<Period>(7);

  const entries = filterByPeriod(allEntries, period);
  const balance = difficultVsPleasant(entries);
  const coreShares = coreFeelingShares(entries);
  const feelings = topFeelings(entries);
  const patterns = [...placePatterns(entries), ...peoplePatterns(entries)];
  const drop = averageIntensityDrop(entries);
  const trend = dailyAverageIntensity(entries, period ?? ALL_TIME_TREND_DAYS);
  const daysWithEntries = trend.filter((point) => point.average !== null).length;

  return (
    <PageShell>
      <BackButton onClick={() => navigate(ROUTES.HOME.path)} />
      <Typography variant="display" sx={{ mt: 1.5, mb: 0.5, fontSize: 34 }}>
        Įžvalgos
      </Typography>
      <Typography sx={{ mb: 3, fontSize: 15, color: "text.secondary" }}>
        {entries.length} {pluralizeLt(entries.length, ENTRY_FORMS)} per šį laikotarpį
      </Typography>

      <PeriodToggle value={period} onChange={setPeriod} />

      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        {entries.length === 0 && (
          <Typography sx={{ mt: 2, color: "text.secondary" }}>Šiuo laikotarpiu įrašų dar nėra.</Typography>
        )}

        {drop && (
          <Section title="Po įrašo">
            <Typography sx={{ fontSize: 17 }}>
              Užrašius jausmai vidutiniškai{" "}
              <Box component="span" sx={{ color: "primary.main", fontWeight: 600 }}>
                {drop.average > 0 ? `sumažėja ${drop.average.toFixed(1)} balo` : "nepasikeičia"}
              </Box>
              .
            </Typography>
            <Typography sx={{ mt: 0.5, fontSize: 14, color: "text.secondary" }}>
              Pagal {drop.entryCount} {pluralizeLt(drop.entryCount, ENTRY_FORMS)}, kuriuose įvertinai jausmus dar kartą.
            </Typography>
          </Section>
        )}

        {balance && (
          <Section title="Sunkūs ir malonūs jausmai">
            <BalanceBar difficultPercent={balance.difficultPercent} pleasantPercent={balance.pleasantPercent} />
          </Section>
        )}

        {coreShares.length > 0 && (
          <Section title="Vyraujantys jausmai">
            <ShareBars shares={coreShares} withIcons />
          </Section>
        )}

        {feelings.length > 0 && (
          <Section title="Dažniausiai įvardyti">
            <ShareBars shares={feelings} />
          </Section>
        )}

        {daysWithEntries >= 2 && (
          <Section title="Intensyvumas">
            <TrendLine points={trend} />
          </Section>
        )}

        {patterns.length > 0 && (
          <Section title="Kur ir su kuo">
            <PatternList patterns={patterns} />
          </Section>
        )}

        {entries.length > 0 && patterns.length === 0 && (
          <Typography sx={{ mt: 1, fontSize: 14, color: "text.secondary" }}>
            Pažymėk vietą ir kas buvo šalia – po kelių įrašų čia pamatysi, kur kokie jausmai kyla dažniausiai.
          </Typography>
        )}
      </Box>
    </PageShell>
  );
};

export default Insights;
