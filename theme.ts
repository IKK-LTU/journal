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
  shape: {
    borderRadius: 12, 
  },
  typography: {
    fontFamily: `'Geologica', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    h1: {
      fontSize: "clamp(2rem, 4.5vw, 3rem)", // ~32px–48px
      fontWeight: 700,
      lineHeight: 1.25,
    },
    h2: {
      fontSize: "clamp(1.75rem, 4vw, 2.5rem)", // ~28px–40px
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "clamp(1.5rem, 3.5vw, 2rem)", // ~24px–32px
      fontWeight: 700,
      lineHeight: 1.35,
    },
    h4: {
      fontSize: "clamp(1.25rem, 3vw, 1.75rem)", // ~20px–28px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "clamp(1rem, 2.5vw, 1.5rem)", // ~16px–24px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: "clamp(1rem, 2.5vw, 1.5rem)", // ~16px–24px
      fontWeight: 600,
      lineHeight: 1.2,
    },
    subtitle1: {
      fontSize: "1rem", // 16px
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: "0.875rem", // 14px
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: "1rem", // 16px
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem", // 14px
      fontWeight: 400,
      lineHeight: 1.43,
    },
    button: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    caption: {
      fontSize: "0.75rem", // 12px
      fontWeight: 400,
      lineHeight: 1.35,
    },
    overline: {
      fontSize: "0.625rem", // 10px
      fontWeight: 500,
      textTransform: "uppercase",
      lineHeight: 1.5,
    },
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
          borderRadius: 24,
          padding: "0.75rem 1rem",
          cursor: "pointer",
          width: ownerState.fullWidth ? "100%" : "auto",
          textTransform: "none", // preserve case
          boxShadow: "0px 2px 6px rgba(0,0,0,0.12)", // subtle, elegant shadow
          transition: "all 0.3s ease", // smooth hover
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
      },
      variants: [
        {
          props: { variant: "outlined", color: "neutral" },
          style: {
            backgroundColor: "transparent",
            border: `2px solid ${color.neutral}`,
            color: color.neutral,
            "&:hover": {
              backgroundColor: color.neutral,
              color: color.textDark,
              background: "rgba(0,0,0,0.015)",
            },
          },
        },
        {
          props: { variant: "text", color: "neutral" },
          style: {
            backgroundColor: "transparent",
            border: "none",
            color: color.neutral,
            "&:hover": {
              opacity: 0.9,
              background: "rgba(0,0,0,0.03)",
            },
          },
        },
      ],
    },
  },
});
