import { useState } from "react";

import type { CheckInDto, EmotionRating } from "@/api/services/types";
import { updateCheckinItem } from "@/store/features/checkins";
import { useAppDispatch } from "@/store/hooks";
import { findBiggestDrop, haveSameItems, haveSameRatings, startingAfterRatings, type IntensityChange } from "@/utils/ratings";
import { DEEPER_STEPS, STEP_COPY } from "./steps";
import { validateBalancedThought, validateThought } from "./validation";

/** undefined = still in the flow; null = saved, no feeling got weaker; IntensityChange = saved with a drop. */
export type DeeperFlowResult = IntensityChange | null | undefined;

/**
 * State and rules of the "Pažvelk giliau" flow for one entry:
 * the answers, the current step, validation, "Praleisti" and saving.
 * Starts from what the entry already has, so the same flow also edits.
 */
export const useDeeperFlow = (entry: CheckInDto) => {
  const dispatch = useAppDispatch();

  const [stepIndex, setStepIndex] = useState(0);
  const [thought, setThought] = useState(entry.autoThought);
  const [thinkingTraps, setThinkingTraps] = useState<string[]>(entry.thinkingTraps);
  const [balancedThought, setBalancedThought] = useState(entry.balancedThought);
  const [afterRatings, setAfterRatings] = useState<EmotionRating[]>(entry.emotionAfter);
  // Traps and the friend's view belong to one specific thought: the one they were written for.
  const [thoughtBeingReframed, setThoughtBeingReframed] = useState(entry.autoThought);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DeeperFlowResult>(undefined);

  const step = DEEPER_STEPS[stepIndex];
  const isLastStep = stepIndex === DEEPER_STEPS.length - 1;

  const hasUnsavedChanges =
    thought.trim() !== entry.autoThought.trim() ||
    balancedThought.trim() !== entry.balancedThought.trim() ||
    !haveSameItems(thinkingTraps, entry.thinkingTraps) ||
    // Before the re-rate step `afterRatings` is just the saved value, so it only counts there.
    (step === "after" && !haveSameRatings(afterRatings, entry.emotionAfter));

  const save = (finalAfterRatings: EmotionRating[]) => {
    dispatch(
      updateCheckinItem({
        id: entry.id,
        changes: {
          autoThought: thought.trim(),
          thinkingTraps,
          balancedThought: balancedThought.trim(),
          emotionAfter: finalAfterRatings,
        },
      }),
    );
    setResult(findBiggestDrop(entry.emotion, finalAfterRatings) ?? null);
  };

  const goToStep = (index: number) => {
    setError(null);
    const isLeavingRewrittenThought = step === "thought" && thought.trim() !== thoughtBeingReframed.trim();
    if (isLeavingRewrittenThought) {
      setThinkingTraps([]);
      setBalancedThought("");
      setThoughtBeingReframed(thought);
    }
    if (DEEPER_STEPS[index] === "after") setAfterRatings(startingAfterRatings(entry.emotion, afterRatings));
    setStepIndex(index);
  };

  const validateCurrentStep = (): string | null => {
    if (step === "thought") return validateThought(thought);
    if (step === "balanced") return validateBalancedThought(balancedThought);
    return null;
  };

  const goNext = () => {
    const validationError = validateCurrentStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    if (isLastStep) save(afterRatings);
    else goToStep(stepIndex + 1);
  };

  /** "Praleisti" = no answer to this question. */
  const skip = () => {
    if (step === "traps") setThinkingTraps([]);
    if (step === "balanced") setBalancedThought("");
    // Skipping the re-rate keeps what was recorded earlier (when editing) instead of erasing it.
    if (isLastStep) save(entry.emotionAfter);
    else goToStep(stepIndex + 1);
  };

  const withErrorCleared =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setError(null);
      setter(value);
    };

  return {
    step,
    copy: STEP_COPY[step],
    stepNumber: stepIndex + 1,
    totalSteps: DEEPER_STEPS.length,
    isLastStep,
    answers: { thought, thinkingTraps, balancedThought, afterRatings },
    setThought: withErrorCleared(setThought),
    setThinkingTraps,
    setBalancedThought: withErrorCleared(setBalancedThought),
    setAfterRatings,
    error,
    setError,
    hasUnsavedChanges,
    result,
    goBack: () => goToStep(stepIndex - 1),
    goNext,
    skip,
  };
};
