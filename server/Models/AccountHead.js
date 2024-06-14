import mongoose from "mongoose";
import { collections } from "../Constants/collections.js";
const accountHeadModal = mongoose.Schema(
  {
    name: { type: String, required: true },
    accountBalance: { type: Number, default: 0 },
    credit: { type: Number, default: 0 },
    debit: { type: Number, default: 0 },
    accountNumber: { type: String, unique: true, sparse: true },
    description: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    type: {
      type: String,
      enum: ["asset", "payable", "receivable","main"],
      default: "asset",
    },
  },
  {
    timestamps: true,
  }
);
accountHeadModal.pre("save", async function (next) {
  try {
    await this.updateOne({ $set: { accountBalance: this.credit - this.debit } });
    next();
  } catch (error) {
    next(error);
  }
});
export const ACCOUNT_HEAD = mongoose.model(
  collections.ACCOUNT_HEAD_COLLECTIONS,
  accountHeadModal
);
