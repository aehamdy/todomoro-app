import { createTheme, type PaletteMode } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {
    lighter: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
  }
}

export function getAppTheme(mode: PaletteMode) {
  const isLight = mode === "light";

  return createTheme({
    palette: {
      mode,

      primary: {
        main: isLight ? "#5267DF" : "#9AA8FF",
      },

      secondary: {
        main: isLight ? "#64748B" : "#A3B2C7",
      },

      background: {
        default: isLight ? "#F7F8FC" : "#111318",
        paper: isLight ? "#FFFFFF" : "#1B1E25",
      },

      text: {
        primary: isLight ? "#202432" : "#F1F3F9",
        secondary: isLight ? "#697386" : "#A5ADBD",
      },

      divider: isLight ? "rgba(25, 35, 55, 0.12)" : "rgba(225, 230, 245, 0.12)",

      success: {
        main: "#059669",
        light: "#34D399",
        dark: "#059669",
        lighter: isLight ? "#ECFDF5" : "rgba(5, 150, 105, 0.15)",
        contrastText: "#ffffff",
      },

      warning: {
        main: "#F59E0B",
        light: "#FBBF24",
        dark: "#D97706",
        lighter: isLight ? "#FEF3C7" : "rgba(245, 158, 11, 0.15)",
        contrastText: "#FFFFFF",
      },

      error: {
        main: "#EF4444",
        light: "#F87171",
        dark: "#DC2626",
        lighter: isLight ? "#FEE2E2" : "rgba(239, 68, 68, 0.15)",
        contrastText: "#FFFFFF",
      },
    },

    shape: {
      borderRadius: 10,
    },

    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: "background-color 200ms ease, color 200ms ease",
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
    },
  });
}
