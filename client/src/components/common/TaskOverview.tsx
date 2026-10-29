import { Box, Paper, Stack, Typography } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import CompletionProgress from "./CompletionProgress";

type TaskOverviewProps = {
  completed: number;
  incomplete: number;
};

function TaskOverview({ completed, incomplete }: TaskOverviewProps) {
  return (
    <Paper
      elevation={3}
      sx={{
        py: { xs: 2, md: 3 },
        px: { xs: 3, md: 4 },
        borderRadius: { xs: 2, md: 3 },
      }}
    >
      <Stack sx={{ gap: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          <Typography>Task Overview</Typography>

          <BarChartIcon />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "space-around", md: "space-evenly" },
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: "16px",
                color: "text.secondary",
              }}
            >
              <CheckCircleOutlineIcon color="primary" />
              Completed
            </Typography>

            <Typography
              variant="h4"
              component="p"
              sx={{ fontSize: "42px", color: "primary.main" }}
            >
              {completed}
            </Typography>

            <Typography
              variant="body2"
              sx={{ fontSize: "16px", color: "text.secondary" }}
            >
              Tasks finished
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: "16px",
                color: "text.secondary",
              }}
            >
              <RadioButtonUncheckedIcon color="primary" />
              Remaining
            </Typography>

            <Typography
              variant="h4"
              component="p"
              sx={{ fontSize: "42px", color: "primary.main" }}
            >
              {incomplete}
            </Typography>

            <Typography
              variant="body2"
              sx={{ fontSize: "16px", color: "text.secondary" }}
            >
              Tasks to do
            </Typography>
          </Box>
        </Box>

        <CompletionProgress
          completed={completed}
          incomplete={incomplete}
          label={`${completed} of ${completed + incomplete} tasks completed`}
        />
      </Stack>
    </Paper>
  );
}

export default TaskOverview;
