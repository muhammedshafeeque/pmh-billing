import mongoose from "mongoose";
const itemModal = mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, require: true, unique: true },
    CateGory: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
    unit: { type: String, required: true },
    stocks: [
      { type: mongoose.Schema.Types.ObjectId, ref: "stock", required: true },
    ],
    activeracks: [
      { type: mongoose.Schema.Types.ObjectId, ref: "rack", unique:true},
    ],
  },
  {
    timestaps: true,
  }
);
export const item = mongoose.model("item", itemModal);
