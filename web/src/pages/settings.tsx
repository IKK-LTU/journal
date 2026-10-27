import { Box, ButtonBase, Typography } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

import BackButton from "@/components/ui/BackButton";
import PageShell from "@/components/ui/PageShell";
import { ROUTES } from "@/router/routes";

type ThemeMode = "system" | "light" | "dark";

const THEME_OPTIONS: { mode: ThemeMode; label: string; hint: string }[] = [
  { mode: "system", label: "Sistema", hint: "Kaip telefone" },
  { mode: "light", label: "Šviesi", hint: "Visada šviesi" },
  { mode: "dark", label: "Tamsi", hint: "Visada tamsi" },
];

const Settings = () => {
  const navigate = useNavigate();
  // MUI stores the choice in localStorage ("mui-mode") and applies it everywhere.
  const { mode, setMode } = useColorScheme();
  const selectedMode: ThemeMode = mode ?? "system"; // undefined on the very first render

  return (
    <PageShell>
      <BackButton onClick={() => navigate(ROUTES.HOME.path)} />

      <Typography variant="display" sx={{ mt: 1.5, mb: 3.5, fontSize: 34 }}>
        Nustatymai
      </Typography>

      <Typography id="appearance-title" component="h2" sx={{ mb: 1.25, fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em" }}>
        Išvaizda
      </Typography>

      <Box role="radiogroup" aria-labelledby="appearance-title" sx={{ borderRadius: "12px", bgcolor: "background.paper", overflow: "hidden" }}>
        {THEME_OPTIONS.map((option) => {
          const isSelected = option.mode === selectedMode;

          return (
            <ButtonBase
              key={option.mode}
              role="radio"
              aria-checked={isSelected}
              onClick={() => setMode(option.mode)}
              sx={{ width: "100%", minHeight: 60, px: 2, py: 1.25, justifyContent: "space-between", textAlign: "left", fontFamily: "inherit" }}
            >
              <Box>
                <Typography sx={{ fontSize: 17, fontWeight: 500 }}>{option.label}</Typography>
                <Typography sx={{ fontSize: 14, color: "text.secondary" }}>{option.hint}</Typography>
              </Box>
              {isSelected && (
                <Box sx={{ color: "primary.main", display: "flex" }}>
                  <Check size={20} strokeWidth={2.4} aria-hidden />
                </Box>
              )}
            </ButtonBase>
          );
        })}
      </Box>

      <Typography sx={{ mt: 1.25, fontSize: 14, color: "text.secondary" }}>„Sistema“ keičiasi kartu su telefono nustatymu.</Typography>
    </PageShell>
  );
};

export default Settings;
