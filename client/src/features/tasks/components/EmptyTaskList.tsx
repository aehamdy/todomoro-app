import { Box, Typography } from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import type { ReactNode } from "react";

type EmptyTaskListProps = {
  title?: string;
  description?: string;
  icon?: ReactNode;
};

function EmptyTaskList({
  title = "No tasks found",
  description = "You're all caught up! Enjoy your free time or add a new task to get started.",
  //   icon = <InboxOutlinedIcon sx={{ fontSize: 48, color: "text.disabled" }} />,
  icon = <InboxOutlinedIcon sx={{ fontSize: 48, color: "primary.main" }} />,
}: EmptyTaskListProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        py: 6,
        px: 2,
        my: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>

      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "600", color: "text.primary" }}
      >
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360 }}>
        {description}
      </Typography>
    </Box>
  );
}

export default EmptyTaskList;
