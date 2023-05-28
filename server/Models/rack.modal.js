import mongoose from "mongoose";
const rackModal = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    item:{type: mongoose.Schema.Types.ObjectId,
      ref: "item"},
    section:{type: mongoose.Schema.Types.ObjectId,
        ref: "section",
        required: true,},
    items:[{item:{type:mongoose.Schema.Types.ObjectId,
      ref: "item"},
      quatity:{type:Number},
      unit:{type:String}
    }]
  },
  {
    timestaps: true,
  }
);
export const Rack = mongoose.model("racks", rackModal);
