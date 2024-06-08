import mongoose from "mongoose";
import { collections } from "../Constants/collections.js";

const vendorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    contactEmail: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please provide a valid email address"],
    },
    contactPhone: {
      type: String,
      unique: true,
      trim: true,
      match: [/^\d{10}$/, "Please provide a valid phone number"],
    },
    accountHEad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: collections.ACCOUNT_HEAD_COLLECTIONS,
      required:true
    },
    street: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    zipCode: {
      type: String,
      trim: true,
      match: [/^\d{6}$/, "Please provide a valid zip code"],
    },
    country: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const VENDOR = mongoose.model(collections.VENDOR_COLLECTIONS, vendorSchema);
