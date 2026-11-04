import type { EntryDraft } from "./types";

/**
 * The entry flow, one small question per screen. Order matters: feelings first
 * (that's what brought the user here), then easy one-tap context, then words,
 * then the CBT part — look at the thought again — and finally how it feels now.
 */
export const FLOW_STEPS = [
  "emotions",
  "place",
  "people",
  "situation",
  "thought",
  "reaction",
  "traps",
  "balanced",
  "after",
] as const;

export type StepId = (typeof FLOW_STEPS)[number];

type StepCopy = {
  title: string;
  hint?: string;
  /** Required steps have no "Praleisti". */
  isRequired: boolean;
};

export const STEP_COPY: Record<StepId, StepCopy> = {
  emotions: {
    title: "Ką dabar jauti?",
    hint: "Pasirink vieną ar kelis jausmus. Čia nėra teisingų ar neteisingų atsakymų.",
    isRequired: true,
  },
  place: { title: "Kur buvai, kai pastebėjai šiuos jausmus?", isRequired: false },
  people: { title: "Kas tuo metu buvo šalia?", hint: "Gali pasirinkti kelis.", isRequired: false },
  situation: { title: "Kas vyko tą akimirką?", hint: "Užtenka kelių žodžių.", isRequired: true },
  thought: {
    title: "Kokia mintis tada šovė į galvą?",
    hint: "Pirmoji, kuri atėjo – net jei ji atrodo keista.",
    isRequired: false,
  },
  reaction: { title: "Kaip į tai sureagavai?", hint: "Ką padarei ar norėjai padaryti.", isRequired: false },
  traps: {
    title: "Ar atpažįsti spąstus šioje mintyje?",
    hint: "Tai įprasti proto trumpiniai – juos turi visi. Pasirink, kurie tinka, arba praleisk.",
    isRequired: false,
  },
  balanced: {
    title: "Kaip į tai pažiūrėtų draugas?",
    hint: "Ne priverstinis pozityvumas – tiesiog tikslesnė mintis.",
    isRequired: false,
  },
  after: { title: "Kaip jautiesi dabar?", hint: "Įvertink tuos pačius jausmus dar kartą.", isRequired: false },
};

/** Steps that only make sense once there is a thought to look at (also the whole "reframe later" page). */
export const REFRAME_STEPS = ["traps", "balanced"] as const satisfies readonly StepId[];
export const isReframeStep = (step: StepId): boolean => (REFRAME_STEPS as readonly StepId[]).includes(step);

/** The steps this draft will actually show: no thought → nothing to reframe, so those steps are left out. */
export const getVisibleSteps = (draft: Pick<EntryDraft, "autoThought">): StepId[] =>
  draft.autoThought.trim() === "" ? FLOW_STEPS.filter((step) => !isReframeStep(step)) : [...FLOW_STEPS];
