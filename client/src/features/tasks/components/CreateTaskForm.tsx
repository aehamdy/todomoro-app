/* eslint-disable react-hooks/incompatible-library */
import { zodResolver } from "@hookform/resolvers/zod";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import FlagIcon from "@mui/icons-material/Flag";
import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useCreateTask } from "../hooks/useCreateTask";
import {
  createTaskSchema,
  type createTaskFormValues,
  type createTaskOutput,
} from "../task.schema";
import { priorityColors } from "../task.constants";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface CreateTaskFormProps {
  projectId: string | null;
  onSuccess?: () => void;
}

const priorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
] as const;

function CreateTaskForm({ projectId, onSuccess }: CreateTaskFormProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const { createTask, isCreating, error, isError } = useCreateTask();

  const [priorityAnchor, setPriorityAnchor] = useState<HTMLElement | null>(
    null,
  );

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<createTaskFormValues, unknown, createTaskOutput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      priority: "medium",
      dueDate: null,
    },
  });

  const selectedPriority = watch("priority");
  const selectedDueDate = watch("dueDate");

  const onSubmit = async (values: createTaskOutput) => {
    try {
      await createTask({
        title: values.title,
        priority: values.priority,
        dueDate: values.dueDate || null,
        project: projectId,
      });

      reset();
      onSuccess?.();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Validation errors:",
          JSON.stringify(error.response?.data?.errors, null, 2),
        );
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Stack spacing={1}>
      <Paper
        component="form"
        elevation={0}
        variant="outlined"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 0.5, sm: 1 },
          p: { xs: 0.5, sm: 1 },
          borderColor: "transparent",
          borderRadius: 2,
          minWidth: 0,
          transition: "border-color 150ms ease",
          "&:focus-within": {
            borderColor: "primary.main",
          },
        }}
      >
        {isCreating ? (
          <CircularProgress
            size={14}
            thickness={5}
            aria-label="Updating task"
          />
        ) : (
          <Tooltip title="Create task">
            <span>
              <IconButton
                type="submit"
                color="primary"
                aria-label="Create task"
                disabled={isCreating}
                sx={{ flexShrink: 0 }}
              >
                <AddIcon />
              </IconButton>
            </span>
          </Tooltip>
        )}

        <TextField
          {...register("title")}
          placeholder="Add a task, press Enter to save"
          variant="standard"
          fullWidth
          autoComplete="off"
          error={Boolean(errors.title)}
          disabled={isCreating}
          slotProps={{
            input: {
              disableUnderline: true,
              sx: {
                fontSize: { xs: "0.875rem", sm: "1rem" },
                py: 1,
              },
            },
          }}
          sx={{
            flex: "1 1 0",
            minWidth: 0,
          }}
        />

        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <>
              <Tooltip title={`Priority: ${field.value}`}>
                <span>
                  <IconButton
                    type="button"
                    aria-label="Select task priority"
                    aria-haspopup="true"
                    aria-expanded={Boolean(priorityAnchor)}
                    disabled={isCreating}
                    onClick={(event) => setPriorityAnchor(event.currentTarget)}
                    sx={{ flexShrink: 0, color: "primary.main" }}
                  >
                    <FlagOutlinedIcon />
                  </IconButton>
                </span>
              </Tooltip>

              <Menu
                anchorEl={priorityAnchor}
                open={Boolean(priorityAnchor)}
                onClose={() => setPriorityAnchor(null)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                {priorities.map((priority) => (
                  <MenuItem
                    key={priority.value}
                    selected={selectedPriority === priority.value}
                    onClick={() => {
                      setValue("priority", priority.value, {
                        shouldDirty: true,
                      });
                      setPriorityAnchor(null);
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: `${priorityColors[priority.value].text}`,
                    }}
                  >
                    <FlagIcon fontSize="small" sx={{ color: "inherit" }} />
                    {priority.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        />

        <Box sx={{ position: "relative" }}>
          <Tooltip
            title={
              selectedDueDate
                ? `Due: ${dayjs(selectedDueDate).format("DD MMM YYYY")}`
                : "Set due date"
            }
          >
            <span>
              <IconButton
                type="button"
                aria-label="Select due date"
                aria-haspopup="dialog"
                aria-expanded={isDatePickerOpen}
                disabled={isCreating}
                onClick={() => setIsDatePickerOpen(true)}
                sx={{ flexShrink: 0, color: "primary.main" }}
              >
                <CalendarMonthOutlinedIcon />
              </IconButton>
            </span>
          </Tooltip>

          <DatePicker
            open={isDatePickerOpen}
            value={selectedDueDate ? dayjs(selectedDueDate) : null}
            onChange={(newValue: Dayjs | null) => {
              if (newValue === null) {
                setValue("dueDate", null, { shouldDirty: true });
                return;
              }

              if (newValue.isValid()) {
                setValue("dueDate", newValue.format("YYYY-MM-DD"), {
                  shouldDirty: true,
                });
              }
            }}
            onClose={() => setIsDatePickerOpen(false)}
            onAccept={() => setIsDatePickerOpen(false)}
            closeOnSelect={false}
            disabled={isCreating}
            minDate={dayjs()}
            format="DD MMM YYYY"
            reduceAnimations
            slotProps={{
              textField: {
                sx: {
                  position: "absolute",
                  top: "-10px",
                  left: "0%",
                  translate: "-50% 0",
                  width: 0,
                  height: 0,
                  opacity: 0,
                  pointerEvents: "none",
                },
              },
              actionBar: {
                actions: ["cancel", "accept"],
              },
              popper: {
                placement: "bottom-end",
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
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                  },
                  "& .MuiDateCalendar-root": {
                    width: 250,
                    height: "auto",
                    maxHeight: 270,
                  },
                  "& .MuiPickersCalendarHeader-root": {
                    px: 1.5,
                    mt: 1,
                    mb: 0.5,
                    minHeight: 32,
                  },
                  "& .MuiPickersCalendarHeader-label": {
                    fontSize: "0.85rem",
                  },
                  "& .MuiDayCalendar-weekDayLabel": {
                    width: 30,
                    height: 26,
                    fontSize: "0.75rem",
                  },
                  "& .MuiPickersDay-root": {
                    width: 30,
                    height: 30,
                    fontSize: "0.75rem",
                  },
                  "& .MuiDialogActions-root": {
                    pt: 0,
                    pb: 0.75,
                    px: 1.5,
                  },
                },
              },
            }}
          />
        </Box>
      </Paper>

      {errors.title && (
        <Alert severity="error" variant="outlined">
          {errors.title.message}
        </Alert>
      )}

      {isError && (
        <Alert severity="error">
          {error instanceof Error
            ? error.message
            : "Failed to create task. Please try again."}
        </Alert>
      )}
    </Stack>
  );
}

export default CreateTaskForm;
