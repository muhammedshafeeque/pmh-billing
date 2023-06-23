import mongoose from "mongoose";
import { collections } from "../Constants/collections.js";
const sectionModal = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
  },
  {
    timestaps: true,
  }
);
export const Section = mongoose.model(collections.SECTION_COLLECTION, sectionModal);
 