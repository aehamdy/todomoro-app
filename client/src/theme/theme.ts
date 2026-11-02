import { createTheme } from "@mui/material/styles";
import type { ThemePreference } from "../features/auth/auth.types";

declare module "@mui/material/styles" {
  interface TypeBackground {
    sidebar: string;
  }

  interface PaletteColor {
    lighter: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
  }
}

export function getAppTheme(preference: ThemePreference) {
  const isOcean = preference === "ocean";
  const isMidnight = preference === "midnight";
  const isIvory = preference === "ivory";
  const isLavender = preference === "lavender";
  const isSunset = preference === "sunset";
  const isEmeraldDark = preference === "emerald-dark";
  const isCarbon = preference === "carbon";
  const isOliveAmber = preference === "olive-amber";
  const isCitrusGrove = preference === "citrus-grove";
  const isDesertOasis = preference === "desert-oasis";

  const isLight =
    preference === "light" ||
    isOcean ||
    isIvory ||
    isLavender ||
    isDesertOasis ||
    isSunset ||
    isOliveAmber ||
    isEmeraldDark ||
    isCitrusGrove ||
    isCarbon;

  const mode = isLight ? "light" : "dark";

  const palettes = {
    light: {
      primary: "#5267DF",
      secondary: "#64748B",
      background: "#F7F8FC",
      sidebar: "#FFFFFF",
      paper: "#FFFFFF",
      text: "#202432",
      secondaryText: "#697386",
      divider: "rgba(25, 35, 55, 0.12)",
    },
    ocean: {
      primary: "#087E8B",
      secondary: "#527D8A",
      background: "#F0F9FA",
      sidebar: "#FFFFFF",
      paper: "#FFFFFF",
      text: "#16343A",
      secondaryText: "#58777D",
      divider: "rgba(22, 72, 82, 0.14)",
    },
    desertOasis: {
      primary: "#E55812",
      secondary: "#0E4749",
      background: "#EFE7DA",
      sidebar: "#F8F2E9",
      paper: "#F8F2E9",
      text: "#002626",
      secondaryText: "#536C65",
      divider: "rgba(0, 38, 38, 0.16)",
    },
    oliveAmber: {
      primary: "#012F25",
      secondary: "#FC7D14",
      background: "#F2E8C4",
      sidebar: "#FFFBE0",
      paper: "#FFFBE0",
      text: "#012F25",
      secondaryText: "#47665B",
      divider: "rgba(1, 47, 37, 0.16)",
    },
    ivory: {
      primary: "#35342F",
      secondary: "#625E55",
      background: "#E8E3D8",
      sidebar: "#F1EDE4",
      paper: "#F1EDE4",
      text: "#292824",
      secondaryText: "#706B61",
      divider: "rgba(53, 52, 47, 0.16)",
    },
    lavender: {
      primary: "#7E22CE",
      secondary: "#A855F7",
      background: "#F3E8FF",
      sidebar: "#FAF5FF",
      paper: "#FAF5FF",
      text: "#3B0764",
      secondaryText: "#6B21A8",
      divider: "rgba(126, 34, 206, 0.18)",
    },
    sunset: {
      primary: "#FC6E20",
      secondary: "#323232",
      background: "#FFE7D0",
      sidebar: "#FFF4EA",
      paper: "#FFF4EA",
      text: "#1B1B1B",
      secondaryText: "#6B5B50",
      divider: "rgba(27, 27, 27, 0.14)",
    },
    dark: {
      primary: "#9AA8FF",
      secondary: "#A3B2C7",
      background: "#111318",
      sidebar: "#1B1E25",
      paper: "#1B1E25",
      text: "#F1F3F9",
      secondaryText: "#A5ADBD",
      divider: "rgba(225, 230, 245, 0.12)",
    },
    emeraldDark: {
      primary: "#10B981",
      secondary: "#34D399",
      background: "#090D16",
      sidebar: "#111827",
      paper: "#111827",
      text: "#F9FAFB",
      secondaryText: "#9CA3AF",
      divider: "rgba(16, 185, 129, 0.16)",
    },
    citrusGrove: {
      primary: "#FF5900",
      secondary: "#739912",
      background: "#262626",
      sidebar: "#303030",
      paper: "#303030",
      text: "#F5F5F5",
      secondaryText: "#B0B0B0",
      divider: "rgba(255, 255, 255, 0.12)",
    },
    carbon: {
      primary: "#D4D4D4",
      secondary: "#A3A3A3",
      background: "#121212",
      sidebar: "#1C1C1C",
      paper: "#1C1C1C",
      text: "#F5F5F5",
      secondaryText: "#A3A3A3",
      divider: "rgba(255,255,255,0.08)",
    },
    midnight: {
      primary: "#A78BFA",
      secondary: "#94A3D8",
      background: "#080B1A",
      sidebar: "#11162B",
      paper: "#11162B",
      text: "#F5F3FF",
      secondaryText: "#A5A3C7",
      divider: "rgba(167, 139, 250, 0.18)",
    },
  };

  const colors = isOcean
    ? palettes.ocean
    : isMidnight
      ? palettes.midnight
      : isIvory
        ? palettes.ivory
        : isLavender
          ? palettes.lavender
          : isSunset
            ? palettes.sunset
            : isEmeraldDark
              ? palettes.emeraldDark
              : isCarbon
                ? palettes.carbon
                : isOliveAmber
                  ? palettes.oliveAmber
                  : isCitrusGrove
                    ? palettes.citrusGrove
                    : isDesertOasis
                      ? palettes.desertOasis
                      : isLight
                        ? palettes.light
                        : palettes.dark;

  return createTheme({
    palette: {
      mode,
      primary: {
        main: colors.primary,
      },
      secondary: {
        main: colors.secondary,
      },
      background: {
        default: colors.background,
        paper: colors.paper,
        sidebar: colors.sidebar,
      },
      text: {
        primary: colors.text,
        secondary: colors.secondaryText,
      },
      divider: colors.divider,

      success: {
        main: "#059669",
        light: "#34D399",
        dark: "#059669",
        lighter: isLight ? "#ECFDF5" : "rgba(5, 150, 105, 0.15)",
        contrastText: "#FFFFFF",
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

    // components: {
    //   MuiCssBaseline: {
    //     styleOverrides: {
    //       body: {
    //         transition: "background-color 200ms ease, color 200ms ease",
    //       },
    //     },
    //   },
    //   MuiPaper: {
    //     styleOverrides: {
    //       root: {
    //         backgroundImage: "none",
    //       },
    //     },
    //   },
    // },
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
            ...(isMidnight && {
              borderColor: "rgba(167, 139, 250, 0.12)",
            }),
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            ...(isMidnight && {
              backgroundImage:
                "linear-gradient(145deg, #151B35 0%, #11162B 100%)",
              border: "1px solid rgba(167, 139, 250, 0.12)",
            }),
          },
        },
      },
    },
  });
}
