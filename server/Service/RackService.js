import mongoose from "mongoose";
import { Rack } from "../Models/rack.modal.js";

export const postRack = async (data) => {
  await Rack.create(data);
  return;
};
export const getRacks = (query) => {
  return new Promise(async (resolve, reject) => {
    let keywords = {};
    query.query &&
      (keywords = {
        $or: [
          { code: { $regex: query.query, $options: "i" } },
          { name: { $regex: query.query, $options: "i" } },
        ],
      });
    query.code && (keywords.code = query.code);
    query.name && (keywords.name = query.name);
    query.section&&(keywords.section=new mongoose.Types.ObjectId(query.section))
    let racks = await Rack.find(keywords)
      .populate("section")
      .populate("items")
      .limit(query.limit ? parseInt(query.limit) : 10)
      .skip(query.offset ? parseInt(query.offset) : 0);
    resolve(racks);
  });
};
export const patchRack = async (id, data) => {
  try {
    let update = await Rack.findByIdAndUpdate(id, data);
    return update;
  } catch (error) {
    throw error;
  }
};
export const deleteRack = async (id) => {
  let update = await Rack.findByIdAndRemove(id);
  return update;
};
export const getRackById = async (id) => {
  try {
    return Rack.findById(id);
  } catch (error) {
    throw error;
  }
};
export const pushItemToRack = async (id, item) => {
  try {
    let data = await Rack.findByIdAndUpdate(id, {
      $push: {
        items: item,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
