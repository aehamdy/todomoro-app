import CloseIcon from "@mui/icons-material/Close";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";

type TaskDetailsHeaderProps = {
  onClose: () => void;
};

function TaskDetailsHeader({ onClose }: TaskDetailsHeaderProps) {
  return (
    <Box>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontWeight: 600,
          }}
        >
          Task details
        </Typography>

        <IconButton
          aria-label="Close task details"
          size="small"
          onClick={onClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Divider sx={{ mb: 2 }} />
    </Box>
  );
}

export default TaskDetailsHeader;
