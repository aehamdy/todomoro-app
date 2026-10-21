import { AccountCircleOutlined, SettingsOutlined } from "@mui/icons-material";
import { Box, Divider, Menu, MenuItem, Stack, Typography } from "@mui/material";
import LogoutButton from "./LogoutButton";
import type { AuthUser } from "../../features/auth/auth.types";
import type { Dispatch, SetStateAction } from "react";

type AccountDropdownProps = {
  user: AuthUser | null;
  anchorEl: HTMLElement | null;
  isMenuOpen: boolean;
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

function AccountDropdown({
  user,
  setAnchorEl,
  setIsModalOpen,
  anchorEl,
  isMenuOpen,
}: AccountDropdownProps) {
  function handleCloseMenu() {
    setAnchorEl(null);
  }

  function handleOpenSettings() {
    handleCloseMenu();
    setIsModalOpen(true);
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleCloseMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      slotProps={{
        paper: {
          sx: {
            mt: 1,
            minWidth: 220,
            borderRadius: 2,
            border: 1,
            borderColor: "divider",
          },
        },
      }}
    >
      <MenuItem disabled sx={{ opacity: "1 !important" }}>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <AccountCircleOutlined sx={{ color: "text.secondary" }} />

          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              {user?.name ?? "You"}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ color: "text.secondary", overflowWrap: "anywhere" }}
            >
              {user?.email ?? ""}
            </Typography>
          </Box>
        </Stack>
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleOpenSettings}>
        <SettingsOutlined
          fontSize="small"
          sx={{ mr: 1.5, color: "text.secondary" }}
        />
        Settings
      </MenuItem>

      <Divider />

      <Box sx={{ px: 1, py: 0.5 }}>
        <LogoutButton />
      </Box>
    </Menu>
  );
}

export default AccountDropdown;
