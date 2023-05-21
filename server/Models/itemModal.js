import mongoose from "mongoose";
const itemModal = mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, require: true, unique: true },
    CateGory:{type:mongoose.Schema.Types.ObjectId, ref: "category" },
    messureMentType:{type:String,required:true},
    racks: [
      { type: mongoose.Schema.Types.ObjectId, ref: "rack", required: true },
    ],
  },
  {
    timestaps: true,
  }
);
export const item = mongoose.model("item", itemModal);