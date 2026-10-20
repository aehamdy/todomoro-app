import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Dashboard as DashboardIcon } from "@mui/icons-material";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import { NavLink } from "react-router-dom";
import { grey } from "@mui/material/colors";

import { ROUTES } from "../../routes/paths";
import { useAuth } from "../../features/auth/useAuth";

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
    label: "My Tasks",
    to: ROUTES.myTasks,
    icon: <AssignmentRoundedIcon />,
  },
];

function AppSidebar({
  mobileOpen,
  onMobileClose,
  collapsed = false,
}: AppSidebarProps) {
  const { user } = useAuth();

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
          <Toolbar
            sx={{
              fontWeight: 700,
              fontSize: 16,
              color: "#1976d2",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                display: "flex",
                alignItems: "center",
                minWidth: 0,
              }}
            >
              <Avatar
                alt={user?.name ?? "User"}
                sx={{
                  width: 34,
                  height: 34,
                  bgcolor: grey[700],
                }}
                variant="rounded"
              />

              <Stack sx={{ minWidth: 0 }}>
                <Typography noWrap sx={{ fontWeight: 600, color: grey[700] }}>
                  {user?.name}
                </Typography>

                <Typography noWrap variant="body2" sx={{ color: grey[500] }}>
                  {user?.email}
                </Typography>
              </Stack>
            </Stack>
          </Toolbar>

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
                    color: grey[600],
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
        </>
      )}
    </Drawer>
  );
}

export default AppSidebar;
