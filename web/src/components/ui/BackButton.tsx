import { IconButton } from "@mui/material";
import { ChevronLeft } from "lucide-react";

type Props = {
  onClick: () => void;
  label?: string;
};

const BackButton = ({ onClick, label = "Atgal" }: Props) => {
  return (
    <IconButton aria-label={label} onClick={onClick} sx={{ width: 44, height: 44, ml: -1, color: "text.primary" }}>
      <ChevronLeft size={24} strokeWidth={1.8} aria-hidden />
    </IconButton>
  );
};

export default BackButton;
