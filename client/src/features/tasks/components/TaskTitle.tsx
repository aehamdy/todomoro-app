import { useState } from "react";
import { Box, Checkbox, Stack, TextField, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

type TaskTitleProps = {
  title: string;
  isCompleted: boolean;
  onSave: (title: string) => void;
  onToggleComplete: (isCompleted: boolean) => void;
  isSaving: boolean;
};

function TaskTitle({
  title,
  isCompleted,
  onSave,
  onToggleComplete,
  isSaving,
}: TaskTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleStartEditing = () => {
    if (isSaving) return;

    setEditedTitle(title);
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmedTitle = editedTitle.trim();

    if (!trimmedTitle || trimmedTitle.length > 100) {
      setEditedTitle(title);
      setIsEditing(false);
      return;
    }

    setIsEditing(false);

    if (trimmedTitle !== title) {
      onSave(trimmedTitle);
    }
  };

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Checkbox
        icon={
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: "6px",
              border: "2px solid",
              borderColor: "text.secondary",
            }}
          />
        }
        checkedIcon={
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: "6px",
              bgcolor: "success.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckIcon sx={{ fontSize: 14, color: "white" }} />
          </Box>
        }
        checked={isCompleted}
        disabled={isSaving}
        onChange={(event) => onToggleComplete(event.target.checked)}
        size="small"
        sx={{ p: 0.5 }}
        slotProps={{
          input: {
            "aria-label": "Mark task as completed",
          },
        }}
      />

      {isEditing ? (
        <TextField
          value={editedTitle}
          onChange={(event) => setEditedTitle(event.target.value)}
          onBlur={handleSave}
          autoFocus
          fullWidth
          disabled={isSaving}
          slotProps={{
            htmlInput: {
              maxLength: 100,
              "aria-label": "Edit task title",
            },
          }}
          variant="standard"
        />
      ) : (
        <Typography
          variant="h6"
          onClick={handleStartEditing}
          sx={{
            overflowWrap: "anywhere",
            cursor: isSaving ? "default" : "text",
            borderRadius: 1,
            textDecoration: isCompleted ? "line-through" : "none",
            color: isCompleted ? "text.secondary" : "text.primary",
            "&:hover": {
              backgroundColor: isSaving ? "transparent" : "action.hover",
            },
          }}
          title="Click to edit title"
        >
          {title}
        </Typography>
      )}
    </Stack>
  );
}

export default TaskTitle;
