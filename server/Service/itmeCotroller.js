import { item } from "../Models/itemModal.js";

export const postItem = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let items = await item.create(data);
      resolve(items);
    } catch (error) {
      reject(error);
    }
  });
};
export const getItem = (query) => {
  return new Promise(async (resolve, reject) => {
    let keywords = {};
    query.query &&
      (keywords = {
        $or: [
          { code: { $regex: query.query, $options: "i" } },
          { name: { $regex: query.query, $options: "i" } },
        ],
      });
    let items = await item
      .find()
      .limit(query.limit ? parseInt(query.limit) : 10)
      .skip(query.offset ? parseInt(query.offset) : 0);
    resolve(items);
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
    return item.findById(id);
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
