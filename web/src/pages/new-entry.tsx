import { useEffect, useRef, useState } from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import ChoiceStep from "@/components/entry-flow/ChoiceStep";
import DateButton from "@/components/entry-flow/DateButton";
import EmotionReminder from "@/components/entry-flow/EmotionReminder";
import EmotionStep from "@/components/entry-flow/EmotionStep";
import FlowFooter from "@/components/entry-flow/FlowFooter";
import FlowHeader from "@/components/entry-flow/FlowHeader";
import ReRateStep from "@/components/entry-flow/ReRateStep";
import StepTitle from "@/components/entry-flow/StepTitle";
import BalancedThoughtStep from "@/components/entry-flow/BalancedThoughtStep";
import { getVisibleSteps, isReframeStep, STEP_COPY, type StepId } from "@/components/entry-flow/steps";
import TextArea from "@/components/entry-flow/TextArea";
import TextStep from "@/components/entry-flow/TextStep";
import ThoughtReminder from "@/components/entry-flow/ThoughtReminder";
import TrapsStep from "@/components/entry-flow/TrapsStep";
import type { EmotionRating, EntryDraft } from "@/components/entry-flow/types";
import { useEntryDraft } from "@/components/entry-flow/useEntryDraft";
import { validateStep } from "@/components/entry-flow/validation";
import { DEFAULT_PEOPLE, DEFAULT_PLACES, DEFAULT_REACTIONS, NOBODY, orderByUsage } from "@/constants/entry-options";
import { ROUTES, type HomeRouteState, type NewEntryRouteState } from "@/router/routes";
import { addCheckinItem, checkinsSelectors } from "@/store/features/checkins";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getTodayDateString } from "@/utils/date";
import { DAY_FORMS, pluralizeLt } from "@/utils/plural";
import { countStreakDays } from "@/utils/streak";

const AUTO_ADVANCE_DELAY_MS = 300;

/** "Praleisti" = no answer to this question, even if something was picked before going back. */
const SKIPPED_ANSWER: Partial<Record<StepId, Partial<EntryDraft>>> = {
  place: { place: "" },
  people: { people: [] },
  thought: { autoThought: "" },
  reaction: { reactions: [], behavior: "" },
  traps: { thinkingTraps: [] },
  balanced: { balancedThought: "" },
  after: { emotionAfter: [] },
};

/** Toast after saving: celebrate a drop in intensity first, then a streak, then a first entry. */
const getSavedMessage = (draft: EntryDraft, datesWithEntries: string[]): string => {
  const biggestDrop = draft.emotionAfter
    .map((after) => {
      const before = draft.emotions.find((emotion) => emotion.name === after.name)?.intensity ?? after.intensity;
      return { name: after.name, before, after: after.intensity, drop: before - after.intensity };
    })
    .sort((a, b) => b.drop - a.drop)[0];
  if (biggestDrop && biggestDrop.drop > 0) return `Išsaugota · ${biggestDrop.name} ${biggestDrop.before} → ${biggestDrop.after}`;

  if (datesWithEntries.length === 0) return "Išsaugota. Gera pradžia!";

  const streak = countStreakDays([...datesWithEntries, draft.date], getTodayDateString());
  return streak > 1 ? `Išsaugota · ${streak} ${pluralizeLt(streak, DAY_FORMS)} iš eilės` : "Išsaugota";
};

/** Keep "after" ratings in sync with step 1: same emotions, previous "after" value or the original. */
const syncAfterRatings = (emotions: EmotionRating[], after: EmotionRating[]): EmotionRating[] =>
  emotions.map((emotion) => after.find((item) => item.name === emotion.name) ?? emotion);

const NewEntry = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const requestedDate = (location.state as NewEntryRouteState | null)?.date;
  const { draft, updateDraft, wasRestored, resetDraft, discardSavedDraft } = useEntryDraft(requestedDate);

  const emotionUsage = useAppSelector(checkinsSelectors.selectEmotionUsage);
  const placeUsage = useAppSelector(checkinsSelectors.selectPlaceUsage);
  const peopleUsage = useAppSelector(checkinsSelectors.selectPeopleUsage);
  const reactionUsage = useAppSelector(checkinsSelectors.selectReactionUsage);
  const recentThoughts = useAppSelector(checkinsSelectors.selectRecentThoughts);
  const datesWithEntries = useAppSelector(checkinsSelectors.selectDatesWithEntries);

  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Don't fire a pending auto-advance after leaving the page.
  useEffect(() => () => clearTimeout(autoAdvanceTimer.current), []);

  // No thought → the reframe steps are left out; the list updates as the user types.
  const visibleSteps = getVisibleSteps(draft);
  const step = visibleSteps[stepIndex];
  const copy = STEP_COPY[step];
  const isLastStep = stepIndex === visibleSteps.length - 1;
  const isOnReframeStep = isReframeStep(step);
  // The thought as it was when the user opened the thought step — to detect a rewritten thought.
  const thoughtWhenOpened = useRef(draft.autoThought);

  const goHome = (toast?: string) => {
    const state: HomeRouteState | undefined = toast ? { toast } : undefined;
    navigate(ROUTES.HOME.path, { state });
  };

  const save = (finalDraft: EntryDraft) => {
    // A reframe without a thought makes no sense (thought cleared after picking traps): drop it.
    const hasThought = finalDraft.autoThought.trim() !== "";
    dispatch(
      addCheckinItem({
        date: finalDraft.date,
        emotion: finalDraft.emotions,
        place: finalDraft.place,
        people: finalDraft.people,
        situation: finalDraft.situation.trim(),
        autoThought: finalDraft.autoThought.trim(),
        reactions: finalDraft.reactions,
        behavior: finalDraft.behavior.trim(),
        thinkingTraps: hasThought ? finalDraft.thinkingTraps : [],
        balancedThought: hasThought ? finalDraft.balancedThought.trim() : "",
        emotionAfter: finalDraft.emotionAfter,
      }),
    );
    discardSavedDraft();
    goHome(getSavedMessage(finalDraft, datesWithEntries));
  };

  const showStep = (index: number) => {
    clearTimeout(autoAdvanceTimer.current);
    setError(null);
    // Leaving a rewritten thought: traps / balanced thought were about the old one, so they go.
    if (step === "thought" && draft.autoThought.trim() !== thoughtWhenOpened.current.trim()) {
      updateDraft({ thinkingTraps: [], balancedThought: "" });
    }
    if (visibleSteps[index] === "thought") thoughtWhenOpened.current = draft.autoThought;
    // Entering the re-rate step: start from the step-1 ratings.
    if (visibleSteps[index] === "after") {
      updateDraft({ emotionAfter: syncAfterRatings(draft.emotions, draft.emotionAfter) });
    }
    setStepIndex(index);
  };

  const handleNext = () => {
    const validationError = validateStep(step, draft);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (isLastStep) save(draft);
    else showStep(stepIndex + 1);
  };

  const handleSkip = () => {
    const cleared = SKIPPED_ANSWER[step] ?? {};
    if (isLastStep) {
      save({ ...draft, ...cleared });
      return;
    }
    updateDraft(cleared);
    showStep(stepIndex + 1);
  };

  const pickPlace = (selected: string[]) => {
    const place = selected[0] ?? "";
    updateDraft({ place });
    // Single answer → move on by itself, after a short pause so the ✓ is seen.
    // The next step is "people", so a plain index change is enough (no re-rate sync needed).
    clearTimeout(autoAdvanceTimer.current);
    if (place) {
      const placeIndex = stepIndex;
      autoAdvanceTimer.current = setTimeout(() => {
        setError(null);
        setStepIndex((current) => (current === placeIndex ? current + 1 : current));
      }, AUTO_ADVANCE_DELAY_MS);
    }
  };

  // Typing clears the error: the user is already fixing it.
  const updateText = (changes: Partial<EntryDraft>) => {
    setError(null);
    updateDraft(changes);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, minHeight: "100dvh", mx: "auto", display: "flex", flexDirection: "column" }}>
      <FlowHeader
        stepNumber={stepIndex + 1}
        totalSteps={visibleSteps.length}
        onBack={() => showStep(stepIndex - 1)}
        onClose={() => goHome()}
      />

      <Box component="main" key={step} sx={{ flex: 1, px: 2, pt: 2.5 }}>
        {wasRestored && step === "emotions" && (
          <Typography sx={{ mb: 3, fontSize: 15, color: "text.secondary" }}>
            Tęsi juodraštį ·{" "}
            <ButtonBase
              onClick={resetDraft}
              sx={{ fontFamily: "inherit", fontSize: "inherit", fontWeight: 500, color: "text.primary", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              pradėti iš naujo
            </ButtonBase>
          </Typography>
        )}

        {isOnReframeStep && <ThoughtReminder thought={draft.autoThought} />}
        {step !== "emotions" && !isOnReframeStep && <EmotionReminder emotions={draft.emotions} />}
        <StepTitle title={copy.title} hint={copy.hint} />

        {step === "emotions" && (
          <EmotionStep
            emotions={draft.emotions}
            emotionUsage={emotionUsage}
            onChange={(emotions) => updateDraft({ emotions })}
            onError={setError}
          />
        )}

        {step === "place" && (
          <ChoiceStep
            options={orderByUsage(placeUsage, DEFAULT_PLACES)}
            selected={draft.place ? [draft.place] : []}
            isMultiple={false}
            onChange={pickPlace}
            customLabel="Kita vieta"
          />
        )}

        {step === "people" && (
          <ChoiceStep
            options={orderByUsage(peopleUsage, DEFAULT_PEOPLE)}
            selected={draft.people}
            isMultiple
            exclusiveOption={NOBODY}
            onChange={(people) => updateDraft({ people })}
            customLabel="Kas dar buvo šalia"
          />
        )}

        {step === "situation" && (
          <TextStep
            label="Kas vyko"
            placeholder="Pvz. susitikime pristačiau projektą…"
            value={draft.situation}
            onChange={(situation) => updateText({ situation })}
            hasError={error !== null}
            extra={<DateButton date={draft.date} onChange={(date) => updateText({ date })} />}
          />
        )}

        {step === "thought" && (
          <TextStep
            label="Mintis"
            placeholder="„Man niekada nepavyks…“"
            value={draft.autoThought}
            onChange={(autoThought) => updateText({ autoThought })}
            hasError={error !== null}
            isQuote
            suggestions={recentThoughts}
            suggestionsLabel="Ši mintis jau buvo aplankiusi:"
          />
        )}

        {step === "reaction" && (
          <ChoiceStep
            options={orderByUsage(reactionUsage, DEFAULT_REACTIONS)}
            selected={draft.reactions}
            isMultiple
            onChange={(reactions) => updateDraft({ reactions })}
            customLabel="Kaip dar sureagavai"
          >
            <Box sx={{ mt: 2.5 }}>
              <TextArea
                label="Ką dar padarei"
                placeholder="Gali papildyti savais žodžiais…"
                value={draft.behavior}
                onChange={(behavior) => updateText({ behavior })}
                hasError={error !== null}
                rows={3}
              />
            </Box>
          </ChoiceStep>
        )}

        {step === "traps" && (
          <TrapsStep selected={draft.thinkingTraps} onChange={(thinkingTraps) => updateDraft({ thinkingTraps })} onError={setError} />
        )}

        {step === "balanced" && (
          <BalancedThoughtStep
            value={draft.balancedThought}
            onChange={(balancedThought) => updateText({ balancedThought })}
            hasError={error !== null}
          />
        )}

        {step === "after" && (
          <ReRateStep before={draft.emotions} after={draft.emotionAfter} onChange={(emotionAfter) => updateDraft({ emotionAfter })} />
        )}
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

export default NewEntry;
