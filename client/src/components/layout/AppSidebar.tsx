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
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../routes/paths";
import { useAuth } from "../../features/auth/useAuth";
import { grey } from "@mui/material/colors";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";

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

function AppSidebar() {
  const { user } = useAuth();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: "100%",
        height: "100%",
        "& .MuiDrawer-paper": {
          position: "static",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          borderRight: 1,
          borderColor: "#fafafa",
          overflow: "hidden",
        },
      }}
    >
      <Toolbar
        sx={{
          fontWeight: 700,
          fontSize: 16,
          color: "#1976d2",
          borderBottom: 1,
          borderColor: "#eeeeee",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Avatar
            alt="Remy Sharp"
            src=""
            sx={{ width: 34, height: 34, bgcolor: grey[700] }}
            variant="rounded"
          />
          <Stack>
            <Typography sx={{ fontWeight: 600, color: grey[700] }}>
              {user?.name}
            </Typography>
            <Typography sx={{ color: grey[400] }}>{user?.email}</Typography>
          </Stack>
        </Stack>
      </Toolbar>

      <Box sx={{ p: 2 }}>
        <List
          disablePadding
          sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
        >
          {/* 2. Map over the array */}
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
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default AppSidebar;
