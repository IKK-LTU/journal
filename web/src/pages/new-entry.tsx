import { useEffect, useState } from "react";
import { Box, Button, ButtonBase, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import ContextStep from "@/components/entry-flow/ContextStep";
import DoneScreen from "@/components/entry-flow/DoneScreen";
import EmotionStep from "@/components/entry-flow/EmotionStep";
import FlowFooter from "@/components/entry-flow/FlowFooter";
import FlowHeader from "@/components/entry-flow/FlowHeader";
import StepHeader from "@/components/entry-flow/StepHeader";
import FlowPage from "@/components/ui/FlowPage";
import { QUICK_STEPS, STEP_COPY } from "@/components/entry-flow/steps";
import type { EntryDraft } from "@/components/entry-flow/types";
import { useEntryDraft } from "@/components/entry-flow/useEntryDraft";
import { validateQuickStep } from "@/components/entry-flow/validation";
import { getEntryDeeperPath, ROUTES, type NewEntryRouteState } from "@/router/routes";
import { addCheckinItem, checkinsSelectors } from "@/store/features/checkins";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getTodayDateString } from "@/utils/date";
import { isDifficultEmotion } from "@/utils/insights";
import { DAY_FORMS, pluralizeLt } from "@/utils/plural";
import { countStreakDays } from "@/utils/streak";

type Saved = { id: string; isDifficult: boolean; isFirstEntry: boolean; streak: number };

/** The quick entry: what you feel + what happened (~30 s). The deeper CBT part is offered after saving. */
const NewEntry = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const requestedDate = (location.state as NewEntryRouteState | null)?.date;
  const { draft, updateDraft, wasRestored, resetDraft, discardSavedDraft } = useEntryDraft(requestedDate);

  const emotionUsage = useAppSelector(checkinsSelectors.selectEmotionUsage);
  const placeUsage = useAppSelector(checkinsSelectors.selectPlaceUsage);
  const peopleUsage = useAppSelector(checkinsSelectors.selectPeopleUsage);
  const datesWithEntries = useAppSelector(checkinsSelectors.selectDatesWithEntries);

  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState<Saved | null>(null);

  // Each step (and the saved screen) starts at the top — step 1 is long, "Toliau" sits at its bottom.
  // Block body on purpose: newer browsers make scrollTo() return a Promise, and React would
  // treat a returned value as the cleanup function and crash calling it ("a is not a function").
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [stepIndex, saved]);

  const step = QUICK_STEPS[stepIndex];
  const copy = STEP_COPY[step];
  const isLastStep = stepIndex === QUICK_STEPS.length - 1;
  const goHome = () => navigate(ROUTES.HOME.path);

  const save = () => {
    const action = addCheckinItem({
      date: draft.date,
      emotion: draft.emotions,
      place: draft.place,
      people: draft.people,
      situation: draft.situation.trim(),
      // Filled in by the optional deeper part (or carried over from a draft of the older long flow).
      autoThought: draft.carriedOver?.autoThought.trim() ?? "",
      reactions: draft.carriedOver?.reactions ?? [],
      behavior: draft.carriedOver?.behavior.trim() ?? "",
      thinkingTraps: draft.carriedOver?.thinkingTraps ?? [],
      balancedThought: draft.carriedOver?.balancedThought.trim() ?? "",
      emotionAfter: [],
    });
    dispatch(action);
    discardSavedDraft();
    setSaved({
      id: action.payload.id,
      isDifficult: draft.emotions.some((emotion) => isDifficultEmotion(emotion.name)),
      isFirstEntry: datesWithEntries.length === 0,
      streak: countStreakDays([...datesWithEntries, draft.date], getTodayDateString()),
    });
  };

  const handleNext = () => {
    const validationError = validateQuickStep(step, draft);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    if (isLastStep) save();
    else setStepIndex(stepIndex + 1);
  };

  // Typing or picking clears the error: the user is already fixing it.
  const update = (changes: Partial<EntryDraft>) => {
    setError(null);
    updateDraft(changes);
  };

  if (saved) {
    const message = saved.isDifficult
      ? "Gerai, kad tai užrašei – jau vien tai padeda."
      : saved.isFirstEntry
        ? "Gera pradžia. Verta prisiminti tokias akimirkas."
        : "Smagu – verta prisiminti tokias akimirkas.";
    const streakLine = saved.streak > 1 ? `${saved.streak} ${pluralizeLt(saved.streak, DAY_FORMS)} iš eilės` : undefined;

    return (
      <FlowPage>
        <DoneScreen title="Išsaugota" message={message} highlight={streakLine}>
          {saved.isDifficult ? (
            <>
              <Box sx={{ p: 2, mb: 2, borderRadius: "12px", bgcolor: "background.paper", textAlign: "left" }}>
                <Typography sx={{ fontSize: 17, fontWeight: 600 }}>Pažvelk giliau · ~2 min.</Typography>
                <Typography sx={{ mt: 0.5, fontSize: 15, color: "text.secondary" }}>
                  Užrašyk mintį, atpažink spąstus ir pažiūrėk į ją draugo akimis. Dažnai po to tampa lengviau.
                </Typography>
              </Box>
              <Button variant="contained" fullWidth onClick={() => navigate(getEntryDeeperPath(saved.id), { replace: true })}>
                Pažvelk giliau
              </Button>
              <Button variant="text" fullWidth onClick={goHome} sx={{ mt: 1, color: "text.secondary" }}>
                Gal vėliau
              </Button>
              <Typography sx={{ mt: 0.5, fontSize: 14, color: "text.secondary" }}>Galėsi grįžti iš įrašo bet kada.</Typography>
            </>
          ) : (
            <Button variant="contained" fullWidth onClick={goHome}>
              Į pradžią
            </Button>
          )}
        </DoneScreen>
      </FlowPage>
    );
  }

  return (
    <FlowPage>
      <FlowHeader stepNumber={stepIndex + 1} totalSteps={QUICK_STEPS.length} onBack={() => {
          setError(null);
          setStepIndex(stepIndex - 1);
        }} onClose={goHome} />

      <Box component="main" key={step} sx={{ flex: 1, px: 2, pt: 2.5 }}>
        {wasRestored && step === "emotions" && (
          <Typography sx={{ mb: 2, fontSize: 15, color: "text.secondary" }}>
            Tęsi juodraštį ·{" "}
            <ButtonBase
              onClick={resetDraft}
              sx={{ fontFamily: "inherit", fontSize: "inherit", fontWeight: 500, color: "text.primary", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              pradėti iš naujo
            </ButtonBase>
          </Typography>
        )}

        <StepHeader icon={copy.icon} stepNumber={stepIndex + 1} totalSteps={QUICK_STEPS.length} title={copy.title} hint={copy.hint} />

        {step === "emotions" && (
          <EmotionStep emotions={draft.emotions} emotionUsage={emotionUsage} onChange={(emotions) => update({ emotions })} onError={setError} />
        )}
        {step === "context" && (
          <ContextStep draft={draft} placeUsage={placeUsage} peopleUsage={peopleUsage} onChange={update} hasError={error !== null} />
        )}
      </Box>

      <FlowFooter error={error} primaryLabel={isLastStep ? "Išsaugoti" : "Toliau"} onPrimary={handleNext} />
    </FlowPage>
  );
};

export default NewEntry;
