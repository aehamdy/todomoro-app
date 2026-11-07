/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
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
  const [themePreference, setThemePreference] =
    useState<ThemePreference>("system");

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  // Resolve the selected preference into the appropriate palette.
  const resolvedTheme: ThemePreference =
    themePreference === "system"
      ? prefersDarkMode
        ? "dark"
        : "light"
      : themePreference;

  const theme = useMemo(() => getAppTheme(resolvedTheme), [resolvedTheme]);

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
