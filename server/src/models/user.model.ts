import mongoose, { Schema, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [20, "Name cannot exceed 20 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowerCase: true,
      trim: true,
      maxLength: [254, "Email cannot exceed 254 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "password must be at least 8 characters"],
      select: false,
    },

    preferences: {
      theme: {
        type: String,
        enum: {
          values: ["light", "dark", "system"],
          message: "Theme must be light, dark, or system",
        },
        default: "system",
      },
    },
  },

  {
    timestamps: true,
  },
);

export type UserDocument = InferSchemaType<typeof userSchema>;

const User = mongoose.model("User", userSchema);

export default User;
