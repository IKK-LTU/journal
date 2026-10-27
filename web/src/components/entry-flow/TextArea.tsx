import type { ChangeEvent } from "react";
import { Box } from "@mui/material";

import { SERIF_FONT } from "../../../theme";
import { FLOW_ERROR_ID } from "./FlowFooter";
import { TEXT_MAX_LENGTH } from "./validation";

type Props = {
  /** Screen-reader name. */
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  hasError?: boolean;
  rows?: number;
  autoFocus?: boolean;
  /** Serif italic, for writing down a thought like a quote. */
  isQuote?: boolean;
};

/** Big, calm writing area on a soft card — no border, red inset ring only on error. */
const TextArea = ({ label, value, onChange, placeholder, hasError = false, rows = 6, autoFocus = false, isQuote = false }: Props) => {
  return (
    <Box
      component="textarea"
      autoFocus={autoFocus}
      rows={rows}
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
  );
};

export default TextArea;
