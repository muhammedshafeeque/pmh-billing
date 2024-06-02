import mongoose from "mongoose";
import { collections } from "../Constants/collections.js";
const CategoryModal = mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, require: true, unique: true },
    description:{ type: String },
  },
  {
    timestamps: true,
  }
);
export const Category = mongoose.model(collections.CATEGORY_COLLECTIONS, CategoryModal);