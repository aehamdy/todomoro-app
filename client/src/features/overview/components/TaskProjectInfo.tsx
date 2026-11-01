import { Box, Stack, Typography } from "@mui/material";

type TaskProjectInfoProps = {
  projectColor: string | undefined;
  projectTitle: string | undefined;
};

function TaskProjectInfo({ projectColor, projectTitle }: TaskProjectInfoProps) {
  //   if (!projectTitle) return;

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 0.75,
        flexWrap: "wrap",
      }}
      useFlexGap
    >
      <Box
        sx={{
          width: 7,
          height: 7,
          flexShrink: 0,
          borderRadius: "50%",
          bgcolor: projectColor ?? "text.disabled",
        }}
      />

      <Typography variant="caption" color="text.secondary" noWrap>
        {projectTitle ?? "Tasks"}
      </Typography>
    </Stack>
  );
}

export default TaskProjectInfo;
