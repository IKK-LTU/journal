import { createElement } from "react";
import { Box } from "@mui/material";
import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  /** Diameter in px; the icon is half of it. */
  size?: number;
  /** Solid sage with a light icon, for a selected / done state. */
  isFilled?: boolean;
};

/** A line icon on a soft sage circle — the app's recurring "warm" accent. Always decorative. */
const IconBadge = ({ icon, size = 44, isFilled = false }: Props) => {
  return (
    <Box
      aria-hidden
      sx={{
        flex: "none",
        width: size,
        height: size,
        borderRadius: "50%",
        bgcolor: isFilled ? "primary.main" : "accentSoft",
        color: isFilled ? "primary.contrastText" : "primary.main",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color .15s ease-out",
      }}
    >
      {/* createElement: the icon component comes from a prop, not created during render. */}
      {createElement(icon, { size: Math.round(size / 2), strokeWidth: 1.8 })}
    </Box>
  );
};

export default IconBadge;
