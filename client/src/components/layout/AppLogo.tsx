import { Typography } from "@mui/material";
import { APP_CONFIG } from "../../config/app";

type AppLogoProps = {
  color?: "light" | "dark";
};

function AppLogo({ color }: AppLogoProps) {
  return (
    <Typography
      variant="h4"
      component="div"
      sx={{
        fontWeight: 700,
        letterSpacing: "-1.5px",
        color:
          color === "light"
            ? "#FFF"
            : color === "dark"
              ? "#222"
              : "text.primary",
      }}
    >
      {APP_CONFIG.APP.NAME}
    </Typography>
  );
}

export default AppLogo;
