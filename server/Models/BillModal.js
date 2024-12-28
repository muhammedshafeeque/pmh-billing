import mongoose from "mongoose";
import { collections } from "../Constants/collections.js";
const billModal = mongoose.Schema(
  {
    number: { type: String },
    referenceNumber: { type: String },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: collections.VENDOR_COLLECTIONS,
      required: true,
    },
    billDate: { type: Date, default: Date.now },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: collections.ITEM_COLLECTION,
          required: true,
        },
        purchasedQuantity: { type: Number, required: true },
        purchaseRate: { type: Number, required: true },
        Stock: {
          type: mongoose.Schema.Types.ObjectId,
          ref: collections.STOCK_COLLECTION,
        },
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
