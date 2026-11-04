import { getEmotionIcon } from "@/constants/emotions";
import IconBadge from "./IconBadge";

type Props = {
  emotionName: string;
  size?: number;
};

/** The icon of an emotion's core feeling, on the sage badge. Decorative: the name is always shown next to it. */
const EmotionIcon = ({ emotionName, size = 44 }: Props) => <IconBadge icon={getEmotionIcon(emotionName)} size={size} />;

export default EmotionIcon;
