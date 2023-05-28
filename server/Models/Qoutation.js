import mongoose from "mongoose";
const QoutModal = mongoose.Schema(
  {
    number: { type: String, required: true },
    customerName: { type: String },
    customerMobile: { type: Number },
    items: [
      {
        item: { id: mongoose.Schema.Types.ObjectId, ref: "item" },
        qouantity: { type: Number, required: true },
        prise: { type: Number, required: true },
        Stock: { type: mongoose.Schema.Types.ObjectId, ref: "stock" },
      },
    ],
    billAmount: { type: Number, required: true },
  },
  {
    timestaps: true,
  }
);
export const Qoutation = mongoose.model("qoute", QoutModal);