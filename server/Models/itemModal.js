import mongoose from "mongoose";
import { collections } from "../Constants/collections.js";
const itemModal = mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, require: true, unique: true },
    CateGory: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
    unit: { type: String, required: true },
    totalStock:{type:Number, default:0},
    stocks: [
      { type: mongoose.Schema.Types.ObjectId, ref: collections.STOCK_COLLECTION, required: true },
    ],
    activeracks: [
      { type: mongoose.Schema.Types.ObjectId, ref: collections.RACK_COLLECTIONS},
    ],
  },
  {
    timestamps: true,
  }
);
export const item = mongoose.model(collections.ITEM_COLLECTION, itemModal);
