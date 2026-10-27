import { Box, IconButton, Typography } from "@mui/material";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/router/routes";
import { formatLongDate, getGreeting } from "@/utils/date";

type Props = {
  now: Date;
};

const HomeHeader = ({ now }: Props) => {
  const navigate = useNavigate();

  return (
    <Box component="header" sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1.5, pt: 4 }}>
      <Box>
        <Typography variant="display">{getGreeting(now)}</Typography>
        <Typography sx={{ mt: 0.5, fontSize: 15, color: "text.secondary" }}>{formatLongDate(now)}</Typography>
      </Box>

      <IconButton
        aria-label="Nustatymai"
        onClick={() => navigate(ROUTES.SETTINGS.path)}
        sx={{ width: 44, height: 44, mr: -1, color: "text.secondary" }}
      >
        <Settings size={22} strokeWidth={1.8} aria-hidden />
      </IconButton>
    </Box>
  );
};

export default HomeHeader;
