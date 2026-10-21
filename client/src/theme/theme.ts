import { createTheme, type PaletteMode } from "@mui/material/styles";

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
