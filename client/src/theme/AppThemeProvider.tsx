/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material/styles";
import { useAuth } from "../features/auth/useAuth";
import type { ThemePreference } from "../features/auth/auth.types";
import { getAppTheme } from "./theme";

type AppThemeContextValue = {
  themePreference: ThemePreference;
  setThemePreference: (theme: ThemePreference) => void;
};

const AppThemeContext = createContext<AppThemeContextValue | undefined>(
  undefined,
);

type AppThemeProviderProps = {
  children: ReactNode;
};

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  const { user } = useAuth();

  const savedTheme = user?.preferences?.theme ?? "system";

  const [themePreference, setThemePreference] =
    useState<ThemePreference>(savedTheme);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    setThemePreference(savedTheme);
  }, [savedTheme]);

  const resolvedMode: PaletteMode =
    themePreference === "system"
      ? prefersDarkMode
        ? "dark"
        : "light"
      : themePreference;

  const theme = useMemo(() => getAppTheme(resolvedMode), [resolvedMode]);

  const contextValue = useMemo(
    () => ({
      themePreference,
      setThemePreference,
    }),
    [themePreference],
  );

  return (
    <AppThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(AppThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used within an AppThemeProvider");
  }

  return context;
}
