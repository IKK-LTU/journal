import { createTheme } from "@mui/material/styles";

import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"]; // neutral behaves like primary
  }
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true; // allows <Button color="neutral" />
  }
}

const color = {
  primary: "#216259ff",
  secondary: "#FF5733",
  neutral: "#898989ff",
  textDark: "#181818ff",
  textLight: "#ffffff",
};

export const theme = createTheme({
  palette: {
    primary: { main: color.primary, contrastText: color.textLight },
    secondary: { main: color.secondary, contrastText: color.textLight },
    neutral: { main: color.neutral, contrastText: color.textLight },
    mode: "dark",
    background: {
      default: "#2a262c",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: `'Geologica', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
  },
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          fontWeight: 600,
          borderRadius: 6,
          padding: "0.5rem",
          cursor: "pointer",
          width: ownerState.fullWidth ? "100%" : "auto",
          textTransform: "none", // preserve case
        }),
        // Variants
        containedPrimary: {
          backgroundColor: color.primary,
          border: `2px solid ${color.primary}`,
          color: color.textLight,
          "&:hover": {
            opacity: 0.95,
          },
        },
        containedSecondary: {
          backgroundColor: color.secondary,
          border: `2px solid ${color.secondary}`,
          color: color.textLight,
          "&:hover": {
            opacity: 0.95,
          },
        },
        containedNeutral: {
          backgroundColor: color.neutral,
          border: `2px solid ${color.neutral}`,
          color: color.textLight,
          "&:hover": {
            opacity: 0.95,
          },
        },
        outlinedPrimary: {
          backgroundColor: "transparent",
          border: `2px solid ${color.primary}`,
          color: color.primary,
          "&:hover": {
            border: `2px solid ${color.textDark}`,
            color: color.textDark,
            backgroundColor: "rgba(0,0,0,0.015)",
          },
        },
        outlinedSecondary: {
          backgroundColor: "transparent",
          border: `2px solid ${color.secondary}`,
          color: color.secondary,
          "&:hover": {
            color: color.neutral,
            backgroundColor: "rgba(0,0,0,0.015)",
          },
        },
        outlinedNeutral: {
          backgroundColor: "transparent",
          border: `2px solid ${color.neutral}`,
          color: color.neutral,
          "&:hover": {
            backgroundColor: color.neutral,
            color: color.textDark,
            background: "rgba(0,0,0,0.015)",
          },
        },
        textPrimary: {
          backgroundColor: "transparent",
          border: "none",
          color: color.primary,
          "&:hover": {
            opacity: 0.9,
            background: "rgba(0,0,0,0.03)",
          },
        },
        textSecondary: {
          backgroundColor: "transparent",
          border: "none",
          color: color.secondary,
          "&:hover": {
            opacity: 0.9,
            background: "rgba(0,0,0,0.03)",
          },
        },
        textNeutral: {
          backgroundColor: "transparent",
          border: "none",
          color: color.neutral,
          "&:hover": {
            opacity: 0.9,
            background: "rgba(0,0,0,0.03)",
          },
        },
      },
    },
  },
});
