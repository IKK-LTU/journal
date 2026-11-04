import { Box, Button, Typography } from "@mui/material";
import { HeartHandshake, MessageCircle, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/router/routes";

const HOW_IT_WORKS = [
  { icon: Sun, text: "Pasirink, ką jauti" },
  { icon: MessageCircle, text: "Keliais žodžiais – kas nutiko" },
  { icon: HeartHandshake, text: "Kai nori – pažvelk giliau" },
];

/** First visit: instead of an empty page, a calm welcome with how it works and one clear action. */
const FirstEntryCard = () => {
  const navigate = useNavigate();

  return (
    <Box component="section" aria-labelledby="first-entry-title" sx={{ p: 2.5, borderRadius: "12px", bgcolor: "background.paper" }}>
      <Typography id="first-entry-title" variant="display" component="h2" sx={{ fontSize: 26 }}>
        Pradėk nuo vieno jausmo
      </Typography>
      <Typography sx={{ mt: 1, fontSize: 15, color: "text.secondary" }}>
        Užtrunka apie pusę minutės. Rašyk tik tiek, kiek norisi – čia nėra teisingų atsakymų.
      </Typography>

      <Box component="ol" sx={{ mt: 2.5, mb: 3, display: "flex", flexDirection: "column", gap: 1.5 }}>
        {HOW_IT_WORKS.map(({ icon: Icon, text }) => (
          <Box component="li" key={text} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              aria-hidden
              sx={{ flex: "none", width: 36, height: 36, borderRadius: "50%", bgcolor: "accentSoft", color: "primary.main", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Icon size={18} strokeWidth={1.8} />
            </Box>
            <Typography sx={{ fontSize: 16 }}>{text}</Typography>
          </Box>
        ))}
      </Box>

      <Button variant="contained" fullWidth onClick={() => navigate(ROUTES.NEW_ENTRY.path)}>
        Užrašyti pirmą įrašą
      </Button>
    </Box>
  );
};

export default FirstEntryCard;
