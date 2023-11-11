import mongoose from "mongoose";
import { Rack } from "../Models/rack.modal.js";
import { collections } from "../Constants/collections.js";
import {ITEM} from "../Models/itemModal.js"
export const postItem = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let items = await ITEM.create(data);
      resolve(items);
    } catch (error) {
      reject(error);
    }
  });
};
export const getItem = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (query.section || query.rack) {
        let keywords = {};
        query.section &&
          (keywords.section = new mongoose.Types.ObjectId(query.section));
        query.rack && (keywords._id = new mongoose.Types.ObjectId(query.rack));

        let racks = await Rack.find(keywords).populate({
          path: "items",
          populate: {
            path: "activeracks",
            model: "racks",
          },
        });

        let items = [];
        racks.forEach((obj) => {
          obj.items.forEach((data) => {
            items.push(data);
          });
        });
        let Items = items.filter(
          (item, index) => items.indexOf(item) === index
        );
        if (query.query) {
          let responseData = Items.filter((value) => {
            return value.destination
              .toLowerCase()
              .includes(query.query.toLowerCase());
          });
          resolve(responseData);
        } else if (query.id) {
          let response = Items.filter((obj) => {
            return String(obj._id) === query.id;
          });
          resolve(response);
        } else {
          resolve(Items);
        }
      } else {
        let keywords = {};
        query.query &&
          (keywords = {
            $or: [
              { code: { $regex: query.query, $options: "i" } },
              { name: { $regex: query.query, $options: "i" } },
            ],
          });
        query.id && (keywords._id = new mongoose.Types.ObjectId(query.id));
        query.rack &&
          (keywords.activeracks = {
            $in: [new mongoose.Types.ObjectId(query.rack)],
          });
        let items = await ITEM
          .find(keywords)
          .populate("racks").populate(
            {
              path:'racks',
              populate:{
                path:'section',
                modal:collections.SECTION_COLLECTION
              }
            }
          ).populate('unit')
          .limit(query.limit ? parseInt(query.limit) : 10)
          .skip(query.offset ? parseInt(query.offset) : 0);

        resolve(items);
      }
    } catch (error) {
      reject(error);
    }
  });
};
export const patchItem = (id, data) => {
  return new Promise(async (Resolve, reject) => {
    let items = await item.fintByIdAndUpdate(id, data);
    resolve(items);
  });
};
export const deleteItem = (id) => {
  return new Promise(async (resolve, reject) => {
    let items = await item.deleteOne({ _id: id });
    resolve(items);
  });
};
export const getItemById = (id) => {
  try {
    return ITEM.findById(id);
  } catch (error) {
    throw error;
  }
};
export const pushStockToItem = async (stock, Item) => {
  try {
    await item.findByIdAndUpdate(stock.item, {
      $push: {
        stocks: stock._id,
      },
      $set: {
        totalStock: Item.totalStock + stock.purchasedQouantity,
      },
    });
    return;
  } catch (error) {
    throw error;
  }
};
export const pushRackToActiveRacks = async (id, rack) => {
  try {
    await item.findByIdAndUpdate(id, {
      $push: {
        activeracks: rack,
      },
    });
  } catch (error) {
    throw error;
  }
};
export const pullRackFromActiveRacks = async (id, rack) => {
  try {
    await item.findByIdAndUpdate(id, {
      $pull: {
        activeracks: rack,
      },
    });
  } catch (error) {
    throw error;
  }
};
export const getItemByIdFullPopulate = async (id) => {
  try {
    let Item = await item.findById(id).populate({
      path: "activeracks",
      populate: {
        path: "section",
        model: collections.SECTION_COLLECTION,
      },
    });
    return Item;
  } catch (error) {
    throw error;
  }
};
