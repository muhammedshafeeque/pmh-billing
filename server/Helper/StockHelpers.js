import { Category } from "../Models/CategoryModal.js";


export const CategoryNameValidate = async (category) => {
  try {
    let nameExist = await Category.findOne({ name: category.name });
    if (nameExist) {
      return Promise.reject({ category, message: "Name Already Exists!" });
    } else {
      return Promise.resolve(category);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const CategoryCodeValidate = async (category) => {
  try {
    let codeExist = await Category.findOne({ code: category.code });
    if (codeExist) {
      return Promise.reject({ category, message: "Code Already Exists!" });
    } else {
      return Promise.resolve(category);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
