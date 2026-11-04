import { Box, Typography } from "@mui/material";
import { Lightbulb } from "lucide-react";

import TextArea from "./TextArea";

/** Questions that help reframe. Always visible next to the field — guidance, never text written for the user. */
const HELPER_QUESTIONS = [
  "Kokie faktai už šią mintį – ir kokie prieš?",
  "Ką pasakytum draugui tokioje situacijoje?",
  "Kas labiausiai tikėtina – ne blogiausia?",
];

type Props = {
  value: string;
  onChange: (value: string) => void;
  hasError: boolean;
};

const BalancedThoughtStep = ({ value, onChange, hasError }: Props) => {
  return (
    <>
      <Box sx={{ mb: 2, px: 2, py: 1.5, borderRadius: "12px", bgcolor: "background.paper" }}>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.75, fontSize: 13, fontWeight: 600, color: "primary.main" }}>
          <Lightbulb size={16} strokeWidth={2} aria-hidden />
          Gali padėti
        </Typography>
        <Box component="ul" sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {HELPER_QUESTIONS.map((question) => (
            <Typography component="li" key={question} sx={{ fontSize: 15, color: "text.secondary" }}>
              {question}
            </Typography>
          ))}
        </Box>
      </Box>

      <TextArea
        label="Subalansuota mintis"
        placeholder="Parašyk savais žodžiais…"
        value={value}
        onChange={onChange}
        hasError={hasError}
        rows={6}
        isQuote
      />
    </>
  );
};

export default BalancedThoughtStep;
