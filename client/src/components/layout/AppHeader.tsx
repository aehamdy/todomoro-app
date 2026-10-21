import { useState } from "react";
import { AppBar, Avatar, Box, Stack, Toolbar, Typography } from "@mui/material";
import { ArrowDropDown, TaskAlt } from "@mui/icons-material";
import SettingsDialog from "../settings/SettingsDialog";
import { useAuth } from "../../features/auth/useAuth";
import AccountDropdown from "./AccountDropdown";

function AppHeader() {
  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  function handleOpenMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  // function handleCloseMenu() {
  //   setAnchorEl(null);
  // }

  // function handleOpenSettings() {
  //   handleCloseMenu();
  //   setIsModalOpen(true);
  // }

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
          {/* App logo */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
            }}
          >
            <TaskAlt color="primary" fontSize="large" />

            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "text.primary",
              }}
            >
              Todomoro
            </Typography>
          </Box>

          {/* Clickable account toolbar */}
          <Box>
            <Stack
              component="button"
              type="button"
              onClick={handleOpenMenu}
              aria-label="Open account menu"
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
                border: 0,
                backgroundColor: "transparent",
                color: "text.primary",
                cursor: "pointer",
                textAlign: "left",
                font: "inherit",
                borderRadius: 2,
                p: 0.75,
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <Avatar
                alt={user?.name ?? "User"}
                sx={{
                  width: 38,
                  height: 38,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  fontWeight: 700,
                }}
                variant="rounded"
              >
                {user?.name?.charAt(0).toUpperCase() ?? "U"}
              </Avatar>

              <Stack sx={{ minWidth: 0 }}>
                <Typography
                  variant="body2"
                  noWrap
                  sx={{
                    maxWidth: { xs: 110, sm: 200 },
                    fontWeight: 700,
                    color: "text.primary",
                  }}
                >
                  {user?.name ?? "You"}
                </Typography>

                <Typography
                  variant="caption"
                  noWrap
                  color="text.secondary"
                  sx={{
                    maxWidth: { xs: 110, sm: 200 },
                    color: "text.secondary",
                  }}
                >
                  {user?.email ?? ""}
                </Typography>
              </Stack>

              <ArrowDropDown
                sx={{
                  color: "text.secondary",
                  transform: isMenuOpen ? "rotate(180deg)" : "none",
                  transition: "transform 150ms ease",
                }}
              />
            </Stack>

            <AccountDropdown
              user={user}
              setAnchorEl={setAnchorEl}
              setIsModalOpen={setIsModalOpen}
              anchorEl={anchorEl}
              isMenuOpen={isMenuOpen}
            />
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
