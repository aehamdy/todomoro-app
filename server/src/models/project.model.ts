import mongoose, { InferSchemaType, Schema } from "mongoose";

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "A project must have a title"],
      trim: true,
      maxLength: [100, "Project title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    color: {
      type: String,
      trim: true,
      default: "#2196F3",
      match: [/^#[0-9A-Fa-f]{6}$/, "Project color must be a valid hex color"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },

  {
    timestamps: true,
  },
);

export type ProjectDocument = InferSchemaType<typeof projectSchema>;

const Project = mongoose.model("Project", projectSchema);
export default Project;
