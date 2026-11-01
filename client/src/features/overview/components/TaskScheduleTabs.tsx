import { Stack, Tab, Tabs, Typography } from "@mui/material";

type TaskScheduleTabsProps = {
  activeTab: "overdue" | "upcoming";
  overdueCount: number;
  upcomingCount: number;
  onChange: (value: "overdue" | "upcoming") => void;
};

function TaskScheduleTabs({
  activeTab,
  overdueCount,
  upcomingCount,
  onChange,
}: TaskScheduleTabsProps) {
  const tabs = [
    {
      value: "overdue",
      label: "Overdue",
      count: overdueCount,
      color: "error.main",
    },
    {
      value: "upcoming",
      label: "Upcoming",
      count: upcomingCount,
      color: "warning.main",
    },
  ] as const;

  return (
    <Tabs
      value={activeTab}
      onChange={(_, newValue) => onChange(newValue)}
      variant="fullWidth"
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          value={tab.value}
          label={
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 1,
                color: tab.color,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {tab.label}
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                }}
              >
                ({tab.count})
              </Typography>
            </Stack>
          }
        />
      ))}
    </Tabs>
  );
}

export default TaskScheduleTabs;
