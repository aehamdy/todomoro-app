import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Dashboard as DashboardIcon } from "@mui/icons-material";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes/paths";
import ProjectsSection from "../../features/projects/components/ProjectsSection";

type AppSidebarProps = {
  mobileOpen: boolean;
  onMobileClose: () => void;
  collapsed?: boolean;
};

const navItems = [
  {
    label: "Dashboard",
    to: ROUTES.dashboard,
    icon: <DashboardIcon />,
  },
  {
    label: "Tasks",
    to: ROUTES.tasks,
    icon: <AssignmentRoundedIcon />,
  },
];

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
          <Box sx={{ p: 2 }}>
            <List
              disablePadding
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              {navItems.map((item) => (
                <ListItemButton
                  key={item.to}
                  component={NavLink}
                  to={item.to}
                  end
                  sx={{
                    borderRadius: 2,
                    color: "text.secondary",
                    "&:hover": {
                      bgcolor: "action.hover",
                      color: "primary.main",
                      "& .MuiListItemIcon-root": {
                        color: "primary.main",
                      },
                    },
                    "&.active": {
                      bgcolor: "action.selected",
                      color: "primary.main",
                      "& .MuiListItemIcon-root": {
                        color: "primary.main",
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
            </List>
          </Box>

          <Divider />

          <ProjectsSection />
        </>
      )}
    </Drawer>
  );
}

export default AppSidebar;
