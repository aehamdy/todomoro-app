import mongoose, { Schema, type InferSchemaType } from "mongoose";
import { boolean } from "zod";

const themeValues = [
  "light",
  "dark",
  "system",
  "ocean",
  "midnight",
  "ivory",
  "lavender",
  "sunset",
  "emerald-dark",
  "carbon",
  "olive-amber",
  "citrus-grove",
  "desert-oasis",
];

const pomodoroAlarmSounds = ["default", "bell", "digital", "gentle"];

const pomodoroBackgroundSounds = [
  "none",
  "white-noise",
  "pink-noise",
  "brown-noise",
  "rain",
  "ocean",
  "forest",
  "fireplace",
  "cafe",
];

const pomodoroWidgetThemes = [
  "midnight",
  "warm-sand",
  "forest",
  "lavender",
  "rose",
];

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
          values: themeValues,
          message: "Theme must be light, dark, or system",
        },
        default: "system",
      },

      taskCompletionSoundEnabled: { type: Boolean, default: true },

      pomodoro: {
        focusDuration: { type: Number, min: 1, max: 480, default: 25 },
        shortBreakDuration: { type: Number, min: 1, max: 480, default: 5 },
        longBreakDuration: { type: Number, min: 1, max: 480, default: 15 },
        longBreakInterval: { type: Number, min: 1, max: 90, default: 4 },

        autoStartNextPomodoro: { type: Boolean, default: false },
        autoStartBreak: { type: Boolean, default: false },
        disableBreaks: { type: Boolean, default: false },

        alarmVolume: { type: Number, min: 0, max: 100, default: 70 },
        focusAlarmSound: {
          type: String,
          enum: pomodoroAlarmSounds,
          default: "default",
        },
        breakAlarmSound: {
          type: String,
          enum: pomodoroAlarmSounds,
          default: "default",
        },

        whiteNoiseVolume: { type: Number, min: 0, max: 100, default: 30 },
        selectedWhiteNoise: {
          type: String,
          enum: pomodoroBackgroundSounds,
          default: "none",
        },
        autoPlayWhiteNoise: { type: Boolean, default: false },

        widgetTheme: {
          type: String,
          enum: pomodoroWidgetThemes,
          default: "midnight",
        },
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
