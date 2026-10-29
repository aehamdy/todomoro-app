import { alpha, Stack, Typography, useTheme } from "@mui/material";

type DateBlockProps = {
  dateDay: string;
  dateMonth: string;
  dateWeekday: string;
};

function DateBlock({ dateDay, dateMonth, dateWeekday }: DateBlockProps) {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        gap: 0.25,
        flexShrink: 0,
        width: 52,
        minHeight: 58,
        borderRadius: 1.5,
        bgcolor: alpha(
          theme.palette.primary.main,
          theme.palette.mode === "dark" ? 0.18 : 0.08,
        ),
        color: "primary.main",
      }}
    >
      <Typography
        variant="caption"
        sx={{ fontWeight: 600, textTransform: "uppercase" }}
      >
        {dateMonth}
      </Typography>

      <Typography variant="h6" sx={{ fontWeidht: 700, lineHeight: 1 }}>
        {dateDay}
      </Typography>

      <Typography variant="caption">{dateWeekday}</Typography>
    </Stack>
  );
}

export default DateBlock;
