import mongoose from "mongoose";
import { collections } from "../Constants/collections.js";
const cashTransactionSchema = mongoose.Schema(
  {
    fromAccount: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: collections.ACCOUNT_HEAD_COLLECTIONS,
    },
    toAccount: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: collections.ACCOUNT_HEAD_COLLECTIONS,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      required: true,
    },
    type:{type: String,},
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "completed",
    },
  },
  {
    timestamps: true,
  }
);
export const TRANSACTION = mongoose.model(
  collections.TRANSACTIONS_COLLECTIONS,
  cashTransactionSchema
);
