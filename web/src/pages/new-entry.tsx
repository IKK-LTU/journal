import { useState } from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import DateButton from "@/components/entry-flow/DateButton";
import EmotionStep from "@/components/entry-flow/EmotionStep";
import FlowFooter from "@/components/entry-flow/FlowFooter";
import FlowHeader from "@/components/entry-flow/FlowHeader";
import TextStep from "@/components/entry-flow/TextStep";
import { LAST_STEP, type EntryDraft, type FlowStep } from "@/components/entry-flow/types";
import { useEntryDraft } from "@/components/entry-flow/useEntryDraft";
import { validateStep } from "@/components/entry-flow/validation";
import { ROUTES, type HomeRouteState, type NewEntryRouteState } from "@/router/routes";
import { addCheckinItem, checkinsSelectors } from "@/store/features/checkins";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getTodayDateString } from "@/utils/date";
import { DAY_FORMS, pluralizeLt } from "@/utils/plural";
import { countStreakDays } from "@/utils/streak";

/** Toast text after saving: celebrate a streak, welcome a first entry. */
const getSavedMessage = (datesWithEntries: string[], savedDate: string): string => {
  if (datesWithEntries.length === 0) return "Išsaugota. Gera pradžia!";

  const streak = countStreakDays([...datesWithEntries, savedDate], getTodayDateString());
  return streak > 1 ? `Išsaugota · ${streak} ${pluralizeLt(streak, DAY_FORMS)} iš eilės` : "Išsaugota";
};

const NewEntry = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const requestedDate = (location.state as NewEntryRouteState | null)?.date;
  const { draft, updateDraft, wasRestored, resetDraft, discardSavedDraft } = useEntryDraft(requestedDate);
  const emotionUsage = useAppSelector(checkinsSelectors.selectEmotionUsage);
  const datesWithEntries = useAppSelector(checkinsSelectors.selectDatesWithEntries);

  const [step, setStep] = useState<FlowStep>(1);
  const [error, setError] = useState<string | null>(null);

  const goHome = (toast?: string) => {
    const state: HomeRouteState | undefined = toast ? { toast } : undefined;
    navigate(ROUTES.HOME.path, { state });
  };

  const save = () => {
    dispatch(
      addCheckinItem({
        date: draft.date,
        emotion: draft.emotions,
        situation: draft.situation.trim(),
        autoThought: draft.autoThought.trim(),
        behavior: draft.behavior.trim(),
      }),
    );
    discardSavedDraft();
    goHome(getSavedMessage(datesWithEntries, draft.date));
  };

  const goForward = () => {
    setError(null);
    if (step === LAST_STEP) save();
    else setStep((step + 1) as FlowStep);
  };

  const handleNext = () => {
    const validationError = validateStep(step, draft);
    if (validationError) {
      setError(validationError);
      return;
    }
    goForward();
  };

  const handleBack = () => {
    setError(null);
    setStep((step - 1) as FlowStep);
  };

  // Typing clears the error: the user is already fixing it.
  const updateText = (changes: Partial<EntryDraft>) => {
    setError(null);
    updateDraft(changes);
  };

  const isOptionalStep = step === 3 || step === 4;

  return (
    <Box sx={{ width: "100%", maxWidth: 600, minHeight: "100dvh", mx: "auto", display: "flex", flexDirection: "column" }}>
      <FlowHeader step={step} onBack={handleBack} onClose={() => goHome()} />

      <Box component="main" sx={{ flex: 1, px: 2, pt: 2.5 }}>
        {wasRestored && step === 1 && (
          <Typography sx={{ mb: 3, fontSize: 15, color: "text.secondary" }}>
            Tęsi juodraštį ·{" "}
            <ButtonBase onClick={resetDraft} sx={{ fontFamily: "inherit", fontSize: "inherit", fontWeight: 500, color: "text.primary", textDecoration: "underline", textUnderlineOffset: 3 }}>
              pradėti iš naujo
            </ButtonBase>
          </Typography>
        )}

        {step === 1 && (
          <EmotionStep
            emotions={draft.emotions}
            emotionUsage={emotionUsage}
            onChange={(emotions) => updateDraft({ emotions })}
            onError={setError}
          />
        )}

        {step === 2 && (
          <TextStep
            title="Kas nutiko?"
            label="Situacija"
            placeholder="Kur buvai, su kuo, kas įvyko…"
            value={draft.situation}
            onChange={(situation) => updateText({ situation })}
            hasError={error !== null}
            extra={<DateButton date={draft.date} onChange={(date) => updateText({ date })} />}
          />
        )}

        {step === 3 && (
          <TextStep
            title="Kokia mintis šovė?"
            hint="Pirmoji, kuri atėjo. Nebūtina."
            label="Automatinė mintis"
            placeholder="„Man niekada nepavyks…“"
            value={draft.autoThought}
            onChange={(autoThought) => updateText({ autoThought })}
            hasError={error !== null}
            isQuote
          />
        )}

        {step === 4 && (
          <TextStep
            title="Ką padarei?"
            hint="Kaip sureagavai. Nebūtina."
            label="Elgesys"
            placeholder="Pvz. išėjau pasivaikščioti…"
            value={draft.behavior}
            onChange={(behavior) => updateText({ behavior })}
            hasError={error !== null}
          />
        )}
      </Box>

      <FlowFooter
        error={error}
        primaryLabel={step === LAST_STEP ? "Išsaugoti" : "Toliau"}
        onPrimary={handleNext}
        onSkip={isOptionalStep ? goForward : undefined}
      />
    </Box>
  );
};

export default NewEntry;
