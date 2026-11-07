import { Typography } from "@mui/material";
import { APP_CONFIG } from "../../config/app";

function AppLogo() {
  return (
    <Typography
      variant="h4"
      component="div"
      sx={{
        fontWeight: 700,
        letterSpacing: "-1.5px",
        color: "#FFFFFF",
      }}
    >
      {APP_CONFIG.APP.NAME}
    </Typography>
  );
}

export default AppLogo;
