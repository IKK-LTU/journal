import { Box, Typography } from "@mui/material";

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
      <Typography sx={{ mb: 0.5, fontSize: 14, color: "text.secondary" }}>Gali padėti:</Typography>
      <Box component="ul" sx={{ mb: 2, display: "flex", flexDirection: "column", gap: 0.5 }}>
        {HELPER_QUESTIONS.map((question) => (
          <Typography component="li" key={question} sx={{ fontSize: 16, color: "text.primary" }}>
            {question}
          </Typography>
        ))}
      </Box>

      <TextArea
        label="Subalansuota mintis"
        placeholder="Parašyk savais žodžiais…"
        value={value}
        onChange={onChange}
        hasError={hasError}
        rows={6}
        autoFocus
        isQuote
      />
    </>
  );
};

export default BalancedThoughtStep;
