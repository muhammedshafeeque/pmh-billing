import { Category } from "../Models/CategoryModal.js";
import { ITEM } from "../Models/itemModal.js";


export const CategoryNameValidate = async (category, excludeId = null) => {
  try {
    let query = { name: category.name };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    let nameExist = await Category.findOne(query);
    if (nameExist) {
      return Promise.reject({ category, message: "Name Already Exists!" });
    } else {
      return Promise.resolve(category);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const CategoryCodeValidate = async (category, excludeId = null) => {
  try {
    let query = { code: category.code };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    let codeExist = await Category.findOne(query);
    if (codeExist) {
      return Promise.reject({ category, message: "Code Already Exists!" });
    } else {
      return Promise.resolve(category);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
export const itemNameValidate = async (item) => {
  try {
    let nameExist = await ITEM.findOne({ name: item.name });
    if (nameExist) {
      return Promise.reject({ item, message: "Name Already Exists!:"+item.name });
    } else {
      return Promise.resolve(item);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const itemCodeValidate = async (item) => {
  try {
    let codeExist = await ITEM.findOne({ code: item.code });
    if (codeExist) {
      return Promise.reject({ item, message: "Code Already Exists! :"+item.code });
    } else {
      return Promise.resolve(item);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

