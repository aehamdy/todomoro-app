import { Box, Divider, Stack, Skeleton } from "@mui/material";

function TaskDetailsSidebarSkeleton() {
  return (
    <Box
      component="aside"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minWidth: 0,
        height: "calc(100% - 40px)",
        my: "20px",
        mx: 1,
        p: 2,
        bgcolor: "background.paper",
        borderRadius: "8px",
        boxShadow: 5,
        overflowY: "hidden",
      }}
    >
      <Stack>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Skeleton variant="rounded" width={80} height={24} />
          <Skeleton variant="circular" width={32} height={32} />
        </Box>

        {/* Content Fields Stack */}
        <Stack spacing={2} sx={{ color: "text.secondary" }}>
          {/* Details Placeholder */}
          <Stack sx={{ gap: 1.5, color: "text.secondary" }}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Skeleton variant="rounded" width="30%" height={30} />
                <Skeleton variant="rounded" width="40%" height={30} />
              </Box>
            ))}
          </Stack>

          {/* Note Placeholder */}
          <Box sx={{ pt: 1 }}>
            <Skeleton variant="rounded" width="100%" height={60} />
          </Box>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Subtasks Section Placeholder */}
        <Stack spacing={1}>
          <Skeleton variant="text" width="30%" height={22} />
          {Array.from({ length: 2 }).map((_, index) => (
            <Stack
              key={index}
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Skeleton variant="rounded" width="10%" height={30} />
              <Skeleton variant="rounded" width="70%" height={36} />

              <Skeleton variant="rounded" width="7%" height={36} />
            </Stack>
          ))}
        </Stack>
      </Stack>

      {/* Footer Placeholder (Delete button / timestamp info) */}
      <Skeleton variant="text" width="90%" height={65} sx={{ mx: "auto" }} />
    </Box>
  );
}

export default TaskDetailsSidebarSkeleton;
