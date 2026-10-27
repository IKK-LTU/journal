import { useEffect, useState } from "react";
import { Fab, Typography } from "@mui/material";
import { Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import DayGroup from "@/components/home/DayGroup";
import HomeHeader from "@/components/home/HomeHeader";
import WeekStrip from "@/components/home/WeekStrip";
import PageShell from "@/components/ui/PageShell";
import Toast from "@/components/ui/Toast";
import { ROUTES, type HomeRouteState } from "@/router/routes";
import { checkinsSelectors } from "@/store/features/checkins";
import { useAppSelector } from "@/store/hooks";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const groups = useAppSelector(checkinsSelectors.selectEntriesGroupedByDay);
  // Read the clock once per visit (lazy init), not on every render.
  const [now] = useState(() => new Date());

  // A confirmation passed from the entry flow / delete ("Išsaugota…").
  const incomingToast = (location.state as HomeRouteState | null)?.toast ?? null;
  const [toast, setToast] = useState<string | null>(incomingToast);

  useEffect(() => {
    if (incomingToast) {
      // Clear router state so a page refresh doesn't show the toast again.
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [incomingToast, location.pathname, navigate]);

  return (
    <PageShell bottomSpace={14}>
      <HomeHeader now={now} />
      <WeekStrip now={now} />

      {groups.length === 0 ? (
        <Typography sx={{ maxWidth: 300, fontSize: 17, color: "text.secondary" }}>
          Dar nieko neparašei. Kai kas nors užeis, paspausk{" "}
          <Typography component="span" sx={{ color: "text.primary", fontWeight: 500 }}>
            +
          </Typography>{" "}
          apačioje.
        </Typography>
      ) : (
        groups.map((group) => <DayGroup key={group.date} group={group} />)
      )}

      <Fab
        color="primary"
        aria-label="Naujas įrašas"
        onClick={() => navigate(ROUTES.NEW_ENTRY.path)}
        sx={{
          position: "fixed",
          // Stick to the 600px column's right edge on wide screens, 16px from the edge on phones.
          right: "max(16px, calc((100vw - 600px) / 2 + 16px))",
          bottom: 24,
          width: 60,
          height: 60,
          boxShadow: "none",
        }}
      >
        <Plus size={28} strokeWidth={2} aria-hidden />
      </Fab>

      <Toast message={toast} onClose={() => setToast(null)} />
    </PageShell>
  );
};

export default Home;
