import { HeartHandshake, MessageCircle, Quote, Search, Sprout, Sun, type LucideIcon } from "lucide-react";

/**
 * Two short flows instead of one long one:
 * - QUICK (~30 s): what you feel + what happened. Enough for an entry.
 * - DEEPER (optional, ~2 min, right after saving or later): the thought, the trap in it,
 *   a friend's view of it, and how it feels now — the CBT part.
 */
export const QUICK_STEPS = ["emotions", "context"] as const;
export const DEEPER_STEPS = ["thought", "traps", "balanced", "after"] as const;

export type QuickStepId = (typeof QUICK_STEPS)[number];
export type DeeperStepId = (typeof DEEPER_STEPS)[number];
export type StepId = QuickStepId | DeeperStepId;

type StepCopy = {
  title: string;
  hint: string;
  icon: LucideIcon;
  /** Required steps have no "Praleisti". */
  isRequired: boolean;
};

export const STEP_COPY: Record<StepId, StepCopy> = {
  emotions: {
    title: "Ką dabar jauti?",
    hint: "Pasirink vieną ar kelis jausmus. Čia nėra teisingų ar neteisingų atsakymų.",
    icon: Sun,
    isRequired: true,
  },
  context: {
    title: "Kas nutiko?",
    hint: "Užtenka kelių žodžių – visa kita nebūtina.",
    icon: MessageCircle,
    isRequired: true,
  },
  thought: {
    title: "Kokia mintis tada šovė į galvą?",
    hint: "Pirmoji, kuri atėjo – net jei ji atrodo keista.",
    icon: Quote,
    isRequired: true,
  },
  traps: {
    title: "Ar atpažįsti spąstus šioje mintyje?",
    hint: "Tai įprasti proto trumpiniai – juos turi visi. Pasirink, kurie tinka, arba praleisk.",
    icon: Search,
    isRequired: false,
  },
  balanced: {
    title: "Kaip į tai pažiūrėtų draugas?",
    hint: "Ne priverstinis pozityvumas – tiesiog tikslesnė mintis.",
    icon: HeartHandshake,
    isRequired: false,
  },
  after: {
    title: "Kaip jautiesi dabar?",
    hint: "Jau beveik. Įvertink tuos pačius jausmus dar kartą.",
    icon: Sprout,
    isRequired: false,
  },
};
