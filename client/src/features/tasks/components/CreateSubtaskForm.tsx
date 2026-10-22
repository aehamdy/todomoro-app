import { TextField, InputAdornment, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useAddSubtask } from "../hooks/useAddSubtask";

type CreateSubtaskFormProps = {
  taskId: string;
};

function CreateSubtaskForm({ taskId }: CreateSubtaskFormProps) {
  const [title, setTitle] = useState("");
  const { addSubtask, isAdding, isError, error } = useAddSubtask();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle || isAdding) return;

    try {
      await addSubtask({
        taskId,
        subtaskData: { title: trimmedTitle },
      });

      setTitle("");
    } catch {
      // Keep the title so the user can retry.
      // The mutation exposes the error through isError and error.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        variant="standard"
        placeholder="Add a subtask..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isAdding}
        slotProps={{
          htmlInput: {
            maxLength: 100,
            "aria-label": "New subtask title",
          },
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  edge="start"
                  aria-label="Add subtask"
                  type="submit"
                  disabled={!title.trim() || isAdding}
                >
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiInputBase-input": {
            paddingBottom: "16px",
          },
          "& .MuiInput-underline:before": {
            borderBottomColor: "divider",
          },
          "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottomColor: "primary.main",
            borderBottomWidth: "2px",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "success.main",
          },
        }}
      />

      {isError && (
        <p role="alert">
          {error instanceof Error
            ? error.message
            : "Failed to add subtask. Please try again."}
        </p>
      )}
    </form>
  );
}

export default CreateSubtaskForm;
