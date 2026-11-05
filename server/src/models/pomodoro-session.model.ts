import mongoose, { InferSchemaType, Schema } from "mongoose";

const pomodoroSessionTypes = ["focus", "shortBreak", "longBreak"] as const;

const pomodoroSessionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Session owner is required"],
    },

    sessionId: {
      type: String,
      required: [true, "Sessions ID is required"],
      trim: true,
    },
    sessionType: {
      type: String,
      enum: pomodoroSessionTypes,
      required: [true, "Session type is required"],
    },

    plannedDurationSeconds: {
      type: Number,
      required: [true, "Planned duration is required"],
      min: [1, "Planned duration must be at least 1 second"],
    },
    actualDurationSeconds: {
      type: Number,
      required: [true, "Actual duration is required"],
      min: [1, "Actual duration must be at least 1 second"],
    },

    startedAt: {
      type: Date,
      required: [true, "Session start time is required"],
    },
    completedAt: {
      type: Date,
      required: [true, "Session completion time is required"],
    },

    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      default: null,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },

    timezone: {
      type: String,
      required: [true, "Session timezone is required"],
    },
  },
  {
    timestamps: true,
  },
);

// Retrieve sessions by a user and sort by completion date
pomodoroSessionSchema.index({ user: 1, completedAt: -1 });
// Retrieve sessions for a specific project and date range
pomodoroSessionSchema.index({ user: 1, project: 1, completedAt: -1 });
// Retrieve duplicate recording of the same completed timer session
pomodoroSessionSchema.index({ user: 1, sessionId: 1 }, { unique: true });

export type PomodoroSessionDocument = InferSchemaType<
  typeof pomodoroSessionSchema
>;

const PomodoroSession = mongoose.model(
  "PomodoroSession",
  pomodoroSessionSchema,
);

export default PomodoroSession;
