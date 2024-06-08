import mongoose from "mongoose";
import { collections } from "../Constants/collections.js";

const AccountModal = mongoose.Schema(
    {
  name: { type: String, required: true },
  accountHead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: collections.ACCOUNT_HEAD_COLLECTIONS,
    required: true,
  },
}
);
export const ACCOUNT = mongoose.model(collections.ACCOUNT_COLLECTION, AccountModal);
