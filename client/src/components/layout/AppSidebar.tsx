import { Divider, List } from "@mui/material";
import NavList from "./NavList";
import ProjectsSection from "../../features/projects/components/ProjectsSection";

type AppSidebarProps = {
  collapsed?: boolean;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
};

function AppSidebar({ collapsed = false }: AppSidebarProps) {
  if (collapsed) return null;

  return (
    <List sx={{ display: "flex", flexDirection: "column", gap: 2, p: 1.5 }}>
      <NavList />
      <Divider />
      <ProjectsSection />
    </List>
  );
}

export default AppSidebar;
