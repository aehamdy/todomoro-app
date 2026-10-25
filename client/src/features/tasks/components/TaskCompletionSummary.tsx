import { Box, Typography } from "@mui/material";

type TaskCompletionSummaryProps = {
  count: number;
  status: "completed" | "incomplete";
};

function TaskCompletionSummary({ count, status }: TaskCompletionSummaryProps) {
  const statusLabel =
    status === "completed" ? "Completed Tasks" : "Tasks to be completed";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography
        variant="h4"
        component="p"
        sx={{ fontWight: 700, color: "primary.main" }}
      >
        {count}
      </Typography>

      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {statusLabel}
      </Typography>
    </Box>
  );
}

export default TaskCompletionSummary;
