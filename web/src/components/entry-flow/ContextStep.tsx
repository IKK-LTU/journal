import { DEFAULT_PEOPLE, DEFAULT_PLACES, NOBODY, orderByUsage } from "@/constants/entry-options";
import ChoiceStep from "./ChoiceStep";
import DateButton from "./DateButton";
import QuestionCard from "./QuestionCard";
import TextArea from "./TextArea";
import type { EntryDraft } from "./types";

type Props = {
  draft: EntryDraft;
  placeUsage: Record<string, number>;
  peopleUsage: Record<string, number>;
  onChange: (changes: Partial<EntryDraft>) => void;
  hasError: boolean;
};

/**
 * "Kas nutiko?" — what happened is the only required answer; where and with whom are one tap
 * each on the same screen (the user's own most-used answers first).
 */
const ContextStep = ({ draft, placeUsage, peopleUsage, onChange, hasError }: Props) => {
  return (
    <>
      <QuestionCard label="Kas vyko?">
        <DateButton date={draft.date} onChange={(date) => onChange({ date })} />
        <TextArea
          label="Kas vyko"
          placeholder="Pvz. susitikime pristačiau projektą…"
          value={draft.situation}
          onChange={(situation) => onChange({ situation })}
          hasError={hasError}
          rows={4}
          isOnCard
        />
      </QuestionCard>

      <QuestionCard label="Kur buvai?" isOptional>
        <ChoiceStep
          options={orderByUsage(placeUsage, DEFAULT_PLACES)}
          selected={draft.place ? [draft.place] : []}
          isMultiple={false}
          onChange={(selected) => onChange({ place: selected[0] ?? "" })}
          customLabel="Kita vieta"
        />
      </QuestionCard>

      <QuestionCard label="Kas buvo šalia?" isOptional>
        <ChoiceStep
          options={orderByUsage(peopleUsage, DEFAULT_PEOPLE)}
          selected={draft.people}
          isMultiple
          exclusiveOption={NOBODY}
          onChange={(people) => onChange({ people })}
          customLabel="Kas dar buvo šalia"
        />
      </QuestionCard>
    </>
  );
};

export default ContextStep;
