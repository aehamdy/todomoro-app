import { useState } from "react";
import type { ChangeEvent } from "react";
import { Alert, Box, MenuItem, TextField, Typography } from "@mui/material";
import type { ThemePreference } from "../../features/auth/auth.types";
import { useAppTheme } from "../../theme/AppThemeProvider";
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
  const { themePreference, setThemePreference } = useAppTheme();
  const updatePreferences = useUpdateUserPreferences();

  const [saveError, setSaveError] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextTheme = event.target.value as ThemePreference;
    const previousTheme = themePreference;

    setSaveError(false);

    // Apply the new theme immediately.
    setThemePreference(nextTheme);

    // Persist the preference in the backend.
    updatePreferences.mutate(nextTheme, {
      onSuccess: () => {
        setSaveError(false);
      },
      onError: () => {
        // Restore the previous theme if saving fails.
        setThemePreference(previousTheme);
        setSaveError(true);
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
            value={themePreference}
            onChange={handleChange}
            size="small"
            disabled={updatePreferences.isPending}
            sx={{
              width: 200,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "divider",
                },
                "&:hover fieldset": {
                  borderColor: "text.secondary",
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

      {saveError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Failed to save your theme preference. Your previous theme has been
          restored. Please try again.
        </Alert>
      )}
    </Box>
  );
}

export default AppearanceSettings;
