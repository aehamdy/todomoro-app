import { Box, Paper, Stack, Skeleton } from "@mui/material";

function CreateTaskFormSkeleton() {
  return (
    <Stack spacing={1}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 0.5, sm: 1 },
          p: { xs: 0.5, sm: 1 },
          borderColor: "divider",
          borderRadius: 2,
          minWidth: 0,
        }}
      >
        {/* Add Button Icon Placeholder */}
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ flexShrink: 0 }}
        />

        {/* Text Field Placeholder */}
        <Box sx={{ flex: "1 1 0", minWidth: 0, py: 1 }}>
          <Skeleton variant="text" width="60%" height={24} />
        </Box>

        {/* Priority Icon Placeholder */}
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ flexShrink: 0 }}
        />

        {/* Calendar / Due Date Icon Placeholder */}
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ flexShrink: 0 }}
        />
      </Paper>
    </Stack>
  );
}

export default CreateTaskFormSkeleton;
