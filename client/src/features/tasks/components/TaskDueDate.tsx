import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import dayjs, { type Dayjs } from "dayjs";
import { formatDateTime } from "../../../utils/utils";

type TaskDueDateProps = {
  dueDate: string | null;
  onSave: (dueDate: string | null) => void;
  isSaving: boolean;
};

function TaskDueDate({ dueDate, onSave, isSaving }: TaskDueDateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editedDate, setEditedDate] = useState<Dayjs | null>(null);

  const handleStartEditing = () => {
    if (isSaving) return;

    setEditedDate(dueDate ? dayjs(dueDate) : null);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);

    if (isSaving) return;

    const newDate = editedDate?.format("YYYY-MM-DD") ?? null;
    const currentDate = dueDate ? dueDate.slice(0, 10) : null;

    if (newDate !== currentDate) {
      onSave(newDate);
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Stack
        onClick={handleStartEditing}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
          mx: -0.5,
          borderRadius: 1,
          cursor: isSaving ? "default" : "pointer",
          "&:hover": {
            backgroundColor: isSaving ? "transparent" : "action.hover",
          },
        }}
        title="Click to edit due date"
      >
        <Typography
          color="text.secondary"
          sx={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <TrackChangesIcon color="inherit" />
          Due Date
        </Typography>

        <Typography>{dueDate ? formatDateTime(dueDate) : "Someday"}</Typography>
      </Stack>

      {isOpen && (
        <DatePicker
          open={isOpen}
          value={editedDate}
          onChange={(newValue) => setEditedDate(newValue)}
          onClose={handleClose}
          closeOnSelect={false}
          disabled={isSaving}
          format="DD MMM YYYY"
          reduceAnimations
          slotProps={{
            textField: {
              sx: {
                position: "absolute",
                top: "-18px",
                left: "47%",
                translate: "-50% 0",
                width: 0,
                height: 0,
                opacity: 0,
                pointerEvents: "none",
              },
            },
            popper: {
              placement: "bottom",
              modifiers: [
                {
                  name: "preventOverflow",
                  options: {
                    boundary: "viewport",
                  },
                },
                {
                  name: "flip",
                  options: {
                    enabled: true,
                  },
                },
              ],
              sx: {
                "& .MuiPaper-root": {
                  transformOrigin: "top center",
                },
                "& .MuiDateCalendar-root": {
                  width: "300px", // date picker width
                  height: "290px", // date picker height
                },
                "& .MuiPickersCalendarHeader-root": {
                  paddingLeft: 1,
                  paddingRight: 1,
                  marginTop: 0.5,
                },
                "& .MuiDayCalendar-header, & .MuiDayCalendar-weekContainer": {
                  justifyContent: "space-around",
                },
                "& .MuiPickersDay-root": {
                  width: 30,
                  height: 30,
                  margin: "1px",
                  fontSize: "0.75rem",
                },
                "& .MuiPickersCalendarHeader-label": {
                  fontSize: "0.8rem",
                },
                "& .MuiDayCalendar-weekDayLabel": {
                  width: 30,
                  height: 30,
                  fontSize: "0.7rem",
                },
              },
            },
          }}
        />
      )}
    </Box>
  );
}

export default TaskDueDate;
