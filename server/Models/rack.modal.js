import mongoose from "mongoose";
const rackModal = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    section:{type: mongoose.Schema.Types.ObjectId,
        ref: "section",
        required: true,}
  },
  {
    timestaps: true,
  }
);
export const Rack = mongoose.model("rack", rackModal);
