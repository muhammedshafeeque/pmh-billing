import mongoose from "mongoose";
const sectionModal = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
  },
  {
    timestaps: true,
  }
);
export const Section = mongoose.model("rack", sectionModal);
