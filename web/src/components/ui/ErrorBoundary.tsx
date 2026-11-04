import { Component, type ErrorInfo, type ReactNode } from "react";
import { Box, Button, Typography } from "@mui/material";

type Props = { children: ReactNode };
type State = { error: Error | null };

/**
 * Catches any crash while rendering, so the user never gets a blank white screen.
 * Shows a calm message, a way back, and the technical details to send us.
 * (React needs a class component for this — there's no hook equivalent.)
 */
class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Only the error and where it happened — never what the user wrote.
    console.error("App crashed:", error, info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    const details = `${error.name}: ${error.message}\n${navigator.userAgent}`;

    return (
      <Box component="main" sx={{ maxWidth: 600, mx: "auto", px: 2, pt: 10, pb: 4 }}>
        <Typography variant="display" sx={{ fontSize: 30 }}>
          Kažkas nepavyko
        </Typography>
        <Typography sx={{ mt: 1.5, fontSize: 16, color: "text.secondary" }}>
          Atsiprašome. Tavo išsaugoti įrašai liko saugūs. Pabandyk grįžti į pradžią.
        </Typography>

        <Button variant="contained" fullWidth sx={{ mt: 4 }} onClick={() => window.location.assign("/home")}>
          Į pradžią
        </Button>

        <Typography sx={{ mt: 4, mb: 1, fontSize: 13, color: "text.secondary" }}>
          Jei kartojasi – nusiųsk šį tekstą kūrėjams:
        </Typography>
        <Box
          component="pre"
          sx={{
            m: 0,
            p: 1.5,
            borderRadius: "12px",
            bgcolor: "background.paper",
            fontSize: 12,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            userSelect: "all",
          }}
        >
          {details}
        </Box>
      </Box>
    );
  }
}

export default ErrorBoundary;
