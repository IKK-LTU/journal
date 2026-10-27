import type { ReactNode } from "react";
import { Box, ButtonBase, Typography } from "@mui/material";

import { SERIF_FONT } from "../../../theme";
import TextArea from "./TextArea";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  hasError: boolean;
  isQuote?: boolean;
  /** Extra control above the text, e.g. the date picker. */
  extra?: ReactNode;
  /** Earlier answers the user can reuse with one tap (e.g. a thought that keeps coming back). */
  suggestions?: string[];
  suggestionsLabel?: string;
};

const oneLine = { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } as const;

/** One question, one writing area. Used for "what happened" and "the thought". */
const TextStep = ({ label, value, onChange, placeholder, hasError, isQuote = false, extra, suggestions = [], suggestionsLabel }: Props) => {
  const visibleSuggestions = suggestions.filter((suggestion) => suggestion !== value.trim());

  return (
    <>
      {extra}
      <TextArea label={label} value={value} onChange={onChange} placeholder={placeholder} hasError={hasError} isQuote={isQuote} rows={7} autoFocus />

      {visibleSuggestions.length > 0 && (
        <Box sx={{ mt: 2.5 }}>
          {suggestionsLabel && <Typography sx={{ mb: 0.5, fontSize: 14, color: "text.secondary" }}>{suggestionsLabel}</Typography>}
          {visibleSuggestions.map((suggestion) => (
            <ButtonBase
              key={suggestion}
              onClick={() => onChange(suggestion)}
              sx={{
                ...oneLine,
                display: "block",
                width: "100%",
                minHeight: 44,
                textAlign: "left",
                fontSize: 17,
                color: "text.secondary",
                ...(isQuote ? { fontFamily: SERIF_FONT, fontStyle: "italic" } : { fontFamily: "inherit" }),
              }}
            >
              {isQuote ? `„${suggestion}“` : suggestion}
            </ButtonBase>
          ))}
        </Box>
      )}
    </>
  );
};

export default TextStep;
