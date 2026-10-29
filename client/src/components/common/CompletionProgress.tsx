import { Box, Chip, LinearProgress, Stack, Typography } from "@mui/material";

type CompletionProgressProps = {
  completed: number;
  incomplete: number;
  label?: string;
  color?: string;
};

function CompletionProgress({
  completed,
  incomplete,
  label,
  color,
}: CompletionProgressProps) {
  const total = completed + incomplete;
  const progress = total > 0 ? (completed / total) * 100 : 0;
  const isComplete = total > 0 && completed === total;

  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 500, color: "text.secondary" }}
        >
          {label ? label : `${completed} of ${total} tasks `}
        </Typography>

        <Chip
          size="small"
          label={`${Math.ceil(progress)}%`}
          color={isComplete ? "success" : "default"}
          variant="outlined"
          sx={{ fontWeight: 600, color: "text.secondary", border: 0 }}
        />
      </Box>

      <LinearProgress
        variant="determinate"
        value={progress}
        aria-label={`${label} completion progress`}
        sx={{
          height: 6,
          borderRadius: 10,
          bgcolor: "action.hover",
          "& .MuiLinearProgress-bar": {
            borderRadius: 10,
            bgcolor: color
              ? color
              : isComplete
                ? "success.main"
                : "primary.main",
          },
        }}
      />
    </Stack>
  );
}

export default CompletionProgress;
