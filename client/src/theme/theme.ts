import { alpha, createTheme } from "@mui/material/styles";
import type { ThemePreference } from "../features/auth/auth.types";

/*  MUI module augmentation  */

declare module "@mui/material/styles" {
  interface TypeBackground {
    /** Sidebar / navigation rail surface */
    sidebar: string;
    /** Dialogs, menus, popovers: the highest surface level */
    elevated: string;
    /** Text fields, selects, and other input containers */
    input: string;
  }

  interface PaletteColor {
    /** Soft tinted background for badges, alerts, chips, selected rows */
    lighter: string;
    /** Foreground that is readable on top of `lighter` */
    onLighter: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
    onLighter?: string;
  }

  interface Palette {
    /** Subtle, decorative border (cards, panels, separators between surfaces) */
    border: string;
    /** Strong border for interactive controls (>= 3:1 against its surface) */
    borderStrong: string;
    /** Subtle highlighted background (today's tasks, active rows, callouts) */
    highlight: string;
  }

  interface PaletteOptions {
    border?: string;
    borderStrong?: string;
    highlight?: string;
  }
}

/*  Palette definition types  */
interface Tone {
  lighter: string;
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

interface SemanticTone extends Tone {
  onLighter: string;
}

interface ThemeDefinition {
  mode: "light" | "dark";
  primary: Tone;
  secondary: Tone;
  background: {
    default: string;
    sidebar: string;
    paper: string;
    elevated: string;
    input: string;
  };
  text: { primary: string; secondary: string; disabled: string };
  divider: string;
  border: string;
  borderStrong: string;
  highlight: string;
}

interface SemanticSet {
  success: SemanticTone;
  warning: SemanticTone;
  error: SemanticTone;
  info: SemanticTone;
}

/*  Semantic colors (shared by all light themes / all dark themes)  */
const SEMANTIC: Record<"light" | "dark", SemanticSet> = {
  light: {
    success: {
      lighter: "#E3F4EA",
      light: "#4CAF7D",
      main: "#36BC9B",
      dark: "#14573A",
      contrastText: "#FFFFFF",
      onLighter: "#0F4A2F",
    },
    warning: {
      lighter: "#FEF0D2",
      light: "#E0A030",
      main: "#F8BA43",
      dark: "#6B3205",
      contrastText: "#FFFFFF",
      onLighter: "#6B3A06",
    },
    error: {
      lighter: "#FDE6E6",
      light: "#E57373",
      main: "#D32F2F",
      dark: "#D94555",
      contrastText: "#FFFFFF",
      onLighter: "#7F1D1D",
    },
    info: {
      lighter: "#E1F0FB",
      light: "#4F9BD6",
      main: "#4B89DC",
      dark: "#0F4A7A",
      contrastText: "#FFFFFF",
      onLighter: "#0D3F66",
    },
  },
  dark: {
    success: {
      lighter: "#13301F",
      light: "#7BDDA6",
      main: "#48CFAE",
      dark: "#2A9460",
      contrastText: "#07140D",
      onLighter: "#9BE8BB",
    },
    warning: {
      lighter: "#3A2A0B",
      light: "#F8D283",
      main: "#FFCE55",
      dark: "#C98F14",
      contrastText: "#1A1204",
      onLighter: "#FBD38D",
    },
    error: {
      lighter: "#3C1717",
      light: "#FCA5A5",
      main: "#EF5350",
      dark: "#D44A4A",
      contrastText: "#1C0707",
      onLighter: "#FCA5A5",
    },
    info: {
      lighter: "#112C40",
      light: "#9BD0F5",
      main: "#5D9CEC",
      dark: "#3A8CC4",
      contrastText: "#06151F",
      onLighter: "#A5D8FA",
    },
  },
};

/*  Theme palettes  */
type ThemeKey = Exclude<ThemePreference, "system">;

const THEMES: Record<ThemeKey, ThemeDefinition> = {
  /* ---------- LIGHT THEMES ---------- */
  light: {
    mode: "light",
    primary: {
      lighter: "#E6EAFB",
      light: "#6A7BE0",
      main: "#3F51C7",
      dark: "#2B3A9E",
      contrastText: "#FFFFFF",
    },
    secondary: {
      lighter: "#E8ECF2",
      light: "#7A879B",
      main: "#475569",
      dark: "#2F3A4A",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F2F4F9",
      sidebar: "#FAFBFD",
      paper: "#FFFFFF",
      elevated: "#FFFFFF",
      input: "#F8F9FC",
    },
    text: { primary: "#1B2033", secondary: "#4B5468", disabled: "#8A92A4" },
    divider: "rgba(27, 32, 51, 0.12)",
    border: "#DDE2EC",
    borderStrong: "#7C869A",
    highlight: "#EEF1FC",
  },
  ocean: {
    mode: "light",
    primary: {
      lighter: "#DDF0F2",
      light: "#3A9AA8",
      main: "#0B6B79",
      dark: "#07505B",
      contrastText: "#FFFFFF",
    },
    secondary: {
      lighter: "#E0EBF5",
      light: "#5B8DB8",
      main: "#2D6190",
      dark: "#1E4569",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#E6F1F3",
      sidebar: "#F4FAFB",
      paper: "#FBFEFE",
      elevated: "#FFFFFF",
      input: "#F0F7F8",
    },
    text: { primary: "#0F2D33", secondary: "#44636B", disabled: "#8AA3A9" },
    divider: "rgba(15, 45, 51, 0.12)",
    border: "#CDE0E4",
    borderStrong: "#6F8F96",
    highlight: "#DCEEF1",
  },
  "desert-oasis": {
    mode: "light",
    primary: {
      lighter: "#F8E3D6",
      light: "#D9703B",
      main: "#A33E0C",
      dark: "#762D08",
      contrastText: "#FFFFFF",
    },
    secondary: {
      lighter: "#D9ECE9",
      light: "#3F9C96",
      main: "#0E6560",
      dark: "#094845",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#EDE3D0",
      sidebar: "#F6EFE2",
      paper: "#FBF7EE",
      elevated: "#FFFCF6",
      input: "#F3ECDD",
    },
    text: { primary: "#261E15", secondary: "#5B5244", disabled: "#A09681" },
    divider: "rgba(38, 30, 21, 0.14)",
    border: "#DDD0B8",
    borderStrong: "#8A7C63",
    highlight: "#F4E4CC",
  },
  "olive-amber": {
    mode: "light",
    primary: {
      lighter: "#E8EDD3",
      light: "#8A9E4B",
      main: "#566A1F",
      dark: "#3B4A12",
      contrastText: "#FFFFFF",
    },
    secondary: {
      lighter: "#F9E8CC",
      light: "#D98A2B",
      main: "#964F04",
      dark: "#6E3A03",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#ECE8CF",
      sidebar: "#F6F3E1",
      paper: "#FBF9EC",
      elevated: "#FFFDF4",
      input: "#F2EFD9",
    },
    text: { primary: "#252A0F", secondary: "#585D38", disabled: "#A0A27F" },
    divider: "rgba(37, 42, 15, 0.14)",
    border: "#D9D6B6",
    borderStrong: "#7A7F4F",
    highlight: "#EFEBC8",
  },
  ivory: {
    mode: "light",
    primary: {
      lighter: "#EDE5D8",
      light: "#8C7960",
      main: "#5A4A36",
      dark: "#3E3224",
      contrastText: "#FFFFFF",
    },
    secondary: {
      lighter: "#F2E6D3",
      light: "#B58A55",
      main: "#85591F",
      dark: "#624219",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#EAE5DA",
      sidebar: "#F4F0E7",
      paper: "#FAF8F2",
      elevated: "#FFFEFA",
      input: "#F1EDE2",
    },
    text: { primary: "#2A2823", secondary: "#5C584E", disabled: "#A39E92" },
    divider: "rgba(42, 40, 35, 0.13)",
    border: "#DAD4C5",
    borderStrong: "#8A8372",
    highlight: "#EFE8D6",
  },
  lavender: {
    mode: "light",
    primary: {
      lighter: "#EBE3FA",
      light: "#9B76E6",
      main: "#6B3FC9",
      dark: "#4C2A9A",
      contrastText: "#FFFFFF",
    },
    secondary: {
      lighter: "#F5E3F2",
      light: "#C379BA",
      main: "#99448F",
      dark: "#6E2F66",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#EFE9F8",
      sidebar: "#F7F3FC",
      paper: "#FCFAFF",
      elevated: "#FFFFFF",
      input: "#F4F0FB",
    },
    text: { primary: "#251A3D", secondary: "#594C77", disabled: "#A398BD" },
    divider: "rgba(37, 26, 61, 0.12)",
    border: "#DED5F0",
    borderStrong: "#8577A8",
    highlight: "#E8DFFA",
  },
  sunset: {
    mode: "light",
    primary: {
      lighter: "#FDE3D3",
      light: "#E8743A",
      main: "#B03A06",
      dark: "#832C04",
      contrastText: "#FFFFFF",
    },
    secondary: {
      lighter: "#F5E0EB",
      light: "#B86B93",
      main: "#8A3B64",
      dark: "#632745",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FBEADC",
      sidebar: "#FFF4EA",
      paper: "#FFFAF5",
      elevated: "#FFFDFA",
      input: "#FFF1E4",
    },
    text: { primary: "#2A1913", secondary: "#6A4D40", disabled: "#B09A8E" },
    divider: "rgba(42, 25, 19, 0.13)",
    border: "#EFD6C2",
    borderStrong: "#A07E6A",
    highlight: "#FDE6D2",
  },

  /* ---------- DARK THEMES ---------- */
  dark: {
    mode: "dark",
    primary: {
      lighter: "#1F2A47",
      light: "#A5BEFF",
      main: "#7DA2FF",
      dark: "#5580E0",
      contrastText: "#0B1020",
    },
    secondary: {
      lighter: "#232A36",
      light: "#B5C2D4",
      main: "#8FA1BA",
      dark: "#6B7D96",
      contrastText: "#10131A",
    },
    background: {
      default: "#111317",
      sidebar: "#171A1F",
      paper: "#1C1F26",
      elevated: "#242832",
      input: "#14171C",
    },
    text: { primary: "#E8EAF0", secondary: "#A7AFBF", disabled: "#646C7C" },
    divider: "rgba(232, 234, 240, 0.12)",
    border: "#2B303A",
    borderStrong: "#6C7588",
    highlight: "#222A3F",
  },
  "emerald-dark": {
    mode: "dark",
    primary: {
      lighter: "#12332A",
      light: "#6EE7B7",
      main: "#34D399",
      dark: "#10A072",
      contrastText: "#04170F",
    },
    secondary: {
      lighter: "#17302B",
      light: "#A5DCCF",
      main: "#7CC9B8",
      dark: "#55A592",
      contrastText: "#05140F",
    },
    background: {
      default: "#09130F",
      sidebar: "#0E1C17",
      paper: "#12241E",
      elevated: "#1A302A",
      input: "#0C1814",
    },
    text: { primary: "#E5F1EC", secondary: "#9BB7AC", disabled: "#5E7A6F" },
    divider: "rgba(229, 241, 236, 0.12)",
    border: "#1F362F",
    borderStrong: "#5C8073",
    highlight: "#153A2F",
  },
  "citrus-grove": {
    mode: "dark",
    primary: {
      lighter: "#3D2A1B",
      light: "#FFAA70",
      main: "#FF8C42",
      dark: "#E06A1B",
      contrastText: "#1A0F06",
    },
    secondary: {
      lighter: "#2E3519",
      light: "#C3DE7D",
      main: "#A8CB4A",
      dark: "#86A82E",
      contrastText: "#121706",
    },
    background: {
      default: "#1D1F17",
      sidebar: "#25281D",
      paper: "#2A2E21",
      elevated: "#343929",
      input: "#20231A",
    },
    text: { primary: "#F2F0E4", secondary: "#BCBEA6", disabled: "#7A7D68" },
    divider: "rgba(242, 240, 228, 0.12)",
    border: "#3A3F2D",
    borderStrong: "#7D8265",
    highlight: "#3A3425",
  },
  carbon: {
    mode: "dark",
    primary: {
      lighter: "#2A2A2E",
      light: "#F2F2F4",
      main: "#E2E2E6",
      dark: "#B8B8BF",
      contrastText: "#111113",
    },
    secondary: {
      lighter: "#232326",
      light: "#BDBDC5",
      main: "#9C9CA6",
      dark: "#7A7A84",
      contrastText: "#111113",
    },
    background: {
      default: "#0E0E10",
      sidebar: "#151517",
      paper: "#1A1A1D",
      elevated: "#232327",
      input: "#121214",
    },
    text: { primary: "#F0F0F2", secondary: "#A8A8B0", disabled: "#66666E" },
    divider: "rgba(240, 240, 242, 0.10)",
    border: "#2A2A2E",
    borderStrong: "#707078",
    highlight: "#26262A",
  },
  midnight: {
    mode: "dark",
    primary: {
      lighter: "#2A2560",
      light: "#C4B5FD",
      main: "#A78BFA",
      dark: "#8466E8",
      contrastText: "#120B2B",
    },
    secondary: {
      lighter: "#1C2757",
      light: "#A5BEFA",
      main: "#7FA3F5",
      dark: "#5C84DA",
      contrastText: "#08102A",
    },
    background: {
      default: "#090D20",
      sidebar: "#0F1431",
      paper: "#141A3B",
      elevated: "#1C2349",
      input: "#0B1028",
    },
    text: { primary: "#EEF0FF", secondary: "#A9AFD6", disabled: "#626A99" },
    divider: "rgba(238, 240, 255, 0.12)",
    border: "#232B58",
    borderStrong: "#6A72A8",
    highlight: "#1E2552",
  },
};

/**
 * Preference identifiers are persisted (DB / auth types) and are kebab-case,
 * while the palette keys above are camelCase. This map keeps both stable.
 */
const PREFERENCE_TO_KEY: Record<string, keyof typeof THEMES | undefined> = {
  light: "light",
  ocean: "ocean",
  "desert-oasis": "desert-oasis",
  "olive-amber": "olive-amber",
  ivory: "ivory",
  lavender: "lavender",
  sunset: "sunset",
  dark: "dark",
  "emerald-dark": "emerald-dark",
  "citrus-grove": "citrus-grove",
  carbon: "carbon",
  midnight: "midnight",
};

function resolveDefinition(preference: string): ThemeDefinition {
  const key = PREFERENCE_TO_KEY[preference];
  // Unknown / legacy values fall back to the dark theme (previous behaviour).
  return key ? THEMES[key] : THEMES.dark;
}

/** Single source of truth for light/dark classification. */
export function isDarkPreference(preference: ThemePreference): boolean {
  return resolveDefinition(preference).mode === "dark";
}

/* -------------------------------------------------------------------------- */
/*  Theme factory                                                             */
/* -------------------------------------------------------------------------- */

export function getAppTheme(preference: ThemePreference) {
  const t = resolveDefinition(preference);
  const mode = t.mode;
  const isDark = mode === "dark";
  const semantic = SEMANTIC[mode];

  const hoverOpacity = isDark ? 0.1 : 0.06;
  const selectedOpacity = isDark ? 0.18 : 0.12;
  const focusOpacity = isDark ? 0.24 : 0.16;

  return createTheme({
    palette: {
      mode,
      primary: t.primary,
      secondary: t.secondary,
      background: t.background,
      text: t.text,
      divider: t.divider,
      border: t.border,
      borderStrong: t.borderStrong,
      highlight: t.highlight,

      success: semantic.success,
      warning: semantic.warning,
      error: semantic.error,
      info: semantic.info,

      action: {
        active: t.text.secondary,
        hover: alpha(t.primary.main, hoverOpacity),
        hoverOpacity,
        selected: alpha(t.primary.main, selectedOpacity),
        selectedOpacity,
        focus: alpha(t.primary.main, focusOpacity),
        focusOpacity,
        disabled: t.text.disabled,
        disabledBackground: alpha(t.text.primary, 0.1),
        disabledOpacity: 0.38,
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
          "::selection": {
            backgroundColor: alpha(t.primary.main, isDark ? 0.4 : 0.25),
          },
        },
      },

      // Remove MUI's dark-mode elevation overlay so our surface tokens rule.
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: "none" },
          outlined: { borderColor: t.border },
        },
      },

      MuiCard: {
        defaultProps: { variant: "outlined" },
        styleOverrides: {
          root: { borderColor: t.border },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: t.background.sidebar,
            borderColor: t.border,
          },
        },
      },

      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: t.background.elevated,
            border: `1px solid ${t.border}`,
          },
        },
      },

      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: t.background.elevated,
            border: `1px solid ${t.border}`,
          },
        },
      },

      MuiPopover: {
        styleOverrides: {
          paper: {
            backgroundColor: t.background.elevated,
          },
        },
      },

      MuiDivider: {
        styleOverrides: { root: { borderColor: t.divider } },
      },

      MuiButton: {
        styleOverrides: {
          root: { boxShadow: "none", "&:hover": { boxShadow: "none" } },
          outlined: {
            borderColor: t.borderStrong,
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: t.background.input,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: t.borderStrong,
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: t.text.secondary,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: t.primary.main,
              borderWidth: 2,
            },
          },
        },
      },

      MuiCheckbox: {
        styleOverrides: {
          root: { color: t.borderStrong },
        },
      },

      MuiListItemButton: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              backgroundColor: alpha(t.primary.main, selectedOpacity),
              "&:hover": {
                backgroundColor: alpha(t.primary.main, selectedOpacity + 0.04),
              },
            },
          },
        },
      },

      MuiTabs: {
        styleOverrides: {
          indicator: { height: 3, borderRadius: 3 },
        },
      },

      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
            "&.Mui-selected": { color: t.primary.main },
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          outlined: { borderColor: t.borderStrong },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: isDark ? t.background.elevated : t.text.primary,
            color: isDark ? t.text.primary : t.background.paper,
            border: isDark ? `1px solid ${t.border}` : "none",
            fontSize: "0.75rem",
          },
        },
      },

      // Standard alerts use the tinted `lighter` surface + `onLighter` text for
      // every severity so contrast is guaranteed in all 12 themes.
      MuiAlert: {
        styleOverrides: {
          root: ({ ownerState }) => {
            // Leave filled / outlined variants to MUI's defaults.
            if (ownerState.variant && ownerState.variant !== "standard") {
              return {};
            }
            const tone =
              semantic[ownerState.color ?? ownerState.severity ?? "success"];
            return {
              backgroundColor: tone.lighter,
              color: tone.onLighter,
              border: `1px solid ${alpha(tone.main, 0.35)}`,
              "& .MuiAlert-icon": { color: tone.main },
            };
          },
        },
      },
    },
  });
}
