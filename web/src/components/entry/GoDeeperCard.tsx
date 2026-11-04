import { Box, ButtonBase, Typography } from "@mui/material";
import { ChevronRight } from "lucide-react";

type Props = {
  /** The entry already has a thought: offer to finish with the friend's view. */
  hasThought: boolean;
  onOpen: () => void;
};

/** Invitation to the optional deeper part — often only possible later, once the moment has passed. */
const GoDeeperCard = ({ hasThought, onOpen }: Props) => {
  return (
    <ButtonBase
      onClick={onOpen}
      sx={{ p: 2, borderRadius: "12px", bgcolor: "background.paper", justifyContent: "space-between", textAlign: "left", fontFamily: "inherit" }}
    >
      <Box>
        <Typography sx={{ fontSize: 17, fontWeight: 600 }}>{hasThought ? "Užbaik: pažvelk kitaip" : "Pažvelk giliau"}</Typography>
        <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
          {hasThought ? "Kaip į šią mintį pažiūrėtų draugas?" : "~2 min. Užrašyk mintį, atpažink spąstus ir pažiūrėk į ją draugo akimis."}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", color: "text.secondary" }}>
        <ChevronRight size={20} aria-hidden />
      </Box>
    </ButtonBase>
  );
};

export default GoDeeperCard;
