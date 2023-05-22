import mongoose from "mongoose";
const stockModel = mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.ObjectId, ref: "item", required: true },
    status: { type: String },
    qouantity: { type: Number },
    purchaseDate: { type: String },
    purchasedQouantity: { type: Number },
    purchaseRate: { type: Number },
    ratePerunit: { type: Number },
    EndDate: { type: String },
    wastage: { type: Number },
    profit: { type: Number },
    ProfitPersentage: { type: Number },
    ExpiryDate: { type: String },
    history: [
      {
        date: { type: String },
        action: { type: String },
        qouantity: { type: Number },
        price: { type: Number },
      },
    ],
  },
  {
    timestaps: true,
  }
);
export const Stock = mongoose.model("stock", stockModel);
