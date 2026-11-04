import { Box, Button, Dialog, Typography } from "@mui/material";

type Props = {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

/** Deleting is permanent, so it's always confirmed. */
const DeleteEntryDialog = ({ isOpen, onCancel, onConfirm }: Props) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="delete-entry-title"
      fullWidth
      slotProps={{ paper: { sx: { m: 2, p: 3, borderRadius: "16px", bgcolor: "background.default" } } }}
    >
      <Typography id="delete-entry-title" variant="display" component="h2" sx={{ fontSize: 26, mb: 3.5 }}>
        Ištrinti šį įrašą visam laikui?
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button variant="text" onClick={onCancel} sx={{ color: "text.secondary", px: 1, ml: -1 }}>
          Atšaukti
        </Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Ištrinti
        </Button>
      </Box>
    </Dialog>
  );
};

export default DeleteEntryDialog;
