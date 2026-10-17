import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { TaskAlt } from "@mui/icons-material";
import LogoutButton from "./LogoutButton";

function AppHeader() {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        height: 65,
        borderBottom: 1,
        borderColor: "divider",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          minHeight: "65px",
          px: { xs: 2, md: 3 },
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <TaskAlt color="primary" fontSize="large" />
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Todomoro
          </Typography>
        </Box>

        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
