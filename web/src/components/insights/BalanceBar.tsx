import { Box, Typography } from "@mui/material";

type Props = {
  difficultPercent: number;
  pleasantPercent: number;
};

/** One bar split in two: difficult (quiet grey) vs pleasant (sage — the hopeful part). */
const BalanceBar = ({ difficultPercent, pleasantPercent }: Props) => {
  return (
    <>
      <Box aria-hidden sx={{ display: "flex", height: 10, borderRadius: 5, overflow: "hidden", bgcolor: "track", gap: "2px" }}>
        {difficultPercent > 0 && <Box sx={{ width: `${difficultPercent}%`, bgcolor: "text.secondary" }} />}
        {pleasantPercent > 0 && <Box sx={{ width: `${pleasantPercent}%`, bgcolor: "primary.main" }} />}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        <Typography sx={{ fontSize: 15 }}>
          Sunkūs <Box component="span" sx={{ color: "text.secondary" }}>{difficultPercent}%</Box>
        </Typography>
        <Typography sx={{ fontSize: 15 }}>
          Malonūs <Box component="span" sx={{ color: "text.secondary" }}>{pleasantPercent}%</Box>
        </Typography>
      </Box>
    </>
  );
};

export default BalanceBar;
