import { Stock } from "../Models/StockModal.js";
import { UNITS } from "../Models/UnitModal.js";
import { ITEM } from "../Models/itemModal.js";
import { createTransaction } from "./AccountsService.js";
import { convertToBaseUnit, convertFromBaseUnit } from "../Utils/utils.js";

export const postStock = async (data) => {
  try {
    let item = await ITEM.findById(data.item).populate('unit');
    let purchasedUnit = await UNITS.findById(data.purchasedUnit);
    if (!item || !purchasedUnit) {
      throw new Error('Item or Unit not found');
    }

    let transaction = await createTransaction({
      fromAccount: data.mainAccount,
      toAccount: item.accountHead,
      amount: data.purchaseRate,
      description: "Item Purchased",
    });

    data.transaction = transaction._id;
    data.quantity=convertToBaseUnit(data.purchasedQuantity, purchasedUnit);
    await Stock.create(data);

    let convertedQuantity = convertToBaseUnit(data.purchasedQuantity, purchasedUnit);
    convertedQuantity = convertFromBaseUnit(convertedQuantity, item.unit);

    await ITEM.findByIdAndUpdate(data.item, { $inc: { totalStock: convertedQuantity } });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

export const patchStock = (id, data) => {
  try {
    return Stock.findByIdAndUpdate(id, data);
  } catch (error) {
    throw error;
  }
};
