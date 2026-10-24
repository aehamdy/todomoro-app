import { Divider, Drawer, List } from "@mui/material";
import NavList from "./NavList";
import ProjectsSection from "../../features/projects/components/ProjectsSection";

type AppSidebarProps = {
  mobileOpen: boolean;
  onMobileClose: () => void;
  collapsed?: boolean;
};

function AppSidebar({
  mobileOpen,
  onMobileClose,
  collapsed = false,
}: AppSidebarProps) {
  return (
    <Drawer
      variant="permanent"
      open={mobileOpen}
      onClose={onMobileClose}
      sx={{
        width: "100%",
        height: "100%",
        "& .MuiDrawer-paper": {
          position: "static",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          borderColor: "transparent",
          overflowX: "hidden",
          overflowY: "auto",
        },
      }}
    >
      {!collapsed && (
        <>
          <List
            sx={{ display: "flex", flexDirection: "column", gap: 2, p: 1.5 }}
          >
            <NavList />

            <Divider />

            <ProjectsSection />
          </List>
        </>
      )}
    </Drawer>
  );
}

export default AppSidebar;
