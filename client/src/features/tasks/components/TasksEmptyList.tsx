import { Box, Typography } from "@mui/material";

function TasksEmptyList() {
  return (
    <Box sx={{ py: 4, textAlign: "center" }}>
      <Typography sx={{ fontWeight: 600 }}>No tasks yet</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Your tasks will appear here when you create them.
      </Typography>
    </Box>
  );
}

export default TasksEmptyList;
