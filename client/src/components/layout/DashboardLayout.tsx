import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

const HEADER_HEIGHT = 65;

function DashboardLayout() {
  return (
    <Box
      sx={{
        height: "100dvh",
        overflow: "hidden",
        bgcolor: "grey.50",
      }}
    >
      <AppHeader />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          height: `calc(100dvh - ${HEADER_HEIGHT}px)`,
          mt: `${HEADER_HEIGHT}px`,
          overflow: "hidden",
        }}
      >
        <Box
          component="aside"
          sx={{
            gridColumn: "span 2",
            minWidth: 0,
            height: "100%",
            overflowY: "auto",
            bgcolor: "background.paper",
            borderRight: 1,
            borderColor: "divider",
          }}
        >
          <AppSidebar />
        </Box>

        <Box
          component="main"
          sx={{
            gridColumn: "span 10",
            minWidth: 0,
            height: "100%",
            overflowY: "auto",
            overscrollBehavior: "contain",
            p: { xs: 2, sm: 3, md: 2 },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default DashboardLayout;
