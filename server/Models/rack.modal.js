import mongoose from "mongoose";
import { collections } from "../Constants/collections.js";
const rackModal = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
   
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: collections.SECTION_COLLECTION,
      required: true,
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: collections.ITEM_COLLECTION }],
  },
  {
    timestamps: true,
  }
);
export const Rack = mongoose.model("racks", rackModal);
