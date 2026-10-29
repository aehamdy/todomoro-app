import { Box, Typography } from "@mui/material";

type SummaryCardValueProps = {
  value: number;
  label: string;
};

function SummaryCardValue({ value, label }: SummaryCardValueProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "end", gap: 0.5 }}>
      <Typography
        variant="h5"
        component="p"
        sx={{ lineHeight: 1.2, fontWeight: 500, fontSize: 32 }}
      >
        {value}
      </Typography>

      <Typography
        variant="h6"
        component="p"
        sx={{ lineHeight: 1.2, fontWeight: 600, fontSize: 18 }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export default SummaryCardValue;
