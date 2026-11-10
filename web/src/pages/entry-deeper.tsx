import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";

import type { CheckInDto } from "@/api/services/types";
import BalancedThoughtStep from "@/components/entry-flow/BalancedThoughtStep";
import ContextCard from "@/components/entry-flow/ContextCard";
import DoneScreen from "@/components/entry-flow/DoneScreen";
import FlowFooter from "@/components/entry-flow/FlowFooter";
import FlowHeader from "@/components/entry-flow/FlowHeader";
import ReRateStep from "@/components/entry-flow/ReRateStep";
import StepHeader from "@/components/entry-flow/StepHeader";
import TextStep from "@/components/entry-flow/TextStep";
import TrapsStep from "@/components/entry-flow/TrapsStep";
import { useDeeperFlow } from "@/components/entry-flow/useDeeperFlow";
import FlowPage from "@/components/ui/FlowPage";
import { getEntryPath, ROUTES, type DeeperRouteState } from "@/router/routes";
import { checkinsSelectors } from "@/store/features/checkins";
import { useAppSelector } from "@/store/hooks";
import { formatIntensityChange } from "@/utils/ratings";

/** "Pažvelk giliau" for one entry (/entry/:id/deeper). Unknown entry → home. */
const EntryDeeperPage = () => {
  const { id = "" } = useParams();
  const entry = useAppSelector((state) => checkinsSelectors.selectEntryById(state, id));

  if (!entry) return <Navigate to={ROUTES.HOME.path} replace />;
  // key: a new entry gets a fresh flow, otherwise the previous entry's answers stay in state.
  return <DeeperFlow key={entry.id} entry={entry} />;
};

/**
 * The CBT part of an entry: the thought, its trap, a friend's view, how it feels now.
 * Offered right after saving, or later from the entry. All rules live in useDeeperFlow; this renders.
 */
const DeeperFlow = ({ entry }: { entry: CheckInDto }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const recentThoughts = useAppSelector(checkinsSelectors.selectRecentThoughts);
  const flow = useDeeperFlow(entry);
  const { step, answers } = flow;

  // Each step starts at the top (the traps list is long, "Toliau" sits at its bottom).
  // Block body on purpose: newer browsers return a Promise from scrollTo(), which React
  // would otherwise treat as the effect's cleanup function and crash calling it.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [step, flow.result]);

  // Opened from the entry page → go back to it (no second copy in history).
  // Opened right after saving, or from a link → replace this page with the entry.
  const cameFromEntry = (location.state as DeeperRouteState | null)?.fromEntry === true;
  const goToEntry = () => (cameFromEntry ? navigate(-1) : navigate(getEntryPath(entry.id), { replace: true }));

  const close = () => {
    if (flow.hasUnsavedChanges && !window.confirm("Išeiti neišsaugojus pakeitimų?")) return;
    goToEntry();
  };

  if (flow.result !== undefined) {
    return (
      <FlowPage>
        <DoneScreen
          title="Puikus darbas"
          message={
            flow.result
              ? "Pažvelgus kitaip, jausmas sušvelnėjo. Kitą kartą ši mintis tavęs jau taip nebeužklups."
              : "Kartais jausmas nurimsta tik vėliau – ir tai visiškai normalu."
          }
          highlight={flow.result ? formatIntensityChange(flow.result) : undefined}
        >
          <Button variant="contained" fullWidth onClick={goToEntry}>
            Peržiūrėti įrašą
          </Button>
          <Button variant="text" fullWidth onClick={() => navigate(ROUTES.HOME.path)} sx={{ mt: 1, color: "text.secondary" }}>
            Į pradžią
          </Button>
        </DoneScreen>
      </FlowPage>
    );
  }

  const hasError = flow.error !== null;

  return (
    <FlowPage>
      <FlowHeader
        stepNumber={flow.stepNumber}
        totalSteps={flow.totalSteps}
        onBack={flow.goBack}
        onClose={close}
        closeLabel="Uždaryti, pakeitimai neišsaugomi"
      />

      <Box component="main" key={step} sx={{ flex: 1, px: 2, pt: 2.5 }}>
        <StepHeader icon={flow.copy.icon} stepNumber={flow.stepNumber} totalSteps={flow.totalSteps} title={flow.copy.title} hint={flow.copy.hint} />

        {/* What this question is about: the moment (often days later), or the thought being examined. */}
        {step === "thought" && <ContextCard label="Kas vyko" text={entry.situation} />}
        {(step === "traps" || step === "balanced") && <ContextCard label="Tavo mintis" text={answers.thought} isQuote />}

        {step === "thought" && (
          <TextStep
            label="Mintis"
            placeholder="„Man niekada nepavyks…“"
            value={answers.thought}
            onChange={flow.setThought}
            hasError={hasError}
            isQuote
            // This entry's own earlier wording isn't a "recurring" thought.
            suggestions={recentThoughts.filter((recentThought) => recentThought !== entry.autoThought.trim())}
            suggestionsLabel="Ši mintis jau buvo aplankiusi:"
          />
        )}
        {step === "traps" && <TrapsStep selected={answers.thinkingTraps} onChange={flow.setThinkingTraps} onError={flow.setError} />}
        {step === "balanced" && <BalancedThoughtStep value={answers.balancedThought} onChange={flow.setBalancedThought} hasError={hasError} />}
        {step === "after" && <ReRateStep before={entry.emotion} after={answers.afterRatings} onChange={flow.setAfterRatings} />}
      </Box>

      <FlowFooter
        error={flow.error}
        primaryLabel={flow.isLastStep ? "Išsaugoti" : "Toliau"}
        onPrimary={flow.goNext}
        onSkip={flow.copy.isRequired ? undefined : flow.skip}
      />
    </FlowPage>
  );
};

export default EntryDeeperPage;
