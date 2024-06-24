import mongoose from "mongoose";
import { collections } from "../Constants/collections.js";
const prefixNumberModal = mongoose.Schema(
  {
    name: { type: String },
    type: { type: String },
  },
  {
    timestamp: true,
  }
);

export const PREFIX_NUMBER_MODAL = mongoose.model(
  collections.PREFIX_NUMBER_COLLECTION,
  prefixNumberModal
);
