import mongoose from "mongoose";
const cateGoryModal = mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, require: true, unique: true },
    racks: [
      { type: mongoose.Schema.Types.ObjectId, ref: "rack", required: true },
    ],
    
  },
  {
    timestaps: true,
  }
);
export const CateGory = mongoose.model("category", cateGoryModal);
