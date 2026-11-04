import { Box, ButtonBase, Typography } from "@mui/material";
import { Check } from "lucide-react";

import { MAX_TRAPS_PER_ENTRY, THINKING_TRAPS } from "@/constants/thinking-traps";

type Props = {
  /** Selected trap ids. */
  selected: string[];
  onChange: (selected: string[]) => void;
  onError: (message: string | null) => void;
};

/** All thinking traps as rows (name + one plain line). Tap to pick, tap again to un-pick. */
const TrapsStep = ({ selected, onChange, onError }: Props) => {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onError(null);
      onChange(selected.filter((item) => item !== id));
      return;
    }
    if (selected.length >= MAX_TRAPS_PER_ENTRY) {
      onError(`Daugiausiai ${MAX_TRAPS_PER_ENTRY} spąstai – pasirink svarbiausius`);
      return;
    }
    onError(null);
    onChange([...selected, id]);
  };

  return (
    <Box role="group" aria-label="Mąstymo spąstai" sx={{ borderRadius: "12px", bgcolor: "background.paper", overflow: "hidden" }}>
      {THINKING_TRAPS.map((trap) => {
        const isPicked = selected.includes(trap.id);
        return (
          <ButtonBase
            key={trap.id}
            aria-pressed={isPicked}
            onClick={() => toggle(trap.id)}
            sx={{ width: "100%", minHeight: 64, px: 2, py: 1.25, gap: 1.5, justifyContent: "space-between", textAlign: "left", fontFamily: "inherit" }}
          >
            <Box>
              <Typography sx={{ fontSize: 17, fontWeight: isPicked ? 600 : 500 }}>{trap.name}</Typography>
              <Typography sx={{ fontSize: 14, color: "text.secondary" }}>{trap.explanation}</Typography>
            </Box>
            <Box sx={{ flex: "none", display: "flex", width: 20, color: "text.primary" }}>
              {isPicked && <Check size={20} strokeWidth={2.6} aria-hidden />}
            </Box>
          </ButtonBase>
        );
      })}
    </Box>
  );
};

export default TrapsStep;
