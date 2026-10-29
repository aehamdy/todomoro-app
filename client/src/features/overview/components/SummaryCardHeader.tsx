import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

type SummaryCardHeaderProps = {
  title: string;
  primaryIcon: ReactNode;
  accentColor: string;
};

function SummaryCardHeader({
  title,
  primaryIcon,
  accentColor,
}: SummaryCardHeaderProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box
        sx={{
          color: `${accentColor}`,
        }}
      >
        {primaryIcon}
      </Box>

      <Typography
        variant="body2"
        sx={{ fontWeight: 600, color: "text.primary" }}
      >
        {title}
      </Typography>
    </Box>
  );
}

export default SummaryCardHeader;
