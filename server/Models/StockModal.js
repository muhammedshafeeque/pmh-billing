import mongoose from "mongoose";
const stockModel = mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.ObjectId, ref: "item", required: true },
    status: { type: String , required: true },
    qouantity: { type: Number , required: true},
    purchaseDate: { type: String },
    purchasedQouantity: { type: Number, required: true },
    purchaseRate: { type: Number , required: true},
    ratePerunit: { type: Number  },
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
