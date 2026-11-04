import { useState } from "react";
import { Box } from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import BalancedThoughtStep from "@/components/entry-flow/BalancedThoughtStep";
import FlowFooter from "@/components/entry-flow/FlowFooter";
import FlowHeader from "@/components/entry-flow/FlowHeader";
import StepTitle from "@/components/entry-flow/StepTitle";
import { STEP_COPY } from "@/components/entry-flow/steps";
import ThoughtReminder from "@/components/entry-flow/ThoughtReminder";
import TrapsStep from "@/components/entry-flow/TrapsStep";
import { TEXT_MAX_LENGTH } from "@/components/entry-flow/validation";
import { getEntryPath, ROUTES, type ToastRouteState } from "@/router/routes";
import { checkinsSelectors, updateCheckinItem } from "@/store/features/checkins";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const STEPS = ["traps", "balanced"] as const;

/**
 * "Pažvelk kitaip" later, from a saved entry. Same two steps as in the flow, but no re-rating:
 * how the user felt back then stays as it was recorded.
 */
const EntryReframe = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const entry = useAppSelector((state) => checkinsSelectors.selectEntryById(state, id));

  const [stepIndex, setStepIndex] = useState(0);
  const [thinkingTraps, setThinkingTraps] = useState<string[]>(entry?.thinkingTraps ?? []);
  const [balancedThought, setBalancedThought] = useState(entry?.balancedThought ?? "");
  const [error, setError] = useState<string | null>(null);

  // Nothing to reframe without the entry or its thought.
  if (!entry || !entry.autoThought.trim()) return <Navigate to={ROUTES.HOME.path} replace />;

  const step = STEPS[stepIndex];
  const copy = STEP_COPY[step];
  const isLastStep = stepIndex === STEPS.length - 1;
  const backToEntry = (state?: ToastRouteState) => navigate(getEntryPath(entry.id), { state, replace: true });

  const save = (finalBalancedThought: string) => {
    dispatch(updateCheckinItem({ id: entry.id, changes: { thinkingTraps, balancedThought: finalBalancedThought.trim() } }));
    backToEntry({ toast: "Išsaugota" });
  };

  const handleNext = () => {
    if (!isLastStep) {
      setError(null);
      setStepIndex(stepIndex + 1);
      return;
    }
    if (balancedThought.trim().length > TEXT_MAX_LENGTH) {
      setError(`Per ilga, iki ${TEXT_MAX_LENGTH} simbolių`);
      return;
    }
    save(balancedThought);
  };

  const handleSkip = () => {
    setError(null);
    if (step === "traps") {
      setThinkingTraps([]);
      setStepIndex(stepIndex + 1);
    } else {
      save("");
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, minHeight: "100dvh", mx: "auto", display: "flex", flexDirection: "column" }}>
      <FlowHeader stepNumber={stepIndex + 1} totalSteps={STEPS.length} onBack={() => setStepIndex(stepIndex - 1)} onClose={() => backToEntry()} />

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
