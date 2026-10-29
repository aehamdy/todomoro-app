import { Box, Typography } from "@mui/material";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";

function RecentProjectHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Recent Projects
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          width: 38,
          height: 38,
          bgcolor: "action.hover",
          color: "primary.main",
          borderRadius: 2.5,
        }}
      >
        <FolderRoundedIcon fontSize="small" sx={{ color: "primary.main" }} />
      </Box>
    </Box>
  );
}

export default RecentProjectHeader;
