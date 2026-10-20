import { useState } from "react";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const themeOptions = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

function AppearanceSettings() {
  const [themeMode, setThemeMode] = useState("system");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThemeMode(event.target.value);
  };

  return (
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
            <MenuItem value={option.value}>{option.label}</MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
}

export default AppearanceSettings;
