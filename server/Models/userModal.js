import mongoose from "mongoose";
const userModel = mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
export const User = mongoose.model("user", userModel);
