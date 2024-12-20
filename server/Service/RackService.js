import mongoose from "mongoose";
import { Rack } from "../Models/rack.modal.js";
import { queryGen } from "../Utils/utils.js";

export const postRack = async (data) => {
  await Rack.create(data);
  return;
};
export const getRacks = (query) => {
  return new Promise(async (resolve, reject) => {
   try {
    let keywords  = await queryGen(query)
    if (query.section) {
      const sectionIds = query.section.split(',').map(id => new mongoose.Types.ObjectId(id));
      keywords.section = { $in: sectionIds };
    }
    let racks = await Rack.find(keywords)
      .populate("section")
      .sort({ createdAt: -1 })
      .limit(query.limit ? parseInt(query.limit) : 10)
      .skip(query.offset ? parseInt(query.offset) : 0);
      let count= await Rack.find(keywords).count()
      racks=racks.map((rack)=>({
        ...rack.toObject(),
        section:rack.section.name
      }))
    resolve({results:racks,count});
   } catch (error) {
      reject(error)
   }
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
export const pullItemFromRack = async (id, item) => {
  try {
    let data = await Rack.findByIdAndUpdate(id, {
      $pull: {
        items: item,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

