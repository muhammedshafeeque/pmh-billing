import mongoose from "mongoose";
const stockModel = mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.ObjectId, ref: "item", required: true },
    status: { type: String , required: true },
    quantity: { type: Number , required: true},
    purchaseDate: { type: Date,default:Date.now },
    purchasedQuantity: { type: Number, required: true },
    purchaseRate: { type: Number , required: true},
    ratePerUnit: { type: Number  },
    EndDate: { type: Date },
    wastage: { type: Number },
    profit: { type: Number },
    ProfitPercentage: { type: Number },
    ExpiryDate: { type: String },
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
export const Stock = mongoose.model("stock", stockModel);
