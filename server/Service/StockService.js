import { Stock } from "../Models/StockModal.js";

export const postStock = (data) => {

  try {
    return Stock.create(data);
  } catch (error) {
    throw error;
  }
};
export const patchStock=(id,data)=>{
  try {
    return Stock.findByIdAndUpdate(id,data)
  } catch (error) {
    throw error
  }
}