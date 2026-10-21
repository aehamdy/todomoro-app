import { zodResolver } from "@hookform/resolvers/zod";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import FlagIcon from "@mui/icons-material/Flag";
import {
  Alert,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Popover,
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

interface CreateTaskFormProps {
  onSuccess?: () => void;
}

const priorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
] as const;

function CreateTaskForm({ onSuccess }: CreateTaskFormProps) {
  const { createTask, isCreating, error, isError } = useCreateTask();

  const [priorityAnchor, setPriorityAnchor] = useState<HTMLElement | null>(
    null,
  );
  const [dateAnchor, setDateAnchor] = useState<HTMLElement | null>(null);

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
      });

      reset();
      onSuccess?.();
    } catch {
      // The mutation error is displayed below.
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
                    color={
                      selectedPriority === "medium" ? "default" : "primary"
                    }
                    sx={{ flexShrink: 0 }}
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

        <Tooltip
          title={selectedDueDate ? `Due: ${selectedDueDate}` : "Set due date"}
        >
          <span>
            <IconButton
              type="button"
              aria-label="Select due date"
              aria-haspopup="true"
              aria-expanded={Boolean(dateAnchor)}
              disabled={isCreating}
              onClick={(event) => setDateAnchor(event.currentTarget)}
              color={selectedDueDate ? "primary" : "default"}
              sx={{ flexShrink: 0 }}
            >
              <CalendarMonthOutlinedIcon />
            </IconButton>
          </span>
        </Tooltip>

        <Popover
          open={Boolean(dateAnchor)}
          anchorEl={dateAnchor}
          onClose={() => setDateAnchor(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Box sx={{ p: 2, width: 260, maxWidth: "90vw" }}>
            <Stack spacing={2}>
              <TextField
                label="Due date"
                type="date"
                fullWidth
                size="small"
                value={selectedDueDate ?? ""}
                onChange={(event) => {
                  setValue("dueDate", event.target.value || null, {
                    shouldDirty: true,
                  });
                }}
                slotProps={{
                  inputLabel: { shrink: true },
                  htmlInput: {
                    min: new Date().toLocaleDateString("en-CA"),
                  },
                }}
              />

              <Stack direction="row" spacing={1}>
                <Box sx={{ flex: 1 }}>
                  <IconButton
                    aria-label="Clear due date"
                    title="Clear due date"
                    onClick={() => {
                      setValue("dueDate", null, {
                        shouldDirty: true,
                      });
                      setDateAnchor(null);
                    }}
                    size="small"
                  >
                    <span style={{ fontSize: 13 }}>Clear date</span>
                  </IconButton>
                </Box>

                <IconButton
                  aria-label="Close date picker"
                  onClick={() => setDateAnchor(null)}
                  size="small"
                >
                  <span style={{ fontSize: 13 }}>Done</span>
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        </Popover>
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
