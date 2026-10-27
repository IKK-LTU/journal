import { useState, type FormEvent } from "react";
import { Box, Button, ButtonBase, InputBase, Typography } from "@mui/material";

import { DEFAULT_INTENSITY, isSameEmotion, MAX_EMOTIONS_PER_ENTRY } from "@/constants/emotions";
import CategoryList from "./CategoryList";
import IntensityPicker from "./IntensityPicker";
import StepTitle from "./StepTitle";
import type { EmotionRating } from "./types";

type Props = {
  emotions: EmotionRating[];
  /** emotion name → times used; the most used are offered first */
  emotionUsage: Record<string, number>;
  onChange: (emotions: EmotionRating[]) => void;
  onError: (message: string | null) => void;
};

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

const wordButtonSx = { minHeight: 44, fontSize: 20, color: "text.secondary", fontFamily: "inherit" } as const;
const sectionLabelSx = { mb: 0.5, fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "text.secondary" } as const;

const EmotionStep = ({ emotions, emotionUsage, onChange, onError }: Props) => {
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customName, setCustomName] = useState("");

  const isPicked = (name: string) => emotions.some((emotion) => isSameEmotion(emotion.name, name));

  // Fast path: the user's own most used feelings, one tap away.
  const recentEmotions = Object.keys(emotionUsage)
    .sort((a, b) => emotionUsage[b] - emotionUsage[a])
    .filter((name) => !isPicked(name))
    .slice(0, 5);

  /** Returns true when the emotion was added. */
  const addEmotion = (rawName: string): boolean => {
    const name = rawName.trim();
    if (name.length < 2) {
      onError("Įrašyk emociją");
      return false;
    }
    if (isPicked(name)) {
      onError("Ši emocija jau pasirinkta");
      return false;
    }
    if (emotions.length >= MAX_EMOTIONS_PER_ENTRY) {
      onError(`Daugiausiai ${MAX_EMOTIONS_PER_ENTRY} emocijos viename įraše`);
      return false;
    }
    onError(null);
    onChange([...emotions, { name: capitalize(name), intensity: DEFAULT_INTENSITY }]);
    return true;
  };

  const removeEmotion = (name: string) => {
    onError(null);
    onChange(emotions.filter((emotion) => emotion.name !== name));
  };

  const setIntensity = (name: string, intensity: number) => {
    onChange(emotions.map((emotion) => (emotion.name === name ? { ...emotion, intensity } : emotion)));
  };

  const submitCustom = (event: FormEvent) => {
    event.preventDefault();
    if (addEmotion(customName)) {
      setCustomName("");
      setIsAddingCustom(false);
    }
  };

  return (
    <>
      <StepTitle title="Ką jauti?" />

      {emotions.map((emotion) => (
        <Box key={emotion.name} sx={{ mb: 1.5, pt: 1.5, pr: 1, pb: 0.5, pl: 2, borderRadius: "12px", bgcolor: "background.paper" }}>
          <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: 22, fontWeight: 500 }}>{emotion.name}</Typography>
            <Button variant="text" onClick={() => removeEmotion(emotion.name)} sx={{ minHeight: 44, px: 1, fontSize: 15, color: "text.secondary" }}>
              Pašalinti
            </Button>
          </Box>
          <IntensityPicker emotionName={emotion.name} value={emotion.intensity} onChange={(value) => setIntensity(emotion.name, value)} />
        </Box>
      ))}

      {recentEmotions.length > 0 && (
        <Box sx={{ mt: emotions.length > 0 ? 2.5 : 0, mb: 2 }}>
          <Typography component="h2" sx={sectionLabelSx}>
            Neseniai jausta
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 2.75 }}>
            {recentEmotions.map((name) => (
              <ButtonBase key={name} onClick={() => addEmotion(name)} sx={wordButtonSx}>
                {name}
              </ButtonBase>
            ))}
          </Box>
        </Box>
      )}

      <Typography component="h2" sx={{ ...sectionLabelSx, mt: recentEmotions.length === 0 && emotions.length > 0 ? 2.5 : 0 }}>
        Visi jausmai
      </Typography>
      <CategoryList isPicked={isPicked} onPick={addEmotion} />

      {!isAddingCustom && (
        <ButtonBase onClick={() => setIsAddingCustom(true)} sx={{ ...wordButtonSx, mt: 1, fontStyle: "italic" }}>
          kita…
        </ButtonBase>
      )}

      {isAddingCustom && (
        <Box component="form" onSubmit={submitCustom} sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 1 }}>
          <InputBase
            autoFocus
            value={customName}
            onChange={(event) => setCustomName(event.target.value)}
            placeholder="Įrašyk emociją"
            inputProps={{ "aria-label": "Kita emocija", maxLength: 30 }}
            sx={{ flex: 1, minHeight: 48, px: 2, borderRadius: "12px", bgcolor: "background.paper", fontSize: 18 }}
          />
          <Button type="submit" variant="text" sx={{ minHeight: 48, color: "text.primary" }}>
            Pridėti
          </Button>
        </Box>
      )}
    </>
  );
};

export default EmotionStep;
