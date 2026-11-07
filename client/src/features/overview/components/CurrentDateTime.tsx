import { Stack, Typography } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { useEffect, useState } from "react";

function CurrentDateTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const formattedDate = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    // year: "numeric",
  }).format(now);

  const formattedTime = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);

  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "",
          alignItems: "center",
          gap: 0.75,
        }}
      >
        <TodayIcon
          sx={{
            fontSize: 15,
            color: "primary.contrastText",
            opacity: 0.85,
          }}
        />

        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: 11, md: 13 },
            fontWeight: 500,
            color: "primary.contrastText",
            opacity: 0.9,
          }}
        >
          {formattedDate}
        </Typography>
      </Stack>

      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: 0.75,
        }}
      >
        <AccessTimeRoundedIcon
          sx={{
            fontSize: 15,
            color: "primary.contrastText",
            opacity: 0.85,
          }}
        />

        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: 11, md: 13 },
            fontWeight: 500,
            color: "primary.contrastText",
            opacity: 0.9,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formattedTime}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default CurrentDateTime;
