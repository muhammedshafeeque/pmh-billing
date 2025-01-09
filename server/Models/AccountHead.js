import mongoose from "mongoose";
import { collections } from "../Constants/collections.js";

const accountHeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    accountBalance: { type: Number, default: 0 },
    credit: { type: Number, default: 0 },
    debit: { type: Number, default: 0 },
    accountNumber: { type: String, unique: true },
    description: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    type: {
      type: String,
      enum: ["asset", "payable", "receivable", "main"],
      default: "asset",
    },
  },
  {
    timestamps: true,
  }
);

accountHeadSchema.pre("save", function (next) {
  this.accountBalance = this.credit - this.debit;
  next();
});

export const ACCOUNT_HEAD = mongoose.model(
  collections.ACCOUNT_HEAD_COLLECTIONS,
  accountHeadSchema
);
