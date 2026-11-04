import { useState } from "react";
import { Box } from "@mui/material";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";

import BalancedThoughtStep from "@/components/entry-flow/BalancedThoughtStep";
import FlowFooter from "@/components/entry-flow/FlowFooter";
import FlowHeader from "@/components/entry-flow/FlowHeader";
import StepTitle from "@/components/entry-flow/StepTitle";
import { REFRAME_STEPS, STEP_COPY } from "@/components/entry-flow/steps";
import ThoughtReminder from "@/components/entry-flow/ThoughtReminder";
import TrapsStep from "@/components/entry-flow/TrapsStep";
import { validateBalancedThought } from "@/components/entry-flow/validation";
import { getEntryPath, ROUTES } from "@/router/routes";
import { checkinsSelectors, updateCheckinItem } from "@/store/features/checkins";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const sameItems = (a: string[], b: string[]) => a.length === b.length && a.every((item) => b.includes(item));

/**
 * "Pažvelk kitaip" later, from a saved entry: the same reframe steps as in the flow, no re-rating
 * (how the user felt back then stays as recorded). Starts from what's already saved, so it also edits.
 */
const EntryReframe = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const entry = useAppSelector((state) => checkinsSelectors.selectEntryById(state, id));

  const [stepIndex, setStepIndex] = useState(0);
  const [thinkingTraps, setThinkingTraps] = useState<string[]>(entry?.thinkingTraps ?? []);
  const [balancedThought, setBalancedThought] = useState(entry?.balancedThought ?? "");
  const [error, setError] = useState<string | null>(null);

  // Nothing to reframe without the entry or its thought.
  if (!entry || !entry.autoThought.trim()) return <Navigate to={ROUTES.HOME.path} replace />;

  const step = REFRAME_STEPS[stepIndex];
  const copy = STEP_COPY[step];
  const isLastStep = stepIndex === REFRAME_STEPS.length - 1;
  const hasChanges = !sameItems(thinkingTraps, entry.thinkingTraps) || balancedThought.trim() !== entry.balancedThought.trim();

  // Normally we came from the entry page: go back to it instead of stacking a second copy in history.
  // Opened from a direct link (no history), replace this page with the entry.
  const leave = () => {
    if (location.key !== "default") navigate(-1);
    else navigate(getEntryPath(entry.id), { replace: true });
  };

  const saveAndLeave = (traps: string[], thought: string) => {
    const changed = !sameItems(traps, entry.thinkingTraps) || thought.trim() !== entry.balancedThought.trim();
    if (changed) dispatch(updateCheckinItem({ id: entry.id, changes: { thinkingTraps: traps, balancedThought: thought.trim() } }));
    leave();
  };

  const handleClose = () => {
    if (hasChanges && !window.confirm("Išeiti neišsaugojus pakeitimų?")) return;
    leave();
  };

  const handleNext = () => {
    if (!isLastStep) {
      setError(null);
      setStepIndex(stepIndex + 1);
      return;
    }
    const validationError = validateBalancedThought(balancedThought);
    if (validationError) {
      setError(validationError);
      return;
    }
    saveAndLeave(thinkingTraps, balancedThought);
  };

  // "Praleisti" = no answer to this question (same meaning as in the entry flow).
  const handleSkip = () => {
    setError(null);
    if (step === "traps") {
      setThinkingTraps([]);
      setStepIndex(stepIndex + 1);
    } else {
      saveAndLeave(thinkingTraps, "");
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, minHeight: "100dvh", mx: "auto", display: "flex", flexDirection: "column" }}>
      <FlowHeader
        stepNumber={stepIndex + 1}
        totalSteps={REFRAME_STEPS.length}
        onBack={() => setStepIndex(stepIndex - 1)}
        onClose={handleClose}
        closeLabel="Uždaryti, pakeitimai neišsaugomi"
      />

      <Box component="main" key={step} sx={{ flex: 1, px: 2, pt: 2.5 }}>
        <ThoughtReminder thought={entry.autoThought} />
        <StepTitle title={copy.title} hint={copy.hint} />

        {step === "traps" && <TrapsStep selected={thinkingTraps} onChange={setThinkingTraps} onError={setError} />}
        {step === "balanced" && (
          <BalancedThoughtStep
            value={balancedThought}
            onChange={(value) => {
              setError(null);
              setBalancedThought(value);
            }}
            hasError={error !== null}
          />
        )}
      </Box>

      <FlowFooter error={error} primaryLabel={isLastStep ? "Išsaugoti" : "Toliau"} onPrimary={handleNext} onSkip={handleSkip} />
    </Box>
  );
};

export default EntryReframe;
