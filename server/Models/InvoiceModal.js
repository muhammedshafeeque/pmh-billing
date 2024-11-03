import mongoose from "mongoose";
import { collections } from "../Constants/collections.js";
const invoiceModal = mongoose.Schema(
  {
    number: { type: String,required:true },
    customer: { type: String, required: true },
    invoiceDate: { type: Date, default: Date.now },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: collections.ITEM_COLLECTION,
          required: true,
        },
        quantity: { type: Number, required: true },
        pricePerUnit: { type: Number, required: true },
        Stock: { type: mongoose.Schema.Types.ObjectId, ref:collections.STOCK_COLLECTION },
      },
    ],
    invoiceAmount: { type: Number, required: true },
    discount:{type: Number, required: true},
    payableAmount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
export const INVOICE = mongoose.model(collections.INVOICE_COLLECTIONS, invoiceModal);
