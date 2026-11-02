import { Box, Skeleton, Stack } from "@mui/material";

type RecentProjectItemSkeletonProps = {
  count?: number;
  variant?: "primary" | "secondary";
};

function RecentProjectItemSkeleton({
  count = 3,
  variant = "primary",
}: RecentProjectItemSkeletonProps) {
  if (variant === "secondary")
    return Array.from({ length: count }).map((_, idx) => (
      <Stack
        key={idx}
        sx={{
          flexDirection: "column",
          gap: 2,
          width: { xs: "100%", md: "calc(100% / 3)" },
          p: 1.5,
          bgcolor: "background.default",
          borderRadius: 2,
        }}
      >
        {/* Title & Date */}
        <Stack spacing={0.5}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="circular" width={16} height={16} />
          </Box>
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Skeleton variant="circular" width={14} height={14} />
            <Skeleton variant="text" width="40%" height={16} />
          </Stack>
        </Stack>

        {/* Progress Bar Skeleton */}
        <Skeleton
          variant="rounded"
          width="100%"
          height={6}
          sx={{ borderRadius: 3 }}
        />

        {/* Footer Details */}
        <Stack sx={{ gap: 1, width: "100%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Skeleton variant="text" width="35%" height={18} />
            <Skeleton variant="text" width="30%" height={18} />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Skeleton variant="text" width="30%" height={18} />
            <Skeleton variant="text" width="45%" height={18} />
          </Box>
        </Stack>
      </Stack>
    ));

  return (
    <Stack
      sx={{
        flexDirection: "column",
        alignItems: "stretch",
        gap: 1.5,
        width: "100%",
        py: 1,
      }}
    >
      {Array.from({ length: count }).map((_, idx) => (
        <Stack
          key={idx}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            px: 1,
            color: "text.secondary",
            borderRadius: 2,
            position: "relative",
            bgcolor: "background.default",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1, width: "90%" }}
          >
            <Skeleton variant="circular" width={24} height={24} />

            <Skeleton variant="text" width="60%" height="100%" />
          </Box>

          <Skeleton variant="circular" width={24} height={24} />
        </Stack>
      ))}
    </Stack>
  );
}

export default RecentProjectItemSkeleton;
