import { Box, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PaletteIcon from "@mui/icons-material/Palette";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { grey } from "@mui/material/colors";
import type { Dispatch, SetStateAction } from "react";
import type { SettingsTab } from "../types";

type SettingsNavigationProps = {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<SettingsTab>>;
};

const settingsTabs: {
  label: string;
  icon: React.ReactElement;
  value: SettingsTab;
}[] = [
  {
    label: "Account",
    icon: <AccountCircleIcon fontSize="small" />,
    value: "account",
  },
  {
    label: "Appearance",
    icon: <PaletteIcon fontSize="small" />,
    value: "appearance",
  },
  {
    label: "About",
    icon: <InfoOutlinedIcon fontSize="small" />,
    value: "about",
  },
];

function SettingsNavigation({
  activeTab,
  setActiveTab,
}: SettingsNavigationProps) {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
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
          <Tab
            key={tab.value}
            value={tab.value}
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 24,
                    flexShrink: 0,
                  }}
                >
                  {tab.icon}
                </Box>
                <Box component="span" sx={{ textAlign: "left", flex: 1 }}>
                  {tab.label}
                </Box>
              </Box>
            }
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default SettingsNavigation;
