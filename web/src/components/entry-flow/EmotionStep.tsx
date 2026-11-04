import { useState, type FormEvent } from "react";
import { Box, Button, ButtonBase, InputBase, Typography } from "@mui/material";

import { DEFAULT_INTENSITY, EMOTION_CATEGORIES, findEmotionCategory, isSameEmotion, MAX_EMOTIONS_PER_ENTRY } from "@/constants/emotions";
import FeelingTiles from "./FeelingTiles";
import IntensityPicker from "./IntensityPicker";
import RefineWords from "./RefineWords";
import type { EmotionRating } from "./types";

type Props = {
  emotions: EmotionRating[];
  /** emotion name → times used; the most used are offered first */
  emotionUsage: Record<string, number>;
  onChange: (emotions: EmotionRating[]) => void;
  onError: (message: string | null) => void;
};

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

const wordButtonSx = { minHeight: 44, fontSize: 17, color: "text.secondary", fontFamily: "inherit" } as const;

const coreOf = (name: string) => findEmotionCategory(name)?.name;

/**
 * Step 1 in two levels, so it never starts as a wall of words:
 * 1. six core feelings as tiles — one tap is enough;
 * 2. optional "Gal tiksliau?" with that core's precise words (picking one replaces the core word).
 */
const EmotionStep = ({ emotions, emotionUsage, onChange, onError }: Props) => {
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customName, setCustomName] = useState("");
  // The core feeling whose precise words are shown ("Gal tiksliau?").
  const [activeCore, setActiveCore] = useState<string | null>(() => (emotions[0] ? (coreOf(emotions[0].name) ?? null) : null));

  const isPicked = (name: string) => emotions.some((emotion) => isSameEmotion(emotion.name, name));

  // Fast path: the user's own most used feelings, one tap away.
  const recentEmotions = Object.keys(emotionUsage)
    .sort((a, b) => emotionUsage[b] - emotionUsage[a])
    .filter((name) => !isPicked(name))
    .slice(0, 4);

  const pickedCores = EMOTION_CATEGORIES.filter((category) => emotions.some((emotion) => coreOf(emotion.name) === category.name)).map(
    (category) => category.name,
  );
  const activeCategory = EMOTION_CATEGORIES.find((category) => category.name === activeCore);

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
    onChange(emotions.filter((emotion) => !isSameEmotion(emotion.name, name)));
  };

  // Tile: pick the core feeling (if nothing from that family is picked yet) and offer the precise words.
  const tapTile = (core: string) => {
    setActiveCore(core);
    if (!pickedCores.includes(core)) addEmotion(core);
  };

  // Precise word: replaces the core word if that's what's picked ("Išsigandęs" → "Neramus"), else toggles.
  const toggleRefinement = (name: string) => {
    if (isPicked(name)) {
      removeEmotion(name);
      return;
    }
    const core = coreOf(name);
    const coreEntry = emotions.find((emotion) => core !== undefined && isSameEmotion(emotion.name, core));
    if (coreEntry) {
      onError(null);
      onChange(emotions.map((emotion) => (emotion === coreEntry ? { name, intensity: coreEntry.intensity } : emotion)));
      return;
    }
    addEmotion(name);
  };

  const addRecent = (name: string) => {
    if (addEmotion(name)) setActiveCore(coreOf(name) ?? null);
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
      {recentEmotions.length > 0 && (
        <Box sx={{ mb: 1.5, display: "flex", flexWrap: "wrap", alignItems: "center", columnGap: 2 }}>
          <Typography component="span" sx={{ fontSize: 14, color: "text.secondary" }}>
            Neseniai:
          </Typography>
          {recentEmotions.map((name) => (
            <ButtonBase key={name} onClick={() => addRecent(name)} sx={{ ...wordButtonSx, color: "text.primary", fontWeight: 500 }}>
              {name}
            </ButtonBase>
          ))}
        </Box>
      )}

      <FeelingTiles pickedCores={pickedCores} onTap={tapTile} />

      {activeCategory && <RefineWords category={activeCategory} isPicked={isPicked} onToggle={toggleRefinement} />}

      {emotions.length > 0 && (
        <Box sx={{ mt: 2.5 }}>
          <Typography component="h2" sx={{ mb: 1, fontSize: 16, fontWeight: 600 }}>
            Kaip stipriai?
          </Typography>
          {emotions.map((emotion) => (
            <Box key={emotion.name} sx={{ mb: 1, pt: 1.5, pr: 1, pb: 0.5, pl: 2, borderRadius: "12px", bgcolor: "background.paper" }}>
              <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: 20, fontWeight: 500 }}>{emotion.name}</Typography>
                <Button variant="text" onClick={() => removeEmotion(emotion.name)} sx={{ minHeight: 44, px: 1, fontSize: 15, color: "text.secondary" }}>
                  Pašalinti
                </Button>
              </Box>
              <IntensityPicker emotionName={emotion.name} value={emotion.intensity} onChange={(value) => setIntensity(emotion.name, value)} />
            </Box>
          ))}
        </Box>
      )}

      {!isAddingCustom && (
        <ButtonBase onClick={() => setIsAddingCustom(true)} sx={{ ...wordButtonSx, mt: 1, fontStyle: "italic" }}>
          Nėra tinkamo? Įrašyk savo…
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
