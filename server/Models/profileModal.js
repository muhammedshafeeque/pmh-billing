import mongoose from "mongoose";
const profileModal = mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestaps: true,
  }
);
export const Profile = mongoose.model("profile", profileModal);
