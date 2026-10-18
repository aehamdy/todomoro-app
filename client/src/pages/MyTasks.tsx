import { Box, Paper, Stack, Typography } from "@mui/material";
import TaskList from "../features/tasks/components/TaskList";
import CreateTaskForm from "../features/tasks/components/createTaskForm";

function MyTasksPage() {
  return (
    <Stack spacing={4}>
      <Paper elevation={0} sx={{ p: 3, borderRadius: "8px" }}>
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
              My Tasks
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Organize your work. Focus on what matters.
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <CreateTaskForm onSuccess={() => {}} />

      <TaskList />
    </Stack>
  );
}

export default MyTasksPage;
