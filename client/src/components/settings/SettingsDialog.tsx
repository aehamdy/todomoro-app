import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { Dispatch, SetStateAction } from "react";
import AccountSettings from "./AccountSettings";
import AppearanceSettings from "./AppearanceSettings";
import AboutSettings from "./AboutSettings";
import SettingsNavigation from "./SettingsNavigation";
import type { SettingsTab } from "../types";

type SettingsDialogProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

function SettingsDialog({ isModalOpen, setIsModalOpen }: SettingsDialogProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");

  const handleClose = () => setIsModalOpen(false);

  return (
    <Dialog
      open={isModalOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      closeAfterTransition={false}
    >
      <DialogTitle>Settings</DialogTitle>

      <DialogContent dividers sx={{ p: { xs: 1.5, md: 2 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            minHeight: 360,
            alignItems: "stretch",
          }}
        >
          <SettingsNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* settings content */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              pl: { xs: 0, md: 3 },
              pt: { xs: 2, md: 0 },
            }}
          >
            {activeTab === "account" && <AccountSettings />}
            {activeTab === "appearance" && <AppearanceSettings />}
            {activeTab === "about" && <AboutSettings />}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SettingsDialog;
