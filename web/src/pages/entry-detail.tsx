import { useState, type ReactNode } from "react";
import { Box, Button, Dialog, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import BackButton from "@/components/ui/BackButton";
import PageShell from "@/components/ui/PageShell";
import { ROUTES, type HomeRouteState } from "@/router/routes";
import { checkinsSelectors, removeCheckinItem } from "@/store/features/checkins";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { formatDayHeading, formatTime } from "@/utils/date";
import { SERIF_FONT } from "../../theme";

const Section = ({ label, children }: { label: string; children: ReactNode }) => (
  <Box component="section" sx={{ p: 2, borderRadius: "12px", bgcolor: "background.paper" }}>
    <Typography component="h2" sx={{ mb: 0.75, fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "text.secondary" }}>
      {label}
    </Typography>
    {children}
  </Box>
);

const EntryDetail = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const entry = useAppSelector((state) => checkinsSelectors.selectEntryById(state, id));
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const goHome = () => navigate(ROUTES.HOME.path);

  const deleteEntry = () => {
    dispatch(removeCheckinItem(id));
    const state: HomeRouteState = { toast: "Įrašas ištrintas" };
    navigate(ROUTES.HOME.path, { state, replace: true });
  };

  if (!entry) {
    return (
      <PageShell>
        <BackButton onClick={goHome} />
        <Typography variant="display" sx={{ mt: 3, fontSize: 30 }}>
          Įrašas nerastas
        </Typography>
        <Typography sx={{ mt: 1, color: "text.secondary" }}>Galbūt jis buvo ištrintas.</Typography>
        <Button variant="contained" onClick={goHome} sx={{ mt: 4, alignSelf: "flex-start" }}>
          Į pradžią
        </Button>
      </PageShell>
    );
  }

  const time = formatTime(entry.createdAt);

  return (
    <PageShell>
      <BackButton onClick={goHome} />

      <Box component="article" sx={{ mt: 1.5, display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography sx={{ mb: 0.5, fontSize: 15, color: "text.secondary" }}>
          {[formatDayHeading(entry.date) + (time ? `, ${time}` : ""), entry.place, entry.people.length > 0 && `Šalia: ${entry.people.join(", ")}`]
            .filter(Boolean)
            .join(" · ")}
        </Typography>

        <Box sx={{ p: 2, borderRadius: "12px", bgcolor: "background.paper", display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography component="h1" sx={{ display: "flex", flexWrap: "wrap", columnGap: 2, fontSize: 20 }}>
            {entry.emotion.map((emotion) => (
              <span key={emotion.name}>
                <Box component="span" sx={{ fontWeight: 500 }}>
                  {emotion.name}
                </Box>{" "}
                <Box component="span" sx={{ color: "text.secondary" }}>
                  {emotion.intensity}
                </Box>
              </span>
            ))}
          </Typography>
          <Typography sx={{ fontFamily: SERIF_FONT, fontSize: 23, lineHeight: 1.45, whiteSpace: "pre-wrap" }}>{entry.situation}</Typography>
        </Box>

        {entry.autoThought && (
          <Section label="Mintis">
            <Typography sx={{ fontFamily: SERIF_FONT, fontStyle: "italic", fontSize: 21, lineHeight: 1.45, whiteSpace: "pre-wrap" }}>
              „{entry.autoThought}“
            </Typography>
          </Section>
        )}

        {(entry.reactions.length > 0 || entry.behavior) && (
          <Section label="Kaip sureagavai">
            {entry.reactions.length > 0 && <Typography sx={{ fontSize: 18, fontWeight: 500 }}>{entry.reactions.join(", ")}</Typography>}
            {entry.behavior && <Typography sx={{ mt: entry.reactions.length > 0 ? 0.75 : 0, fontSize: 18, whiteSpace: "pre-wrap" }}>{entry.behavior}</Typography>}
          </Section>
        )}

        {entry.emotionAfter.length > 0 && (
          <Section label="Po įrašo">
            {entry.emotionAfter.map((after) => {
              const before = entry.emotion.find((emotion) => emotion.name === after.name)?.intensity;
              const dropped = before !== undefined && after.intensity < before;
              return (
                <Typography key={after.name} sx={{ fontSize: 18 }}>
                  <Box component="span" sx={{ fontWeight: 500 }}>
                    {after.name}
                  </Box>{" "}
                  <Box component="span" sx={{ color: dropped ? "primary.main" : "text.secondary", fontWeight: dropped ? 600 : 400 }}>
                    {before !== undefined ? `${before} → ${after.intensity}` : after.intensity}
                  </Box>
                </Typography>
              );
            })}
          </Section>
        )}

        <Button variant="text" onClick={() => setIsConfirmOpen(true)} sx={{ mt: 1.5, alignSelf: "flex-start", px: 0, minHeight: 44, color: "text.secondary", fontSize: 15 }}>
          Ištrinti įrašą
        </Button>
      </Box>

      <Dialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        aria-labelledby="delete-title"
        fullWidth
        slotProps={{ paper: { sx: { m: 2, p: 3, borderRadius: "16px", bgcolor: "background.default" } } }}
      >
        <Typography id="delete-title" variant="display" component="h2" sx={{ fontSize: 26, mb: 3.5 }}>
          Ištrinti šį įrašą visam laikui?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button variant="text" onClick={() => setIsConfirmOpen(false)} sx={{ color: "text.secondary", px: 1, ml: -1 }}>
            Atšaukti
          </Button>
          <Button variant="contained" color="error" onClick={deleteEntry}>
            Ištrinti
          </Button>
        </Box>
      </Dialog>
    </PageShell>
  );
};

export default EntryDetail;
