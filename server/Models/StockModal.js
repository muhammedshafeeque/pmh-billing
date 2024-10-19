import mongoose from "mongoose";
import { collections } from "../Constants/collections.js";

const stockModel = mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: collections.ITEM_COLLECTION,
      required: true,
    },
    status: { type: String },
    quantity: { type: Number },
    purchaseDate: { type: Date, default: Date.now },
    purchasedQuantity: { type: Number, required: true },
    purchaseRate: { type: Number, required: true },
    purchasedRatePerUnit:{ type: Number, required: true },
    sellablePricePerUnit: { type: Number },
    EndDate: { type: Date },
    wastage: { type: Number },
    profit: { type: Number },
    purchasedUnit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: collections.UNIT_COLLECTION,
      required: true,
    },
    ProfitPercentage: { type: Number },
    ExpiryDate: { type: String },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: collections.VENDOR_COLLECTIONS,
      required: true,
    },
    history: [
      {
        date: { type: Date },
        action: { type: String },
        quantity: { type: Number },
        price: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);
export const Stock = mongoose.model(collections.STOCK_COLLECTION, stockModel);
