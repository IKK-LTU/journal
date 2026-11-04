import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import AfterRatingsSection from "@/components/entry/AfterRatingsSection";
import DeleteEntryDialog from "@/components/entry/DeleteEntryDialog";
import EntryStoryCard from "@/components/entry/EntryStoryCard";
import GoDeeperCard from "@/components/entry/GoDeeperCard";
import QuoteSection from "@/components/entry/QuoteSection";
import ReactionSection from "@/components/entry/ReactionSection";
import ReframeSection from "@/components/entry/ReframeSection";
import BackButton from "@/components/ui/BackButton";
import PageShell from "@/components/ui/PageShell";
import { getEntryDeeperPath, ROUTES, type DeeperRouteState, type HomeRouteState } from "@/router/routes";
import { checkinsSelectors, removeCheckinItem } from "@/store/features/checkins";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { canGoDeeper, describeEntryContext } from "@/utils/entry";

/** One entry, read in the order it was written: feelings & what happened → thought → reframe → after. */
const EntryDetailPage = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const entry = useAppSelector((state) => checkinsSelectors.selectEntryById(state, id));
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const goHome = () => navigate(ROUTES.HOME.path);

  if (!entry) return <EntryNotFound onGoHome={goHome} />;

  const openDeeper = () => {
    const state: DeeperRouteState = { fromEntry: true };
    navigate(getEntryDeeperPath(entry.id), { state });
  };

  const deleteEntry = () => {
    dispatch(removeCheckinItem(entry.id));
    const state: HomeRouteState = { toast: "Įrašas ištrintas" };
    navigate(ROUTES.HOME.path, { state, replace: true });
  };

  return (
    <PageShell>
      <BackButton onClick={goHome} />

      <Box component="article" sx={{ mt: 1.5, display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography sx={{ mb: 0.5, fontSize: 15, color: "text.secondary" }}>{describeEntryContext(entry)}</Typography>
        <EntryStoryCard entry={entry} />
        {entry.autoThought && <QuoteSection label="Mintis" quote={entry.autoThought} />}
        <ReactionSection entry={entry} />
        <ReframeSection entry={entry} onEdit={openDeeper} />
        {canGoDeeper(entry) && <GoDeeperCard hasThought={entry.autoThought !== ""} onOpen={openDeeper} />}
        <AfterRatingsSection entry={entry} />

        <Button
          variant="text"
          onClick={() => setIsDeleteDialogOpen(true)}
          sx={{ mt: 1.5, alignSelf: "flex-start", px: 0, minHeight: 44, color: "text.secondary", fontSize: 15 }}
        >
          Ištrinti įrašą
        </Button>
      </Box>

      <DeleteEntryDialog isOpen={isDeleteDialogOpen} onCancel={() => setIsDeleteDialogOpen(false)} onConfirm={deleteEntry} />
    </PageShell>
  );
};

const EntryNotFound = ({ onGoHome }: { onGoHome: () => void }) => (
  <PageShell>
    <BackButton onClick={onGoHome} />
    <Typography variant="display" sx={{ mt: 3, fontSize: 30 }}>
      Įrašas nerastas
    </Typography>
    <Typography sx={{ mt: 1, color: "text.secondary" }}>Galbūt jis buvo ištrintas.</Typography>
    <Button variant="contained" onClick={onGoHome} sx={{ mt: 4, alignSelf: "flex-start" }}>
      Į pradžią
    </Button>
  </PageShell>
);

export default EntryDetailPage;
