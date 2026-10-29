import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { formatCreationDate, formatRelativeTime } from "../overview.utils";

type RecentProjectItemProps = {
  projectsLength: number;
  projectTitle: string;
  projectColor: string;
  creationDate: string;
  updateDate: string;
  progress: number;
  completedTasks: number;
  totalTasks: number;
};

function RecentProjectItem({
  projectsLength,
  projectTitle,
  projectColor,
  creationDate,
  updateDate,
  progress,
  completedTasks,
  totalTasks,
}: RecentProjectItemProps) {
  return (
    <Stack
      sx={{
        flexDirection: "column",
        alignItems: { xs: "stretch", sm: "center" },
        gap: { xs: 2, sm: 2 },
        width: {
          xs: "100%",
          md: `calc(100% / ${projectsLength})`,
        },
        p: 1.5,
        bgcolor: "background.default",
        borderRadius: 2,
      }}
    >
      {/* Project name and creation date */}
      <Stack
        sx={{
          //   gap: 0.5,
          width: "100%",
          minWidth: 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          {/* <Box sx={{ color: project.color }}>
                        <FolderRoundedIcon />
                      </Box> */}

          <Typography sx={{ fontWeight: 600 }}>{projectTitle}</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "text.secondary",
          }}
        >
          <Box
          //   sx={{ color: "primary.main" }}
          >
            <CalendarMonthIcon fontSize="small" />
          </Box>

          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 0.5,
              color: "text.secondary",
            }}
          >
            {formatCreationDate(creationDate)}
          </Typography>
        </Box>
      </Stack>

      {/* Completion progress */}
      <Stack sx={{ flex: 1, width: "100%", gap: 0.75, minWidth: 0 }}>
        <Typography
          variant="caption"
          sx={{
            flexShrink: 0,
            fontWeight: 700,
            color: "text.secondary",
          }}
        >
          {progress}%
        </Typography>

        <LinearProgress
          variant="determinate"
          value={progress}
          aria-label={`${projectTitle} completion progress`}
          sx={{
            height: 6,
            borderRadius: 10,
            bgcolor: "action.hover",
            "& .MuiLinearProgress-bar": {
              bgcolor: projectColor,
              borderRadius: 10,
            },
          }}
        />
      </Stack>

      {/* Project details */}
      <Stack sx={{ gap: 1, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              width: "50%",
              color: "text.secondary",
            }}
          >
            Progress
          </Typography>

          <Typography
            variant="body2"
            sx={{ width: "50%", color: "text.primary" }}
          >
            {completedTasks}/{totalTasks} tasks completed
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "100%",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              width: "50%",
              color: "text.secondary",
            }}
          >
            Last update
          </Typography>

          <Typography variant="body2" sx={{ width: "50%", fontWeight: 500 }}>
            {formatRelativeTime(updateDate)}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}

export default RecentProjectItem;
