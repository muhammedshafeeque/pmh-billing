import mongoose from "mongoose";
import { collections } from "../Constants/collections.js";
const billModal = mongoose.Schema(
  {
    number: { type: String },
    vendor: { type: String, required: true },
    billDate: { type: Date, default: Date.now },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "item",
          required: true,
        },
        purchasedQuantity: { type: Number, required: true },
        purchaseRate: { type: Number, required: true },
        Stock: { type: mongoose.Schema.Types.ObjectId, ref: "stock" },
      },
    ],
    billAmount: { type: Number, required: true },
    payableAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "partially"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
export const BILL = mongoose.model(collections.BILL_COLLECTIONS, billModal);
