import { Box, Snackbar } from "@mui/material";
import { Check } from "lucide-react";

type Props = {
  message: string | null;
  onClose: () => void;
};

/** Short confirmation at the bottom ("Išsaugota"). Leaves room on the right for the + button. */
const Toast = ({ message, onClose }: Props) => {
  return (
    <Snackbar
      open={message !== null}
      autoHideDuration={2600}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      sx={{ left: 16, right: 92, bottom: 28 }}
    >
      <Box
        role="status"
        sx={{
          width: "100%",
          minHeight: 52,
          py: 1,
          pl: 1,
          pr: 2,
          borderRadius: "12px",
          bgcolor: "text.primary",
          color: "background.default",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          fontSize: 15,
        }}
      >
        <Box
          aria-hidden
          sx={{
            flex: "none",
            width: 36,
            height: 36,
            borderRadius: "50%",
            bgcolor: "primary.main",
            color: "primary.contrastText",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Check size={18} strokeWidth={3} />
        </Box>
        {message}
      </Box>
    </Snackbar>
  );
};

export default Toast;
