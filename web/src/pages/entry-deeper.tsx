import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";

import type { EmotionRating } from "@/api/services/types";
import BalancedThoughtStep from "@/components/entry-flow/BalancedThoughtStep";
import ContextCard from "@/components/entry-flow/ContextCard";
import DoneScreen from "@/components/entry-flow/DoneScreen";
import FlowFooter from "@/components/entry-flow/FlowFooter";
import FlowHeader from "@/components/entry-flow/FlowHeader";
import ReRateStep from "@/components/entry-flow/ReRateStep";
import StepHeader from "@/components/entry-flow/StepHeader";
import { DEEPER_STEPS, STEP_COPY } from "@/components/entry-flow/steps";
import TextStep from "@/components/entry-flow/TextStep";
import TrapsStep from "@/components/entry-flow/TrapsStep";
import { validateBalancedThought, validateThought } from "@/components/entry-flow/validation";
import { getEntryPath, ROUTES, type DeeperRouteState } from "@/router/routes";
import { checkinsSelectors, updateCheckinItem } from "@/store/features/checkins";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

/** Same emotions as the entry; keep an earlier "after" value, else start from the original rating. */
const syncAfterRatings = (before: EmotionRating[], after: EmotionRating[]): EmotionRating[] =>
  before.map((emotion) => after.find((item) => item.name === emotion.name) ?? emotion);

const biggestDrop = (before: EmotionRating[], after: EmotionRating[]): string | undefined => {
  const drops = after
    .map((rating) => {
      const original = before.find((emotion) => emotion.name === rating.name)?.intensity ?? rating.intensity;
      return { text: `${rating.name} ${original} → ${rating.intensity}`, drop: original - rating.intensity };
    })
    .sort((a, b) => b.drop - a.drop);
  return drops[0] && drops[0].drop > 0 ? drops[0].text : undefined;
};

/**
 * "Pažvelk giliau": the CBT part of an entry — the thought, its trap, a friend's view, how it feels now.
 * Offered right after saving, or later from the entry. Starts from what's saved, so it also edits.
 */
const EntryDeeper = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const entry = useAppSelector((state) => checkinsSelectors.selectEntryById(state, id));
  const recentThoughts = useAppSelector(checkinsSelectors.selectRecentThoughts);

  const [stepIndex, setStepIndex] = useState(0);
  const [thought, setThought] = useState(entry?.autoThought ?? "");
  const [traps, setTraps] = useState<string[]>(entry?.thinkingTraps ?? []);
  const [balancedThought, setBalancedThought] = useState(entry?.balancedThought ?? "");
  const [after, setAfter] = useState<EmotionRating[]>(entry?.emotionAfter ?? []);
  // Traps and the friend's view belong to one specific thought; this is the thought they were made for.
  const [reframedThought, setReframedThought] = useState(entry?.autoThought ?? "");
  const [error, setError] = useState<string | null>(null);
  const [savedDrop, setSavedDrop] = useState<string | null | undefined>(undefined); // undefined = not saved yet

  // Each step starts at the top (the traps list is long, "Toliau" sits at its bottom).
  useEffect(() => window.scrollTo({ top: 0 }), [stepIndex, savedDrop]);

  if (!entry) return <Navigate to={ROUTES.HOME.path} replace />;

  const step = DEEPER_STEPS[stepIndex];
  const copy = STEP_COPY[step];
  const isLastStep = stepIndex === DEEPER_STEPS.length - 1;
  const hasChanges =
    thought.trim() !== entry.autoThought.trim() ||
    balancedThought.trim() !== entry.balancedThought.trim() ||
    traps.join() !== entry.thinkingTraps.join();

  // Opened from the entry page → just go back to it (no second copy in history).
  // Opened right after saving, or from a link → replace this page with the entry.
  const cameFromEntry = (location.state as DeeperRouteState | null)?.fromEntry === true;
  const toEntry = () => (cameFromEntry ? navigate(-1) : navigate(getEntryPath(entry.id), { replace: true }));

  const handleClose = () => {
    if (hasChanges && !window.confirm("Išeiti neišsaugojus pakeitimų?")) return;
    toEntry();
  };

  const save = (finalAfter: EmotionRating[]) => {
    dispatch(
      updateCheckinItem({
        id: entry.id,
        changes: { autoThought: thought.trim(), thinkingTraps: traps, balancedThought: balancedThought.trim(), emotionAfter: finalAfter },
      }),
    );
    setSavedDrop(biggestDrop(entry.emotion, finalAfter) ?? null);
  };

  const goTo = (index: number) => {
    setError(null);
    // Leaving a rewritten thought: traps / friend's view were about the old one.
    if (step === "thought" && thought.trim() !== reframedThought.trim()) {
      setTraps([]);
      setBalancedThought("");
      setReframedThought(thought);
    }
    if (DEEPER_STEPS[index] === "after") setAfter(syncAfterRatings(entry.emotion, after));
    setStepIndex(index);
  };

  const handleNext = () => {
    const validationError =
      step === "thought" ? validateThought(thought) : step === "balanced" ? validateBalancedThought(balancedThought) : null;
    if (validationError) {
      setError(validationError);
      return;
    }
    if (isLastStep) save(after);
    else goTo(stepIndex + 1);
  };

  // "Praleisti" = no answer to this question.
  const handleSkip = () => {
    if (step === "traps") setTraps([]);
    if (step === "balanced") setBalancedThought("");
    if (isLastStep) save([]);
    else goTo(stepIndex + 1);
  };

  const pageSx = { width: "100%", maxWidth: 600, minHeight: "100dvh", mx: "auto", display: "flex", flexDirection: "column" } as const;

  if (savedDrop !== undefined) {
    return (
      <Box sx={pageSx}>
        <DoneScreen
          title="Puikus darbas"
          message={
            savedDrop
              ? "Pažvelgus kitaip, jausmas sušvelnėjo. Kitą kartą ši mintis tavęs jau taip nebeužklups."
              : "Kartais jausmas nurimsta tik vėliau – ir tai visiškai normalu."
          }
          highlight={savedDrop ?? undefined}
        >
          <Button variant="contained" fullWidth onClick={toEntry}>
            Peržiūrėti įrašą
          </Button>
          <Button variant="text" fullWidth onClick={() => navigate(ROUTES.HOME.path)} sx={{ mt: 1, color: "text.secondary" }}>
            Į pradžią
          </Button>
        </DoneScreen>
      </Box>
    );
  }

  return (
    <Box sx={pageSx}>
      <FlowHeader
        stepNumber={stepIndex + 1}
        totalSteps={DEEPER_STEPS.length}
        onBack={() => goTo(stepIndex - 1)}
        onClose={handleClose}
        closeLabel="Uždaryti, pakeitimai neišsaugomi"
      />

      <Box component="main" key={step} sx={{ flex: 1, px: 2, pt: 2.5 }}>
        <StepHeader icon={copy.icon} stepNumber={stepIndex + 1} totalSteps={DEEPER_STEPS.length} title={copy.title} hint={copy.hint} />
        {/* What this question is about: the moment (often days later), or the thought being examined. */}
        {step === "thought" && <ContextCard label="Kas vyko" text={entry.situation} />}
        {(step === "traps" || step === "balanced") && <ContextCard label="Tavo mintis" text={thought} isQuote />}

        {step === "thought" && (
          <TextStep
            label="Mintis"
            placeholder="„Man niekada nepavyks…“"
            value={thought}
            onChange={(value) => {
              setError(null);
              setThought(value);
            }}
            hasError={error !== null}
            isQuote
            suggestions={recentThoughts}
            suggestionsLabel="Ši mintis jau buvo aplankiusi:"
          />
        )}
        {step === "traps" && <TrapsStep selected={traps} onChange={setTraps} onError={setError} />}
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
        {step === "after" && <ReRateStep before={entry.emotion} after={after} onChange={setAfter} />}
      </Box>

      <FlowFooter
        error={error}
        primaryLabel={isLastStep ? "Išsaugoti" : "Toliau"}
        onPrimary={handleNext}
        onSkip={copy.isRequired ? undefined : handleSkip}
      />
    </Box>
  );
};

export default EntryDeeper;
