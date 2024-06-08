import mongoose from "mongoose";
import { collections } from "../Constants/collections.js";

const PaymentModal = mongoose.Schema({
  fromAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: collections.ACCOUNT_COLLECTION,
    required: true,
  },
  paymentTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: collections.VENDOR_COLLECTIONS,
    required: true,
  },
  amount: { type: Number, required: true },
  transaction:{
    type: mongoose.Schema.Types.ObjectId,
    ref: collections.TRANSACTIONS_COLLECTIONS,
    required: true,
  },
});
export const PAYMENT = mongoose.model(
  collections.PAYMENT_COLLECTIONS,
  PaymentModal
);
