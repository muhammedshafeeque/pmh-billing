import mongoose from "mongoose";
import { collections } from "../Constants/collections.js";

const customerSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      
    },
    address: {
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
        match: [/^\d{5}$/, "Please provide a valid zip code"],
      },
      country: {
        type: String,
        trim: true,
      },
    },
    dateOfBirth: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    accountHEad: {
      type: mongoose.Schema.Types.ObjectId,
      ref: collections.ACCOUNT_HEAD_COLLECTIONS,
      required:true
    },
  },
  {
    timestamps: true,
  }
);

export const CUSTOMER = mongoose.model(
  collections.CUSTOMER_COLLECTIONS,
  customerSchema
);
