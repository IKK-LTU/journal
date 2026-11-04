import { useState } from "react";
import { Box, ButtonBase, Typography } from "@mui/material";

import TextArea from "./TextArea";

/** Questions that help reframe. Tapping one shows it as the text field's prompt — it never writes for the user. */
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
  const [activeQuestion, setActiveQuestion] = useState(HELPER_QUESTIONS[0]);

  return (
    <>
      <Typography sx={{ mb: 0.5, fontSize: 14, color: "text.secondary" }}>Gali padėti:</Typography>
      <Box sx={{ mb: 2, display: "flex", flexDirection: "column" }}>
        {HELPER_QUESTIONS.map((question) => {
          const isActive = question === activeQuestion;
          return (
            <ButtonBase
              key={question}
              aria-pressed={isActive}
              onClick={() => setActiveQuestion(question)}
              sx={{
                justifyContent: "flex-start",
                minHeight: 40,
                textAlign: "left",
                fontFamily: "inherit",
                fontSize: 16,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "text.primary" : "text.secondary",
              }}
            >
              {question}
            </ButtonBase>
          );
        })}
      </Box>

      <TextArea
        label="Subalansuota mintis"
        placeholder={activeQuestion}
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
