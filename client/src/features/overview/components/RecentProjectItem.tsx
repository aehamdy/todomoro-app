import { Box, Stack, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { formatCreationDate, formatRelativeTime } from "../overview.utils";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/paths";
import CompletionProgress from "../../../components/common/CompletionProgress";

type RecentProjectItemProps = {
  projectId: string;
  projectsLength: number;
  projectTitle: string;
  projectColor: string;
  creationDate: string;
  updateDate: string;
  incompleteTasks: number;
  completedTasks: number;
};

function RecentProjectItem({
  projectId,
  projectsLength,
  projectTitle,
  projectColor,
  creationDate,
  updateDate,
  incompleteTasks,
  completedTasks,
}: RecentProjectItemProps) {
  const navigate = useNavigate();

  const totalTasks = completedTasks + incompleteTasks;

  const handleClick = () => {
    navigate(ROUTES.projectById(projectId));
  };

  return (
    <Stack
      onClick={handleClick}
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
        cursor: "pointer",
        transition: "background-color 150ms ease",
        "&:hover": {
          bgcolor: "action.hover",
        },
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "primary.main",
          outlineOffset: 2,
        },

        "&:hover .project-navigation-icon": {
          opacity: 1,
          transform: "translateX(0)",
          color: "primary.main",
        },
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>{projectTitle}</Typography>

          <ArrowForwardRoundedIcon
            className="project-navigation-icon"
            fontSize="small"
            sx={{
              flexShrink: 0,
              color: "text.secondary",
              opacity: 0.5,
              transform: "translateX(-4px)",
              transition: "opacity 150ms ease, transform 150ms ease",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "text.secondary",
          }}
        >
          <Box>
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

      <CompletionProgress
        completed={completedTasks}
        incomplete={incompleteTasks}
        color={projectColor}
      />

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
