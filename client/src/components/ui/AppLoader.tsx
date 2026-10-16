import { Box, CircularProgress, Typography } from "@mui/material";

type AppLoaderProps = {
  message?: string;
  ariaLabel?: string;
  minHeight?: number | string;
  size?: number;
};

function AppLoader({
  message = "Loading...",
  ariaLabel = "Loading...",
  minHeight = 200,
  size = 36,
}: AppLoaderProps) {
  return (
    <Box
      role="status"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        minHeight,
        py: 3,
      }}
    >
      <CircularProgress size={size} aria-label={ariaLabel} />
      <Typography color="text.secondary" variant="body2">
        {message}
      </Typography>
    </Box>
  );
}

export default AppLoader;
