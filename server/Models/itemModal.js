import mongoose from "mongoose";
import { collections } from "../Constants/collections.js";
const itemModal = mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, require: true, unique: true },
    unit: { type: String, required: true },
    totalStock: { type: Number, default: 0 },
    stocks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: collections.STOCK_COLLECTION,
        required: true,
      },
    ],
    racks: [
      {
        rackId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: collections.RACK_COLLECTIONS,
        },
        sectionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: collections.SECTION_COLLECTION,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
export const ITEM = mongoose.model(collections.ITEM_COLLECTION, itemModal);
