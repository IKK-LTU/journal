/**
 * The entry flow, one small question per screen. Order matters: feelings first
 * (that's what brought the user here), then easy one-tap context, then words.
 */
export const FLOW_STEPS = ["emotions", "place", "people", "situation", "thought", "reaction", "after"] as const;

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
  after: { title: "Kaip jautiesi dabar?", hint: "Įvertink tuos pačius jausmus dar kartą.", isRequired: false },
};

export const LAST_STEP_INDEX = FLOW_STEPS.length - 1;
