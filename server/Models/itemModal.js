import mongoose from "mongoose";
const itemModal = mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, require: true, unique: true },
    CateGory:{type:mongoose.Schema.Types.ObjectId, ref: "category" },
    messureMentType:{type:String,required:true},
    Qouantity:{type:Number,required:true},
    totalPrice:{type:Number,required:true},
    racks: [
      { type: mongoose.Schema.Types.ObjectId, ref: "rack", required: true },
    ],
    ratePerUnit:{type:Number,required:true},

  },
  {
    timestaps: true,
  }
);
export const CateGory = mongoose.model("item", itemModal);