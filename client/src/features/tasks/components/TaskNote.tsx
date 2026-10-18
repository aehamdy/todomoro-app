import { useState } from "react";
import { Box, Divider, TextField, Typography } from "@mui/material";

type TaskNoteProps = {
  note: string | null;
  onSave: (note: string) => void;
  isSaving: boolean;
};

function TaskNote({ note, onSave, isSaving }: TaskNoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note ?? "");

  const handleStartEditing = () => {
    if (isSaving) return;

    setEditedNote(note ?? "");
    setIsEditing(true);
  };

  const handleSave = () => {
    if (isSaving) return;

    setIsEditing(false);

    const newNote = editedNote.trim();
    const currentNote = note ?? "";

    if (newNote !== currentNote) {
      onSave(newNote);
    }
  };

  if (isEditing) {
    return (
      <>
        <Divider />

        <Box>
          <Typography
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            Note
          </Typography>

          <TextField
            fullWidth
            multiline
            minRows={3}
            maxRows={8}
            size="small"
            placeholder="Add a note..."
            value={editedNote}
            onChange={(event) => setEditedNote(event.target.value)}
            onBlur={handleSave}
            disabled={isSaving}
            autoFocus
            slotProps={{
              htmlInput: {
                maxLength: 1000,
                "aria-label": "Edit task note",
              },
            }}
          />
        </Box>
      </>
    );
  }

  return (
    <>
      <Divider />

      <Box
        onClick={handleStartEditing}
        sx={{
          mx: -0.5,
          p: 0.5,
          cursor: isSaving ? "default" : "text",
          borderRadius: 1,
          "&:hover": {
            backgroundColor: isSaving ? "transparent" : "action.hover",
          },
        }}
        title="Click to edit note"
      >
        <Typography
          color="text.secondary"
          sx={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          Note
        </Typography>

        <Typography
          sx={{
            fontSize: "18px",
            color: note ? "text.primary" : "text.secondary",
            whiteSpace: "pre-wrap",
            overflowWrap: "anywhere",
          }}
        >
          {note || "Add notes to the task."}
        </Typography>
      </Box>
    </>
  );
}

export default TaskNote;
