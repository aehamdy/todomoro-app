/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { Alert, Box, MenuItem, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import type { ThemePreference } from "../../features/auth/auth.types";
import { useAuth } from "../../features/auth/useAuth";
import { useUpdateUserPreferences } from "../../features/auth/useUpdateUserPreferences";

const themeOptions: {
  label: string;
  value: ThemePreference;
}[] = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

function AppearanceSettings() {
  const { user } = useAuth();
  const updatePreferences = useUpdateUserPreferences();

  const savedTheme = user?.preferences?.theme ?? "system";
  const [themeMode, setThemeMode] = useState<ThemePreference>(savedTheme);

  useEffect(() => {
    setThemeMode(savedTheme);
  }, [savedTheme]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextTheme = event.target.value as ThemePreference;

    setThemeMode(nextTheme);

    updatePreferences.mutate(nextTheme, {
      onError: () => {
        setThemeMode(savedTheme);
      },
    });
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
        <Box sx={{ width: 110, flexShrink: 0 }}>
          <Typography>Theme</Typography>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <TextField
            select
            value={themeMode}
            onChange={handleChange}
            size="small"
            disabled={updatePreferences.isPending}
            sx={{
              width: 200,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: grey[300],
                },
                "&:hover fieldset": {
                  borderColor: grey[400],
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
          >
            {themeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>

      {updatePreferences.isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Failed to save your theme preference. Please try again.
        </Alert>
      )}
    </Box>
  );
}

export default AppearanceSettings;
