import mongoose from "mongoose";
const billModal = mongoose.Schema(
  {
    number: { type: String, required: true },
    customerName: { type: String },
    customerMobile: { type: Number },
    billDate: { type: Date, default: Date.now },
    items: [
      {
        item: { id: mongoose.Schema.Types.ObjectId, ref: "item" },
        quantity: { type: Number, required: true },
        prise: { type: Number, required: true },
        Stock: { type: mongoose.Schema.Types.ObjectId, ref: "stock" },
      },
    ],
    billAmount: { type: Number, required: true },
    payableAmount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
export const Bill = mongoose.model("bill", billModal);
