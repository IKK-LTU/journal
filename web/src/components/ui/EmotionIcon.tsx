import { Box } from "@mui/material";

import { getEmotionIcon } from "@/constants/emotions";

type Props = {
  emotionName: string;
  size?: number;
};

/** Line icon for an emotion on a soft sage circle. Decorative: the emotion name is always shown next to it. */
const EmotionIcon = ({ emotionName, size = 44 }: Props) => {
  const Icon = getEmotionIcon(emotionName);

  return (
    <Box
      aria-hidden
      sx={{
        flex: "none",
        width: size,
        height: size,
        borderRadius: "50%",
        bgcolor: "accentSoft",
        color: "primary.main",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon size={size / 2} strokeWidth={1.8} />
    </Box>
  );
};

export default EmotionIcon;
