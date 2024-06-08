import { Stock } from "../Models/StockModal.js";
import { ITEM } from "../Models/itemModal.js";
import { createTransaction } from "./AccountsService.js";

export const postStock = async (data) => {
  try {
    let  item =await ITEM.findById(data.item)
    let transaction = await createTransaction({
      fromAccount: data.mainAccount.accountHead,
      toAccount: item.accountHead,
      amount: data.purchaseRate,
      description: "Item Purchased",
    });
    data.transaction = transaction._id;
    await Stock.create(data);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error)
  }
};
export const patchStock = (id, data) => {
  try {
    return Stock.findByIdAndUpdate(id, data);
  } catch (error) {
    throw error;
  }
};
