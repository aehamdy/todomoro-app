import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";
import useScreenshotMode from "../../../hooks/useScreenshotMode";

type SummaryCardMessageProps = {
  value: number;
  accentColor: string;
  secondaryIcon: ReactNode;
  message: string;
};

function SummaryCardMessage({
  value,
  accentColor,
  secondaryIcon,
  message,
}: SummaryCardMessageProps) {
  const isScreenshotMode = useScreenshotMode();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      {value > 0 && (
        <Box className="card-secondary-icon" sx={{ color: accentColor }}>
          {secondaryIcon}
        </Box>
      )}

      <Typography
        className="card-message-text"
        sx={{
          // fontSize: { xs: 10, md: 14 },
          fontSize: isScreenshotMode ? { xs: 10, md: 13 } : { xs: 10, md: 14 },
          color: "text.secondary",
          transition: "color 0.2s ease",
        }}
      >
        {message}
      </Typography>
    </Box>
  );
}

export default SummaryCardMessage;
