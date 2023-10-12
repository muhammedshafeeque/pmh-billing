import mongoose from "mongoose";
import { collections } from "../Constants/collections.js";
const units = mongoose.Schema(
  {
    Quantity: { type: String },
    SIUnit: { type: String },
    Symbol: { type: String },
    name: { type: String },
    Conversion: { type: Number },
  },
  {
    timestamps: true,
  }
);

export const UNITS = mongoose.model(collections.UNIT_COLLECTION, units);
