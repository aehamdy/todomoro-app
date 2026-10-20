import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { Dispatch, SetStateAction } from "react";

import AccountSettings from "./AccountSettings";
import AppearanceSettings from "./AppearanceSettings";
import AboutSettings from "./AboutSettings";
import { grey } from "@mui/material/colors";

type SettingsDialogProps = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

type SettingsTab = "account" | "appearance" | "about";

const settingsTabs: { label: string; value: SettingsTab }[] = [
  { label: "Account", value: "account" },
  { label: "Appearance", value: "appearance" },
  { label: "About", value: "about" },
];

function SettingsDialog({ isModalOpen, setIsModalOpen }: SettingsDialogProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => setIsModalOpen(false);

  return (
    <Dialog open={isModalOpen} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Settings</DialogTitle>

      <DialogContent dividers sx={{ p: { xs: 1.5, md: 2 } }}>
        {/* Using Flexbox layout to guarantee equal and full-height columns on desktop */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            minHeight: 360,
            alignItems: "stretch",
          }}
        >
          {/* Settings navigation */}
          <Box
            sx={{
              width: { xs: "100%", md: "18%" },
              borderRight: { xs: 0, md: 1 },
              borderBottom: { xs: 1, md: 0 },
              borderColor: {
                xs: "transparent",
                md: grey[300],
              },
              pr: { xs: 0, md: 2 },
              pb: { xs: 2, md: 0 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Tabs
              orientation={isMobile ? "horizontal" : "vertical"}
              value={activeTab}
              onChange={(_, newValue: SettingsTab) => setActiveTab(newValue)}
              aria-label="Settings sections"
              variant={isMobile ? "scrollable" : "standard"}
              scrollButtons={isMobile ? "auto" : false}
              sx={{
                flex: 1,
                alignItems: "stretch",
                width: "100%",

                "& .MuiTabs-scroller": {
                  height: { xs: "auto", md: "100%" },
                },

                "& .MuiTabs-flexContainer": {
                  flexDirection: {
                    xs: "row",
                    md: "column",
                  },
                  height: { xs: "auto", md: "100%" },
                },

                "& .MuiTabs-indicator": {
                  left: { xs: "auto", md: 0 },
                  right: "auto",
                  bottom: { xs: 0, md: "auto" },
                  top: { xs: "auto", md: 0 },
                  width: { xs: "auto", md: 3 },
                  height: { xs: 2, md: "auto" },
                },

                "& .MuiTab-root": {
                  alignItems: { xs: "center", md: "flex-start" },
                  textAlign: { xs: "center", md: "left" },
                  textTransform: "none",
                  minWidth: { xs: "auto", md: 0 },
                  minHeight: { xs: 40, md: 48 },
                  px: 1.5,
                  py: { xs: 0.5, md: 1 },
                },
              }}
            >
              {settingsTabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </Box>

          {/* Selected settings content */}
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
