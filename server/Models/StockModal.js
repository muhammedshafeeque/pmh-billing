import mongoose from "mongoose";
const stockModel = mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.ObjectId, ref: "item", required: true },
    status: { type: String , required: true },
    qouantity: { type: Number , required: true},
    purchaseDate: { type: Date,default:Date.now },
    purchasedQouantity: { type: Number, required: true },
    purchaseRate: { type: Number , required: true},
    ratePerunit: { type: Number  },
    EndDate: { type: Date },
    wastage: { type: Number },
    profit: { type: Number },
    ProfitPersentage: { type: Number },
    ExpiryDate: { type: String },
    history: [
      {
        date: { type: Date },
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
