import { Paper, Stack } from "@mui/material";
import type { ReactNode } from "react";
import SummaryCardHeader from "./SummaryCardHeader";
import SummaryCardValue from "./SummaryCardValue";
import SummaryCardMessage from "./SummaryCardMessage";

type SummaryCardProps = {
  id: number;
  title: string;
  primaryIcon: ReactNode;
  value: number;
  label: string;
  secondaryIcon?: ReactNode;
  message: string;
  status: string;
};

function SummaryCard({
  title,
  primaryIcon,
  value,
  label,
  secondaryIcon,
  message,
  status,
}: SummaryCardProps) {
  const accentColor =
    status === "neutral"
      ? "primary.main"
      : status === "success"
        ? "success.main"
        : status === "warning"
          ? "warning.main"
          : status === "error"
            ? "error.main"
            : "primary.main";

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        p: 1.5,
        bgcolor: "background.paper",
        borderRadius: 2,
        transition:
          "border-color 0.2s ease, transform 0.2s ease, background-color 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",

          "& .inner-content-box": {
            bgcolor: accentColor,
            color: "white",
          },

          "& .card-secondary-icon": {
            color:
              status === "success"
                ? "success.lighter"
                : status === "warning"
                  ? "warning.lighter"
                  : status === "error"
                    ? "error.lighter"
                    : "primary.contrastText",
          },

          "& .card-message-text": {
            opacity: 0.9,
            color: "white",
          },
        },
      }}
    >
      <Stack sx={{ gap: 1 }}>
        <SummaryCardHeader
          title={title}
          primaryIcon={primaryIcon}
          accentColor={accentColor}
        />

        <Stack
          className="inner-content-box"
          sx={{
            gap: 3,
            py: 2,
            px: 1.5,
            bgcolor: "background.default",
            borderRadius: 1,
            transition: "background-color 0.2s ease, color 0.2s ease",
          }}
        >
          <SummaryCardValue value={value} label={label} />

          <SummaryCardMessage
            accentColor={accentColor}
            secondaryIcon={secondaryIcon}
            message={message}
          />
        </Stack>
      </Stack>
    </Paper>
  );
}

export default SummaryCard;
