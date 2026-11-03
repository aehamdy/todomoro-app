import { Box, Divider, List } from "@mui/material";
import NavList from "./NavList";
import ProjectsSection from "../../features/projects/components/ProjectsSection";
import PomodoroWidget from "../../features/pomodoro/components/PomodoroWidget";

type AppSidebarProps = {
  collapsed?: boolean;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
};

function AppSidebar({ collapsed = false }: AppSidebarProps) {
  if (collapsed) return null;

  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        height: "100%",
        minHeight: 0,
        p: 1.5,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <NavList />
        <Divider />
        <ProjectsSection />
      </Box>

      <Box sx={{ mt: "auto", flexShrink: 0 }}>
        <PomodoroWidget />
      </Box>
    </List>
  );
}

export default AppSidebar;
