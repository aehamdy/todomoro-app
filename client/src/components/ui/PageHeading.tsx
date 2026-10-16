import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

type PageHeadingProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

function PageHeading({ title, description, action }: PageHeadingProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{
        alignItems: { xs: "stretch", sm: "center" },
        justifyContent: "space-between",
        mb: 3,
      }}
    >
      <Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>

        {description && (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            {description}
          </Typography>
        )}
      </Box>

      {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
    </Stack>
  );
}

export default PageHeading;
