import { Stock } from "../Models/StockModal.js";

export const postStock = (data) => {
  try {
    return Stock.create(data);
  } catch (error) {
    throw error;
  }
};
