import { item } from "../Models/itemModal.js";

export const postItem = (data) => {
  return new Promise(async (resolve, reject) => {
    let item = await item.create(data);
    resolve(item);
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
      .toArray()
      .limit(query.limit ? parseInt(query.limit) : 10)
      .skip(query.offset ? parseInt(query.offset) : 0);
    resolve(items);
  });
};
export const patchItem = (id, data) => {
  return new Promise(async (Resolve, reject) => {
    let item = await item.fintByIdAndUpdate(id, data);
    resolve(item);
  });
};
export const deleteItem = (id) => {
  return new Promise(async (resolve, reject) => {
    let item = await item.deleteOne({ _id: id });
    resolve(item);
  });
};
