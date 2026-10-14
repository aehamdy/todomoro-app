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
    note: {
      type: String,
      trim: true,
      maxlength: [1000, "Note cannot exceed 1000 characters"],
      default: "",
    },
    isCompleted: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["no-priority", "low", "medium", "high"],
      default: "no-priority",
    },
    dueDate: { type: Date, default: null },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Task owner is required"],
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
