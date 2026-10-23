import mongoose, { InferSchemaType, Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: [1, "Title cannot be empty"],
      maxlength: [100, "Title cannot exceed 100 characters "],
    },
    isCompleted: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    dueDate: { type: Date, default: null },
    note: {
      type: String,
      trim: true,
      maxlength: [1000, "Note cannot exceed 1000 characters"],
      default: "",
    },
    subtasks: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
          minLength: [1, "Title cannot be empty"],
          maxLength: [100, "Title cannot exceed 100 characters"],
        },
        isCompleted: { type: Boolean, default: false },
      },
    ],

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Task owner is required"],
      index: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      default: null,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export type TaskDocument = InferSchemaType<typeof taskSchema>;

const Task = mongoose.model("Task", taskSchema);

export default Task;
