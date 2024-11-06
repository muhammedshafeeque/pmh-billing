import mongoose from "mongoose";
import { collections } from "../Constants/collections.js";
const units = mongoose.Schema(
  {
    unitCode: String,
  unitName: String,
  description: String,
  measurement: String,
  iso: mongoose.Schema.Types.Mixed,
  conversionToParent: Number,
  parentUnit: String
  },
  {
    timestamps: true,
  }
);

export const UNITS = mongoose.model(collections.UNIT_COLLECTION, units);
