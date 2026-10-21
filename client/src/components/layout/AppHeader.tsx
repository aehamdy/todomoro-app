import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { SettingsOutlined, TaskAlt } from "@mui/icons-material";
import LogoutButton from "./LogoutButton";
import { useState } from "react";
import SettingsDialog from "../settings/SettingsDialog";

function AppHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
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
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "text.primary",
                bgcolor: "background.paper",
              }}
            >
              Todomoro
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              aria-label="Open settings modal"
              onClick={() => setIsModalOpen(true)}
              sx={{ color: "text.secondary" }}
            >
              <SettingsOutlined />
            </IconButton>

            <LogoutButton />
          </Box>
        </Toolbar>
      </AppBar>

      <SettingsDialog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}

export default AppHeader;
