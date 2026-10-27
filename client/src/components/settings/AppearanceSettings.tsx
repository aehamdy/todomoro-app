import { useState } from "react";
import type { ChangeEvent } from "react";
import { Alert, Box, TextField, Typography } from "@mui/material";
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
            slotProps={{
              select: {
                native: true,
              },
            }}
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
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
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
