import { Box, ButtonBase, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import type { CheckInDto } from "@/api/services/types";
import EmotionIcon from "@/components/ui/EmotionIcon";
import { getEntryPath } from "@/router/routes";
import { formatTime } from "@/utils/date";

type Props = {
  entry: CheckInDto;
  /** CSS width; narrower when several cards share a day so the next one peeks in. */
  width: string;
};

const oneLine = { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } as const;

/** Compact preview: main emotion + first line. The full story is on the entry page. */
const EntryCard = ({ entry, width }: Props) => {
  const navigate = useNavigate();

  // The strongest emotion leads the card; the rest go on a quieter line.
  const [mainEmotion, ...otherEmotions] = [...entry.emotion].sort((a, b) => b.intensity - a.intensity);
  const otherEmotionsText = otherEmotions.map((emotion) => `${emotion.name} ${emotion.intensity}`).join(" · ");

  return (
    <ButtonBase
      onClick={() => navigate(getEntryPath(entry.id))}
      sx={{
        flex: `0 0 ${width}`,
        minWidth: 0,
        scrollSnapAlign: "start",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 1.25,
        p: 2,
        borderRadius: "12px",
        bgcolor: "background.paper",
        textAlign: "left",
        transition: "opacity .12s ease-out",
        "&:active": { opacity: 0.7 },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        {mainEmotion && <EmotionIcon emotionName={mainEmotion.name} />}

        <Box sx={{ flex: 1, minWidth: 0 }}>
          {mainEmotion && (
            <Typography component="span" sx={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em" }}>
              {mainEmotion.name}{" "}
              <Box component="span" sx={{ fontSize: 16, fontWeight: 500, color: "text.secondary" }}>
                {mainEmotion.intensity}/10
              </Box>
            </Typography>
          )}
          {otherEmotionsText && (
            <Typography sx={{ ...oneLine, fontSize: 14, color: "text.secondary" }}>{otherEmotionsText}</Typography>
          )}
        </Box>

        <Typography sx={{ alignSelf: "flex-start", fontSize: 14, color: "text.secondary" }}>
          {formatTime(entry.createdAt)}
        </Typography>
      </Box>

      <Typography sx={{ ...oneLine, fontSize: 15, color: "text.secondary" }}>{entry.situation}</Typography>
    </ButtonBase>
  );
};

export default EntryCard;
