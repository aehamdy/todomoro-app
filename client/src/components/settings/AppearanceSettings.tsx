import { useState } from "react";
import { Alert, Box, MenuItem, TextField, Typography } from "@mui/material";
import type { ThemePreference } from "../../features/auth/auth.types";
import { useAppTheme } from "../../theme/AppThemeProvider";
import { useUpdateUserPreferences } from "../../features/auth/useUpdateUserPreferences";

const themeOptions: {
  label: string;
  value: ThemePreference;
}[] = [
  // light themes
  { label: "Light", value: "light" },
  { label: "Ocean Light", value: "ocean" },
  { label: "Ivory Light", value: "ivory" },
  { label: "Lavender Light", value: "lavender" },
  { label: "Sunset Ember", value: "sunset" },
  { label: "Desert Oasis", value: "desert-oasis" },
  { label: "Olive Amber", value: "olive-amber" },
  // dark themes
  { label: "Dark", value: "dark" },
  { label: "Midnight Dark", value: "midnight" },
  { label: "Emerald Dark", value: "emerald-dark" },
  { value: "citrus-grove", label: "Citrus Grove" },
  { label: "Carbon", value: "carbon" },
  // system
  { label: "System", value: "system" },
];

function AppearanceSettings() {
  const { themePreference, setThemePreference } = useAppTheme();
  const updatePreferences = useUpdateUserPreferences();

  const [saveError, setSaveError] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextTheme = event.target.value as ThemePreference;
    const previousTheme = themePreference;

    setSaveError(false);
    setThemePreference(nextTheme);

    updatePreferences.mutate(
      { theme: nextTheme },
      {
        onSuccess: () => {
          setSaveError(false);
        },
        onError: () => {
          setThemePreference(previousTheme);
          setSaveError(true);
        },
      },
    );
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
