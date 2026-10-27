import type { ChangeEvent, ReactNode } from "react";
import { Box } from "@mui/material";

import { SERIF_FONT } from "../../../theme";
import { FLOW_ERROR_ID } from "./FlowFooter";
import StepTitle from "./StepTitle";
import { TEXT_MAX_LENGTH } from "./validation";

type Props = {
  title: string;
  hint?: string;
  /** Screen-reader name for the text field. */
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  hasError: boolean;
  /** The thought step is written in serif italic, like a quote. */
  isQuote?: boolean;
  /** Extra control under the title, e.g. the date picker. */
  extra?: ReactNode;
};

/** One question, one big writing area. Used for situation, thought and behavior. */
const TextStep = ({ title, hint, label, value, onChange, placeholder, hasError, isQuote = false, extra }: Props) => {
  return (
    <>
      <StepTitle title={title} hint={hint} />
      {extra}
      <Box
        component="textarea"
        autoFocus
        rows={7}
        maxLength={TEXT_MAX_LENGTH}
        aria-label={label}
        aria-invalid={hasError}
        aria-describedby={FLOW_ERROR_ID}
        value={value}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
        placeholder={placeholder}
        sx={{
          display: "block",
          width: "100%",
          p: 2,
          border: "none",
          borderRadius: "12px",
          resize: "none",
          bgcolor: "background.paper",
          color: "text.primary",
          font: "inherit",
          fontSize: isQuote ? 21 : 19,
          lineHeight: 1.55,
          ...(isQuote && { fontFamily: SERIF_FONT, fontStyle: "italic" }),
          outline: "none",
          boxShadow: hasError ? "inset 0 0 0 2px var(--mui-palette-error-main)" : "none",
          "&::placeholder": { color: "text.secondary", opacity: 1 },
        }}
      />
    </>
  );
};

export default TextStep;
