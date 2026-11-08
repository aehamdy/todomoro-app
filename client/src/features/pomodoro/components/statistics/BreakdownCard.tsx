import { Box, Paper, Stack, Typography } from "@mui/material";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import { formatFocusTime } from "../../utils/pomodoro-stats.utils";

export type BreakdownItem = {
  id: string | null;
  title: string;
  focusTimeSeconds: number;
  completedSessions: number;
};

type BreakdownCardProps = {
  title: string;
  description: string;
  items: BreakdownItem[];
  emptyMessage: string;
};

function BreakdownCard({
  title,
  description,
  items,
  emptyMessage,
}: BreakdownCardProps) {
  const maxFocusTime = Math.max(
    ...items.map((item) => item.focusTimeSeconds),
    1,
  );

  return (
    <Paper
      elevation={0}
      sx={{
        minWidth: 0,
        height: "100%",
        p: { xs: 2, sm: 2.5 },
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Stack spacing={2.5}>
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            {title}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
        </Box>

        {items.length === 0 ? (
          <Stack
            spacing={1}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              minHeight: 160,
              py: 3,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                bgcolor: "action.hover",
                color: "text.secondary",
              }}
            >
              <QueryStatsRoundedIcon />
            </Box>

            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              No activity yet
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ maxWidth: 230 }}
            >
              {emptyMessage}
            </Typography>
          </Stack>
        ) : (
          <Stack spacing={2.5} sx={{ height: "400px", overflow: "auto" }}>
            {items.map((item, index) => {
              const progress = (item.focusTimeSeconds / maxFocusTime) * 100;

              return (
                <Stack key={item.id ?? `unassigned-${index}`} spacing={1}>
                  {/* Title and focus time */}
                  <Stack
                    sx={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="body2"
                      noWrap
                      sx={{
                        fontWeight: 600,
                        minWidth: 0,
                        flex: 1,
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        flexShrink: 0,
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                        color: "secondary.main",
                      }}
                    >
                      {formatFocusTime(item.focusTimeSeconds)}
                    </Typography>
                  </Stack>

                  {/* Horizontal progress bar */}
                  <Box
                    sx={{
                      width: "100%",
                      height: 7,
                      bgcolor: "action.hover",
                      borderRadius: 10,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        width: `${progress}%`,
                        height: "100%",
                        bgcolor: "primary.main",
                        borderRadius: 10,
                        transition: "width 0.3s ease",
                      }}
                    />
                  </Box>

                  {/* Completed sessions count */}
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    {item.completedSessions}{" "}
                    {item.completedSessions === 1
                      ? "focus session"
                      : "focus sessions"}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}

export default BreakdownCard;
