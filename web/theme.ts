import type { CSSProperties } from "react";
import { createTheme } from "@mui/material/styles";

// Palette matches the landing page (src/pages/welcome.styles.ts).
// Quiet text is a bit darker than the landing greys so it passes 4.5:1 contrast.

declare module "@mui/material/styles" {
  interface Palette {
    accentSoft: string; // soft sage behind emotion icons
    track: string; // empty circles, progress track, unselected numbers
  }
  interface PaletteOptions {
    accentSoft?: string;
    track?: string;
  }
  interface TypographyVariants {
    display: CSSProperties;
  }
  interface TypographyVariantsOptions {
    display?: CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    display: true;
  }
}

export const SERIF_FONT = "'Iowan Old Style', 'Apple Garamond', Baskerville, Georgia, serif";
const SANS_FONT = "'Geologica', system-ui, -apple-system, 'Segoe UI', sans-serif";

export const theme = createTheme({
  // CSS variables + a class on <html> ("light" / "dark") let the user switch themes
  // without re-rendering everything. index.html sets the class before first paint.
  cssVariables: { colorSchemeSelector: "class" },
  colorSchemes: {
    light: {
      palette: {
        background: { default: "#F6F4F0", paper: "#FFFFFF" },
        text: { primary: "#1D1C1A", secondary: "#6E6B66" },
        primary: { main: "#5A7A5C", contrastText: "#FFFFFF" },
        error: { main: "#A23B2A", contrastText: "#FFFFFF" },
        accentSoft: "#EBF1EB",
        track: "#E4E0D9",
      },
    },
    dark: {
      palette: {
        background: { default: "#131210", paper: "#1C1A17" },
        text: { primary: "#EAE7E2", secondary: "#9C9891" },
        primary: { main: "#6E9870", contrastText: "#131210" },
        error: { main: "#E8917F", contrastText: "#131210" },
        accentSoft: "#1C2A1C",
        track: "#2A2820",
      },
    },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: SANS_FONT,
    display: {
      fontFamily: SERIF_FONT,
      fontWeight: 400,
      fontSize: "2.25rem",
      lineHeight: 1.15,
      letterSpacing: "-0.01em",
    },
    button: { textTransform: "none", fontWeight: 500, fontSize: "1.0625rem" },
  },
  components: {
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, minHeight: 52, paddingInline: 28 },
      },
    },
    MuiTypography: {
      defaultProps: { variantMapping: { display: "h1" } },
    },
    MuiPaper: {
      // Dark-mode MUI paper adds a white overlay gradient; we want the flat token color.
      styleOverrides: { root: { backgroundImage: "none" } },
    },
  },
});
