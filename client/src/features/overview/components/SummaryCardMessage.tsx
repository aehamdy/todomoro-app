import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

type SummaryCardMessageProps = {
  accentColor: string;
  secondaryIcon: ReactNode;
  message: string;
};

function SummaryCardMessage({
  accentColor,
  secondaryIcon,
  message,
}: SummaryCardMessageProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Box className="card-secondary-icon" sx={{ color: accentColor }}>
        {secondaryIcon}
      </Box>

      <Typography
        className="card-message-text"
        sx={{
          fontSize: { xs: 10, md: 14 },
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
