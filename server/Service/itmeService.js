
import { collections } from "../Constants/collections.js";
import { ITEM } from "../Models/itemModal.js";
import { itemCodeValidate, itemNameValidate } from "../Helper/StockHelpers.js";
import { queryGen } from "../Utils/utils.js";
import { createAccountHead } from "./AccountsService.js";
export const postItem = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Promise.all(
        data.map(async (item) => {
          try {
            await itemCodeValidate(item);
            await itemNameValidate(item);
            return;
          } catch (error) {
            throw error;
          }
        })
      );
      let items = await Promise.all(
        data.map(async (item) => {
          let account = await createAccountHead({ name: item.name });
          item.accountHead = account._id;
          return item
        })
      );

      let itemList = await ITEM.insertMany(items);
      resolve(itemList);
    } catch (error) {
      reject(error);
    }
  });
};
export const getItem = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      let skip = query.skip ? parseInt(query.skip) : 0;
      let limit = query.limit ? parseInt(query.limit) : 10;
      let keywords = await queryGen(query);
      let results = await ITEM.find(keywords)
        .populate("unit")
        .populate("racks")
        .populate("category")
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip);
      let count = await ITEM.find(keywords).count();
      results = results.map((result) => ({
        ...result.toObject(),

        category: result.category.name,
        unit: result.unit.unitName,
        unitCode: result.unit.unitCode,
        measurement:result.unit.measurement
      }));
      resolve({ results, count });
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
