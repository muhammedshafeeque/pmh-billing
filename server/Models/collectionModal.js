import mongoose from "mongoose";
import { collections } from "../Constants/collections.js";


const CollectionModal = mongoose.Schema(
  {
    toAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: collections.ACCOUNT_COLLECTION,
      required: true,
    },
    collectedFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: collections.CUSTOMER_COLLECTIONS,
      required: true,
    },
    amount: { type: Number, required: true },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: collections.TRANSACTIONS_COLLECTIONS,
      required: true,
    },
    number:{type:String,required:true}
  },
  {
    timestamps: true,
  }
);
export const COLLECTION = mongoose.model(
  collections.COLLECTION_COLLECTIONS,
  CollectionModal
);
