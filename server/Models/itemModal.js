import mongoose from "mongoose";
import { collections } from "../Constants/collections.js";
const itemModal = mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, require: true, unique: true },
    unit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: collections.UNIT_COLLECTION,
      required: true,
    },
    totalStock: { type: Number, default: 0 },
    accountHead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: collections.ACCOUNT_HEAD_COLLECTIONS,
    },
    racks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: collections.RACK_COLLECTIONS,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: collections.CATEGORY_COLLECTIONS,
    },
  },
  {
    timestamps: true,
  }
);
export const ITEM = mongoose.model(collections.ITEM_COLLECTION, itemModal);
